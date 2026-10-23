/* Lecture du flux public PAN : aucune clé, aucune donnée simulée en production. */
(function(root){
  'use strict';
  const MAX_AGE=15*60*1000, FUTURE_TOLERANCE=2*60*1000;
  const SOURCE='https://proxy.transport.data.gouv.fr/resource/consolidation-nationale-irve-dynamique';
  function parseCSV(text){
    const rows=[];let row=[],field='',quoted=false;
    text=text.replace(/^\uFEFF/,'');
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
      else if(c===','&&!quoted){row.push(field);field='';}
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
      const id=String(row.id_pdc_itinerance||'').trim();if(!id)continue;
      const time=timestamp(row.horodatage);if(!Number.isFinite(time))continue;
      const entry={time,state:row.etat_pdc,occupation:row.occupation_pdc,conflict:false};
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
  function summarize(site,index,now=Date.now()){
    const counts={available:0,busy:0,out:0,reserved:0,unknown:0,total:site.points,newest:null,oldest:null};
    const ids=[...new Set(site.ids||[])];
    if(ids.length!==site.points){counts.unknown=site.points;return counts;}
    for(const id of ids){const item=index?.get(id),status=classify(item,now);counts[status]++;
      if(status!=='unknown'){counts.newest=Math.max(counts.newest??item.time,item.time);counts.oldest=Math.min(counts.oldest??item.time,item.time);}}
    return counts;
  }
  const api={SOURCE,MAX_AGE,parseCSV,timestamp,indexRows,classify,summarize};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.IRVERealtime=api;
})(typeof window!=='undefined'?window:globalThis);
