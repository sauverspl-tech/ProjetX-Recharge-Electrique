# CM1 — Le marché de la recharge électrique en France

Travail préparé le 22 octobre 2026. **Nouveau sujet à faire valider par l’enseignant** ; la validation du marché des bars ne vaut pas validation de celui-ci. Le projet des bars reste séparé dans [ProjetX](https://github.com/sauverspl-tech/ProjetX). Groupe à confirmer, sans présumer d’une nouvelle validation ni d’invitations GitHub.

## 1. Marché et question de décision

**Marché : exploitation de stations de recharge pour véhicules électriques accessibles au public, en France entière.** La base inclut aussi des accès réservés : ils sont distingués par filtre et ne doivent pas être assimilés à de la recharge libre. La recharge privée à domicile ne constitue pas une offre concurrente recensée ici.

**Question directrice proposée : quels territoires français mériteraient une étude complémentaire pour développer une offre de recharge accessible au public, au regard de l’offre observée et de la demande potentielle ?**

Le CM1 établit l’état initial de l’offre ; il ne classe pas encore les opportunités. La couverture nationale permettra une présélection, puis un examen local. Le parc automobile électrique sera une approximation de demande potentielle, jamais une mesure directe de fréquentation ou de besoin de recharge publique.

### Code d’activité : préciser la nomenclature

La NAF 2025 identifie **35.15G — Exploitation d’installations de recharge pour véhicules électriques** ([Insee](https://www.insee.fr/fr/metadonnees/naf2025/sousClasse/35.15G)). Les nouveaux codes APE s’appliquent seulement au **1er janvier 2027** ([calendrier Insee](https://www.insee.fr/fr/information/6790269?question=quand-le-code-ape-en-nouvelle-naf-entrera-en-vigueur)). En octobre 2026, la NAF rév. 2 reste applicable ; **35.14Z — Commerce d’électricité** est un repère sectoriel large, pas un filtre suffisant pour isoler les bornes ([définition](https://www.insee.fr/fr/metadonnees/nafr2/sousClasse/35.14z)).

Nous sélectionnons donc les installations par la **base IRVE**, et non tous les établissements d’un code APE. L’installation électrique (43.21A en NAF rév. 2) est une activité différente de l’exploitation ; elle ne définit pas notre périmètre.

## 2. Sources réellement récupérées

| Source | Producteur / nature pour le groupe | Rythme, unité et clé | Utilisation |
|---|---|---|---|
| [Base nationale IRVE statique](https://www.data.gouv.fr/datasets/beta-bases-nationales-des-points-de-recharge-pour-vehicules-electriques-en-france-irve) | PAN transport.data.gouv.fr, consolidation des déclarations des opérateurs ; source secondaire | Actualisation nocturne ; une ligne par point de recharge ; id_pdc_itinerance, regroupement par id_station_itinerance | Localisation, nom, opérateur, puissance, prises, accès, horaires, date de mise à jour |
| [Contours départementaux 2026](https://etalab-datasets.geo.data.gouv.fr/contours-administratifs/2026/geojson/departements-1000m.geojson) | Etalab ; source secondaire | Millésime 2026, simplification 1 000 m ; un département ; code | Fond et noms des départements, aucune mesure de demande |

Le fichier IRVE brut de **126 754 972 octets** a été téléchargé le **22/10/2026 à 14:13 UTC**. Son URL résolue, son empreinte SHA-256 et sa date de récupération sont dans [source_irve.json](../data/source_irve.json). L’URL de ressource désigne une consolidation évolutive : un téléchargement ultérieur peut donner un autre contenu. Les dates déclarées par les producteurs sont distinctes de la date du téléchargement. Les contours proviennent du fichier déjà collecté le 16 octobre, réutilisé sans modification.

La base est en version bêta et en transition depuis l’ancienne consolidation : ne pas additionner les deux bases. La licence des données est la **Licence Ouverte 2.0**. Les extractions ne republient pas les contacts personnels, les téléphones, les numéros de raccordement ni les identifiants de livraison.

### Source repérée pour plus tard, pas encore utilisée

[Parc automobile du SDES au 1er janvier 2026](https://www.statistiques.developpement-durable.gouv.fr/donnees-sur-le-parc-automobile-francais-au-1er-janvier-2026) : volumes par territoire et motorisation. Il reste à télécharger et contrôler cette source à la maille choisie. Aucune jointure offre/demande et aucun test CM2 ne sont présentés comme déjà faits.

## 3. Carte nationale et données disponibles

[Carte interactive](index.html) : recherche par nom, adresse, enseigne, opérateur ou code commune ; filtres département, accès et puissance maximale ; métropole et boutons outre-mer ; groupes de stations à petite échelle ; fiches détaillées et liste paginée.

- **53 349 stations** regroupant **177 464 points de recharge** retenus.
- **53 346 stations cartographiables** ; **3 sans coordonnées** restent comptées.
- **155 458 points déclarés en accès libre** et **22 006 en accès réservé**, dans cet extrait.
- Le compteur de points après filtrage de stations porte sur **tous leurs points**, pas seulement les points satisfaisant la puissance maximale ou une modalité d’accès.

Une station est un regroupement identifié, pas nécessairement une adresse physique unique. Un point de recharge peut proposer plusieurs types de prises : ne pas compter chaque prise comme un point supplémentaire. La puissance maximale d’une station ne garantit ni la puissance simultanée ni la puissance reçue par un véhicule. L’indisponibilité ou l’occupation en temps réel ne sont pas connues.

## 4. Contrôles et règles de préparation

1. **177 570 lignes brutes** ; **2 doublons d’identifiant point** retirés en conservant la date_maj la plus récente (première ligne en cas d’égalité). **104 points explicitement codés à l’étranger (code commune 99…)** écartés du périmètre. Résultat : 177 464 points.
2. Regroupement par identifiant de station ; aucun total n’est obtenu en additionnant le champ nbre_pdc répété sur chaque ligne. Vérification : la somme des points des stations égale exactement l’effectif des points retenus.
3. Coordonnées consolidées privilégiées, contrôle des bornes longitude/latitude et exclusion de (0,0). **4 points sans coordonnées valides**. Aucun centre de commune n’est ajouté. Un indicateur source « consolidated_is_lon_lat_correct = false » apparaît sur **26 953 points** alors que des couples consolidés sont présents : il est dénombré, mais n’est pas interprété à lui seul comme une coordonnée inutilisable. Une validation géographique approfondie reste nécessaire avant une analyse fine.
4. **50 259 points sans code commune**, soit une lacune importante pour la future jointure. Les stations sans rattachement connu restent sur la carte via leurs coordonnées et ne figurent pas dans un filtre département précis. Aucun code n’est deviné à partir du nom ou du code postal.
5. **286 stations avec couples de coordonnées divergents** ; le couple le plus fréquent est retenu pour la carte, sans moyenner des localisations. **84 stations avec codes commune divergents**. **329 stations portent au moins une de ces alertes** ; les deux catégories se recoupent.
6. **2 704 puissances manquantes ou écartées du maximum** : valeurs non numériques, <=0 ou >2 000 kW. Les points restent dans les effectifs. La règle est un contrôle de plausibilité déclaré, pas une certification technique.

Les détails sont dans [qualite.json](../data/qualite.json). Les coordonnées n’ont pas été vérifiées exhaustivement par rapport aux frontières ou sur le terrain ; le champ national repose sur la base et l’exclusion des codes étrangers explicites. Une absence de code ou une erreur de coordonnées peut encore affecter la couverture.

## 5. Limites et prochaines étapes

**On peut affirmer :** ce snapshot contient les effectifs et caractéristiques déclarées décrits ci-dessus, selon nos règles explicites.

**On peut explorer :** répartition spatiale de l’offre recensée, types d’accès et de prises, puissances déclarées.

**On ne peut pas conclure :** un territoire est sous-équipé, une station est rentable, une borne fonctionne ou est libre, ou l’ensemble de l’offre française est couvert. La couverture outre-mer est très faible dans cet extrait : les vues vides ne sont pas des preuves d’absence de bornes. Les codes commune manquants affectent fortement toute comparaison territoriale.

Suite à soumettre au groupe et à l’enseignant : valider le marché ; contrôler le rattachement communal et les incohérences ; récupérer le parc automobile SDES avec ses millésimes et clés ; choisir ensuite une maille commune pour le CM2. Pour une décision d’implantation, il manquera notamment les recharges privées, les flux de passage, les usages, les tarifs fiables, les coûts de raccordement, le foncier et la rentabilité. Aucune donnée interne de Valeo n’est utilisée.

## 6. Reproduire et consulter

Depuis la racine du dépôt : lancer `python -m http.server 8767 --bind 127.0.0.1` et ouvrir http://127.0.0.1:8767/cm1/index.html. Le fichier HTML seul, ouvert par double clic, ne suffit pas toujours à charger les données.

Pour une nouvelle collecte : `python cm1/collecter.py` puis `python cm1/preparer.py`. Python standard ; sur Windows, le script peut utiliser le magasin de certificats via le module truststore de pip s’il est disponible, sans désactiver la vérification TLS. Préserver les fichiers et leurs empreintes avant une actualisation.

Le brut reste dans work/ sur le PC, exclu du dépôt pour son poids. Le dépôt contient les extractions compressées point par point et station par station, la table cartographique, les contrôles, les scripts et la traçabilité. Les fichiers dérivés sont un snapshot conservé ; un nouveau téléchargement de la source pourra évoluer.

[Accueil du projet](../README.md) · [Documentation des données](../data/README.md) · [Consignes CM1](https://mae.iae-mod.fr/seances/seance-cm-1.html).
