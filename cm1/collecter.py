"""Télécharge le snapshot national IRVE statique du PAN (source publique).
Usage : python cm1/collecter.py. Bibliothèque standard, Python 3.10+.
"""
import urllib.request,pathlib,json,hashlib,datetime
# Optionnel : sur Windows, pip utilise le magasin de certificats du système.
try:
 from pip._vendor import truststore
 truststore.inject_into_ssl()
except ImportError:
 pass
ROOT=pathlib.Path(__file__).resolve().parent.parent
URL='https://www.data.gouv.fr/api/1/datasets/r/4ca78c71-4ea4-475d-bd3a-d4aef88f7bf8'
def collect():
 target=ROOT/'work'/'irve_brut.csv';target.parent.mkdir(exist_ok=True,parents=True)
 req=urllib.request.Request(URL,headers={'User-Agent':'Projet-MAE-IRVE/1.0'})
 h=hashlib.sha256();size=0
 with urllib.request.urlopen(req,timeout=180) as r,open(target,'wb') as f:
  final=r.url;headers=dict(r.headers)
  while True:
   chunk=r.read(1024*1024)
   if not chunk:break
   f.write(chunk);h.update(chunk);size+=len(chunk)
 meta={'source_url':URL,'resolved_url':final,'retrieved_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sha256':h.hexdigest(),'bytes':size,'last_modified_http':headers.get('Last-Modified'),'licence':'Licence Ouverte 2.0','producteur':'Point Accès National transport.data.gouv.fr ; déclarations opérateurs consolidées','rythme':'consolidation statique nocturne','unite':'point de recharge, pas connecteur ni station','cle':'id_pdc_itinerance','page':'https://www.data.gouv.fr/datasets/beta-bases-nationales-des-points-de-recharge-pour-vehicules-electriques-en-france-irve'}
 (ROOT/'data'/'source_irve.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(meta,ensure_ascii=False),flush=True)
if __name__=='__main__':collect()
