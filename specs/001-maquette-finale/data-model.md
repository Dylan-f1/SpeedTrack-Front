# Phase 1 Data Model: Refonte de la maquette finale SpeedTrack

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Ce modèle couvre les entités manipulées par les 8 pages de la maquette. Les entités
`Pilote`, `Écurie`, `Circuit`, `Course`, `Saison` existent déjà côté backend
(MongoDB via `speedtrack-backend`) et sont consommées via `lib/api.js` — elles sont
documentées ici uniquement dans la mesure où la maquette en a besoin, sans redéfinir
le schéma backend. `Casque`, `Favori` et `CompteUtilisateur` sont nouveaux pour cette
feature et n'existent pour l'instant que sous forme de fixtures frontend (voir
`research.md` §3).

## Pilote (existant, consommé via `driversAPI`)

| Champ | Type | Notes |
|---|---|---|
| `slug` | string | Identifiant d'URL (`/drivers/:slug`) |
| `fullName` | string | Nom complet affiché |
| `nationality` | string (code pays) | Utilisé par `react-country-flag` |
| `photoUrl` | string (URL Wikimedia Commons) | Portrait |
| `currentTeamSlug` | string \| null | `null` pour une légende retraitée (edge case spec) |
| `careerStats` | objet | victoires, podiums, points, titres |
| `teamHistory` | liste de `driverSeasonEntries` | pilote + écurie + saison + from/to (déjà séparé, cf. architecture des données) |

**Règle d'affichage (FR-006)** : la carte pilote (liste) doit exposer un repère visuel
du design de casque en plus de photo/écurie/nationalité — dérivé de `Casque`
ci-dessous, pas d'un champ ajouté sur `Pilote`.

## Écurie (existant, consommé via `teamsAPI`)

| Champ | Type | Notes |
|---|---|---|
| `slug` | string | Identifiant d'URL (`/teams/:slug`) |
| `name` | string | |
| `liveryColor` | string (hex) | Couleur de livrée — utilisée comme élément graphique fort (FR-007) |
| `foundedYear` | number | |
| `history` | texte | |
| `roster` | liste de `teamSeasonEntries` | pilotes actuels/passés par saison |
| `honors` | liste | palmarès (titres, victoires) |

## Circuit (existant, consommé via `circuitsAPI`)

| Champ | Type | Notes |
|---|---|---|
| `slug` | string | Identifiant d'URL (`/circuits/:slug`) |
| `country` | string (code pays) | |
| `lengthKm` | number | |
| `turnsCount` | number | |
| `layoutAssetUrl` | string | Représentation stylisée du tracé (FR-004) — asset statique pour la maquette, pas un modèle 3D interactif (cf. research.md §4) |
| `pastWinners` | liste | pilote + saison + résultat |

## Course (existant, consommé via `racesAPI`)

| Champ | Type | Notes |
|---|---|---|
| `season` | number | Année (`/races/:year/:round`) |
| `round` | number | |
| `circuitSlug` | string | Référence Circuit |
| `raceResults` | liste | classement course (calculé/stocké côté backend, hors scope de cette feature) |
| `qualifyingResults` | liste | classement qualifications |

## Saison (existant, consommé via `seasonsAPI`)

| Champ | Type | Notes |
|---|---|---|
| `year` | number | Identifiant d'URL (`/seasons/:year`) |
| `calendar` | liste de `Course` (référence) | |
| `driverStandings` | liste calculée | jamais stockée (règle d'architecture du projet) |
| `constructorStandings` | liste calculée | idem |

## Casque *(NOUVEAU — fixture `lib/fixtures/helmets.js`)*

Relation temporelle pilote ↔ saison ↔ design, modélisée en entrées séparées plutôt
qu'en tableau imbriqué sur `Pilote`, par cohérence avec `driverSeasonEntries` /
`teamSeasonEntries` (règle d'architecture des données du `CLAUDE.md` racine).

| Champ | Type | Notes |
|---|---|---|
| `driverSlug` | string | Référence Pilote |
| `season` | number | Année du design |
| `imageUrl` | string | Illustration/rendu du casque |
| `label` | string \| null | Légende optionnelle (ex. "Casque hommage Spa 2023") |

**Validation** : un pilote avec un seul design enregistré doit tout de même afficher
la section casques avec cet unique élément (edge case du spec, pas d'état vide requis
dans ce cas précis).

## Favori *(NOUVEAU — fixture `lib/fixtures/favorites.js`)*

Association utilisateur ↔ élément favorisable.

| Champ | Type | Notes |
|---|---|---|
| `userId` | string | Référence CompteUtilisateur |
| `entityType` | enum: `driver` \| `team` \| `circuit` | Catégorie de regroupement sur `/favoris` (FR-005) |
| `entitySlug` | string | Référence vers Pilote/Écurie/Circuit |
| `addedAt` | date | Utile pour un tri par ajout récent |

**État / transitions** :
- `absent → favori` : clic sur l'icône favori depuis une fiche (Acceptance Scenario
  US2.1).
- `favori → absent` : nouveau clic sur l'icône (US2.2) — toggle, pas de confirmation.
- Liste vide de favoris → état vide explicite sur `/favoris` expliquant comment
  ajouter un premier favori (US2.4).

## CompteUtilisateur *(NOUVEAU — fixture `lib/fixtures/account.js`)*

Identité minimale nécessaire pour rattacher des favoris à une personne (le parcours
de connexion/inscription lui-même est hors périmètre de cette feature — seul son
point d'entrée visuel dans l'en-tête en fait partie, cf. Assumptions du spec).

| Champ | Type | Notes |
|---|---|---|
| `displayName` | string | Affiché près de l'avatar dans le header |
| `avatarUrl` | string \| null | `null` → afficher un état "non connecté" (icône connexion) |

## Relations (vue d'ensemble)

```text
Pilote 1───N driverSeasonEntries N───1 Écurie   (historique écurie par saison)
Pilote 1───N Casque                              (design par saison)
Écurie 1───N teamSeasonEntries N───1 Saison
Saison 1───N Course N───1 Circuit
CompteUtilisateur 1───N Favori N───1 {Pilote|Écurie|Circuit}  (polymorphe via entityType)
```
