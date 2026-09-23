# Feature Specification: Refonte de la maquette finale SpeedTrack

**Feature Branch**: `001-maquette-finale`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "Utilise le brief complet dans .specify/maquette-finale-brief.md comme spécification de départ pour la refonte de la maquette finale du site SpeedTrack (toutes les pages listées : accueil, liste pilotes, détail pilote, détail écurie, détail circuit, détail course, détail saison, favoris)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Découvrir le site sans compte (Priority: P1)

Un fan de F1, débutant ou confirmé, arrive sur le site pour consulter des informations
(pilotes, écuries, circuits, saisons, courses, règlements) sans avoir besoin de créer
de compte.

**Why this priority**: C'est la raison d'être du site — une plateforme de référence
gratuite. Si cette consultation de base ne fonctionne pas, rien d'autre n'a de valeur.

**Independent Test**: Peut être testé en parcourant l'accueil puis chacune des pages
de détail (pilote, écurie, circuit, course, saison) sans jamais être bloqué par une
demande de connexion.

**Acceptance Scenarios**:

1. **Given** un visiteur sans compte sur l'accueil, **When** il clique sur un pilote,
   une écurie ou un circuit, **Then** il accède à la fiche détail correspondante sans
   interruption.
2. **Given** une fiche pilote, **When** le visiteur clique sur l'écurie actuelle du
   pilote, **Then** il est redirigé vers la fiche détail de cette écurie.
3. **Given** une fiche saison, **When** le visiteur clique sur une course du calendrier,
   **Then** il accède aux résultats et qualifications de cette course.

---

### User Story 2 - Constituer une liste de favoris pour préparer du contenu (Priority: P2)

Un créateur de contenu (vidéos YouTube F1 ou autre) ou un fan régulier veut marquer des
pilotes, écuries et circuits comme favoris pour les retrouver facilement plus tard,
par exemple pour préparer un montage vidéo ou un comparatif.

**Why this priority**: C'est la fonctionnalité qui justifie l'introduction d'un compte
utilisateur (changement de cap récent du projet) et qui apporte une vraie valeur
différenciante au-delà de la simple consultation.

**Independent Test**: Peut être testé en ajoutant un pilote, une écurie et un circuit
en favori depuis leurs fiches respectives, puis en vérifiant qu'ils apparaissent tous
regroupés sur la page favoris.

**Acceptance Scenarios**:

1. **Given** une fiche pilote, écurie ou circuit, **When** l'utilisateur clique sur
   l'icône favori, **Then** l'élément est ajouté à sa liste de favoris et l'icône
   reflète immédiatement le nouvel état.
2. **Given** un élément déjà en favori, **When** l'utilisateur clique de nouveau sur
   l'icône, **Then** l'élément est retiré des favoris.
3. **Given** une liste de favoris non vide, **When** l'utilisateur ouvre la page
   favoris, **Then** il retrouve ses pilotes, écuries et circuits sauvegardés,
   regroupés par catégorie.
4. **Given** aucune liste de favoris, **When** l'utilisateur ouvre la page favoris,
   **Then** un état vide explique comment ajouter un premier favori.

---

### User Story 3 - Explorer l'évolution visuelle d'un pilote (Priority: P3)

Un fan consulte la fiche d'un pilote et veut voir les différents designs de casque que
ce pilote a portés au fil de sa carrière, sans perdre le fil de sa lecture du reste de
la fiche (bio, stats, historique d'écuries).

**Why this priority**: Renforce l'aspect "outil de référence riche" et le côté engageant
du site, mais reste secondaire par rapport à la consultation de base et aux favoris.

**Independent Test**: Peut être testé en ouvrant une fiche pilote et en faisant défiler
le contenu principal : la zone des casques doit rester consultable pendant ce défilement
sur desktop, et être accessible par balayage horizontal sur mobile.

**Acceptance Scenarios**:

1. **Given** une fiche pilote sur desktop, **When** l'utilisateur fait défiler le
   contenu principal de la page, **Then** la liste des casques reste visible sur le
   côté.
2. **Given** une fiche pilote sur mobile, **When** l'utilisateur atteint la section
   casques, **Then** il peut parcourir les différents casques par balayage horizontal.

---

### Edge Cases

- Que voit un visiteur sur une fiche pilote qui n'a pas d'écurie actuelle (légende
  retraitée) ? → Pas de lien écurie, mention "légende" à la place.
- Que se passe-t-il si un pilote n'a qu'un seul design de casque enregistré ? → La
  section casques s'affiche quand même, avec un seul élément.
- Que voit l'utilisateur si une course, une saison, un pilote, une écurie ou un circuit
  demandé n'existe pas (URL invalide) ? → Un message clair indique que l'élément est
  introuvable, avec un lien de retour vers une liste pertinente.
- Que se passe-t-il si l'utilisateur n'est pas connecté et clique sur l'icône favori ?
  → Hors périmètre détaillé de cette spec de maquette (le parcours de connexion n'est
  pas une des pages listées) ; à couvrir dans une spec ultérieure sur le compte
  utilisateur.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site DOIT permettre de consulter les pilotes, écuries, circuits,
  courses et saisons sans nécessiter de compte utilisateur.
- **FR-002**: Le système DOIT permettre à un utilisateur de marquer un pilote, une
  écurie ou un circuit comme favori, et de retirer ce statut.
- **FR-003**: La fiche pilote DOIT présenter les différents casques portés par le
  pilote au fil de sa carrière, consultables sans interrompre la lecture du reste de
  la fiche.
- **FR-004**: La fiche circuit DOIT présenter une représentation visuelle du tracé
  allant au-delà d'un schéma plat en deux dimensions (traitement stylisé donnant une
  impression de profondeur).
