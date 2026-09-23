# Quickstart: valider la maquette finale SpeedTrack

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Cette feature étant une maquette de design, la validation se fait par parcours visuel
manuel des 16 déclinaisons (8 pages × desktop/mobile), pas par une suite de tests
automatisés (voir `research.md` §6).

## Prérequis

- Node.js 20+, dépendances installées (`npm install` dans `speedtrack-frontend/`).
- Backend SpeedTrack lancé sur `http://localhost:5000` pour les pages qui lisent des
  données réelles via `lib/api.js` (pilotes, écuries, circuits, courses, saisons).
  Les pages/sections alimentées par les nouvelles fixtures (casques, favoris, compte)
  n'ont pas besoin du backend.

## Lancer la maquette

```bash
cd speedtrack-frontend
npm run dev
```

Ouvrir `http://localhost:3000`.

## Scénarios de validation (repris des Acceptance Scenarios du spec)

Pour chaque page, valider en fenêtre desktop large (≥ 1280px) **et** en largeur mobile
(≤ 430px, via les devtools navigateur) — les deux déclinaisons doivent être
consultables sans que l'une masque simplement l'autre.

1. **Accueil (`/`)** — saison en cours visible immédiatement, accès rapide
   pilotes/écuries/circuits/règlements, dernier résultat de course, point d'entrée
   compte visible dans le header.
2. **Liste pilotes (`/drivers`)** — chaque carte affiche photo, écurie actuelle,
   nationalité, un repère visuel de casque et une icône favori.
3. **Détail pilote (`/drivers/:slug`)** — bio, stats de carrière, historique
   écuries par saison, icône favori ; sur desktop, faire défiler le contenu principal
   et vérifier que le rail de casques reste visible (US3.1) ; sur mobile, vérifier le
   balayage horizontal de la galerie de casques (US3.2).
   - Cas pilote légende (écurie actuelle `null`) : pas de lien écurie, mention
     "légende" affichée à la place.
   - Cas pilote à un seul casque enregistré : la section s'affiche quand même.
4. **Détail écurie (`/teams/:slug`)** — identité, historique, pilotes actuels/passés,
   palmarès, icône favori ; vérifier que la couleur de livrée est utilisée comme
   élément graphique fort et que le traitement est visiblement plus éditorial/moins
   "tableau" que les autres pages détail ; si des animations ne sont pas implémentées,
   vérifier qu'une légende/annotation décrit l'intention (hover, transition, reveal).
5. **Détail circuit (`/circuits/:slug`)** — longueur, virages, pays, historique des
   vainqueurs, icône favori, et un tracé stylisé donnant une impression de profondeur
   (pas un schéma plat).
6. **Détail course (`/races/:year/:round`)** — résultats course + qualifications,
   classement complet lisible (scan visuel prioritaire sur la décoration).
7. **Détail saison (`/seasons/:year`)** — classement pilotes et constructeurs
   (calculés), calendrier des courses de la saison.
8. **Favoris (`/favoris`)** — ajouter un pilote, une écurie et un circuit en favori
   depuis leurs fiches respectives (icône favori), puis vérifier qu'ils apparaissent
   regroupés par catégorie sur `/favoris` ; retirer un favori et vérifier la mise à
   jour immédiate de l'icône (US2.1/US2.2) ; vider tous les favoris et vérifier l'état
   vide explicite (US2.4).

## Vérification transversale (heuristiques de Nielsen)

- Naviguer vers une URL invalide (`/drivers/pilote-inexistant`) → message clair "élément
  introuvable" + lien de retour vers une liste pertinente.
- Sur chaque page de liste/filtre, vérifier qu'un état "aucun résultat" est prévu
  plutôt qu'une page vide silencieuse.
- Vérifier la cohérence des patterns de carte/tableau/navigation d'une page à l'autre.

## Critères de sortie (Success Criteria du spec)

- SC-001 : depuis l'accueil, atteindre n'importe quelle fiche pilote/écurie/circuit en
  2 clics maximum.
- SC-003 : sur desktop, l'essentiel de chaque page tient en ~2 hauteurs d'écran de
  défilement.
- SC-004 : les 8 pages ont chacune une version desktop et mobile distincte, sans
  exception.
