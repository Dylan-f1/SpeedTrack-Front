# Implementation Plan: Refonte de la maquette finale SpeedTrack

**Branch**: `001-maquette-finale` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-maquette-finale/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Repenser de zéro la mise en page et la hiérarchie d'information des 8 pages clés de
SpeedTrack (accueil, liste pilotes, détail pilote, détail écurie, détail circuit,
détail course, détail saison, favoris), chacune déclinée desktop et mobile, en
conservant strictement l'identité visuelle existante (thème sombre, palette rouge
d'accent). Approche technique : maquettes construites comme de vraies pages Next.js
App Router (pas des images statiques), alimentées par les fixtures locales déjà en
place (`lib/fixtures/`) et complétées par de nouvelles fixtures fictives pour les
éléments pas encore backés (casques de pilotes, favoris, compte utilisateur), afin
que la maquette reste consultable et naviguable dans le navigateur.

## Technical Context

**Language/Version**: JavaScript (ES2023), Node.js 20+

**Primary Dependencies**: Next.js 16.2.6 (App Router), React 19.2, Tailwind CSS v4,
react-country-flag. Le `CLAUDE.md` racine documente encore "Next.js 15" — le projet a
depuis migré vers Next 16 (voir `speedtrack-frontend/AGENTS.md`, qui prévient de
breaking changes vs. les habitudes Next 15 : consulter `node_modules/next/dist/docs/`
avant d'écrire du code d'implémentation à l'étape `/speckit-implement`).

**Storage**: N/A pour cette feature (maquette front pure). Données pilotes/écuries/
circuits/courses/saisons existantes servies par `lib/api.js` → API SpeedTrack
(Express + MongoDB), déjà branchée sur les pages actuelles. Nouvelles données sans
backend à ce stade (casques, favoris, compte utilisateur) : fixtures fictives dans
`lib/fixtures/`, à remplacer par de vrais endpoints lors d'une feature ultérieure.

**Testing**: Aucune suite de tests automatisés frontend existante à ce jour. Validation
de cette feature par revue visuelle manuelle (lancement `npm run dev`, parcours des 8
pages en desktop et mobile) plutôt que par tests unitaires/e2e — cohérent avec la
nature "maquette de design" de la feature.

**Target Platform**: Web responsive, navigateurs modernes (desktop + mobile), thème
sombre uniquement.

**Project Type**: Web application — frontend uniquement (`speedtrack-frontend/`,
Next.js App Router). Le backend Express/MongoDB n'est pas modifié par cette feature.

**Performance Goals**: Pas de cible chiffrée spécifique à cette feature (priorité à la
qualité visuelle et à la hiérarchie d'information) ; rester dans les standards Next.js
par défaut (pas de régression de LCP/CLS perceptible par rapport aux pages actuelles).

**Constraints**: Palette de couleurs strictement limitée aux tokens définis dans le
brief (`#131313`, `#1c1b1b`, `#2a2a2a`, `#353534`/`#393939`, `#e10600`/`#ff4d4d`,
`#ffffff`/`#c8c6c5`/`#717070`) ; thème sombre uniquement (pas de mode clair) ;
conventions `CLAUDE.md` (fichiers `.jsx` PascalCase pour les composants, pas de
point-virgule, single quotes, 2 espaces, `'use client'` seulement si nécessaire) ;
défilement limité (max. ~2 hauteurs d'écran sur desktop par SC-003) ; les relations
temporelles (historique écurie par saison, casques par saison) restent des données
séparées, pas des champs imbriqués, conformément à la règle d'architecture des
données du projet.

**Scale/Scope**: 8 pages × 2 déclinaisons (desktop/mobile) = 16 maquettes distinctes,
avec réutilisation de composants partagés (cartes pilote/écurie/circuit, tableaux de
résultats, rail de casques, en-tête) entre les déclinaisons plutôt que 16
implémentations isolées.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

`~/.specify/memory/constitution.md` est encore le gabarit vierge fourni par spec-kit
(aucun principe projet n'y a été rédigé) : il n'existe donc aucune gate de
constitution à vérifier pour cette feature. Les seules règles contraignantes
applicables restent celles du `CLAUDE.md` racine et de `speedtrack-frontend/AGENTS.md`,
déjà intégrées ci-dessus dans Technical Context. Aucune violation à justifier.

## Project Structure

### Documentation (this feature)

```text
specs/001-maquette-finale/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
├── checklists/
│   └── requirements.md  # Déjà généré par /speckit-specify
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

Cette feature ne touche que `speedtrack-frontend/` (App Router Next.js existant) ;
`speedtrack-backend/` n'est pas modifié.

```text
speedtrack-frontend/
├── app/
│   ├── page.jsx                       # Accueil — existant, refonte
│   ├── drivers/
│   │   ├── page.jsx                   # Liste pilotes — existant, refonte
│   │   └── [slug]/page.jsx            # Détail pilote — existant, refonte
│   ├── teams/[slug]/page.jsx          # Détail écurie — existant, refonte
│   ├── circuits/[slug]/page.jsx       # Détail circuit — existant, refonte
│   ├── races/[year]/[round]/page.jsx  # Détail course — existant, refonte
│   ├── seasons/[year]/page.jsx        # Détail saison — existant, refonte
│   └── favoris/
│       └── page.jsx                   # NOUVEAU — page favoris
│
├── components/
│   ├── drivers/     # DriverCard, DriversGrid, DriversFilter, DriversSearch — à
│   │                # faire évoluer (casque + icône favori sur DriverCard)
│   ├── teams/       # TeamCard + nouveaux blocs éditoriaux dynamiques
│   ├── circuits/    # CircuitCard + nouveau composant de tracé stylisé (iso/3D)
│   ├── seasons/     # NOUVEAU — classement + calendrier de saison
│   ├── races/       # NOUVEAU — tableau résultats + qualifications
│   ├── favoris/     # NOUVEAU — regroupement par catégorie, état vide
│   ├── account/     # NOUVEAU — point d'entrée connexion/avatar
│   ├── layout/      # Header.jsx à modifier (entrée compte), Footer, NavLinks
│   └── ui/          # Flag, Pagination, + FavoriteButton (NOUVEAU, partagé)
│
├── lib/
│   ├── api.js               # Client API SpeedTrack existant (drivers, teams,
│   │                         # circuits, seasons, races, regulations)
│   └── fixtures/
│       ├── drivers.js        # Existant
│       ├── helmets.js        # NOUVEAU — casques par pilote/saison (fictif)
│       ├── favorites.js      # NOUVEAU — favoris fictifs pour la maquette
│       └── account.js        # NOUVEAU — utilisateur fictif pour la maquette
│
└── app/globals.css   # Tokens de couleur — vérifier/aligner sur la palette du brief
```

**Structure Decision**: Un seul projet concerné (frontend Next.js App Router déjà en
place). On étend l'arborescence existante par page/domaine plutôt que d'introduire une
nouvelle couche d'architecture : chaque route existante est refondue sur place, une
route et un dossier de composants sont ajoutés pour `favoris`, et un dossier
`components/account` est ajouté pour le point d'entrée compte utilisateur dans le
header. Les données non encore backées (casques, favoris, compte) passent par de
nouvelles fixtures locales plutôt que par un nouveau service, en cohérence avec le
statut "maquette" de la feature (cf. Assumptions du spec).

## Complexity Tracking

*Aucune violation à justifier — pas de gate de constitution définie (voir Constitution
Check ci-dessus) et la structure retenue étend l'existant sans couche supplémentaire.*
