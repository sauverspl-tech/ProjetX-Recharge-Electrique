"""Carte CM3 : mêmes règles géographiques et même périmètre d'accès que le CM2."""
from pathlib import Path
import collections,csv,gzip,json,math,unicodedata
ROOT=Path(__file__).resolve().parents[1]
# Réutiliser strictement les fonctions géographiques du CM2, sans exécuter son analyse SDES.
source=(ROOT/'cm2/preparer_jointure.py').read_text()
namespace={'__file__':str(ROOT/'cm2/preparer_jointure.py')}
exec(compile(source[:source.index('qc=collections.Counter();supply=')],str(ROOT/'cm2/preparer_jointure.py'),'exec'),namespace)
locate,number,names=namespace['locate'],namespace['number'],namespace['names']
stations=collections.defaultdict(lambda: {'points':0,'coords':collections.Counter(),'noms':collections.Counter(),'adresses':collections.Counter(),'operateurs':set()})
missing=collections.Counter();totals=collections.Counter()
with gzip.open(ROOT/'data/points_recharge.csv.gz','rt',encoding='utf-8-sig',newline='') as f:
 for row in csv.DictReader(f):
  if row['acces']!='Accès libre':continue
  c=row['code_commune'];decl=namespace['dep'](c) if len(c)==5 and namespace['dep'](c) in names else ''
  x,y=number(row['longitude']),number(row['latitude']);loc=locate(x,y) if x is not None and y is not None else ''
  assigned=decl if decl and (loc==decl or x is None or y is None) else loc if not decl and loc else ''
  if not assigned:continue
  totals[assigned]+=1
  if x is None or y is None:missing[assigned]+=1;continue
  s=stations[(assigned,row['id_station'])];s['points']+=1;s['coords'][(x,y)]+=1;s['noms'][row['nom']]+=1;s['adresses'][row['adresse']]+=1
  if row['operateur']:s['operateurs'].add(row['operateur'])
# Une station = une position représentative observée (la plus fréquente).
# Fusion supplémentaire des positions identiques à 5 décimales, pas de rayon de proximité.
sites={};multi_coords=0
for (dep,station_id),s in sorted(stations.items()):
 (x,y),_=s['coords'].most_common(1)[0];key=(dep,round(x,5),round(y,5))
 if len(s['coords'])>1:multi_coords+=1
 if key not in sites:sites[key]={'points':0,'noms':set(),'adresses':set(),'operateurs':set(),'stations':0,'coord_multiples':False}
 out=sites[key];out['points']+=s['points'];out['stations']+=1;out['noms'].add(s['noms'].most_common(1)[0][0]);out['adresses'].add(s['adresses'].most_common(1)[0][0]);out['operateurs'].update(s['operateurs']);out['coord_multiples']|=len(s['coords'])>1
territoires={code:{'sites':[],'points_sans_coordonnees':missing[code],'points_recenses':totals[code]} for code in names}
for (dep,x,y),s in sorted(sites.items()):
 territoires[dep]['sites'].append({'lon':x,'lat':y,'points':s['points'],'nom':' / '.join(sorted(s['noms'])),'adresse':' / '.join(sorted(a for a in s['adresses'] if a)),'operateur':' / '.join(sorted(s['operateurs'])),'stations':s['stations'],'coord_multiples':s['coord_multiples']})
with (ROOT/'cm2/jointure_departements.csv').open(encoding='utf-8-sig',newline='') as f:
 for row in csv.DictReader(f):
  code=row['departement'];t=territoires[code]
  assert t['points_recenses']==int(row['pdc_libres_recenses']),('Périmètre différent du CM2',code)
  assert sum(s['points'] for s in t['sites'])+t['points_sans_coordonnees']==t['points_recenses'],code
out={'date_irve':'2026-10-22','perimetre':'Points en accès libre, règles de rattachement CM2','regroupement':'Une position par identifiant de station, puis fusion des coordonnées identiques à 5 décimales. Pas de regroupement automatique des sites voisins.','contours':namespace['geo'],'territoires':territoires}
(ROOT/'cm3/carte.json').write_text(json.dumps(out,ensure_ascii=False,separators=(',',':')))
print(json.dumps({'sites':len(sites),'stations':len(stations),'stations_positions_multiples':multi_coords,'points_cartographies':sum(s['points'] for s in sites.values()),'points_sans_coordonnees':sum(missing.values()),'puy_de_dome':{'sites':len(territoires['63']['sites']),'points':territoires['63']['points_recenses']},'octets':(ROOT/'cm3/carte.json').stat().st_size},ensure_ascii=False))
