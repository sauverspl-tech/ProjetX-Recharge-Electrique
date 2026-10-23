/* Carte indépendante : un échec de carte n'empêche pas le comparateur. */
(() => {
  const $ = id => document.getElementById(id);
  const fmt = n => Number(n).toLocaleString('fr-FR');
  const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let map, markers, boundary, payload, requested = '', revision = 0, selectedBounds;
  function initialize() {
    if (map) return;
    if (!window.L) throw new Error('Le composant cartographique n’a pas pu être chargé.');
    map = L.map('station-map', {scrollWheelZoom:false});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:19, attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).on('tileerror', () => { $('map-status').textContent = 'Le fond de carte est momentanément indisponible. Les contours et les positions recensées restent affichés.'; }).addTo(map);
    markers = L.layerGroup().addTo(map);
    $('map-reset').onclick = () => selectedBounds && map.fitBounds(selectedBounds, {padding:[20,20],maxZoom:12});
  }
  async function show(code) {
    requested = code; const current = ++revision;
    $('map-section').hidden = !code;
    if (!code) return;
    $('map-title').textContent = 'Où se situent les stations de recharge ?';
    $('map-summary').textContent = 'Chargement des sites de recharge…';
    $('map-summary').classList.remove('map-error');
    $('map-status').textContent = '';
    $('station-map').hidden = true; $('map-reset').hidden = true;
    // Supprimer le département précédent avant le chargement du suivant.
    if (markers) markers.clearLayers();
    if (map && boundary) { map.removeLayer(boundary); boundary = null; }
    try {
      if (!payload) payload = fetch('carte.json').then(r => {if (!r.ok) throw Error('Les positions des stations ne peuvent pas être chargées.'); return r.json();}).catch(e => {payload=null;throw e;});
      const data = await payload;
      if (current !== revision || requested !== code) return;
      const territory = data.territoires[code];
      const contour = data.contours.features.find(f => f.properties.code === code);
      if (!territory || !contour) throw Error('Ce territoire n’est pas disponible dans les données cartographiques.');
      $('station-map').hidden = false;
      initialize(); map.invalidateSize();
      boundary = L.geoJSON(contour,{interactive:false,style:{color:'#375f87',weight:2,fillColor:'#087d75',fillOpacity:0.035}}).addTo(map);
      selectedBounds = boundary.getBounds();
      $('map-title').textContent = contour.properties.nom + ' : les sites de recharge';
      let total = 0;
      for (const site of territory.sites) {
        total += site.points;
        const count = fmt(site.points);
        const rawName = site.nom.length > 180 ? (site.adresse || 'Site de recharge partagé') : site.nom;
        const label = rawName.length > 180 ? rawName.slice(0,177)+'…' : rawName;
        const tooltip = '<strong>'+count+' point'+(site.points>1?'s':'')+' de recharge</strong><br>'+escape(label);
        const content = tooltip+'<br>'+escape(site.adresse || 'Adresse non renseignée')+'<br>Opérateur(s) : '+escape(site.operateur || 'Non renseigné')+(site.stations>1?'<br>'+fmt(site.stations)+' identifiants de station réunis à cette position.':'')+(site.coord_multiples?'<br><em>Coordonnées variables dans la source : position observée la plus fréquente.</em>':'')+'<br><small>Accès libre déclaré · Recensé au 22/10/2026.<br>Disponibilité en temps réel inconnue.</small>';
        L.marker([site.lat,site.lon], {
          icon:L.divIcon({className:'site-marker',html:'<span class="site-dot">'+count+'</span>',iconSize:[26,26],iconAnchor:[13,13]}),
          title:label+' — '+count+' point'+(site.points>1?'s':'')+' de recharge', alt:label+' : '+count+' point'+(site.points>1?'s':'')+' de recharge',keyboard:true
        }).bindTooltip(tooltip,{direction:'top',offset:[0,-12]}).bindPopup(content).addTo(markers);
      }
      $('map-summary').textContent = fmt(territory.sites.length)+' sites cartographiés · '+fmt(total)+' points de recharge en accès libre recensés';
      $('map-status').textContent = (territory.points_sans_coordonnees?fmt(territory.points_sans_coordonnees)+' points recensés sans coordonnées ne peuvent pas être positionnés. ':'') + (code.length>2?'Couverture incomplète : l’absence de repère ne prouve pas l’absence de station. ':'')+'Zoomez pour distinguer les sites proches. Sur téléphone, touchez un repère pour lire sa fiche.';
      $('map-reset').hidden = false;
      map.fitBounds(selectedBounds,{padding:[20,20],maxZoom:12});
    } catch (e) {
      if (current !== revision) return;
      $('station-map').hidden=true;
      $('map-summary').classList.add('map-error');
      $('map-summary').textContent=e.message+' Le comparateur reste utilisable.';
    }
  }
  window.addEventListener('departement-change', event => show(event.detail));
  // Le comparateur peut avoir restauré le lien direct avant ce script différé.
  const selected = $('departement').value;
  if (selected) show(selected);
})();
