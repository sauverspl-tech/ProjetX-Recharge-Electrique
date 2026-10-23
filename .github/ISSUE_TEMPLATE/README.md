**Pour un chargé d’étude de déploiement de bornes, Recharge France compare les points de recharge recensés par voiture électrique d’un département au repère métropolitain afin de préparer une étude locale.**

# ProjetX — Recharge électrique en France

Projet MAE distinct de l’étude sur les bars. **Dépôt public. CM1, CM2 et prototype CM3 disponibles.**

**[Ouvrir le comparateur en ligne](https://sauverspl-tech.github.io/ProjetX-Recharge-Electrique/)** — prototype CM3 publié et vérifié le 23 octobre 2026.

Le [déploiement GitHub Pages](https://github.com/sauverspl-tech/ProjetX-Recharge-Electrique/actions/runs/39955713657) publie uniquement le comparateur et ses données agrégées. Voir le [guide de publication](cm3/publication.md).

| Contenu | Accès |
|---|---|
| Marché, question, méthode et limites | [Rendu CM1](cm1/README.md) |
| Carte nationale interactive | [Fichier de la carte](cm1/index.html) |
| Analyse, jointure et test CM2 | [Rendu CM2](cm2/README.md) · [Tableau de bord](cm2/index.html) · [Graphique](cm2/graphique_offre_demande.svg) |
| Service, tests utilisateurs et audience CM3 | [Rendu CM3](cm3/README.md) · [Prototype](cm3/index.html) |
| Données et traçabilité | [Dossier data](data/README.md) |
| Projet des bars, CM1 et CM2 déjà réalisés | [ProjetX — Bars](https://github.com/sauverspl-tech/ProjetX) |

Pour utiliser la carte : télécharger et extraire le dépôt, ouvrir un terminal à sa racine, lancer `python -m http.server 8767 --bind 127.0.0.1` puis ouvrir http://127.0.0.1:8767/cm1/index.html. Sur GitHub, index.html affiche son code : le comparateur CM3 est disponible sur le site public ci-dessus. Les comptes rendus et fichiers de données du dépôt sont publics.

Le CM2 croise le parc de VP électriques et les PDC en accès libre au niveau départemental. La table conserve les territoires disponibles ; le graphique et le test portent sur les 96 départements métropolitains. Le tableau de bord local est accessible sur http://127.0.0.1:8767/cm2/index.html. Le changement de marché et la composition du groupe restent à confirmer auprès de l’enseignant. Les droits des collaborateurs du dépôt des bars ne sont pas automatiquement recopiés dans ce nouveau dépôt.

Préparation assistée par Codex. Données publiques créditées dans data/sources.json. Le projet n’utilise aucune donnée interne de Valeo.
