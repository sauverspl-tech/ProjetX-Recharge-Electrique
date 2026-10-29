/* Lecture du flux public PAN : aucune clé, aucune donnée simulée en production. */
(function(root){
  'use strict';
  const MAX_AGE=15*60*1000, FUTURE_TOLERANCE=2*60*1000;
  const SOURCE='https://proxy.transport.data.gouv.fr/resource/consolidation-nationale-irve-dynamique';
  const BELIB='https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/belib-points-de-recharge-pour-vehicules-electriques-disponibilite-temps-reel/exports/json';
  const normalizeId=id=>String(id||'').trim().toUpperCase().replace(/[\s*]/g,'');
  function belibRows(rows){
    if(!Array.isArray(rows))throw Error('Format Belib non reconnu.');
    return rows.map(r=>{const status=String(r.statut_pdc||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase(),busy=status.startsWith('occupe')||status==='en charge',free=status==='disponible',reserved=status==='reserve',out=['en maintenance','hors service','en panne'].includes(status);
      return {id_pdc_itinerance:r.id_pdc,horodatage:r.last_updated,etat_pdc:out?'hors_service':busy||free||reserved?'en_service':'inconnu',occupation_pdc:free?'libre':busy?'occupe':reserved?'reserve':'inconnu',source:'Belib — Ville de Paris'};
    });
  }
  async function loadSources({signal,fetcher=fetch}={}){
    const get=async(url,json=false)=>{const r=await fetcher(url,{signal,cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);return json?r.json():r.text();};
    const sources=[
      {name:'PAN national',load:async()=>parseCSV(await get(SOURCE))},
      {name:'Belib Paris',load:async()=>belibRows(await get(BELIB,true))},
      {name:'Parera Mobilité',load:async()=>{const meta=await get('https://www.data.gouv.fr/api/1/datasets/691467f0f5dd0286d55bdd48/',true);const r=meta.resources?.find(r=>String(r.format).toLowerCase()==='csv'&&/dynamique/i.test(r.title));if(!r)throw Error('Ressource absente');const url=new URL(r.url);if(url.protocol!=='https:'||url.hostname!=='static.data.gouv.fr')throw Error('Adresse de ressource non prise en charge');return parseCSV(await get(url.href));}}
    ];
    const settled=await Promise.allSettled(sources.map(async s=>{const rows=await s.load();return rows.map(r=>({...r,source:s.name}));}));
    const rows=[],reports=[];settled.forEach((r,i)=>{reports.push({name:sources[i].name,ok:r.status==='fulfilled',rows:r.status==='fulfilled'?r.value.length:0});if(r.status==='fulfilled')for(const row of r.value)rows.push(row);});
    if(!rows.length)throw Error('Aucun flux de disponibilité accessible.');return {index:indexRows(rows),reports};
  }
  function history(site,index,now=Date.now()){
    const ids=[...new Set((site.ids||[]).map(normalizeId))],out={reported:0,stale:0,available:0,busy:0,out:0,reserved:0,oldest:null,newest:null,sources:[]};
    if(ids.length!==site.points)return out;
    for(const id of ids){const e=index?.get(id);if(!e||e.conflict||!Number.isFinite(e.time)||e.time>now+FUTURE_TOLERANCE)continue;out.reported++;if(now-e.time<=MAX_AGE||now-e.time>24*3600000)continue;const status=classify({...e,time:now},now);if(status==='unknown')continue;out.stale++;out[status]++;out.oldest=Math.min(out.oldest??e.time,e.time);out.newest=Math.max(out.newest??e.time,e.time);if(e.source&&!out.sources.includes(e.source))out.sources.push(e.source);}
    return out;
  }

  function parseCSV(text){
    const rows=[];let row=[],field='',quoted=false;
    text=text.replace(/^\uFEFF/,'');const delimiter=(text.split(/\r?\n/,1)[0]||'').includes(';')?';':',';
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
      else if(c===delimiter&&!quoted){row.push(field);field='';}
      else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))rows.push(row);row=[];field='';}
      else field+=c;
    }
    if(quoted)throw Error('Flux CSV incomplet.');
    row.push(field);if(row.some(v=>v!==''))rows.push(row);
    const headers=rows.shift()||[];
    for(const key of ['id_pdc_itinerance','etat_pdc','occupation_pdc','horodatage'])if(!headers.includes(key))throw Error('Format du flux national non reconnu.');
    return rows.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])));
  }
  function timestamp(value){
    // Ne pas interpréter une heure sans fuseau dans le fuseau local du visiteur.
    const s=String(value||'').trim().replace(/^(\d{4}-\d{2}-\d{2}) /,'$1T');
    if(!/(Z|[+-]\d{2}:\d{2})$/.test(s))return NaN;
    return Date.parse(s);
  }
  function indexRows(rows){
    const result=new Map();
    for(const row of rows){
      const id=normalizeId(row.id_pdc_itinerance);if(!id)continue;
      const time=timestamp(row.horodatage);if(!Number.isFinite(time))continue;
      const entry={time,state:row.etat_pdc,occupation:row.occupation_pdc,conflict:false,source:row.source,connectors:[row.etat_prise_type_2,row.etat_prise_type_combo_ccs,row.etat_prise_type_chademo,row.etat_prise_type_ef]};
      const old=result.get(id);
      if(!old||time>old.time)result.set(id,entry);
      else if(time===old.time&&(old.state!==entry.state||old.occupation!==entry.occupation))old.conflict=true;
    }
    return result;
  }
  function classify(entry,now=Date.now()){
    if(!entry||entry.conflict||!Number.isFinite(entry.time)||now-entry.time>MAX_AGE||entry.time-now>FUTURE_TOLERANCE)return 'unknown';
    if(entry.state==='hors_service')return 'out';
    if(entry.state!=='en_service')return 'unknown';
    return ({libre:'available',occupe:'busy',reserve:'reserved'})[entry.occupation]||'unknown';
  }
  function summarize(site,index,now=Date.now(),connector=''){
    const counts={available:0,busy:0,out:0,reserved:0,unknown:0,total:site.points,newest:null,oldest:null};
    const ids=[...new Set((site.ids||[]).map(normalizeId))];
    if(ids.length!==site.points){counts.unknown=site.points;return counts;}
    for(const id of ids){const item=index?.get(id);let status=classify(item,now);if(connector!==''&&status!=='unknown'&&status!=='out'){const state=item?.connectors?.[Number(connector)];if(state==='hors_service')status='out';else if(state!=='fonctionnel')status='unknown';}counts[status]++;
      if(status!=='unknown'){counts.newest=Math.max(counts.newest??item.time,item.time);counts.oldest=Math.min(counts.oldest??item.time,item.time);}}
    return counts;
  }
  const api={SOURCE,BELIB,MAX_AGE,parseCSV,timestamp,indexRows,classify,summarize,normalizeId,belibRows,loadSources,history};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.IRVERealtime=api;
})(typeof window!=='undefined'?window:globalThis);

