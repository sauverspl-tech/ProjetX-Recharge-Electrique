"""CM2 : calcul reproductible avec la bibliothèque standard Python 3.10+.
Hypothèse et périmètre définis avant le calcul : H0 corrélation de rang nulle,
H1 bilatérale ; alpha 0,05 ; départements métropolitains, volumes positifs.
Usage depuis la racine : python cm2/analyse.py
"""
import pathlib,csv,json,random,math,statistics,html
ROOT=pathlib.Path(__file__).resolve().parent.parent;O=ROOT/'cm2'
with open(O/'jointure_departements.csv',encoding='utf-8-sig',newline='') as f:raw=list(csv.DictReader(f))
fields=['vp_total','vp_electriques','vp_electriques_particuliers','vp_hybrides_rechargeables','pdc_libres_recenses','pdc_reserves_recenses','pdc_tous_rattaches','pdc_attribues_spatialement_sans_code','pdc_libres_code_seul','pdc_libres_pour_100_vp_electriques','part_vp_electriques_pct']
for r in raw:
 for k in fields:r[k]=float(r[k]) if r[k] else None
 r['inclus_analyse_principale']=r['inclus_analyse_principale']=='True'
def ranks(values):
 order=sorted(range(len(values)),key=values.__getitem__);r=[0.]*len(values);i=0
 while i<len(order):
  j=i+1
  while j<len(order) and values[order[j]]==values[order[i]]:j+=1
  for k in order[i:j]:r[k]=(i+1+j)/2
  i=j
 return r
def spearman(x,y):return statistics.correlation(ranks(x),ranks(y))
assert ranks([3,1,1,2])==[4.,1.5,1.5,3.]
assert abs(spearman([1,2,3],[1,2,3])-1)<1e-12
assert abs(spearman([1,2,3],[3,2,1])+1)<1e-12
rows=[r for r in raw if r['inclus_analyse_principale']];assert len(rows)==96
x=[r['vp_electriques'] for r in rows];y=[r['pdc_libres_recenses'] for r in rows];rho=spearman(x,y)
rng=random.Random(20261022);a=ranks(x);b=ranks(y);ma=statistics.mean(a);mb=statistics.mean(b);a=[v-ma for v in a];b=[v-mb for v in b];den=math.sqrt(sum(v*v for v in a)*sum(v*v for v in b));extreme=0;B=9999
for _ in range(B):
 rng.shuffle(b);rp=sum(ai*bi for ai,bi in zip(a,b))/den;extreme+=int(abs(rp)>=abs(rho)-1e-12)
