# État du projet

## Reprendre ici

**Objectif en cours** : compléter les données manquantes (collecteurs Python + promotion en base), puis
refaire l'identité visuelle du site en gardant les textes et les données.

**Fait**
- Refonte sur la maquette Stitch fusionnée dans `main` (PR #4 front, PR #3 back).
- Correctif du rate limiting (clé interne `INTERNAL_API_KEY`, `trust proxy`, cache 5 min, page
  d'erreur) : commité en local (back `ffb3940` sur `dev`, front `485bf52` et `e7590ef` sur
  `feature/refonte`). La variable est réglée sur Render et Vercel.
- Inventaire des données manquantes (2026-10-26), voir plus bas.

**Bloqué / en attente**
- Les commits du correctif ne sont pas poussés : tant qu'ils ne sont pas en ligne, l'API peut
  repasser en 429 et casser les pages.
- Collecteurs de données (phase 1) terminés sur la branche back `feature/collecte-donnees`, non
  commités : 1950 → 2026 collecté (1 172 GP, 26 180 résultats, 11 364 qualifs, 1 132 écuries par
  saison, champions). Dry-run OK, aucun élément non mappé ; rapport dans
  `collectors/output/promotion-report.json`. En attente de validation avant
  `node src/scripts/promoteCollectedData.js --apply`.
- À corriger en base avant ou après la promotion : 8 engagements 2023 rattachés à l'écurie
  actuelle (Audi, Racing Bulls), `boy-lunger` à renommer Boy Hayje, numéros 2026 de Norris (1) et
  Verstappen (3), poles d'avant 1994 (compter `grid = 1`), stats de carrière à recalculer.

**Prochaine action**
- Relire le rapport des collecteurs, valider le dry-run, puis lancer la promotion en base.
- Identité « Ligne de course » retenue (voir `DESIGN.md`). Accueil codé en Next.js sur la branche
  front `feature/ligne-de-course` (non commité) : police Schibsted Grotesk, en-tête et logo
  virage, menu mobile (absent avant), hero plein écran avec titre entier, rubriques en virages
  V1–V4 avec trajectoire dessinée au défilement, focus clavier visible.
- Reste sur l'accueil : bloc champion (attend `Season.championDriver`, rempli par la promotion
  des données), restylage de « Dernière manche » et « Classement » (masqués tant qu'il n'y a pas
  de résultats), diaporama du hero (attend des images), pied de page.
- Accueil commité (`607e307`, `af22829`, docs `ab4ae7b`), non poussé.
- Page Circuits refaite (non commitée, en attente du retour de Dylan) : globe terrestre
  zoomable (`CircuitsGlobe`, d3-geo) + index par pays. La suite (« on verra autre chose ») est à
  définir avec Dylan.
- Fiche écurie refaite (commit `f0a317f`) sur le gabarit commun des fiches
  (`components/profile/`).
- Page Écuries refaite (commit `8f3113b`) : vignettes couleur d'écurie pour le plateau, index
  A–Z pour les 203 historiques.
- Fiche pilote refaite (commit `9b52b2d`) : ouverture en écran partagé
  (identité à gauche, panneau couleur d'écurie avec numéro géant et portrait biseauté à droite),
  bande de chiffres clés, texte (Biographie / Parcours / Citation) à gauche et écuries dans une
  colonne latérale fixe à droite (`TeamsAside`, 2026-10-30), en attente du retour de Dylan.
  Backend : couleur d'écurie ajoutée aux périodes de `GET /drivers/:slug` (non commité, branche
  `feature/collecte-donnees`). Limites : photos de podium (Verstappen), panneau sans photo pour
  les anciens, 0 pole avant 1994 (données).
- Page Pilotes refaite (commit `d89e717`) sur le modèle d'affichage de wikily.gg demandé par Dylan :
  ouverture compacte avec chiffres clés (`PageOpening`), recherche, filtre segmenté avec totaux,
  sections « Plateau 2026 » puis « Anciens pilotes » (partition sans doublon), grille de
  vignettes biseautées 3:4 (`DriverCard`, photo recadrée sur le visage par Cloudinary).
  Composants partagés restylés : fil d'Ariane, recherche, pagination. Backend : couleur d'écurie ajoutée à
  `currentTeam` (commit `187764d` sur `dev`, non poussé).
- Pages suivantes, une par une : fiche pilote, écuries, fiche écurie, circuits, saisons,
  règlements. Prototypes jetables dans `public/*.html` et `public/moodboard/`, à ne pas commiter.

## Inventaire des données (2026-10-26)

| Collection | État |
|---|---|
| `seasons` | 77 (1950 → 2026), aucun champion pilote ni écurie, aucun règlement lié |
| `grandprixes`, `raceresults`, `qualifyingresults` | vides |
| `teamseasonentries` | vide |
| `driverseasonentries` | 3425, numéro de voiture manquant sur 3342 |
| `drivers` | 881 ; photos manquantes : 5/18 actifs, 10/35 champions, 386/828 anciens ; citations quasi absentes ; récit de carrière absent des anciens pilotes |
| `teams` | 214 ; 203 écuries historiques sans fondation, base, logo, couleur, directeurs |
| `circuits` | 78 ; aucun tracé (longueur, virages, record) ni photo |
| `regulations` | 10 époques complètes ; `rulebooks` : 2026 seulement |
