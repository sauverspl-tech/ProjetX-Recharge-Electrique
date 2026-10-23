/* Carte descriptive et statuts dynamiques : mêmes points, sources distinctes. */
(() => {
  const $=id=>document.getElementById(id),fmt=n=>Number(n).toLocaleString('fr-FR');
  const escape=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Coordonnées du site recensé, jamais la position de l’utilisateur.
  function navigation(site,label){
    const lat=site.lat,lon=site.lon;
    if(typeof lat!=='number'||typeof lon!=='number'||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return '<p>Itinéraire indisponible : coordonnées non valides.</p>';
    const position=encodeURIComponent(lat+','+lon);
    const style='display:inline-block;margin:8px 6px 4px 0;padding:10px 12px;border-radius:7px;background:#e6f3f0;color:#173247;font-weight:700;text-decoration:none';
    return '<div aria-label="Itinéraire vers la station"><a target="_blank" rel="noopener noreferrer" style="'+style+'" href="https://www.waze.com/ul?ll='+position+'&amp;navigate=yes" aria-label="'+escape('Y aller avec Waze : '+label)+'">Y aller avec Waze ↗</a><a target="_blank" rel="noopener noreferrer" style="'+style+'" href="https://www.google.com/maps/dir/?api=1&amp;destination='+position+'&amp;travelmode=driving" aria-label="'+escape('Itinéraire Google Maps : '+label)+'">Google Maps ↗</a><br><small>Ouvre votre application ou le site de navigation vers les coordonnées recensées. Vérifiez l’entrée du parking et les conditions d’accès.</small></div>';
  }

  const R=window.IRVERealtime;
  let map,markers,boundary,payload,requested='',revision=0,selectedBounds,sites=[],entries=[];
  let liveIndex=null,lastFetched=0,fetching=false,controller=null,lastError='',pollTimer=null,ageTimer=null;
  const enabled=()=>$('live-enabled').checked;
  function date(value){return new Date(value).toLocaleString('fr-FR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
  function initialize(){
    if(map)return;if(!window.L)throw Error('Le composant cartographique n’a pas pu être chargé.');
    map=L.map('station-map',{scrollWheelZoom:false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
      .on('tileerror',()=>{$('map-status').textContent='Fond de carte indisponible. Les contours et les positions recensées restent affichés.';}).addTo(map);
    markers=L.layerGroup().addTo(map);$('map-reset').onclick=()=>selectedBounds&&map.fitBounds(selectedBounds,{padding:[20,20],maxZoom:12});
  }
  function updateRealtime(){
    if(!requested){return;}
    const now=Date.now(),usable=enabled()&&!lastError&&lastFetched&&now-lastFetched<=90000?liveIndex:null;
    const total={available:0,busy:0,out:0,reserved:0,unknown:0};let shown=0;
    for(const entry of entries){
      const {site,marker,label}=entry;
      const c=R?R.summarize(site,usable,now):{available:0,busy:0,out:0,reserved:0,unknown:site.points,total:site.points};
      for(const k of Object.keys(total))total[k]+=c[k];
      const known=c.total-c.unknown;
      const kind=c.available?'available':c.busy?'busy':c.reserved?'reserved':c.out?'out':'unknown';
      const count=known?fmt(c.available)+'/'+fmt(site.points):'?/'+fmt(site.points);
      const summary=known?fmt(c.available)+' disponible(s) confirmé(s) sur '+fmt(site.points)+' points recensés':'Statut inconnu pour les '+fmt(site.points)+' points recensés';
      const states=fmt(c.available)+' disponibles · '+fmt(c.busy)+' occupés · '+fmt(c.out)+' hors service · '+fmt(c.reserved)+' réservés · '+fmt(c.unknown)+' inconnus';
      const tooltip='<strong>'+fmt(site.points)+' points de recharge</strong><br>'+escape(summary)+'<br>'+escape(label);
      const times=known?'<br>Horodatages retenus : '+date(c.oldest)+(c.oldest!==c.newest?' à '+date(c.newest):'')+' (heure locale).':'';
      const content=tooltip+'<br>'+escape(site.adresse||'Adresse non renseignée')+'<br>Opérateur(s) : '+escape(site.operateur||'Non renseigné')+'<hr>'+escape(states)+times+(site.stations>1?'<br>'+fmt(site.stations)+' identifiants de station regroupés.':'')+navigation(site,label)+'<br><small>Disponibilité déclarée par les opérateurs ; ne garantit pas une place libre à l’arrivée. Total recensé au 22/10/2026.</small>';
      marker.setIcon(L.divIcon({className:'site-marker',html:'<span class="site-dot '+kind+'">'+count+'</span>',iconSize:[48,28],iconAnchor:[24,14]}));
      marker.setTooltipContent(tooltip);marker.setPopupContent(content);
      const el=marker.getElement();if(el){el.setAttribute('aria-label',label+' : '+summary);el.title=label+' : '+summary;}
      const visible=!$('live-only').checked||c.available>0;
      if(visible){shown++;if(!markers.hasLayer(marker))markers.addLayer(marker);}else if(markers.hasLayer(marker))markers.removeLayer(marker);
    }
    $('live-available').textContent=fmt(total.available);$('live-busy').textContent=fmt(total.busy);
    $('live-out').textContent=fmt(total.out+total.reserved);$('live-unknown').textContent=fmt(total.unknown);
    if(!enabled())$('live-status').textContent='Suivi en pause — aucun ancien statut n’est présenté comme actuel.';
    else if(lastError)$('live-status').textContent=lastError+' Les statuts restent inconnus ; la carte et les totaux recensés restent disponibles.';
    else if(fetching)$('live-status').textContent='Actualisation du flux national…';
    else if(usable)$('live-status').textContent='Flux consulté à '+date(lastFetched)+' · '+fmt(sites.reduce((n,s)=>n+s.points,0)-total.unknown)+' / '+fmt(sites.reduce((n,s)=>n+s.points,0))+' points avec statut récent exploitable. Actualisation chaque minute.';
    else $('live-status').textContent='Aucun flux récent exploitable — statuts inconnus.';
    $('live-filter-status').textContent=$('live-only').checked?fmt(shown)+' sites avec au moins un point disponible confirmé. Les sites sans statut récent sont masqués ; cela ne prouve pas qu’ils sont occupés.':'';
  }
  async function refresh(){
    if(!requested||!enabled()||document.hidden||fetching)return;
    fetching=true;lastError='';$('live-refresh').disabled=true;updateRealtime();
    controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),25000);
    try{
      if(!R)throw Error('Composant temps réel indisponible.');
      const res=await fetch(R.SOURCE,{signal:controller.signal,cache:'no-store'});
      if(!res.ok)throw Error('Flux national indisponible (HTTP '+res.status+').');
      const text=await res.text();const next=R.indexRows(R.parseCSV(text));
      if(!next.size)throw Error('Le flux national ne contient aucun statut horodaté exploitable.');
      liveIndex=next;lastFetched=Date.now();lastError='';
    }catch(e){liveIndex=null;lastFetched=0;lastError=e.name==='AbortError'?'Le flux national n’a pas répondu à temps.':e.message;}
    finally{clearTimeout(timeout);controller=null;fetching=false;$('live-refresh').disabled=false;updateRealtime();}
  }
  function timers(){
    clearInterval(pollTimer);clearInterval(ageTimer);
    if(requested&&enabled()&&!document.hidden){pollTimer=setInterval(refresh,60000);ageTimer=setInterval(updateRealtime,15000);}
  }
  async function show(code){
    requested=code;const current=++revision;sites=[];entries=[];timers();
    $('map-section').hidden=!code;if(!code){controller?.abort();return;}
    $('map-title').textContent='Où se situent les stations de recharge ?';$('map-summary').textContent='Chargement des sites de recharge…';$('map-summary').classList.remove('map-error');$('map-status').textContent='';
    for(const id of ['live-available','live-busy','live-out','live-unknown'])$(id).textContent='—';
    $('live-status').textContent='En attente des sites du département…';$('live-filter-status').textContent='';
    $('station-map').hidden=true;$('map-reset').hidden=true;if(markers)markers.clearLayers();if(map&&boundary){map.removeLayer(boundary);boundary=null;}
    try{
      if(!payload)payload=fetch('carte.json').then(r=>{if(!r.ok)throw Error('Positions des stations indisponibles.');return r.json();}).catch(e=>{payload=null;throw e;});
      const data=await payload;if(current!==revision)return;
      const territory=data.territoires[code],contour=data.contours.features.find(f=>f.properties.code===code);
      if(!territory||!contour)throw Error('Territoire absent des données cartographiques.');
      $('station-map').hidden=false;initialize();map.invalidateSize();boundary=L.geoJSON(contour,{interactive:false,style:{color:'#375f87',weight:2,fillColor:'#087d75',fillOpacity:.035}}).addTo(map);selectedBounds=boundary.getBounds();sites=territory.sites;
      $('map-title').textContent=contour.properties.nom+' : les sites de recharge';
      for(const site of sites){
        const raw=site.nom.length>180?(site.adresse||'Site de recharge partagé'):site.nom,label=raw.length>180?raw.slice(0,177)+'…':raw;
        const marker=L.marker([site.lat,site.lon],{icon:L.divIcon({className:'site-marker',html:'<span class="site-dot unknown">?/'+fmt(site.points)+'</span>',iconSize:[48,28],iconAnchor:[24,14]}),title:label,keyboard:true})
          .bindTooltip('Statut inconnu',{direction:'top',offset:[0,-12]}).bindPopup('Chargement des statuts…').addTo(markers);
        entries.push({site,marker,label});
      }
      $('map-summary').textContent=fmt(sites.length)+' sites cartographiés · '+fmt(sites.reduce((n,s)=>n+s.points,0))+' points de recharge en accès libre recensés';
      $('map-status').textContent=(territory.points_sans_coordonnees?fmt(territory.points_sans_coordonnees)+' points sans coordonnées ne sont pas positionnés. ':'')+(code.length>2?'Couverture géographique incomplète. ':'')+'Zoomez pour distinguer les sites proches. Touchez un repère pour lire sa fiche.';
      $('map-reset').hidden=false;map.fitBounds(selectedBounds,{padding:[20,20],maxZoom:12});updateRealtime();
      if(!lastFetched||Date.now()-lastFetched>60000)refresh();
    }catch(e){if(current!==revision)return;$('station-map').hidden=true;$('map-summary').classList.add('map-error');$('map-summary').textContent=e.message+' Le comparateur reste utilisable.';}
  }
  $('live-refresh').onclick=refresh;$('live-only').onchange=updateRealtime;
  $('live-enabled').onchange=()=>{if(!enabled()){controller?.abort();liveIndex=null;lastFetched=0;}else refresh();timers();updateRealtime();};
  document.addEventListener('visibilitychange',()=>{timers();if(!document.hidden){updateRealtime();if(!lastFetched||Date.now()-lastFetched>60000)refresh();}});
  window.addEventListener('departement-change',e=>show(e.detail));
  if($('departement').value)show($('departement').value);
})();

