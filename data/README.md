# Données du projet Recharge France — CM1

Tous ces fichiers sont propres au projet recharge ; aucune dépendance au dépôt des bars.

| Fichier | Contenu |
|---|---|
| stations.json | Table cartographique compacte : objet colonnes + tableau stations, une ligne par station identifiée. Les colonnes indiquent l’ordre des valeurs. |
| stations.csv.gz | Même regroupement de stations au format CSV compressé gzip ; décompresser avant ouverture dans Excel. |
| points_recharge.csv.gz | Extraction point par point après dédoublonnage et exclusion des codes explicitement étrangers ; unités, identifiants et caractéristiques conservés. |
| qualite.json | Effectifs de contrôle, restrictions d’accès, ancienneté déclarée et rattachement départemental disponible. |
| source_irve.json | Source du fichier brut, URL résolue, date de récupération, taille et empreinte SHA-256. |
| sources.json | Sources utilisées et source SDES seulement repérée pour la suite. |
| departements.geojson | Contours Etalab 2026, simplification 1 000 mètres. |
| empreintes.json | SHA-256 des fichiers livrés pour vérifier leur intégrité. |

## Dictionnaire

- id / id_station : identifiant de station, clé de regroupement. id_pdc : identifiant de point de recharge.
- nom, enseigne, operateur, adresse : libellés déclarés. Ils ne prouvent pas une ouverture commerciale effective.
- code_commune : code Insee déclaré, conservé en texte. Les vides restent vides. departement est dérivé du code connu, sans imputation.
- longitude, latitude : coordonnées consolidées, sinon coordonnées source exploitables. Une station retient le couple modal. Une valeur nulle reste manquante.
- points : nombre de points retenus dans la station, pas nombre de prises ou de véhicules effectivement rechargeables au moment de la consultation.
- puissance_kw : puissance nominale déclarée d’un point ; puissance_max_kw : maximum des valeurs retenues dans la station, en kW. Ce n’est pas une somme.
- prises : EF, T2, CCS, CHAdeMO, Autre ; plusieurs prises peuvent correspondre au même point.
- acces : conditions déclarées ; une station peut présenter plusieurs modalités selon ses points.
- horaires : mode des horaires renseignés dans la station ; vérifier auprès de l’opérateur.
- date_maj : date déclarée du point, ou date la plus récente dans la station ; elle ne garantit pas la fraîcheur de tous ses points.
- alerte : divergences de coordonnées ou de codes commune entre points d’une même station.
- gratuit_declare / pmr : champs conservés au niveau point ; non validés indépendamment.

Les contacts, téléphones et identifiants de raccordement du brut ne sont pas republiés. Le brut complet de 126,8 Mo reste dans work/ sur le PC ; son téléchargement est reproductible mais la source en ligne est évolutive. Aucun fichier de demande automobile n’a encore été intégré.

Licence des données sources : Licence Ouverte 2.0. Crédits PAN transport.data.gouv.fr et déclarants IRVE ; Etalab. Voir [la méthode complète](../cm1/README.md).
