"""CM2 : agrégation indépendante de chaque source, puis jointure par département.
Depuis la racine : python cm2/preparer_jointure.py. Bibliothèque standard.
"""
import pathlib,csv,gzip,json,collections,math
ROOT=pathlib.Path(__file__).resolve().parent.parent;OUT=ROOT/'cm2'
def read(p,delimiter=','):
 with (gzip.open(p,'rt',encoding='utf-8-sig',newline='') if str(p).endswith('.gz') else open(p,encoding='utf-8-sig',newline='')) as f:yield from csv.DictReader(f,delimiter=delimiter)
def dep(c):return c[:3] if c.startswith(('97','98')) else c[:2]
def number(v):
 try:
  n=float(str(v).replace(',','.'));return n if math.isfinite(n) else None
 except (ValueError,TypeError):return None
geo=json.loads((ROOT/'data'/'departements.geojson').read_text(encoding='utf8'));names={f['properties']['code']:f['properties']['nom'] for f in geo['features']};shapes=[]
for f in geo['features']:
 g=f['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
 for poly in polys:
  outer=poly[0];xs=[p[0] for p in outer];ys=[p[1] for p in outer];shapes.append((f['properties']['code'],(min(xs),min(ys),max(xs),max(ys)),poly))
def inring(x,y,ring):
 inside=False;xj,yj=ring[-1][:2]
 for p in ring:
  xi,yi=p[:2]
  if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi)+xi:inside=not inside
  xj,yj=xi,yi
 return inside
cache={}
def locate(x,y):
 key=(x,y)
 if key in cache:return cache[key]
 matches=set()
 for code,(x0,y0,x1,y1),poly in shapes:
  if x0<=x<=x1 and y0<=y<=y1 and inring(x,y,poly[0]) and not any(inring(x,y,h) for h in poly[1:]):matches.add(code)
 cache[key]=next(iter(matches)) if len(matches)==1 else ''
 return cache[key]
qc=collections.Counter();supply=collections.defaultdict(collections.Counter);excluded=collections.Counter();methods=collections.Counter();pointids=set()
for r in read(ROOT/'data'/'points_recharge.csv.gz'):
 qc['points_cm1']+=1;assert r['id_pdc'] not in pointids;pointids.add(r['id_pdc']);code=r['code_commune'];decl=dep(code) if len(code)==5 and dep(code) in names else '';x=number(r['longitude']);y=number(r['latitude']);loc=locate(x,y) if x is not None and y is not None else ''
 if decl:supply[decl]['pdc_tous_code_seul']+=1;supply[decl]['pdc_libres_code_seul']+=int(r['acces']=='Accès libre')
 assigned='';method=''
 if decl and loc==decl:assigned=decl;method='code_et_polygone_concordants'
 elif decl and (x is None or y is None):assigned=decl;method='code_seul_coordonnees_absentes'
 elif not decl and loc:assigned=loc;method='departement_spatial_sans_code_valide'
 elif decl and loc and decl!=loc:method='conflit_code_polygone_exclu'
 elif decl:method='code_valide_hors_polygones_exclu'
 else:method='aucun_rattachement_exploitable'
 methods[method]+=1
 if assigned:
  s=supply[assigned];s['pdc_tous']+=1;s['pdc_libres']+=int(r['acces']=='Accès libre');s['pdc_reserves']+=int(r['acces']=='Accès réservé');s['pdc_spatial_sans_code']+=int(method=='departement_spatial_sans_code_valide');s['pdc_sans_coordonnees']+=int(x is None or y is None)
 else:excluded[method]+=1
