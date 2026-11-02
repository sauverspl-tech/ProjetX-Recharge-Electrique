(function(root){
 'use strict';
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function matches(spec,f){
   if(!spec)return !f.power&&!f.plug&&!f.price&&!f.pmr&&!f.always&&!f.cb;
   return (!f.power||(spec[0]!=null&&spec[0]>=f.power))&&(!f.plug||(spec[1]&f.plug)!==0)&&(!f.price||(f.price==='free'?spec[2]===1:spec[2]===0))&&(!f.pmr||spec[3]===1)&&(!f.always||spec[4]===1)&&(!f.cb||spec[5]===1);
 }
 function filterSite(site,f){
   if(f.q&&!normalize([site.nom,site.adresse,site.operateur].join(' ')).includes(normalize(f.q.trim())))return null;
   const keep=[];for(let i=0;i<site.ids.length;i++)if(matches(site.specs?.[i],f))keep.push(i);
   if(!keep.length)return null;
   return {...site,totalPoints:site.points,points:keep.length,ids:keep.map(i=>site.ids[i]),specs:keep.map(i=>site.specs?.[i])};
 }
 function distance(a,b){const rad=x=>x*Math.PI/180;const dlat=rad(b.lat-a.lat),dlon=rad(b.lon-a.lon);const h=Math.sin(dlat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dlon/2)**2;return 6371*2*Math.asin(Math.sqrt(Math.min(1,h)));}
 function priceLabel(site){const states=(site.specs||[]).map(s=>s?.[2]);if(states.length&&states.every(s=>s===1))return 'Gratuit déclaré';if(states.length&&states.every(s=>s===0))return 'Payant déclaré';if(states.some(s=>s===1)&&states.some(s=>s===0))return 'Tarifs mixtes';return 'Prix à vérifier';}
 const api={normalize,matches,filterSite,distance,priceLabel};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RechargeFilters=api;
})(typeof window!=='undefined'?window:globalThis);
