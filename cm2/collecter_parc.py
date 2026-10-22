"""Collecte SDES, snapshot conservé localement. Bibliothèque standard Python.
Usage : python cm2/collecter_parc.py. Ne pas actualiser silencieusement un rendu.
"""
import pathlib,urllib.request,hashlib,datetime,json
try:
 from pip._vendor import truststore
 truststore.inject_into_ssl()
except ImportError:pass
ROOT=pathlib.Path(__file__).resolve().parent.parent
URL='https://data.statistiques.developpement-durable.gouv.fr/dido/api/v1/datafiles/1582861b-e042-4490-9161-6429d8229703/csv'
def main():
 target=ROOT/'work'/'parc_sdes.csv';target.parent.mkdir(exist_ok=True,parents=True);sha=hashlib.sha256();size=0
 with urllib.request.urlopen(urllib.request.Request(URL,headers={'User-Agent':'Projet-MAE/1.0'}),timeout=180) as r,open(target,'wb') as f:
  final=r.url;headers=dict(r.headers)
  while True:
   b=r.read(1024*1024)
   if not b:break
   f.write(b);sha.update(b);size+=len(b)
 (ROOT/'cm2'/'source_parc.json').write_text(json.dumps({'producteur':'SDES, RSVERO','url':URL,'url_catalogue':'https://www.data.gouv.fr/datasets/parc-de-vehicules-routiers','url_resolue':final,'date_recuperation':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sha256':sha.hexdigest(),'octets':size,'derniere_modification_http':headers.get('Last-Modified'),'licence':'Licence Ouverte 2.0','rythme':'annuel, données révisables','unite':'parc estimé par commune, année, motorisation, vignette, statut et genre'},ensure_ascii=False,indent=2),encoding='utf8')
 print('Téléchargement terminé',size,sha.hexdigest(),flush=True)
if __name__=='__main__':main()
