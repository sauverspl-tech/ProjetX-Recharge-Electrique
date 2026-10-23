# CM3 — Un service utile : utilisateur, valeur, audience

**Pour un chargé d’étude de déploiement de bornes, Recharge France compare en quelques secondes les points de recharge recensés par voiture électrique d’un département au repère métropolitain, afin de préparer une étude locale.**

Consignes consultées le 23 octobre 2026 : https://mae.iae-mod.fr/seances/seance-cm-3.html (version publiée « Un service utile »).

## Ce qui est réalisé
- Proposition de valeur et public cible définis ; service distinct d’un outil de navigation en temps réel.
- [Écran interactif](index.html) : un département, un graphique et une phrase de lecture ; export du résultat et lien vers la sélection.
- [Données agrégées](donnees.json) reprises du CM2, sources et limites visibles dans l’interface.
- [Protocole de cinq premiers tests](protocole_tests.md), [grille de retours](retours_tests.csv), [modèle d’issue](modele_issue.md) et [message de recrutement prêt à adapter](message_test.md).
- [Relevé initial d’audience](suivi_audience.csv) et [plan de mesure](plan_mesure.md).
- [Vérifications techniques](validation_technique.md) et [publication préparée](publication.md).

## Visualiser
Sur le PC où le serveur local est lancé : http://127.0.0.1:8767/cm3/index.html?departement=63

Sinon télécharger et extraire le dépôt, démarrer un serveur local à sa racine (voir README principal), puis ouvrir /cm3/index.html. GitHub affiche le code du HTML ; aucun site public n’est encore publié.

Exemple Puy-de-Dôme : 1 520 points en accès libre / 13 412 voitures électriques × 100 = **11,3**, contre **10,8** sur les 96 départements métropolitains. Ce n’est pas une preuve de suffisance ou de rentabilité.

## Choix et limites
Le CM2 conserve l’analyse détaillée ; le CM3 donne une réponse directement lisible pour préparer une étude. Les 109 territoires restent sélectionnables, mais les 13 hors du périmètre comparable n’affichent pas de ratio comparatif. Les points IRVE sont recensés au 22 octobre 2026 et le parc SDES au 1er janvier 2026. Seuls les VP entièrement électriques entrent dans le dénominateur. Les exclusions géographiques et le défaut de couverture de certaines zones restent ceux du CM2.

## Ce qui reste à faire réellement
1. Faire valider le public et l’écran par l’enseignant.
2. Autoriser puis effectuer la publication d’une vitrine séparée, le dépôt de travail restant privé.
3. Recruter cinq personnes, observer leurs essais et renseigner la grille : **aucun test humain réalisé à ce stade**.
4. Publier le message uniquement dans un espace autorisé, puis traiter les retours et refaire les relevés aux séances suivantes.

Au 23 octobre : 0 étoile, 0 fork, 0 issue ouverte et 0 fermée sur le dépôt de travail. Traffic est indisponible avec l’offre actuelle pour ce dépôt privé : valeurs manquantes, pas zéros. Les visites du prototype ne sont pas mesurées. Ne pas présenter les contrôles de Codex comme une validation par des utilisateurs.
