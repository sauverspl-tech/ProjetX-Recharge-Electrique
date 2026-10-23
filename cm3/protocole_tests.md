# Test du service — première vague à réaliser

## Utilisateur visé

Chargé de déploiement IRVE, chargé d’études mobilité ou agent d’une collectivité qui prépare une présélection territoriale. Il cherche un premier repère, pas une borne libre pour recharger immédiatement.

## Recrutement et tâche

Recruter cinq personnes ne connaissant pas le projet, en privilégiant ce profil. Les tests réalisés par l’auteur ou Codex sont des contrôles techniques, pas des tests utilisateurs indépendants. Une première vague qualitative de cinq personnes ne constitue pas une enquête représentative et ne garantit pas de trouver tous les problèmes.

1. Ouvrir la page sans département présélectionné. Ne pas expliquer les commandes ni les chiffres.
2. Donner une seule tâche : **« Quel est le ratio affiché pour la Gironde, et est-il supérieur ou inférieur au repère métropolitain ? »**
3. Observer la navigation, les hésitations, les erreurs et l’éventuel abandon. Chronométrer du début de la tâche à la réponse, sans considérer cette durée comme une mesure d’audience.
4. Après la réponse, demander ce que la personne a compris du ratio et de sa limite. Ne pas suggérer la réponse avant d’avoir recueilli son interprétation.
5. Demander l’accord pour conserver des notes anonymes ; ne pas enregistrer de coordonnées, nom réel ou donnée personnelle inutile.

Réponse attendue pour l’observateur, à ne pas donner avant : **Gironde : 15,3 points recensés pour 100 voitures électriques ; repère métropolitain : 10,8 ; supérieur.** Le ratio ne démontre ni un besoin ni une rentabilité.

## Critères de travail, pas résultats observés

- Objectif de conception : quatre testeurs sur cinq terminent sans aide ; médiane des temps inférieure à 60 secondes. Ce sont des seuils proposés pour itérer, pas des performances déjà mesurées ni une norme universelle.
- Priorité critique : toute confusion « les bornes sont disponibles maintenant » ou « ce département doit recevoir une station » déclenche une correction de formulation.
- Autres critères : compréhension de l’unité, distinction territoire/métropole, possibilité de retrouver les sources, fonctionnement au clavier et sur téléphone.

## Recueil et itération

Remplir [retours_tests.csv](retours_tests.csv) uniquement après de vrais tests, un identifiant anonyme par personne. Documenter les blocages dans une issue, avec [le modèle préparé](modele_issue.md). Ne pas confondre suggestion et difficulté réellement observée.

Après chaque vague : classer les problèmes, corriger les plus importants, conserver avant/après, refaire tester par de nouvelles personnes. Aucun résultat humain n’a été inventé : **0 test utilisateur indépendant effectué à ce stade**.

## Canal et diffusion

Le dépôt de travail est privé : les inconnus ne peuvent pas y déposer d’issue sans invitation. Un dépôt de vitrine public permettrait de recevoir des retours, après accord de publication. Le [message de sollicitation](message_test.md) est préparé, mais n’a pas été envoyé. Vérifier les règles de chaque communauté et demander un accord avant toute publication externe.
