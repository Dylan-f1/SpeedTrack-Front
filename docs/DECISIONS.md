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

## 2026-10-30 — Page Circuits : globe terrestre

- **Demande de Dylan** : un globe terrestre zoomable (« on verra autre chose » ensuite).
- **Fait** : globe SVG en projection orthographique avec `d3-geo` + `world-atlas` (déjà dans le
  projet, aucune dépendance ajoutée). Glisser = rotation (latitude bornée à ±85°), molette =
  zoom ×1 à ×8 (pincement à deux doigts sur écran tactile). Boutons + / − / « Recentrer »
  retirés à la demande de Dylan : zoom à la souris uniquement. Clic sur un point : le globe tourne vers le
  circuit (520 ms, ease-out, saut direct si mouvement réduit) et le panneau à droite affiche
  pays, nom, coordonnées et le lien vers la fiche. Pays hôtes un ton plus clair. Index par pays
  sous le globe (accès clavier et lecteur d'écran).
- **Rendu côté navigateur seulement** (`CircuitsGlobeLoader`, `ssr: false`) : les tracés calculés
  par Node différaient au dernier chiffre de ceux de Chrome, d'où une erreur d'hydratation.
- **Mobile** : `touch-action: pan-y` pour que le défilement vertical de la page reste possible ;
  glisser horizontalement fait tourner, pincer zoome. Points et étiquettes dimensionnés
  en pixels réels (8 px, zone de clic 22 px).
- **Point d'attention** : sur ordinateur, la molette au-dessus du globe zoome au lieu de faire
  défiler la page.

## 2026-10-30 — Fiche écurie

- **Décision** : même gabarit que la fiche pilote, désormais partagé dans `components/profile/`
  (`ProfileOpening`, `KeyFigures`, `ProfileLayout`, `ProfileSection`, `AsideBlock`/`AsideRow`).
  Panneau couleur d'écurie avec le logo biseauté (initiale si pas de logo) ; chiffres : saisons,
  pilotes engagés, première saison. Texte : Histoire (+ Héritage), Titulaires (vignettes de la
  liste Pilotes), Pilotes de l'écurie (deux colonnes, 24 visibles puis dépliables), Saison par
  saison (replié). Colonne latérale : Lignée, Team principals, Personnalités marquantes.
- **Retiré** : cartes arrondies, filtres d'ère et pagination client du registre (remplacés par
  le dépliage natif `<details>`), libellés mono en capitales.

## 2026-10-30 — Page Écuries

- **Décision** : même structure que Pilotes (ouverture compacte, recherche, sections titrées).
  Plateau : une vignette biseautée par écurie, **fond à la couleur de l'écurie** (comme le
  panneau de la fiche pilote), logo, nom, nom officiel et les deux titulaires avec leur numéro.
  Historiques : **index alphabétique en colonnes**, drapeau + nom, sans pagination.
- **Pourquoi l'index** : 203 écuries historiques sur 214 n'ont en base ni logo, ni couleur, ni
  date de fondation ; des vignettes seraient vides et répétitives.
- **Chiffres clés** : écuries depuis 1950, engagées cette saison, pays représentés (calculés).
- **Données à corriger** : « Lotus-Pratt &amp; Whitney » stocké avec l'entité HTML.

## 2026-10-30 — Vignettes pilotes : chiffres au survol

- **Demande de Dylan** : n'afficher Grands Prix / victoires / podiums qu'au survol de la vignette.
- **Fait** : au repos, le bloc texte est décalé de 84 px vers le bas (chiffres masqués par la
  carte) avec un dégradé léger ; au survol ou au focus clavier, il remonte (`translate`, 200 ms,
  `cubic-bezier(0.23,1,0.32,1)`), les chiffres et un dégradé plus haut apparaissent en fondu.
  Écrans tactiles : pas de survol, donc pas de chiffres (déjà masqués sous 640 px).

## 2026-10-30 — Fiche pilote : écuries dans une colonne latérale