- **FR-005**: La page favoris DOIT regrouper les éléments sauvegardés par catégorie
  (pilotes, écuries, circuits) et rester lisible même vide.
- **FR-006**: La liste de pilotes DOIT afficher, pour chaque pilote, un repère visuel
  de son design de casque en plus de sa photo et de son écurie.
- **FR-007**: La fiche écurie DOIT recevoir un traitement visuel plus dynamique que les
  autres fiches détail (mise en scène de la couleur de livrée, sectionnement moins
  statique).
- **FR-008**: Chacune des 8 pages définies (accueil, liste pilotes, détail pilote,
  détail écurie, détail circuit, détail course, détail saison, favoris) DOIT disposer
  d'une déclinaison desktop et d'une déclinaison mobile dédiées.
- **FR-009**: Le design DOIT conserver l'identité visuelle existante (thème sombre,
  rouge d'accent, palette définie) tout en proposant une nouvelle mise en page pour
  chaque écran.
- **FR-010**: Chaque page DOIT limiter le défilement au strict nécessaire tout en
  conservant au moins un moment visuel marquant qui donne envie de rester sur le site.
- **FR-011**: Le point d'entrée du compte utilisateur (connexion / profil) DOIT être
  visible depuis l'en-tête sur toutes les pages.

### Key Entities

- **Pilote**: identité, nationalité, écurie actuelle, biographie, statistiques de
  carrière, historique des écuries, casques portés par saison.
- **Écurie**: identité, pays, année de fondation, couleur de livrée, historique,
  pilotes actuels et passés, palmarès.
- **Circuit**: identité, pays, longueur, nombre de virages, tracé, historique des
  vainqueurs.
- **Course**: rattachée à une saison et un circuit, résultats de course et de
  qualifications.
- **Saison**: année, calendrier des courses, classement pilotes et classement
  constructeurs (calculés, non stockés).
- **Favori**: association entre un utilisateur et un pilote, une écurie ou un circuit.
- **Compte utilisateur**: identité minimale nécessaire pour rattacher des favoris à une
  personne.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Depuis l'accueil, un visiteur atteint n'importe quelle fiche pilote,
  écurie ou circuit en 2 clics maximum.
- **SC-002**: Un utilisateur retrouve 100% de ses éléments favoris regroupés sur une
  seule page, quel que soit le nombre d'éléments sauvegardés.
- **SC-003**: Sur desktop, l'essentiel de l'information de chaque page clé est visible
  sans dépasser deux hauteurs d'écran de défilement.
- **SC-004**: Les 8 pages définies disposent chacune d'une version desktop et d'une
  version mobile distinctes, sans exception.
- **SC-005**: Sur la fiche pilote, un visiteur peut consulter la galerie de casques
  sans perdre sa position de lecture dans le reste du contenu (pas de rechargement,
  pas de perte de contexte).

## Assumptions

- Le compte utilisateur et les favoris repassent dans le périmètre du projet — ceci
  contredit la section "Ce qu'on ne fait PAS en V1" du `CLAUDE.md` racine, qui reste à
  mettre à jour séparément pour refléter ce changement de cap.
- Aucune image de casque réelle ni modèle 3D de circuit n'est disponible à ce stade :
  des représentations stylisées (vectorielles) servent de direction artistique
  provisoire, à remplacer par de vrais assets lors du développement final.
- Les données utilisées (pilotes, écuries, circuits, résultats) sont fictives à ce
  stade de maquette, conformément au reste du projet.
- Le fichier `.specify/maquette-finale-brief.md` fait foi comme brief de design ;
  cette spécification le traduit en langage fonctionnel orienté utilisateur.
- Le parcours de connexion/inscription lui-même n'est pas détaillé ici : seul son
  point d'entrée visuel dans l'en-tête fait partie du périmètre de cette maquette.