p=(extreme+1)/(B+1);ratios=[v/u*100 for u,v in zip(x,y)];R=sum(y)/sum(x)*100;quart=statistics.quantiles(ratios,n=4,method='inclusive')
result={'question':'Les départements avec davantage de voitures particulières électriques ont-ils davantage de points recensés en accès libre ?','H0':'corrélation de rang nulle','H1':'corrélation de rang différente de zéro, test bilatéral','alpha':.05,'test':'Spearman avec permutation Monte-Carlo des rangs','n':len(rows),'rho':rho,'permutations':B,'graine':20261022,'p_permutation_conditionnelle':p,'rho_sensibilite_code_seul':spearman(x,[r['pdc_libres_code_seul'] for r in rows]),'rho_sensibilite_tous_acces':spearman(x,[r['pdc_tous_rattaches'] for r in rows]),'vp_electriques_perimetre':sum(x),'pdc_libres_perimetre':sum(y),'ratio_agrege_pdc_100_ve':R,'ratio_median_departements':statistics.median(ratios),'ratio_q1':quart[0],'ratio_q3':quart[2],'ratio_min':min(ratios),'ratio_max':max(ratios),'lecture_inferentielle':'p indicative sous échangeabilité ; territoires presque exhaustifs et dépendance spatiale possible. Pas une preuve de causalité, de besoin ou de rentabilité. Taille et temporalités confondantes.','exemples':{r['departement']:{'nom':r['nom'],'ve':r['vp_electriques'],'pdc_libres':r['pdc_libres_recenses'],'ratio':r['pdc_libres_pour_100_vp_electriques']} for r in rows if r['departement'] in ['63','75','59','2A','2B']}}
(O/'resultats.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8');(O/'dashboard.json').write_text(json.dumps({'resultats':result,'territoires':raw},ensure_ascii=False,separators=(',',':')),encoding='utf8')
# Figure SVG autonome. Axes logarithmiques, aucune donnée privée ni service externe.
W,H=1120,760;left,right,top,bottom=110,1060,145,605;xmin,xmax=math.log10(min(x)*.7),math.log10(max(x)*1.3);ymin,ymax=math.log10(min(y)*.7),math.log10(max(y)*1.3)
def px(v):return left+(math.log10(v)-xmin)/(xmax-xmin)*(right-left)
def py(v):return bottom-(math.log10(v)-ymin)/(ymax-ymin)*(bottom-top)
def text(s,x,y,size=14,fill='#20384b',anchor='start',weight='normal'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{html.escape(str(s))}</text>'
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc"><title id="title">Volumes de voitures électriques et de points de recharge par département</title><desc id="desc">Nuage de 96 départements métropolitains, axes logarithmiques, association de rang positive.</desc><rect width="1120" height="760" fill="#f4f7fa"/><g font-family="Arial, sans-serif">',text('Les volumes de voitures électriques et de recharge sont associés',50,45,26,weight='bold'),text(f'96 départements métropolitains • Spearman ρ = {rho:.3f} • axes logarithmiques',50,78,17),f'<rect x="{left}" y="{top}" width="{right-left}" height="{bottom-top}" fill="white"/>']
for axis,lo,hi in [('x',xmin,xmax),('y',ymin,ymax)]:
 for power in range(math.floor(lo),math.ceil(hi)+1):
  for m in [1,2,5]:
   v=m*10**power
   if not lo<=math.log10(v)<=hi:continue
   label=f'{v:,.0f}'.replace(',',' ')
   if axis=='x':
    z=px(v);svg.extend([f'<line x1="{z}" y1="{top}" x2="{z}" y2="{bottom}" stroke="#e3eaee"/>',text(label,z,bottom+25,13,anchor='middle')])
   else:
    z=py(v);svg.extend([f'<line x1="{left}" y1="{z}" x2="{right}" y2="{z}" stroke="#e3eaee"/>',text(label,left-14,z+5,13,anchor='end')])
for r,u,v in zip(rows,x,y):
 xx,yy=px(u),py(v);svg.append(f'<circle cx="{xx:.2f}" cy="{yy:.2f}" r="5.2" fill="#167d8c" fill-opacity="0.8" stroke="white"><title>{html.escape(r["nom"])} : {u:.0f} VE ; {v:.0f} PDC libres</title></circle>')
 if r['departement'] in ['63','75','59','2A','2B']:svg.append(text(r['nom'],xx+8,yy-8,13))
svg.extend([f'<line x1="{left}" y1="{bottom}" x2="{right}" y2="{bottom}" stroke="#60798b"/>',f'<line x1="{left}" y1="{top}" x2="{left}" y2="{bottom}" stroke="#60798b"/>',text('Voitures particulières 100 % électriques au 01/01/2026',585,660,17,anchor='middle'),f'<text transform="translate(28 380) rotate(-90)" font-size="16" text-anchor="middle">Points recensés en accès libre au 22/10/2026</text>',text('Sources : SDES — parc 2026 provisoire ; PAN IRVE — snapshot du 22/10/2026 ; contours Etalab 2026.',50,706,13),text('Un point = un département. Association descriptive ; effet de taille, dates différentes et dépendance spatiale possibles.',50,731,13),'</g></svg>'])
(O/'graphique_offre_demande.svg').write_text(''.join(svg),encoding='utf8');print(json.dumps(result,ensure_ascii=False,indent=2),flush=True)
