---

description: "Task list template for feature implementation"
---

# Tasks: Refonte de la maquette finale SpeedTrack

**Input**: Design documents from `/specs/001-maquette-finale/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/fixtures-contract.md](./contracts/fixtures-contract.md),
[quickstart.md](./quickstart.md)

**Tests**: Aucune tâche de test automatisé n'est incluse — décision documentée dans
`research.md` §6 (pas de framework de test installé côté frontend, feature de nature
"maquette de design" validée par revue visuelle manuelle via `quickstart.md`).

**Organization**: Les tâches sont groupées par user story (spec.md) pour permettre une
implémentation et une validation indépendantes de chacune.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut être exécutée en parallèle (fichiers différents, pas de dépendance)
- **[Story]**: US1 (P1, consultation sans compte), US2 (P2, favoris), US3 (P3, casques)
- Chemins de fichiers exacts inclus dans chaque description

## Path Conventions

Projet unique concerné : `speedtrack-frontend/` (App Router Next.js). Tous les chemins
ci-dessous sont relatifs à ce dossier, conformément à `plan.md` → Project Structure.

---

## Phase 1: Setup

**Purpose**: Préparer l'arborescence et les fondations visuelles avant toute page.

- [ ] T001 Créer les dossiers/fichiers vides nécessaires à la feature :
  `app/favoris/`, `components/favoris/`, `components/account/`, `components/seasons/`,
  `components/races/`, `lib/fixtures/helmets.js`, `lib/fixtures/favorites.js`,
  `lib/fixtures/account.js` (structure conforme à `plan.md` → Project Structure)
- [ ] T002 [P] Définir les tokens de couleur en custom properties CSS dans
  `app/globals.css`, strictement alignés sur la palette du brief : fond `#131313`,
  surfaces `#1c1b1b`, surfaces élevées `#2a2a2a`, bordures `#353534`/`#393939`, accent
  `#e10600`/`#ff4d4d`, texte `#ffffff`/`#c8c6c5`/`#717070`
- [ ] T003 [P] Vérifier dans `app/layout.jsx` que la police chargée est bien une
  sans-serif type Geist (très lisible, sans fioriture) conforme au `CLAUDE.md` racine

**Checkpoint**: Tokens de design et arborescence prêts pour la Phase 2.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Fixtures et composants partagés dont dépendent plusieurs user stories.

**⚠️ CRITICAL**: Aucune tâche de user story ne démarre avant la fin de cette phase.

- [ ] T004 [P] Implémenter `lib/fixtures/helmets.js` — fonction
  `getHelmetsByDriver(driverSlug)` retournant `{ driverSlug, season, imageUrl, label }[]`
  triés par `season` décroissante, **jamais un tableau vide pour un pilote existant**
  (contrat : [contracts/fixtures-contract.md](./contracts/fixtures-contract.md))
- [ ] T005 [P] Implémenter `lib/fixtures/favorites.js` — `getFavoritesByUser(userId)`,
  `isFavorite(userId, entityType, entitySlug)`, `toggleFavorite(userId, entityType,
  entitySlug)` avec `entityType` limité à l'enum `'driver' | 'team' | 'circuit'`
  (contrat : [contracts/fixtures-contract.md](./contracts/fixtures-contract.md))
- [ ] T006 [P] Implémenter `lib/fixtures/account.js` — `getCurrentUser()` retournant
  `{ displayName, avatarUrl }` ou `null` (visiteur non connecté par défaut pour cette
  maquette) (contrat : [contracts/fixtures-contract.md](./contracts/fixtures-contract.md))
- [ ] T007 [P] Créer le composant partagé `components/ui/FavoriteButton.jsx` (icône
  favori togglable, sans logique propre à une page — consomme `lib/fixtures/favorites.js`)
- [ ] T008 Mettre à jour `components/layout/Header.jsx` pour afficher le point d'entrée
  compte utilisateur (connexion si `getCurrentUser()` retourne `null`, sinon avatar +
  `displayName`), visible sur toutes les pages (FR-011)

**Checkpoint**: Fondations prêtes — les user stories peuvent démarrer.

---

## Phase 3: User Story 1 - Découvrir le site sans compte (Priority: P1) 🎯 MVP

**Goal**: Un visiteur sans compte parcourt l'accueil et chaque fiche de détail
(pilote, écurie, circuit, course, saison) sans jamais être bloqué par une connexion.

