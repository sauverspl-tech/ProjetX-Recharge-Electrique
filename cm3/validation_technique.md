# Vérifications techniques — 23 octobre 2026

Contrôles réalisés dans le navigateur sur le prototype local :
- Accueil sans sélection : invitation à choisir, aucun résultat inventé.
- Lien direct Puy-de-Dôme : sélection restaurée, 11,3 contre 10,8, calcul 1 520 / 13 412 affiché.
- Gironde : 15,3 contre 10,8 ; 5 852 / 38 205 et lecture « supérieur ».
- Hauts-de-Seine : 4,5 contre 10,8, lecture « inférieur ».
- Guadeloupe : comparaison indisponible, aucun zéro substitué à une valeur manquante.
- Changement de département : paramètre du lien mis à jour.
- Export CSV téléchargé et contenu vérifié : encodage UTF-8 avec BOM, huit colonnes et dates des sources conservées.

Ces contrôles vérifient le fonctionnement technique. Ils ne remplacent pas les cinq observations humaines prévues. Aucun test mobile réel ni mesure d’utilisabilité n’est revendiqué.


## Nouvelle vérification de la version corrigée — 23 octobre, 14 h 14 (Europe/Paris)

Contrôles effectués dans le navigateur sur les fichiers préparés pour GitHub Pages :

- Accueil : 109 territoires chargés, aucun département choisi automatiquement.
- Sélection Gironde : 15,3 contre 10,8 ; phrase « supérieur » et calcul 5 852 / 38 205 affichés.
- Guadeloupe : comparaison indisponible ; ratio et actions d’export masqués.
- Lien direct `?departement=63` : Puy-de-Dôme restauré, 11,3 contre 10,8.
- Export déclenché : confirmation de l’export affichée ; le contenu CSV n’a pas été relu pendant cette nouvelle vérification.
- Section d’aide : trois étapes d’étude locale présentes et limites conservées.
- Canal de retour : lien vers le nouveau formulaire GitHub, avec mention du compte nécessaire et possibilité de retour direct au conducteur du test.
- Préparation de publication : seulement quatre fichiers publics ; 109 codes uniques et 96 territoires comparables contrôlés.

Le formulaire distant et le workflow ne pourront être testés qu’après envoi des modifications. Aucun test mobile réel ni test humain indépendant n’a été effectué. La publication a ensuite été réalisée après activation de Pages par le propriétaire.

## Vérification du site public

Adresse vérifiée : https://sauverspl-tech.github.io/ProjetX-Recharge-Electrique/

Le site charge les 109 territoires sans compte. La sélection Gironde affiche 15,3 points pour 100 voitures électriques contre 10,8 en métropole, avec calcul et phrase « supérieur ». Les étapes d’étude locale sont présentes. Le déploiement a été relancé après activation de Pages ; les tests humains et la diffusion auprès du public cible restent à réaliser.


## Carte départementale — vérifications de la nouvelle version

- Génération : 35 759 sites, issus de 46 301 identifiants de stations en accès libre avec coordonnées exploitables. 151 145 points cartographiés, 4 sans coordonnées.
- Conservation des effectifs : pour chacun des 109 territoires, somme des points des sites + points sans coordonnées = effectif en accès libre de la jointure CM2.
- Puy-de-Dôme : 333 repères pour 1 520 points ; un seul repère LFR4102EVCP05 affiche 10 points dans l’infobulle et la fiche, avec opérateur Lidl France et adresse à Lempdes.
- Changement vers la Gironde : ancien contour et anciens repères retirés ; 990 sites, 5 852 points.
- Retour à la sélection vide : carte et résultat masqués. Retour au Puy-de-Dôme : données restaurées.
- Les noms très longs sont abrégés pour préserver la lisibilité de la fiche. Les chaînes issues des données sont échappées avant affichage HTML.
- Les contrôles ci-dessus ont été effectués en local avant publication. Aucun test utilisateur indépendant n’est revendiqué.


## Disponibilités en temps réel — contrôle du 23 octobre 2026

- Flux officiel national téléchargé et lu depuis le navigateur avec les autorisations CORS publiques. 125 685 lignes dans le relevé technique initial ; des dates sans fuseau et des doublons existent : ils ne sont pas considérés comme des statuts frais certains.
- Jointure exacte par identifiant public de point, sans rapprochement géographique des statuts ; la génération conserve les identifiants de tous les points de chaque site.
- Tests automatisés : CSV avec BOM, guillemets, virgules et retours à la ligne ; dates avec et sans fuseau ; fraîcheur ; horloge future ; hors service prioritaire ; doublons contradictoires ; couverture partielle et conservation des effectifs.
- Navigateur, Puy-de-Dôme : lors d’un relevé local, 33 disponibles confirmés, 35 occupés, 3 hors service/réservés, 1 449 inconnus (total 1 520). Ces nombres sont variables, pas des valeurs promises.
- Filtre activé : 22 sites avaient au moins un point disponible confirmé lors du contrôle. Mise en pause : 0 disponibilité annoncée, 1 520 statuts inconnus, aucun repère disponible conservé par le filtre.
- Aucun résultat humain ni aucune disponibilité simulée en production.
