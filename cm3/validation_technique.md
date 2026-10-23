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

Le formulaire distant et le workflow ne pourront être testés qu’après envoi des modifications. Aucun test mobile réel ni test humain indépendant n’a été effectué. La publication n’a pas été réalisée : le compte collaborateur dispose maintenant de l’écriture mais pas de l’administration nécessaire à l’activation de Pages.
