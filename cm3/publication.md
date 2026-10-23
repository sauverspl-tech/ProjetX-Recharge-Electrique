# Publication GitHub Pages préparée

Le dépôt `sauverspl-tech/ProjetX-Recharge-Electrique` est public, constaté sans connexion le 23 octobre 2026. Les anciennes mentions de dépôt privé ont été corrigées. La publication du prototype a été demandée par le propriétaire dans la conversation ; l’accès en écriture est maintenant disponible, mais le compte collaborateur ne dispose pas de l’administration permettant d’activer Pages.

## Déploiement

Le workflow `.github/workflows/pages.yml` publie uniquement les fichiers produits par `scripts/preparer_pages.py` : `index.html`, `donnees.json`, `.nojekyll` et `README.md`. Il ne publie pas les grilles de tests ni les notes de groupe sur le site. Le dépôt source reste public.

1. Envoyer les corrections sur `main` (préparées et vérifiées).
2. Dans Settings → Pages → Build and deployment, sélectionner **GitHub Actions** comme source.
3. Lancer le workflow « Publier le prototype CM3 » depuis Actions, ou laisser le push le déclencher.
4. Attendre le succès du déploiement et ouvrir l’URL renvoyée par l’étape `deploy`.
5. Tester une sélection, le lien direct Gironde, un territoire non comparable, l’export CSV et le formulaire de retour.
6. Ajouter seulement alors le lien vérifié au README et au message de diffusion.

URL attendue, **non vérifiée et à ne pas annoncer comme active** : https://sauverspl-tech.github.io/ProjetX-Recharge-Electrique/

## Retours et audience

Les retours sont reçus dans les issues de ce dépôt public. Un compte GitHub est nécessaire ; les testeurs sans compte peuvent répondre à la personne qui conduit le test. Le formulaire évite de demander des coordonnées personnelles.

Traffic mesure les accès au dépôt, pas les visites de GitHub Pages. Les compteurs inconnus restent vides. Aucun test humain et aucune diffusion auprès d’une communauté ne sont présentés comme réalisés.

## Préparation locale

Depuis la racine : `python3 scripts/preparer_pages.py`, puis `python3 -m http.server 8767 --bind 127.0.0.1 --directory _site`. Le paquet `cm3/publication_site.zip` contient la même sélection de fichiers pour une publication manuelle.
