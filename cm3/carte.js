/* Recharge France : itinéraires, recherche locale et tarifs déclarés. */
(() => {
  'use strict';
  const PRICE_DATA = {"date_recensement":"2026-10-22","methode":"Tarif simple explicite en EUR/kWh identique et renseigné pour tous les points du site ; suppléments, plages horaires, abonnements et unités ambiguës exclus. Déclarations du 22/10/2025 au 22/10/2026 uniquement, valeurs payantes inférieures à 0,05 EUR/kWh exclues. Gratuité explicite sans contradiction. Ne garantit pas le prix actuel.","sites":{"01|46.20827|5.23706":[0.39,"2025-12-11"],"02|49.84308|3.27994":[0.29,"2025-12-11"],"02|49.83983|3.29963":[0.29,"2025-12-11"],"03|46.35384|2.59241":[0.5,"2026-02-23"],"03|46.53598|3.34625":[0.29,"2025-12-11"],"06|43.57431|7.01280":[0,"2026-07-21"],"06|43.57771|7.05772":[0.29,"2025-12-11"],"06|43.63160|7.13440":[0.29,"2025-12-11"],"06|43.70652|7.28130":[0.29,"2025-12-11"],"06|43.70972|7.28605":[0.29,"2025-12-11"],"06|43.71874|7.28612":[0.29,"2025-12-11"],"08|49.73793|4.70168":[0.45,"2026-01-15"],"08|49.69490|4.87466":[0.25,"2026-02-19"],"11|43.20060|2.75381":[0.29,"2025-12-11"],"11|43.22866|3.05068":[0.29,"2025-12-11"],"13|43.40561|5.20421":[0.29,"2025-12-11"],"13|43.29193|5.37258":[0.29,"2025-12-11"],"13|43.30835|5.40021":[0.29,"2025-12-11"],"13|43.34387|5.42051":[0.29,"2025-12-11"],"14|49.11989|-0.37408":[0.39,"2025-12-11"],"14|49.26834|-0.25799":[0.29,"2025-12-11"],"16|45.58001|-0.25767":[0,"2026-10-21"],"18|47.00341|2.26684":[0.39,"2025-12-11"],"18|47.09696|2.45431":[0.39,"2025-12-11"],"18|46.72607|2.50270":[0.5,"2026-02-23"],"21|47.34374|4.99931":[0.29,"2025-12-11"],"22|48.76797|-3.03974":[0.29,"2025-12-11"],"25|47.22364|5.89320":[0.25,"2026-01-04"],"25|47.27326|5.99026":[0.25,"2026-01-02"],"25|47.24210|6.00967":[0.29,"2025-12-11"],"25|46.91497|6.33256":[0.25,"2026-01-02"],"25|47.20375|6.74974":[0.35,"2026-01-15"],"25|47.51519|6.79642":[0.29,"2025-12-11"],"26|44.54199|4.74772":[0.29,"2025-12-11"],"26|44.34619|4.75548":[0.29,"2025-12-11"],"26|44.92232|4.93500":[0,"2026-07-21"],"26|44.97131|5.41307":[0.36,"2026-10-22"],"26|44.96813|5.42998":[0.4,"2026-10-22"],"26|45.05910|5.45170":[0.36,"2026-10-22"],"29|48.38610|-4.53241":[0.29,"2025-12-11"],"29|48.24988|-4.47109":[0.29,"2025-12-11"],"29|48.41414|-4.44291":[0.29,"2025-12-11"],"29|48.38431|-4.35040":[0.29,"2025-12-11"],"29|47.81949|-4.28727":[0.29,"2025-12-11"],"29|47.99122|-4.07462":[0.29,"2025-12-11"],"30|43.80872|4.24182":[0.29,"2025-12-11"],"30|43.82537|4.32547":[0.29,"2025-12-11"],"30|43.76385|4.42602":[0.29,"2025-12-11"],"30|43.81375|4.61298":[0.29,"2025-12-11"],"31|43.53739|1.38874":[0.55,"2025-12-12"],"33|44.78849|-0.58645":[0.39,"2025-12-11"],"33|44.78366|-0.50632":[0.39,"2025-12-11"],"33|44.92314|-0.46534":[0.39,"2025-12-11"],"33|44.88979|-0.08283":[0,"2026-10-20"],"33|44.88551|-0.07911":[0,"2026-10-21"],"34|43.39979|3.65765":[0.29,"2025-12-11"],"34|43.60323|3.89007":[0.29,"2025-12-11"],"34|43.61784|3.89784":[0.29,"2025-12-11"],"34|43.55924|4.07791":[0.29,"2025-12-11"],"35|48.08881|-1.67211":[0.29,"2025-12-11"],"36|46.80557|1.69778":[0.29,"2025-12-11"],"37|47.34806|0.64769":[0.55,"2025-12-12"],"37|47.42367|0.65765":[0.29,"2025-12-11"],"37|47.33673|0.70540":[0.39,"2025-12-11"],"37|47.41971|0.71571":[0.29,"2025-12-11"],"37|47.42503|1.01942":[0,"2026-10-21"],"38|45.53004|4.91976":[0,"2026-07-21"],"38|45.14820|5.31287":[0.29,"2025-12-11"],"40|43.70626|-1.03054":[0.29,"2025-12-11"],"41|47.60067|1.31905":[0.39,"2025-12-11"],"42|46.03805|4.07749":[0.29,"2025-12-11"],"42|45.45944|4.38390":[0,"2026-10-12"],"42|45.48271|4.43919":[0.29,"2025-12-11"],"43|45.02949|3.88021":[0.39,"2025-12-11"],"44|47.25882|-1.51030":[0.29,"2025-12-11"],"47|44.16817|0.29961":[0.29,"2025-12-11"],"51|49.12898|4.52463":[0.39,"2025-12-11"],"52|48.09157|5.14465":[0.29,"2025-12-11"],"54|48.61526|6.08967":[0.39,"2025-12-11"],"54|48.70871|6.25284":[0.25,"2026-01-02"],"54|48.45808|6.74080":[0.29,"2025-12-11"],"55|49.14446|5.40958":[0.29,"2025-12-11"],"55|48.89528|5.53689":[0.29,"2025-12-11"],"56|47.66816|-2.44724":[0.29,"2025-12-11"],"57|49.09408|6.71672":[0.29,"2025-12-11"],"58|47.39524|2.92230":[0.5,"2026-02-23"],"58|47.02410|3.14707":[0.5,"2026-02-23"],"59|50.74110|2.68387":[0,"2026-07-21"],"59|50.62860|2.96640":[0,"2026-07-21"],"59|50.64587|3.01583":[0.29,"2025-12-11"],"59|50.67197|3.22770":[0,"2026-07-21"],"59|50.39218|3.47752":[0.29,"2025-12-11"],"59|50.35103|3.54068":[0.29,"2025-12-11"],"59|50.38975|3.61231":[0.29,"2025-12-11"],"59|50.29732|3.81055":[0.29,"2025-12-11"],"60|49.63921|2.28124":[0.39,"2025-12-11"],"60|49.22383|2.42923":[0.39,"2025-12-11"],"62|50.93720|1.81036":[0.29,"2025-12-11"],"62|50.52218|2.63363":[0.29,"2025-12-11"],"63|45.88614|3.11459":[0.29,"2025-12-11"],"66|42.71524|2.85115":[0.29,"2025-12-11"],"66|42.66791|2.89730":[0.29,"2025-12-11"],"67|48.25549|7.43440":[0.25,"2026-01-02"],"67|48.53859|7.59116":[0.25,"2026-01-02"],"67|48.59962|7.74292":[0.29,"2025-12-11"],"68|47.90279|7.22845":[0.29,"2025-12-11"],"68|47.79682|7.33619":[0.29,"2025-12-11"],"68|48.09823|7.37815":[0.25,"2026-01-02"],"69|46.08723|4.64028":[0,"2026-10-22"],"69|45.73907|4.93025":[0,"2026-07-21"],"70|47.88103|6.29824":[0.29,"2025-12-11"],"72|48.18029|0.65410":[0.39,"2025-12-11"],"74|45.75339|6.27761":[0.29,"2025-12-11"],"74|46.06858|6.58411":[0.29,"2025-12-11"],"76|50.05461|1.42313":[0.39,"2025-12-11"],"77|48.54733|2.64943":[0.29,"2025-12-11"],"77|48.85450|2.77922":[0.49,"2026-03-05"],"80|49.90711|2.31926":[0.29,"2025-12-11"],"80|49.73058|3.06747":[0.29,"2025-12-11"],"81|44.05423|2.15968":[0.29,"2025-12-11"],"83|43.11756|5.94628":[0.29,"2025-12-11"],"83|43.30677|6.24926":[0.29,"2025-12-11"],"83|43.19248|6.64816":[0,"2026-07-21"],"83|43.47190|6.73450":[0,"2026-07-21"],"83|43.43091|6.74514":[0.29,"2025-12-11"],"84|44.06312|4.81372":[0,"2026-07-21"],"84|44.08046|4.98222":[0.29,"2025-12-11"],"85|46.45953|-1.13591":[0.29,"2025-12-11"],"86|46.78880|0.52549":[0.29,"2025-12-11"],"88|48.20334|6.72047":[0.29,"2025-12-11"],"90|47.64038|6.91264":[0.29,"2025-12-11"],"91|48.67081|2.28251":[0.29,"2025-12-11"],"92|48.76378|2.28997":[0.29,"2025-12-11"],"94|48.77863|2.37610":[0.39,"2025-12-11"],"94|48.75469|2.41095":[0.29,"2025-12-11"],"94|48.77415|2.49786":[0.39,"2025-12-11"]}};
  function distanceKm(a,b){
    const rad=Math.PI/180, dLat=(b.lat-a.lat)*rad,dLon=(b.lon-a.lon)*rad;
    const h=Math.sin(dLat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dLon/2)**2;
    return 6371.0088*2*Math.atan2(Math.sqrt(Math.min(1,h)),Math.sqrt(Math.max(0,1-h)));
  }
  function compareRows(mode){return (a,b)=>{
    if(mode==='price'){
      const ap=a.price?.[0],bp=b.price?.[0];
      if(ap!=null||bp!=null){if(ap==null)return 1;if(bp==null)return -1;if(ap!==bp)return ap-bp;}
    }
    if(a.distance!=null&&b.distance!=null&&Math.abs(a.distance-b.distance)>1e-8)return a.distance-b.distance;
    return a.site.nom.localeCompare(b.site.nom,'fr');
  };}
  function inRadius(origin,site,radius){return distanceKm(origin,site)<=radius;}
  if(typeof module!=='undefined'&&module.exports){module.exports={distanceKm,compareRows,inRadius,priceData:PRICE_DATA};return;}
  const $=id=>document.getElementById(id),fmt=(n,d=0)=>Number(n).toLocaleString('fr-FR',{maximumFractionDigits:d,minimumFractionDigits:d});
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const displayName=s=>(s.nom||'Station de recharge').length>160?(s.adresse||'Site de recharge regroupé'):s.nom;
  const active=()=>!document.querySelector('[data-view="carte"]').hidden;
  const R=window.IRVERealtime;
  let map,markers,boundary,userMarker,radiusLayer,payloadPromise,allSites,requested='',revision=0,selectedBounds,sites=[],entries=new Map(),listed=[];
  let origin=null,watchId=null,liveIndex=null,lastFetched=0,fetching=false,controller=null,lastError='',pollTimer,ageTimer;
  const enabled=()=>true, radius=()=>Number($('near-radius').value);
  const clock=v=>new Date(v).toLocaleTimeString('fr-FR');
  const key=s=>s.departement+'|'+s.lat.toFixed(5)+'|'+s.lon.toFixed(5);
  function navigation(site,label){
    if(!Number.isFinite(site.lat)||!Number.isFinite(site.lon))return '';
    const position=encodeURIComponent(site.lat+','+site.lon);
    const link=(url,text)=>'<a target="_blank" rel="noopener noreferrer" href="'+url+'" aria-label="'+esc(text+' : '+label)+'">'+text+' ↗</a>';
    return '<div class="route-links" aria-label="Itinéraire vers la station">'+
      link('https://www.waze.com/ul?ll='+position+'&amp;navigate=yes','Waze')+
      link('https://maps.apple.com/?daddr='+position+'&amp;dirflg=d','Plans Apple')+
      link('https://www.google.com/maps/dir/?api=1&amp;destination='+position+'&amp;travelmode=driving','Google Maps')+
      '</div><small>Vérifiez l’entrée du parking et les conditions d’accès dans votre application.</small>';
  }
  function pin(kind){return L.divIcon({className:'site-marker',html:'<span class="station-pin '+kind+'"><svg viewBox="0 0 20 24" aria-hidden="true"><path fill="currentColor" d="M11.5 0 2 13h7l-1 11 10-15h-7z"/></svg></span>',iconSize:[35,40],iconAnchor:[17,38],popupAnchor:[0,-34]});}
  function initialize(){
    if(map)return;if(!window.L)throw Error('La carte n’a pas pu être chargée.');
    map=L.map('station-map',{scrollWheelZoom:false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    markers=(L.markerClusterGroup?L.markerClusterGroup({maxClusterRadius:45,disableClusteringAtZoom:15,showCoverageOnHover:false,iconCreateFunction:c=>L.divIcon({className:'station-cluster-icon',html:'<span class="station-cluster">'+c.getChildCount()+'</span>',iconSize:[43,43]})}):L.layerGroup()).addTo(map);
    $('map-reset').onclick=fit;
  }
  async function payload(){
    if(!payloadPromise)payloadPromise=fetch('carte.json').then(r=>{if(!r.ok)throw Error('Les positions des stations ne sont pas accessibles.');return r.json();}).catch(e=>{payloadPromise=null;throw e;});
    return payloadPromise;
  }
  function fit(){
    if(!map)return;map.invalidateSize();
    if(origin&&radiusLayer)map.fitBounds(radiusLayer.getBounds(),{padding:[22,22],maxZoom:14});
    else if(selectedBounds)map.fitBounds(selectedBounds,{padding:[22,22],maxZoom:12});
  }
  function paintOrigin(){
    if(!map)return;
    if(userMarker){map.removeLayer(userMarker);userMarker=null;}if(radiusLayer){map.removeLayer(radiusLayer);radiusLayer=null;}
    if(origin){
      userMarker=L.circleMarker([origin.lat,origin.lon],{radius:8,color:'#fff',weight:3,fillColor:'#307fea',fillOpacity:1}).bindTooltip(origin.source==='gps'?'Votre position approximative':'Centre choisi sur la carte').addTo(map);
      radiusLayer=L.circle([origin.lat,origin.lon],{radius:radius()*1000,color:'#307fea',weight:1,fillColor:'#307fea',fillOpacity:.04,interactive:false}).addTo(map);
    }
  }
  function priceLabel(p){return p?fmt(p[0],2)+' €/kWh déclaré':'Tarif non comparable ou absent';}
  function summary(c){return c.total===c.unknown?'Disponibilité inconnue':fmt(c.available)+' disponible(s) confirmé(s) / '+fmt(c.total)+' points';}
  function rowFor(site,usable,now){return {site,distance:origin?distanceKm(origin,site):null,price:PRICE_DATA.sites[key(site)]||null,c:R?R.summarize(site,usable,now):{total:site.points,available:0,busy:0,out:0,reserved:0,unknown:site.points}};}
  function popup(row){
    const {site,c,price,distance}=row;
    return '<strong>'+esc(displayName(site))+'</strong><p>'+esc(site.adresse||'Adresse non renseignée')+'<br><small>'+esc(site.operateur||'Opérateur non renseigné')+'</small></p>'+
      (distance!=null?'<p><b>'+fmt(distance,1)+' km à vol d’oiseau</b></p>':'')+
      '<p class="popup-price"><b>'+priceLabel(price)+'</b>'+ (price?'<br><small>Déclaration : '+esc(price[1]||'date non renseignée')+' · recensement du 22/10/2026. Vérifiez le tarif actuel et les frais éventuels.</small>':'<br><small>Les grilles horaires, frais de connexion et abonnements ne sont pas convertis en un prix unique.</small>')+'</p><hr>'+
      '<b>'+fmt(site.points)+' points de recharge</b><br>'+esc(summary(c))+'<br><small>'+fmt(c.busy)+' occupés · '+fmt(c.out+c.reserved)+' hors service / réservés · '+fmt(c.unknown)+' inconnus'+
      (c.total>c.unknown?'<br>Statuts datés de '+clock(c.oldest)+' à '+clock(c.newest):'')+'</small>'+navigation(site,site.nom)+'<p><small>Disponibilité déclarée, sans garantie de place libre à l’arrivée.</small></p>';
  }
  function ensureMarker(row){
    const id=key(row.site);let marker=entries.get(id);
    if(!marker){
      const w=map.getSize().x;
      marker=L.marker([row.site.lat,row.site.lon],{icon:pin('unknown'),title:displayName(row.site),keyboard:true}).bindTooltip('',{direction:'top'}).bindPopup('',{maxWidth:Math.max(160,Math.min(310,w-70)),minWidth:Math.max(160,Math.min(220,w-70)),maxHeight:w<500?350:440,autoPanPadding:[20,20]});entries.set(id,marker);
    }
    return marker;
  }
  function update(){
    if(!requested)return;
    const now=Date.now(),usable=enabled()&&!lastError&&lastFetched&&now-lastFetched<=90000?liveIndex:null;
    const rows=sites.map(s=>rowFor(s,usable,now)),total={available:0,busy:0,out:0,reserved:0,unknown:0};
    rows.forEach(r=>Object.keys(total).forEach(k=>total[k]+=r.c[k]));
    const query=normalize($('station-search').value).trim();
    const matches=rows.filter(r=>(!query||normalize([r.site.nom,r.site.adresse,r.site.operateur].join(' ')).includes(query))&&(!$('live-only').checked||r.c.available>0)).sort(compareRows($('station-sort').value));
    const shown=matches.slice(0,1000),visible=new Set(shown.map(r=>key(r.site)));
    for(const [id,m] of entries)if(!visible.has(id)&&markers.hasLayer(m))markers.removeLayer(m);
    for(const row of shown){
      const c=row.c,m=ensureMarker(row),kind=c.available?'available':c.busy?'busy':c.out?'out':c.reserved?'reserved':'unknown';
      // Conserver l'icône quand le statut n'a pas changé évite de perdre le focus clavier.
      if(m._rechargeKind!==kind){m.setIcon(pin(kind));m._rechargeKind=kind;}
      m.setTooltipContent('<b>'+esc(displayName(row.site))+'</b><br>'+esc(summary(c))+'<br>'+priceLabel(row.price));m.setPopupContent(popup(row));
      if(!markers.hasLayer(m))markers.addLayer(m);
      const el=m.getElement();if(el)el.setAttribute('aria-label',displayName(row.site)+' : '+summary(c));
    }
    $('live-available').textContent=fmt(total.available);$('live-busy').textContent=fmt(total.busy);$('live-out').textContent=fmt(total.out+total.reserved);$('live-unknown').textContent=fmt(total.unknown);
    $('live-status').textContent=!enabled()?'Actualisation en pause.':fetching?'Actualisation du flux national…':lastError?lastError+' Statuts inconnus.':usable?'Flux consulté à '+clock(lastFetched)+' · actualisation automatique chaque minute.':'En attente de statuts récents exploitables.';
    $('search-status').textContent=fmt(matches.length)+' site(s) correspondant(s)'+(matches.length>1000?' · les 1 000 premiers repères sont affichés pour garder la carte fluide.':'.');
    $('live-filter-status').textContent=$('live-only').checked?'Seuls les sites avec au moins un point disponible confirmé sont affichés. Inconnu ne signifie pas occupé.':'';
    const priced=matches.filter(r=>r.price).length;
    $('price-status').textContent=fmt(priced)+' site(s) avec tarif simple comparable parmi ces résultats. '+($('station-sort').value==='price'?'Prix renseignés croissants, puis prix inconnus. ':!origin?'Sans position, la liste est classée par nom. ':'')+'Tarifs déclarés, non actualisés en temps réel ; distances à vol d’oiseau.';
    listed=shown.slice(0,40);
    $('station-list-title').textContent=origin?'Stations dans un rayon de '+radius()+' km':'Stations du département';
    $('station-list-count').textContent=matches.length?'Affichage de '+fmt(listed.length)+' sur '+fmt(matches.length)+' sites. Cliquez sur un nom pour ouvrir sa fiche.':'Aucune station ne correspond à ces filtres. Élargissez le rayon ou retirez un filtre.';
    $('station-results').innerHTML=listed.map((r,i)=>'<li class="station-result"><div><button class="station-open" type="button" data-result="'+i+'">'+esc(displayName(r.site))+'</button><p>'+esc(r.site.adresse||'Adresse non renseignée')+'</p><span class="result-status '+(r.c.available?'has-free':'')+'">'+esc(summary(r.c))+'</span></div><div class="station-result-values">'+(r.distance!=null?'<strong>'+fmt(r.distance,1)+' km</strong><small>à vol d’oiseau</small>':'')+'<b class="result-price">'+(r.price?fmt(r.price[0],2)+' €/kWh':'Prix inconnu')+'</b>'+(r.price?'<small>déclaré le '+esc(r.price[1])+'</small>':'')+'</div></li>').join('');
  }
  async function refresh(){
    if(!requested||!enabled()||document.hidden||fetching||!active())return;
    fetching=true;lastError='';$('live-refresh').disabled=true;update();
    controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),25000);
    try{
      if(!R)throw Error('Composant de disponibilité indisponible.');
      const response=await fetch(R.SOURCE,{signal:controller.signal,cache:'no-store'});if(!response.ok)throw Error('Flux indisponible (HTTP '+response.status+').');
      const next=R.indexRows(R.parseCSV(await response.text()));if(!next.size)throw Error('Aucun statut horodaté exploitable.');
      liveIndex=next;lastFetched=Date.now();
    }catch(e){liveIndex=null;lastFetched=0;lastError=e.name==='AbortError'?'Le flux n’a pas répondu à temps.':e.message;}
    finally{clearTimeout(timeout);controller=null;fetching=false;$('live-refresh').disabled=false;update();}
  }
  function timers(){clearInterval(pollTimer);clearInterval(ageTimer);if(requested&&enabled()&&!document.hidden&&active()){pollTimer=setInterval(refresh,60000);ageTimer=setInterval(update,15000);}}
  async function show(code){
    requested=code;const current=++revision;sites=[];entries.clear();if(markers)markers.clearLayers();if(boundary){map.removeLayer(boundary);boundary=null;}
    $('map-section').hidden=!code;$('map-empty').hidden=!!code;if(!code){timers();return;}
    $('map-summary').textContent='Chargement des stations…';$('map-summary').classList.remove('map-error');$('station-map').hidden=true;
    try{
      const data=await payload();if(current!==revision)return;
      $('station-map').hidden=false;initialize();map.invalidateSize();
      if(origin){
        if(!allSites)allSites=Object.entries(data.territoires).flatMap(([dep,t])=>t.sites.map(s=>({...s,departement:dep})));
        sites=allSites.filter(s=>inRadius(origin,s,radius()));selectedBounds=null;
        $('map-title').textContent=origin.source==='gps'?'Les stations autour de vous':'Autour du point choisi';
      }else{
        const territory=data.territoires[code],contour=data.contours.features.find(f=>f.properties.code===code);if(!territory||!contour)throw Error('Ce territoire est absent de la carte.');
        sites=territory.sites.map(s=>({...s,departement:code}));boundary=L.geoJSON(contour,{interactive:false,style:{color:'#446a85',weight:2,fillOpacity:.03}}).addTo(map);selectedBounds=boundary.getBounds();
        $('map-title').textContent=contour.properties.nom+' : les stations';
      }
      paintOrigin();$('map-summary').textContent=fmt(sites.length)+' sites · '+fmt(sites.reduce((n,s)=>n+s.points,0))+' points de recharge recensés'+(origin?' · rayon '+radius()+' km, départements voisins inclus':'');
      $('map-reset').hidden=false;$('search-here').disabled=false;update();fit();switchResultView(resultView);timers();if(!lastFetched||Date.now()-lastFetched>60000)refresh();
      $('map-status').textContent='Les positions sont issues du recensement du 22/10/2026. Touchez un repère pour ouvrir la fiche. Les sites non recensés ou sans coordonnées ne sont pas représentés.';
    }catch(e){if(current!==revision)return;$('station-map').hidden=true;$('map-summary').classList.add('map-error');$('map-summary').textContent=e.message;$('station-results').innerHTML='';}
  }
  function stopWatch(){if(watchId!==null){navigator.geolocation.clearWatch(watchId);watchId=null;}}
  function setOrigin(point){
    origin=point;window.rechargeNearbyActive=true;$('leave-nearby').hidden=false;
    $('near-status').textContent=point.source==='gps'?'Position utilisée dans cet onglet'+(point.accuracy?' · précision estimée ± '+fmt(point.accuracy)+' m':'')+'. Les distances sont à vol d’oiseau.':'Recherche autour du centre de la carte, sans accès à votre position.';
    show('nearby');
  }
  function resetNearby(){stopWatch();origin=null;window.rechargeNearbyActive=false;$('leave-nearby').hidden=true;$('near-status').textContent='Localisation arrêtée. Vous pouvez choisir un département.';paintOrigin();show($('departement').value);}
  $('locate-me').onclick=()=>{
    if(!window.isSecureContext||!navigator.geolocation){$('near-status').textContent='Localisation indisponible. Ouvrez le site en HTTPS ou cherchez autour du centre de la carte.';return;}
    stopWatch();$('near-status').textContent='Autorisez la localisation dans votre navigateur pour chercher autour de vous…';
    watchId=navigator.geolocation.watchPosition(position=>{
      const next={lat:position.coords.latitude,lon:position.coords.longitude,accuracy:position.coords.accuracy,source:'gps'};
      if(!origin||origin.source!=='gps'||distanceKm(origin,next)>.1)setOrigin(next);
    },error=>{
      stopWatch();if(origin?.source==='gps')resetNearby();$('near-status').textContent=error.code===1?'Localisation refusée. Choisissez un département ou utilisez « Chercher ici » sur la carte.':error.code===3?'La position n’a pas pu être obtenue à temps. Réessayez ou utilisez « Chercher ici ».':'Position indisponible. Réessayez ou choisissez un département.';
    },{enableHighAccuracy:false,maximumAge:60000,timeout:15000});
  };

  let resultView='map';
  function switchResultView(view){
    resultView=view;$('station-map').hidden=view!=='map'||!requested;
    document.querySelector('.station-list-panel').hidden=view!=='list';
    $('show-map').setAttribute('aria-pressed',String(view==='map'));$('show-list').setAttribute('aria-pressed',String(view==='list'));
    if(view==='map'&&map)map.invalidateSize();
  }
  function drawer(open){document.body.classList.toggle('map-filters-open',open);$('open-filters').setAttribute('aria-expanded',String(open));}
  $('open-filters').onclick=()=>drawer(true);$('close-filters').onclick=()=>drawer(false);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')drawer(false)});
  $('show-map').onclick=()=>{switchResultView('map');fit()};$('show-list').onclick=()=>switchResultView('list');

  $('leave-nearby').onclick=resetNearby;
  $('search-here').onclick=()=>{if(!map)return;stopWatch();const center=map.getCenter();setOrigin({lat:center.lat,lon:center.lng,source:'carte'});};
  $('near-radius').onchange=()=>origin&&show('nearby');
  $('station-sort').onchange=update;$('station-search').oninput=update;$('live-only').onchange=update;
  $('station-results').onclick=event=>{const button=event.target.closest('[data-result]');if(!button)return;const row=listed[Number(button.dataset.result)];if(!row)return;const marker=ensureMarker(row);switchResultView('map');drawer(false);map.setView([row.site.lat,row.site.lon],Math.max(map.getZoom(),15));if(markers.zoomToShowLayer)markers.zoomToShowLayer(marker,()=>marker.openPopup());else marker.openPopup();$('station-map').scrollIntoView({behavior:'smooth',block:'center'});};
  $('live-refresh').onclick=refresh;$('live-enabled').onchange=()=>{if(!enabled()){controller?.abort();liveIndex=null;lastFetched=0;}else refresh();timers();update();};
  document.addEventListener('visibilitychange',()=>{timers();if(!document.hidden){update();if(!lastFetched||Date.now()-lastFetched>60000)refresh();}});
  window.addEventListener('departement-change',event=>{if(origin){stopWatch();origin=null;window.rechargeNearbyActive=false;$('leave-nearby').hidden=true;$('near-status').textContent='Vue par département. Localisation arrêtée.';}show(event.detail);});
  window.addEventListener('vue-change',event=>{timers();if(event.detail==='carte'&&map){requestAnimationFrame(fit);if(!lastFetched||Date.now()-lastFetched>60000)refresh();}});
  if($('departement').value)show($('departement').value);
})();

