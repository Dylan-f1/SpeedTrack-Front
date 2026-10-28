# Journal de décisions

## 2026-10-26 — Collecte des données manquantes

- **Décision** : collecteurs en Python (prêts pour Docker) qui écrivent des fichiers JSON bruts, puis
  un script Node de promotion (`--dry-run` par défaut) qui normalise et fait les upserts en base.
- **Pourquoi** : séparer la collecte de la validation, ne rien écrire en production sans relecture ;
  le script de promotion reste en Node car les modèles Mongoose y vivent.
- **Sources** : API d'abord (Jolpica pour le sportif, Wikidata envisagé pour la phase 2). Pas de
  scraping de formula1.com (conditions d'utilisation) ; textes Wikipédia réécrits ou attribués
  (CC BY-SA).

## 2026-10-27 — Directions visuelles : premier tour refusé

- **Refusé** : A « Moniteur de chronométrage », B « Affiche de Grand Prix », C « Signalétique de
  piste ».
- **Pourquoi** : trop « thème » (le concept prend le dessus), typos pas au goût de Dylan (police à
  points, étirée, signalétique), trop loin du site actuel.
- **Contraintes retenues pour la suite** : garder les couleurs du site actuel (`#131313`,
  `#1c1b1b`, rouge `#e10600`), tester un accent aux couleurs de l'écurie ou du pilote affiché,
  rester proche de la structure existante.
- **Deuxième tour** : 4 ressentis sur l'accueil (Premium, Magazine, Outil, Cinématique) dans
  `public/directions.html`, avec un sélecteur d'accent par écurie.

## 2026-10-28 — Pas de copie : une signature propre à SpeedTrack

- **Retour de Dylan** : refus de s'inspirer des sites existants ; il veut une identité propre à
  SpeedTrack, dans le thème F1.
- **Piste** : garder la base Générique et lui ajouter un signe distinctif tiré du langage de la
  course, sans transformer le site en décor. 3 signatures testées dans `public/identite.html` :
  A « Feux de départ » (logo à 5 feux, séquence d'allumage puis départ sur l'accueil),
  B « Secteurs » (code violet / vert / jaune, barre de tour avec les chiffres clés),
  C « Ligne de course » (trajectoire dessinée au défilement, rubriques = virages V1 à V4).

## 2026-10-28 — Générique remis en question : « pas assez F1 »

- **Retour de Dylan** : pas si fan de Générique ; ce qui manque, c'est l'univers F1.
- **Méthode retenue** : planche de 10 vrais sites F1 (`public/moodboard.html`, captures dans
  `public/moodboard/`, à ne pas commiter) pour qu'il pointe ce qui lui plaît avant de redessiner.

## 2026-10-27 — Image du hero et diaporama

- **Fait** : image du hero remplacée par l'original Stitch en 1376 × 768 (au lieu d'une miniature
  512 × 286, d'où le flou) ; `setupHomeHero.js` demande l'original avec le suffixe `=s0`.
- **Constat** : cette image est générée par IA (Stitch), pas une photo. Aucune photo libre ne
  reproduit ce style studio pour chaque écurie ; les photos Unsplash / Pexels proposées ont été
  refusées. Dylan refuse aussi le crédit photographe (exclut Wikimedia Commons CC BY / BY-SA).
- **En attente** : images du diaporama (piste : générer 4 à 6 visuels dans le même style, une
  livrée par écurie), titre de l'accueil à rendre entièrement visible.

## 2026-10-27 — « Générique » retenu, déclinaison sur les pages

- **Retenu par Dylan** : la variante Générique (titre pleine largeur coupé par le bas de
  l'ouverture, Schibsted Grotesk, listes en lignes, écran partagé couleur d'écurie). Doute : son
  application aux autres pages.
- **Déclinaison prototypée** dans `public/generique.html` : accueil, liste des pilotes, fiche
  pilote (Verstappen), liste des écuries, fiche écurie (McLaren). Accent = couleur de l'écurie sur
  les fiches, rouge SpeedTrack ailleurs.
- **Limite constatée** : la fiche pilote demande des portraits ; la photo de Verstappen en base est
  une photo de podium.

## 2026-10-27 — Directions visuelles : troisième tour

- **Retenu par Dylan** comme base : Premium et Cinématique. Magazine et Outil écartés.
- **Troisième tour** : 3 variantes qui mélangent les deux (Plein cadre, Cinémascope, Générique),
  comparées à Premium et Cinématique dans `public/directions.html`.

## 2026-10-26 — Nouvelle identité visuelle

- **Décision** : refaire l'identité visuelle en gardant les textes, les données et la structure des
  pages ; la maquette Stitch ne fait plus foi pour le visuel.
- **Pourquoi** : le rendu actuel fait « généré par IA » (grilles de cartes partout, Geist + JetBrains
  Mono par défaut, Material Symbols sans retouche, fond quasi noir + accent rouge).
- **Méthode** : celle du `CLAUDE.md` global et de `ANTI_IA.md` ; Dylan choisit la direction.

## 2026-10-07 — Rate limiting en production

- **Décision** : le serveur Next envoie une clé interne qui l'exempte de la limite par IP ; l'API
  lit la vraie IP derrière le proxy Render ; cache des appels de 5 minutes.
- **Pourquoi** : tous les visiteurs partageaient un seul quota de 100 requêtes / 15 min, l'API
  répondait 429 à tout le monde et les pages plantaient.