- **Retour de Dylan** : les 3 variantes (relais, saison par saison, bilan) sont « nulles » ; il
  propose de mettre les écuries sur le côté.
- **Fait** : colonne latérale de 340 px à droite du texte (`TeamsAside`), fixe au défilement,
  comme l'encadré d'une fiche encyclopédique : une ligne par écurie dans l'ordre d'arrivée, trait
  à sa couleur, années regroupées (« 2003–2006, 2008–2009 »), nombre de saisons. Sous 1024 px,
  elle passe avant la biographie. Les sections du texte ont maintenant le titre au-dessus.
- **Retiré** : les 3 variantes et leur sélecteur.

## 2026-10-29 — Fiche pilote : section Écuries à revoir

- **Retour de Dylan** : la liste des écuries en lignes n'est « pas adéquate ».
- **3 variantes** commutables sur la fiche (`?ecuries=relais|saisons|bilan`, sélecteur temporaire
  en pointillés) : A « Relais » (frise proportionnelle façon stratégie de course, années sans
  volant en pointillés, légende avec les années), B « Saison par saison » (une case par année à
  la couleur de l'écurie, numéro si connu, saison partagée coupée en deux), C « Bilan par
  écurie » (nombre de saisons en grand à la couleur de l'écurie, part de la carrière, années).
- **Données** : l'API renvoie désormais `seasons` (écurie et numéro par saison). Écuries
  historiques sans couleur en base : gris en alternance, pas de couleur inventée.

## 2026-10-29 — Fiche pilote

- **Décision** : décliner la liste plutôt que réinventer. Ouverture en écran partagé (prévue dans
  `DESIGN.md`) : panneau à la couleur de la dernière écurie, numéro de course géant, portrait
  biseauté comme les vignettes de la liste. Chiffres clés en bande (même langage que
  `PageOpening`), puis sections en deux colonnes à titre fixe, écuries en lignes avec la couleur
  de chaque écurie.
- **Pourquoi** : garder la continuité liste → fiche ; les cartes arrondies, pastilles et icônes de
  l'ancienne fiche faisaient « tableau de bord généré ».
- **Crédit photo conservé** en bas de fiche : les photos déjà en base sont sous CC BY-SA, la licence
  l'impose.
- **Sans photo** : le panneau garde l'initiale en grand sur ordinateur et disparaît sur mobile.

## 2026-10-29 — Page Pilotes : affichage façon wikily.gg

- **Demande de Dylan** : reprendre l'affichage de https://wikily.gg/ark-survival-ascended/maps.
- **Repris** : recherche + filtre segmenté avec totaux, sections titrées, grille de vignettes
  portrait 3:4 aux coins biseautés (`.chamfer`), étiquette en haut à gauche, nom et chiffres sur
  un dégradé en bas.
- **Adapté à SpeedTrack** : couleurs du site, Schibsted Grotesk, étiquette = numéro sur la
  couleur d'écurie (ou titres en rouge), drapeau, sections « Plateau 2026 » / « Anciens
  pilotes ». Sous 640 px, les chiffres sont masqués pour laisser voir la photo.
- **Abandonné** : titre géant sur les pages intérieures, liste en lignes, les prototypes A/B/C.

## 2026-10-28 — Page Pilotes : autres designs demandés

- **Retour de Dylan** : la liste en lignes sans photo ne le convainc pas ; il demande un autre
  design.
- **3 propositions** dans `public/pilotes.html` (données réelles exportées dans
  `public/pilotes-data.json`, à ne pas commiter) : A « Grille de départ » (22 titulaires en
  grille décalée, trajectoire dans l'allée), B « Index encyclopédique » (A–Z en colonnes, aperçu
  au survol), C « Mur de portraits » (mosaïque noir et blanc, couleur au survol).
- **Constat** : beaucoup de photos en base ne sont pas des portraits (Hamilton à deux, pancarte
  pour Alonso, podium pour Verstappen, voiture pour Bearman) ; A et C en dépendent.

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
