# Feature Specification: Hero interactif de la page d'accueil

**Feature Branch**: `002-hero-interactif-page`

**Created**: 2026-09-23

**Status**: Draft

**Input**: User description: "Hero interactif de la page d'accueil : le visuel de la monoplace change d'écurie au survol avec une transition de traînées lumineuses inspirée des génériques TV F1"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Découvrir l'identité F1 dès l'arrivée sur l'accueil (Priority: P1)

Un visiteur arrive sur la page d'accueil et doit immédiatement comprendre qu'il est sur
un site dédié à la Formule 1, grâce à un visuel de monoplace mis en scène à côté du
titre du site, sans que ce visuel ne nuise à la lisibilité du message principal
(titre, accroche, boutons d'action).

**Why this priority**: C'est la première impression du site — le hero de l'accueil.
Si le message principal n'est pas lisible ou que le visuel ne se charge pas
proprement, l'expérience échoue dès la première seconde.

**Independent Test**: Peut être testé en chargeant la page d'accueil et en vérifiant
que le titre, l'accroche et les boutons restent parfaitement lisibles, avec une
monoplace affichée à côté, avant toute interaction.

**Acceptance Scenarios**:

1. **Given** un visiteur qui charge la page d'accueil, **When** la page est affichée,
   **Then** le titre "SpeedTrack", l'accroche et les boutons d'action sont visibles à
   gauche et une monoplace d'une écurie est visible à droite, sans interaction requise.
2. **Given** le hero affiché, **When** le visiteur ne touche pas au visuel, **Then**
   le titre et les boutons restent parfaitement statiques et lisibles.

---

### User Story 2 - Découvrir plusieurs écuries en survolant le visuel (Priority: P1)

Un visiteur curieux passe la souris sur le visuel de la monoplace et voit apparaître
une monoplace d'une autre écurie, avec une transition dynamique inspirée des
génériques de diffusion officiels de la F1, colorée selon l'écurie qui apparaît.
Le visiteur peut répéter le survol pour parcourir successivement plusieurs écuries.

**Why this priority**: C'est l'élément différenciant demandé pour l'accueil — sans
cette interaction, le hero est équivalent à une simple photo statique.

**Independent Test**: Peut être testé en survolant le visuel plusieurs fois de suite
et en vérifiant qu'une écurie différente apparaît à chaque fois, avec la transition
attendue, jusqu'à revenir à la première écurie après avoir parcouru toutes les
monoplaces disponibles.

**Acceptance Scenarios**:

1. **Given** le hero affiché avec la monoplace d'une écurie A, **When** le visiteur
   survole le visuel, **Then** une monoplace d'une écurie B apparaît accompagnée d'une
   transition de traînées lumineuses colorées selon l'écurie B, et le nom de l'écurie
   affiché se met à jour.
2. **Given** le visiteur a parcouru toutes les écuries disponibles, **When** il
   survole une fois de plus, **Then** le cycle reprend depuis la première écurie.
3. **Given** une transition en cours suite à un survol, **When** le visiteur survole
   de nouveau avant la fin de la transition, **Then** ce nouveau survol est ignoré et
   la transition en cours se termine normalement, sans chevauchement ni saut visuel.

---

### User Story 3 - Profiter de l'interaction sans souris ni animations intenses (Priority: P3)

Un visiteur sur un appareil tactile (sans survol possible) ou ayant activé la
préférence "réduire les animations" de son système souhaite tout de même profiter du
hero sans expérience dégradée ni gênante.

**Why this priority**: Garantit que l'effet visuel phare de l'accueil ne pénalise pas
une partie des visiteurs (mobile, préférences d'accessibilité) ; secondaire par
rapport à l'expérience desktop principale visée par cette fonctionnalité.

**Independent Test**: Peut être testé en simulant `prefers-reduced-motion: reduce`
et en consultant la page sur un appareil tactile, en vérifiant dans les deux cas que
plusieurs écuries restent découvrables.

**Acceptance Scenarios**:

1. **Given** un visiteur ayant activé "réduire les animations", **When** le visuel
   change d'écurie, **Then** la transition se fait par un fondu simple, sans traînées
   lumineuses.
2. **Given** un visiteur sur appareil tactile, **When** il interagit avec le visuel
   (ex: appui), **Then** il peut tout de même découvrir plusieurs écuries.

---

### Edge Cases

- Que se passe-t-il si le visiteur survole le visuel plusieurs fois très rapidement ?
  → Seul le premier survol déclenche une transition ; les survols suivants sont
  ignorés tant que la transition en cours n'est pas terminée (voir User Story 2,
  scénario 3).
- Que voit le visiteur si l'image d'une monoplace ne se charge pas ? → Le nom de
  l'écurie et le fond du visuel restent affichés proprement, sans image cassée
  visible.
- Que voit le visiteur si une seule monoplace est disponible dans le contenu ? → Le
  visuel reste affiché normalement, sans interaction de changement proposée (pas de
  survol qui ne mène nulle part).
- Que voit le visiteur qui n'a pas de souris (tactile) ? → Voir User Story 3 :
  mécanisme de repli au tap.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le hero de la page d'accueil DOIT afficher le titre du site, l'accroche
  et les boutons d'action à gauche, et un visuel de monoplace à droite, dès le
  chargement de la page.
- **FR-002**: Quand le visiteur survole le visuel de la monoplace, le système DOIT
  afficher la monoplace d'une autre écurie que celle actuellement affichée.
- **FR-003**: Le changement de monoplace DOIT s'accompagner d'une transition visuelle
  de type traînées lumineuses, dont la couleur correspond à l'identité visuelle de
  l'écurie qui apparaît.
- **FR-004**: Le système DOIT faire cycler les monoplaces disponibles dans un ordre
  répétable, en revenant à la première après la dernière.
- **FR-005**: Un survol déclenché pendant qu'une transition est déjà en cours DOIT
  être ignoré jusqu'à la fin de cette transition.
- **FR-006**: Le nom de l'écurie affichée DOIT être visible sur le visuel et se mettre
  à jour à chaque changement de monoplace.
- **FR-007**: Le système DOIT proposer une transition simplifiée (fondu, sans
  traînées lumineuses) lorsque le visiteur a activé la préférence système "réduire
  les animations".
- **FR-008**: Sur un appareil sans survol possible (tactile), le système DOIT fournir
  un mécanisme permettant tout de même de découvrir plusieurs écuries.
- **FR-009**: Le titre du site et les boutons d'action DOIVENT rester visuellement
  statiques, non affectés par les transitions du visuel de la monoplace.
- **FR-010**: Chaque photo de monoplace utilisée DOIT afficher un crédit photo visible
  correspondant aux exigences de sa licence d'utilisation.

### Key Entities *(include if feature involves data)*

- **Monoplace (visuel hero)**: photo d'une monoplace d'une écurie donnée, nom de
  l'écurie associée, couleur d'accent utilisée pour la transition, crédit/licence de
  la photo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Depuis le chargement de la page, 100% des visiteurs voient le titre,
  l'accroche et les boutons d'action parfaitement lisibles, sans attendre une
  interaction.
- **SC-002**: Un survol du visuel déclenche visiblement le début de la transition
  sans délai perceptible.
- **SC-003**: Un visiteur peut découvrir l'ensemble des écuries proposées par des
  survols répétés, sans qu'aucun survol supplémentaire pendant une transition ne
  produise un affichage incohérent (image figée, superposition, saut visuel).
- **SC-004**: 100% des monoplaces affichées présentent un nom d'écurie et un crédit
  photo visibles.
- **SC-005**: Un visiteur ayant activé "réduire les animations" vit une expérience
  équivalente (découverte des mêmes écuries) sans les traînées lumineuses.

## Assumptions

- Cette fonctionnalité porte uniquement sur le hero de la page d'accueil ; elle ne
  modifie pas le reste de la page (bandeau de statistiques, grille "Explorer").
- Le comportement desktop (survol) est le scénario principal ; le comportement
  tactile est un repli fonctionnel simple, pas une réplique visuelle identique de
  l'effet de survol.
- Les photos de monoplaces sont des photos réelles sous licence libre, chacune avec
  son crédit — le nombre d'écuries couvertes au lancement peut être un
  sous-ensemble des écuries actuelles ; l'élargissement à la couverture complète est
  un travail de contenu ultérieur, hors périmètre de cette spécification.
- L'identité visuelle générale (thème sombre, rouge d'accent, typographie) reste
  celle déjà établie sur le reste du site.
- Aucun son n'est associé à la transition.