**Independent Test**: Parcourir l'accueil puis chacune des pages de détail sans
jamais être interrompu par une demande de connexion (Acceptance Scenarios US1
du spec).

### Implementation for User Story 1

- [ ] T009 [P] [US1] Refondre l'accueil desktop dans `app/page.jsx` : saison en
  cours mise en avant, accès rapide pilotes/écuries/circuits/règlements, dernier
  résultat de course
- [ ] T010 [P] [US1] Refondre l'accueil mobile dans `app/page.jsx` (même contenu,
  hiérarchie et empilement des sections repensés pour mobile, pas un simple
  redimensionnement de la version desktop)
- [ ] T011 [P] [US1] Refondre la grille liste pilotes desktop dans
  `app/drivers/page.jsx` + `components/drivers/DriversGrid.jsx` (photo, écurie
  actuelle, nationalité par carte via `components/drivers/DriverCard.jsx`)
- [ ] T012 [P] [US1] Refondre la grille liste pilotes mobile dans
  `app/drivers/page.jsx` + `components/drivers/DriversGrid.jsx`
- [ ] T013 [P] [US1] Refondre la fiche détail pilote desktop dans
  `app/drivers/[slug]/page.jsx` : photo, bio, stats de carrière (victoires, podiums,
  points, titres), historique des écuries saison par saison (hors rail casques,
  cf. Phase 5 / US3)
- [ ] T014 [P] [US1] Refondre la fiche détail pilote mobile dans
  `app/drivers/[slug]/page.jsx` (même contenu que T013, hors casques)
- [ ] T015 [P] [US1] Refondre la fiche détail écurie desktop dans
  `app/teams/[slug]/page.jsx` : identité, historique, pilotes actuels/passés,
  palmarès, avec `liveryColor` utilisée comme élément graphique fort et un
  sectionnement moins "tableau"/plus éditorial (FR-007)
- [ ] T016 [P] [US1] Refondre la fiche détail écurie mobile dans
  `app/teams/[slug]/page.jsx`
- [ ] T017 [P] [US1] Refondre la fiche détail circuit desktop dans
  `app/circuits/[slug]/page.jsx` : longueur, virages, pays, historique des
  vainqueurs, `layoutAssetUrl` affiché comme tracé stylisé donnant une impression
  de profondeur, pas un schéma plat 2D (FR-004)
- [ ] T018 [P] [US1] Refondre la fiche détail circuit mobile dans
  `app/circuits/[slug]/page.jsx`
- [ ] T019 [P] [US1] Créer la fiche détail course desktop dans
  `app/races/[year]/[round]/page.jsx` + nouveaux composants `components/races/`
  (résultats de course et qualifications, classement lisible — priorité au scan
  visuel sur la décoration)
- [ ] T020 [P] [US1] Créer la fiche détail course mobile dans
  `app/races/[year]/[round]/page.jsx` + `components/races/`
- [ ] T021 [P] [US1] Créer la fiche détail saison desktop dans
  `app/seasons/[year]/page.jsx` + nouveaux composants `components/seasons/`
  (classement pilotes et constructeurs **calculés**, jamais stockés ; calendrier
  des courses de la saison)
- [ ] T022 [P] [US1] Créer la fiche détail saison mobile dans
  `app/seasons/[year]/page.jsx` + `components/seasons/`
- [ ] T023 [US1] Implémenter l'état "élément introuvable" (URL invalide) avec
  message clair + lien de retour vers une liste pertinente, sur les routes
  dynamiques `app/drivers/[slug]`, `app/teams/[slug]`, `app/circuits/[slug]`,
  `app/races/[year]/[round]`, `app/seasons/[year]` (edge case du spec)
- [ ] T024 [US1] Gérer le cas d'un pilote sans écurie actuelle ("légende
  retraitée") sur `app/drivers/[slug]/page.jsx` : pas de lien écurie, mention
  "légende" affichée à la place (edge case du spec)

**Checkpoint**: User Story 1 entièrement fonctionnelle et testable de manière
indépendante (accueil + 5 types de fiches détail, desktop et mobile).

---

## Phase 4: User Story 2 - Constituer une liste de favoris (Priority: P2)

