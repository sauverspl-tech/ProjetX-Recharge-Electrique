# CM3 — Un service utile : utilisateur, valeur, audience

**Pour un chargé d’étude de déploiement de bornes, Recharge France compare en quelques secondes les points de recharge recensés par voiture électrique d’un département au repère métropolitain, afin de préparer une étude locale.**

Consignes consultées le 23 octobre 2026 : https://mae.iae-mod.fr/seances/seance-cm-3.html (version publiée « Un service utile »).

## Ce qui est réalisé
- Proposition de valeur et public cible définis ; service distinct d’un outil de navigation en temps réel. Question utilisateur : « Comment mon département se situe-t-il, et que dois-je vérifier avant une étude locale ? »
- [Écran interactif](index.html) : un département, un graphique, une carte des sites et une phrase de lecture ; export du résultat, lien vers la sélection et trois étapes concrètes pour préparer une étude locale.
- [Données agrégées](donnees.json) reprises du CM2, sources et limites visibles dans l’interface.
- [Protocole de cinq premiers tests](protocole_tests.md), [grille de retours](retours_tests.csv), [modèle d’issue](modele_issue.md) et [message de recrutement prêt à adapter](message_test.md).
- [Relevé initial d’audience](suivi_audience.csv) et [plan de mesure](plan_mesure.md).
- [Vérifications techniques](validation_technique.md) et [publication préparée](publication.md).

## Visualiser
Sur le PC où le serveur local est lancé : http://127.0.0.1:8767/cm3/index.html?departement=63

Sinon télécharger et extraire le dépôt, démarrer un serveur local à sa racine (voir README principal), puis ouvrir /cm3/index.html. GitHub affiche le code du HTML ; le [comparateur publié](https://sauverspl-tech.github.io/ProjetX-Recharge-Electrique/) est accessible sans téléchargement.

Exemple Puy-de-Dôme : 1 520 points en accès libre / 13 412 voitures électriques × 100 = **11,3**, contre **10,8** sur les 96 départements métropolitains. Ce n’est pas une preuve de suffisance ou de rentabilité.

## Choix et limites
Le CM2 conserve l’analyse détaillée ; le CM3 donne une réponse directement lisible pour préparer une étude. Les 109 territoires restent sélectionnables, mais les 13 hors du périmètre comparable n’affichent pas de ratio comparatif. Les points IRVE sont recensés au 22 octobre 2026 et le parc SDES au 1er janvier 2026. Seuls les VP entièrement électriques entrent dans le dénominateur. Les exclusions géographiques et le défaut de couverture de certaines zones restent ceux du CM2.

## Ce qui reste à faire réellement
1. Faire valider le public et l’écran par l’enseignant.
2. Publication réalisée : [GitHub Pages](https://sauverspl-tech.github.io/ProjetX-Recharge-Electrique/), vérifié dans le navigateur après activation et relance du déploiement.
3. Recruter cinq personnes, observer leurs essais et renseigner la grille : **aucun test humain réalisé à ce stade**.
4. Publier le message uniquement dans un espace autorisé, puis traiter les retours et refaire les relevés aux séances suivantes.

Au 23 octobre : 0 étoile, 0 fork, 0 issue ouverte et 0 fermée sur le dépôt de travail. Le relevé historique concernait un dépôt privé. Le dépôt est maintenant public : Traffic doit être revérifié avec un compte disposant des droits nécessaires ; les valeurs inconnues restent manquantes, pas zéros. Les visites du prototype ne sont pas mesurées. Ne pas présenter les contrôles de Codex comme une validation par des utilisateurs.


## Carte départementale des sites de recharge

La sélection d’un département affiche son contour et les sites de recharge recensés en accès libre. Les points sont regroupés par identifiant de station ; les stations aux mêmes coordonnées à cinq décimales sont réunies sur un seul repère. Le nombre inscrit et l’infobulle indiquent le total des points de recharge. Un clic (ou toucher) affiche l’adresse et les opérateurs. Aucun regroupement par rayon n’est appliqué aux sites voisins.

Puy-de-Dôme : **333 sites cartographiés, 1 520 points de recharge**. Exemple vérifié : LFR4102EVCP05 à Lempdes, **10 points sur un seul repère**. Gironde : 990 sites et 5 852 points. Les 109 territoires conservent le périmètre et les règles de rattachement du CM2. Quatre points de la base rattachée n’ont pas de coordonnées : ils restent dans les totaux sans être inventés sur la carte.

La carte ne certifie pas l’emprise physique d’un parking : deux stations proches avec des coordonnées différentes peuvent rester deux repères. Les nombres indiquent des points recensés, pas des places disponibles en temps réel. La géographie simplifiée et la couverture inégale restent des limites.

Reproduire : `python3 scripts/preparer_carte.py`, puis `python3 scripts/preparer_pages.py`. La génération contrôle que chaque total départemental est identique au CM2. Les fonds OpenStreetMap et Leaflet nécessitent une connexion ; une erreur cartographique ne bloque pas le comparateur.


## Disponibilités déclarées en temps réel

La carte interroge directement le [flux national IRVE dynamique du PAN](https://proxy.transport.data.gouv.fr/resource/consolidation-nationale-irve-dynamique), sans clé API ni serveur intermédiaire, toutes les 60 secondes tant que l’onglet est visible et le suivi activé. Le flux est en bêta, non validé et non dédoublonné par le producteur. La source est décrite dans le [jeu de données national](https://www.data.gouv.fr/datasets/beta-bases-nationales-des-points-de-recharge-pour-vehicules-electriques-en-france-irve).

La liaison se fait par identifiant de point `id_pdc_itinerance` exactement égal à l’identifiant conservé dans le snapshot statique. Chaque repère conserve le total recensé ; le compteur affiche « disponibles confirmés / total ». Le filtre garde les sites ayant au moins un point disponible confirmé. Les fiches distinguent disponibles, occupés, hors service, réservés et inconnus, avec horodatages.

Règles : ne retenir que les horodatages avec fuseau explicite de moins de 15 minutes (tolérance de deux minutes pour une horloge en avance) ; retenir la version la plus récente d’un identifiant ; un doublon contradictoire à même date devient inconnu. `hors_service` prime toujours sur `libre`. Une panne du flux, un arrêt du suivi ou un cache trop ancien remettent les statuts à inconnu. Les états n’ont aucune incidence sur les ratios historiques du CM2.

La couverture est partielle : l’absence de statut ne signifie ni occupation ni panne. Le seuil de 15 minutes est un choix prudent du prototype, pas une garantie de fraîcheur d’un opérateur. Un état trop ancien peut encore être exact, mais n’est pas annoncé comme actuel. Le flux complet représente environ 9 Mo non compressés par consultation ; les téléchargements périodiques sont suspendus quand l’onglet est masqué. Aucun historique dynamique n’est publié dans le dépôt.

Tests : `node tests/temps_reel.test.cjs`. Le jeu de tests utilise uniquement des exemples synthétiques pour les règles ; l’écran de production affiche exclusivement le flux officiel.