qc['points_rattaches']=sum(s['pdc_tous'] for s in supply.values());qc['points_exclus_geographie']=sum(excluded.values());assert qc['points_rattaches']+qc['points_exclus_geographie']==qc['points_cm1']
# SDES : table atomique, aucune ligne de total attendue ; vérifier les clés détaillées.
parc=collections.defaultdict(collections.Counter);seen=set();fuels=collections.Counter();statuses=collections.Counter();qc['lignes_sdes']=0
for r in read(ROOT/'work'/'parc_sdes.csv',delimiter=';'):
 qc['lignes_sdes']+=1
 if r['GROUPE']!='VP' or r['CATEGORIE']!='VP':continue
 qc['lignes_sdes_vp']+=1;k=tuple(r[c] for c in ['COMMUNE_CODE','CARBURANT','CRIT_AIR','STATUT_UTILISATEUR','GROUPE','CATEGORIE']);assert k not in seen,'Doublon clé détaillée SDES';seen.add(k)
 n=number(r['PARC_2026']);assert n is not None and n>=0,'Parc manquant ou négatif';c=r['COMMUNE_CODE'];d=dep(c);fuel=r['CARBURANT'];status=r['STATUT_UTILISATEUR'];fuels[fuel]+=1;statuses[status]+=1
 qc['vp_2026_total_fichier']+=n;qc['vp_electriques_total_fichier']+=n if fuel=='Electrique' else 0
 if d not in names:
  qc['vp_non_rattaches_departement']+=n;qc['vp_electriques_non_rattaches_departement']+=n if fuel=='Electrique' else 0;continue
 s=parc[d];s['vp_total']+=n
 if c.endswith('000'):s['vp_code_commune_fictif']+=n
 if fuel=='Electrique':s['vp_electriques']+=n;s['vp_electriques_particuliers']+=n if status=='Particulier' else 0
 if fuel in ('Essence HR','Diesel HR','Gaz HR'):s['vp_hybrides_rechargeables']+=n
assert all('total' not in v.lower() and 'ensemble' not in v.lower() for v in list(fuels)+list(statuses))
# Source départementale SDES issue d'une seule année ; une ligne par département.
source_rows=[dict(departement=d,nom=names[d],date_parc='2026-01-01',**{k:s[k] for k in ['vp_total','vp_electriques','vp_electriques_particuliers','vp_hybrides_rechargeables','vp_code_commune_fictif']}) for d,s in sorted(parc.items())]
with open(OUT/'parc_departements_2026.csv','w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(source_rows[0]));w.writeheader();w.writerows(source_rows)
rows=[]
for d,name in sorted(names.items()):
 p=parc.get(d);s=supply[d];metropole=len(d)==2;bev=p['vp_electriques'] if p else None;vp=p['vp_total'] if p else None
 row={'departement':d,'nom':name,'perimetre':'metropole' if metropole else 'outre_mer','date_parc':'2026-01-01','date_snapshot_irve':'2026-10-22','vp_total':vp,'vp_electriques':bev,'vp_electriques_particuliers':p['vp_electriques_particuliers'] if p else None,'vp_hybrides_rechargeables':p['vp_hybrides_rechargeables'] if p else None,'pdc_libres_recenses':s['pdc_libres'],'pdc_reserves_recenses':s['pdc_reserves'],'pdc_tous_rattaches':s['pdc_tous'],'pdc_attribues_spatialement_sans_code':s['pdc_spatial_sans_code'],'pdc_libres_code_seul':s['pdc_libres_code_seul'],'pdc_libres_pour_100_vp_electriques':100*s['pdc_libres']/bev if bev and metropole else None,'part_vp_electriques_pct':100*bev/vp if vp else None,'inclus_analyse_principale':bool(metropole and bev and s['pdc_libres']>0),'note':'Couverture IRVE ultramarine insuffisante au CM1 : ratio et test non publiés' if not metropole else 'Offre recensée, parc provisoire ; pas de mesure de besoin ni de disponibilité'}
 rows.append(row)
assert len(rows)==len(names) and len({r['departement'] for r in rows})==len(rows)
with open(OUT/'jointure_departements.csv','w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
qc['departements_contours']=len(names);qc['departements_avec_parc']=len(parc);qc['departements_jointure']=len(rows);qc['departements_analyse_principale']=sum(r['inclus_analyse_principale'] for r in rows);qc['vp_electriques_rattaches']=sum(p['vp_electriques'] for p in parc.values());qc['vp_electriques_jointure']=sum(r['vp_electriques'] or 0 for r in rows);assert qc['vp_electriques_jointure']==qc['vp_electriques_rattaches']
report={'controles':dict(qc),'methodes_rattachement_points':dict(methods),'motifs_exclusion_points':dict(excluded),'modalites_carburant_vp':dict(fuels),'modalites_statut_vp':dict(statuses),'departements_parc_absents':[d for d in names if d not in parc],'principale':'départements métropolitains avec VP électriques et points recensés en accès libre strictement positifs ; zéros exclus du test et du graphique logarithmique mais conservés en table','unite':'point de recharge pour IRVE ; voiture particulière électrique pour SDES ; département après agrégation séparée','cle':'code département texte ; 2A et 2B conservés','attention':'Le point dans polygone attribue seulement un département aux coordonnées disponibles, pas une commune. Contours simplifiés à 1 km ; conflits et hors polygones exclus. Pas une certification de localisation.'}
(OUT/'controles_jointure.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(report,ensure_ascii=False,indent=2),flush=True)