**Goal**: Un créateur de contenu marque des pilotes/écuries/circuits comme
favoris et les retrouve regroupés sur une page dédiée pour préparer ses vidéos.

**Independent Test**: Ajouter un pilote, une écurie et un circuit en favori
depuis leurs fiches respectives, puis vérifier qu'ils apparaissent tous
regroupés sur la page favoris (Acceptance Scenarios US2 du spec).

### Implementation for User Story 2

- [ ] T025 [P] [US2] Intégrer `FavoriteButton` sur `components/drivers/DriverCard.jsx`
  et sur la fiche détail pilote (`app/drivers/[slug]/page.jsx`)
- [ ] T026 [P] [US2] Intégrer `FavoriteButton` sur la fiche détail écurie
  (`app/teams/[slug]/page.jsx`)
- [ ] T027 [P] [US2] Intégrer `FavoriteButton` sur la fiche détail circuit
  (`app/circuits/[slug]/page.jsx`)
- [ ] T028 [US2] Créer la page favoris desktop dans `app/favoris/page.jsx` :
  regroupement des éléments sauvegardés par catégorie (pilotes/écuries/circuits)
  via `getFavoritesByUser`, avec les mêmes traitements visuels forts (casques,
  livrées, tracés) que les pages sources plutôt qu'une liste texte (FR-005)
- [ ] T029 [US2] Créer la page favoris mobile dans `app/favoris/page.jsx`
- [ ] T030 [US2] Implémenter l'état vide de `app/favoris/page.jsx` expliquant
  comment ajouter un premier favori, quand `getFavoritesByUser` ne retourne
  aucun élément (Acceptance Scenario US2.4)
- [ ] T031 [US2] Vérifier que `toggleFavorite` dans `components/ui/FavoriteButton.jsx`
  reflète immédiatement le nouvel état à l'écran et reste cohérent en cas de
  double-clic rapide (Acceptance Scenarios US2.1/US2.2)

**Checkpoint**: User Stories 1 ET 2 fonctionnent indépendamment.

---

## Phase 5: User Story 3 - Explorer l'évolution visuelle d'un pilote (Priority: P3)

**Goal**: Un fan consulte la galerie des casques portés par un pilote au fil de
sa carrière sans perdre le fil de sa lecture du reste de la fiche.

**Independent Test**: Sur desktop, faire défiler le contenu principal de la
fiche pilote et vérifier que la liste des casques reste visible ; sur mobile,
vérifier le balayage horizontal de la galerie (Acceptance Scenarios US3 du spec).

### Implementation for User Story 3

- [ ] T032 [P] [US3] Ajouter le repère visuel de casque sur
  `components/drivers/DriverCard.jsx` (liste pilotes), via `getHelmetsByDriver`
  (FR-006)
