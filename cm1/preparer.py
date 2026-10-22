"""Prépare les livrables CM1 depuis work/irve_brut.csv. Python standard uniquement.
Les fichiers produits sont des extractions dérivées, pas le fichier brut complet.
"""
import csv,json,gzip,collections,math,pathlib,datetime,hashlib
ROOT=pathlib.Path(__file__).resolve().parent.parent;D=ROOT/'data';D.mkdir(exist_ok=True,parents=True)
def num(x):
 try:
  v=float(str(x).replace(',','.'));return v if math.isfinite(v) else None
 except (ValueError,TypeError):return None
def dep(code):return code[:3] if code.startswith(('97','98')) else code[:2] if len(code)==5 else ''
def validxy(r):
 x=num(r.get('consolidated_longitude'));y=num(r.get('consolidated_latitude'))
 if x is None or y is None:
  try:x,y=map(float,json.loads(r.get('coordonneesXY','')))
  except (ValueError,TypeError):return None
 return (round(x,6),round(y,6)) if -180<=x<=180 and -90<=y<=90 and (x,y)!=(0,0) else None
q=collections.Counter();byid={};datecounts=collections.Counter();access=collections.Counter();dups=[]
with open(ROOT/'work'/'irve_brut.csv',encoding='utf-8-sig',newline='') as f:
 for i,r in enumerate(csv.DictReader(f)):
  q['lignes_brutes']+=1;key=r.get('id_pdc_itinerance','').strip()
  if not key:q['identifiants_pdc_absents']+=1;key='sans-id:'+str(i)
  if key in byid:
   q['doublons_id_pdc']+=1
   if r.get('date_maj','')<=byid[key].get('date_maj',''):continue
  byid[key]=r
points=[];groups=collections.defaultdict(list)
for pid,r in byid.items():
 xy=validxy(r);code=r.get('code_insee_commune','').strip();power=num(r.get('puissance_nominale'))
 if code.startswith('99'):q['points_code_commune_etranger_exclus']+=1;continue
 if r.get('consolidated_is_lon_lat_correct','').lower()=='false':q['points_indicateur_source_coordonnees_false']+=1
 if not xy:q['points_sans_coordonnees_valides']+=1
 if not code:q['points_sans_code_commune']+=1
 if power is None or power<=0 or power>2000:q['points_puissance_invalide_ou_absente']+=1;power=None
 sid=r.get('id_station_itinerance','').strip()
 if not sid:q['points_sans_id_station']+=1;sid='local:'+r.get('datagouv_resource_id','')+':'+r.get('id_station_local','') if r.get('id_station_local','') else 'pdc:'+pid
 date=r.get('date_maj','');datecounts[date[:4]]+=1;access[r.get('condition_acces','')]+=1
 plugs=[label for field,label in [('prise_type_ef','EF'),('prise_type_2','T2'),('prise_type_combo_ccs','CCS'),('prise_type_chademo','CHAdeMO'),('prise_type_autre','Autre')] if r.get(field,'').lower()=='true']
 p={'id_pdc':pid,'id_station':sid,'nom':r.get('nom_station',''),'operateur':r.get('nom_operateur',''),'enseigne':r.get('nom_enseigne',''),'adresse':r.get('adresse_station',''),'code_commune':code,'departement':dep(code),'longitude':xy[0] if xy else None,'latitude':xy[1] if xy else None,'puissance_kw':power,'prises':' / '.join(plugs),'acces':r.get('condition_acces',''),'horaires':r.get('horaires',''),'date_maj':date,'gratuit_declare':r.get('gratuit',''),'pmr':r.get('accessibilite_pmr',''),'statut_dedoublonnage':r.get('deduplication_status','')}
 points.append(p);groups[sid].append(p)
with gzip.open(D/'points_recharge.csv.gz','wt',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(points[0]));w.writeheader();w.writerows(points)
def mode(items):
 c=collections.Counter(x for x in items if x not in ('',None));return c.most_common(1)[0][0] if c else ''
stations=[]
for sid,ps in sorted(groups.items()):
 coords=[(p['longitude'],p['latitude']) for p in ps if p['longitude'] is not None];xy=mode(coords);flags=[]
 if len(set(coords))>1:q['stations_coordonnees_divergentes']+=1;flags.append('Coordonnées divergentes entre points : couple le plus fréquent retenu')
 codes=set(p['code_commune'] for p in ps if p['code_commune'])
 if len(codes)>1:q['stations_codes_commune_divergents']+=1;flags.append('Codes commune divergents')
 code=mode(p['code_commune'] for p in ps);powers=[p['puissance_kw'] for p in ps if p['puissance_kw'] is not None]
 accesses=sorted(set(p['acces'] or 'Non renseigné' for p in ps));names=sorted(set(p['nom'] for p in ps if p['nom']))
 stations.append([sid,mode(p['nom'] for p in ps) or 'Station sans nom',mode(p['operateur'] for p in ps),mode(p['enseigne'] for p in ps),mode(p['adresse'] for p in ps),code,dep(code),xy[0] if xy else None,xy[1] if xy else None,len(ps),max(powers) if powers else None,sorted(set(t for p in ps for t in p['prises'].split(' / ') if t)),accesses,mode(p['horaires'] for p in ps),max(p['date_maj'] for p in ps),'; '.join(flags)])
cols=['id','nom','operateur','enseigne','adresse','code_commune','departement','longitude','latitude','points','puissance_max_kw','prises','acces','horaires','date_maj','alerte']
# Structure compacte à colonnes documentées : même information sans répéter les clés 60 000 fois.
with open(D/'stations.json','w',encoding='utf8') as f:json.dump({'colonnes':cols,'stations':stations},f,ensure_ascii=False,separators=(',',':'))
with gzip.open(D/'stations.csv.gz','wt',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(cols);w.writerows([[(' / '.join(x) if isinstance(x,list) else x) for x in s] for s in stations])
q['points_retenus']=len(points);q['stations_retenues']=len(stations);q['stations_cartographiables']=sum(s[7] is not None for s in stations);q['stations_sans_coordonnees']=len(stations)-q['stations_cartographiables'];q['stations_avec_alerte']=sum(bool(s[15]) for s in stations)
assert sum(s[9] for s in stations)==len(points)
assert len(set(s[0] for s in stations))==len(stations)
summary={'controles':dict(q),'conditions_acces_points':dict(access),'annees_date_maj_points':dict(sorted(datecounts.items())),'points_par_departement':dict(sorted(collections.Counter(p['departement'] or 'inconnu' for p in points).items())),'stations_par_departement':dict(sorted(collections.Counter(s[6] or 'inconnu' for s in stations).items())),'source':'source_irve.json','regles':'Une ligne retenue par id_pdc_itinerance ; doublon : date_maj la plus récente, première ligne en cas égalité. Sans id : conservation distincte, incertitude signalée. Stations regroupées par id_station_itinerance, sinon clé locale préfixée par ressource, sinon PDC. Coordonnées modales ; aucun centre de commune inventé. Puissances <=0 ou >2000 kW écartées du maximum, points conservés. Aucune somme du champ nbre_pdc.'}
(D/'qualite.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(summary,ensure_ascii=False,indent=2),flush=True)
print('tailles',[(p.name,p.stat().st_size) for p in D.iterdir()],flush=True)