- [ ] T033 [US3] Créer `components/drivers/HelmetRail.jsx` (galerie de casques
  via `getHelmetsByDriver`, un seul élément affiché si un seul design enregistré
  — pas d'état vide dans ce cas, edge case du spec)
- [ ] T034 [US3] Intégrer `HelmetRail` en rail latéral **sticky** sur la fiche
  détail pilote desktop (`app/drivers/[slug]/page.jsx`), visible pendant le
  défilement du contenu principal (Acceptance Scenario US3.1)
- [ ] T035 [US3] Adapter `HelmetRail` en carrousel à balayage horizontal sur la
  fiche détail pilote mobile (`app/drivers/[slug]/page.jsx`) (Acceptance
  Scenario US3.2)
- [ ] T036 [US3] Vérifier le rendu de `HelmetRail` avec un seul casque enregistré
  (edge case du spec) sur desktop et mobile

**Checkpoint**: Les 3 user stories sont fonctionnelles indépendamment.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Vérifications transversales aux 8 pages, non spécifiques à une story.

- [ ] T037 [P] Revue des 10 heuristiques de Nielsen listées dans le brief sur
  chacune des 8 pages (visibilité d'état, contrôle/liberté, cohérence, prévention
  d'erreurs, reconnaissance plutôt que rappel, etc.)
- [ ] T038 [P] Documenter dans `app/teams/[slug]/page.jsx` (commentaire ou légende
  visuelle) les intentions de mouvement/interaction non implémentées sur la fiche
  écurie (hover, transitions, reveal au scroll), conformément au brief
- [ ] T039 Exécuter le parcours de validation complet de
  [quickstart.md](./quickstart.md) sur les 16 déclinaisons (8 pages × desktop/mobile)
  et corriger les écarts constatés
- [ ] T040 Nettoyer le code (pas de `console.log`, pas de code commenté, pas de
  variables inutilisées) et vérifier la conformité aux conventions du `CLAUDE.md`
  racine (pas de point-virgule, single quotes, 2 espaces, trailing comma ES5,
  largeur max 100 caractères)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Aucune dépendance — démarre immédiatement
- **Foundational (Phase 2)**: Dépend de la fin de Setup — **bloque** les 3 user
  stories
- **User Stories (Phase 3-5)**: Dépendent toutes de la fin de Foundational
  - Peuvent ensuite avancer en parallèle, ou séquentiellement par priorité
    (P1 → P2 → P3)
- **Polish (Phase 6)**: Dépend de l'achèvement des user stories concernées

### User Story Dependencies

- **User Story 1 (P1)**: Démarre après Foundational — aucune dépendance sur
  US2/US3
- **User Story 2 (P2)**: Démarre après Foundational — intègre visuellement des
  pages construites en US1 (T025-T027 modifient des fichiers déjà créés par
  T011-T018), mais reste testable indépendamment via ses propres critères
- **User Story 3 (P3)**: Démarre après Foundational — modifie la fiche pilote
  construite en US1 (T013-T014) et la carte pilote (T011-T012), mais reste
  testable indépendamment via ses propres critères

### Within Each User Story

- Les tâches marquées [P] portent sur des fichiers différents et peuvent être
  menées en parallèle
- Les tâches non marquées [P] modifient un fichier déjà touché par une tâche
  précédente de la même story (ex. T034 dépend de T033 ; T014 dépend de T013 pour
  la structure de page hors casques)
- Chaque story doit être complète et vérifiée via son Independent Test avant de
  passer à la story suivante en implémentation séquentielle

### Parallel Opportunities

- T002 et T003 (Setup) en parallèle
- T004 à T007 (Foundational) en parallèle — fichiers indépendants
- Au sein de US1 : T009-T022 (14 tâches desktop/mobile par page) toutes en
  parallèle entre elles, car chacune touche un fichier de page différent
- Au sein de US2 : T025-T027 en parallèle (fichiers différents)
- Au sein de US3 : T032 en parallèle avec le reste (fichier différent)

---

## Parallel Example: User Story 1

```bash
# Lancer en parallèle les 5 fiches détail desktop de US1 :
Task: "Refondre la fiche détail pilote desktop dans app/drivers/[slug]/page.jsx"
Task: "Refondre la fiche détail écurie desktop dans app/teams/[slug]/page.jsx"
Task: "Refondre la fiche détail circuit desktop dans app/circuits/[slug]/page.jsx"
Task: "Créer la fiche détail course desktop dans app/races/[year]/[round]/page.jsx"
Task: "Créer la fiche détail saison desktop dans app/seasons/[year]/page.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 uniquement)

1. Terminer Phase 1 : Setup
2. Terminer Phase 2 : Foundational (bloquant)
3. Terminer Phase 3 : User Story 1 (accueil + 5 fiches détail, desktop + mobile)
4. **STOP et VALIDER** avec `quickstart.md` § scénarios 1, 3 (hors casques), 4, 5,
   6, 7
5. Présenter/valider ce MVP avant d'ajouter favoris et casques

### Incremental Delivery

1. Setup + Foundational → fondations prêtes
2. + User Story 1 → valider indépendamment → **MVP**
3. + User Story 2 (favoris) → valider indépendamment
4. + User Story 3 (casques) → valider indépendamment
5. + Polish (Phase 6) → revue Nielsen + validation quickstart complète

---

## Notes

- [P] = fichiers différents, sans dépendance
- Le label [Story] trace chaque tâche vers sa user story (spec.md)
- Aucune tâche de test automatisé (décision documentée, cf. `research.md` §6) —
  la validation se fait via `quickstart.md`
- Commit après chaque tâche ou groupe logique de tâches, au format `[ADD|UPDATE|
  FIX|DELETE] nom du composant ou de la partie modifiée` (convention `CLAUDE.md`)
- Éviter : tâches vagues, conflits sur un même fichier au sein d'un même groupe
  [P], dépendances croisées qui casseraient l'indépendance des stories
