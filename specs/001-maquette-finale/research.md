# Phase 0 Research: Refonte de la maquette finale SpeedTrack

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Aucun marqueur `[NEEDS CLARIFICATION]` n'a été laissé dans le Technical Context du
plan (voir `spec.md` → Assumptions et checklist de qualité, déjà validée). Les points
ci-dessous documentent les décisions techniques prises pour lever les ambiguïtés
restantes, au format Decision/Rationale/Alternatives.

## 1. Maquettes livrées comme vraies pages Next.js plutôt que comme images statiques

- **Decision**: Construire les 16 déclinaisons (8 pages × desktop/mobile) comme de
  vraies routes/composants Next.js App Router, navigables dans le navigateur via
  `npm run dev`, plutôt que comme des exports visuels statiques (Figma, PNG, etc.).
- **Rationale**: Le projet n'a pas d'outil de design externe en place ; le brief exige
  un rendu "pensé et dessiné à la main", vérifiable en conditions réelles (police,
  espacement, comportements sticky/hover) — un livrable HTML/CSS réel permet de
  valider directement les heuristiques de Nielsen (retour arrière, fil d'Ariane,
  états vides) qu'une image ne peut pas démontrer.
- **Alternatives considered**: Maquettes Figma statiques (rejeté : pas d'outil Figma
  connecté au projet, et risque de divergence avec le rendu réel Tailwind) ; pages
  HTML isolées hors du projet Next.js (rejeté : dupliquerait le design system au lieu
  de le construire dans les composants réutilisables par le futur développement).

## 2. Bascule de version desktop/mobile

- **Decision**: Deux compositions distinctes par page (pas un seul layout responsive
  fluide), sélectionnées via les breakpoints Tailwind existants, chacune avec sa
  propre hiérarchie de sections plutôt qu'un simple empilement/masquage de la version
  desktop.
- **Rationale**: Contrainte explicite du brief ("pas une seule maquette responsive
  unique", répartition 50/50 de l'effort) — la densité d'info d'un dashboard
  télémétrie ne se traduit pas nativement en mobile sans repenser l'ordre des blocs
  (ex. rail casques sticky en desktop → carrousel horizontal en mobile).
- **Alternatives considered**: Un unique composant avec classes responsive Tailwind
  (rejeté : ne satisfait pas la contrainte explicite et produit un résultat mobile
  générique, à l'opposé de l'exigence de qualité du brief).

## 3. Données nouvelles (casques, favoris, compte) via fixtures locales

- **Decision**: Introduire `lib/fixtures/helmets.js`, `favorites.js`, `account.js`
  (données fictives), plutôt que d'étendre `lib/api.js` vers de nouveaux endpoints
  backend.
- **Rationale**: Cette feature est une maquette de design frontend ; le backend
  Express/MongoDB n'a ni collection `favorites`/`helmets`, ni authentification. Créer
  ces endpoints sortirait du périmètre de la spec (voir Assumptions : "données
  fictives à ce stade de maquette"). Les fixtures suivent la même forme de données que
  l'API réelle pour minimiser le coût de migration lors d'une future feature backend.
- **Alternatives considered**: Stub via routes API Next.js internes (`app/api/...`)
  simulant un vrai backend (rejeté pour cette itération : complexité inutile pour un
  livrable de maquette ; à reconsidérer si `/speckit-plan` est relancé pour une
  feature "compte utilisateur" dédiée) ; état en mémoire React sans fixture partagée
  (rejeté : ne permet pas de pré-remplir des favoris pour démontrer la page `/favoris`
  non vide).

## 4. Tracé de circuit stylisé (isométrique/3D) et casques de pilotes

- **Decision**: Représentations vectorielles stylisées (SVG/CSS, perspective ou
  isométrie simulée), pas de modèles 3D réels ni de rendu 3D moteur (WebGL/Three.js).
- **Rationale**: Aucun asset 3D ni photo de tracé en vue isométrique n'est disponible
  (Assumptions du spec) ; introduire une dépendance de rendu 3D pour une maquette de
  design serait disproportionné et hors du périmètre "maquette" de cette feature.
- **Alternatives considered**: Intégration Three.js/react-three-fiber pour un vrai
  rendu 3D du tracé (rejeté pour cette feature : coût technique élevé, aucune
  exigence de spec ne demande une interactivité 3D réelle — seulement une "impression
  de profondeur") ; schéma plat 2D (rejeté : violerait explicitement FR-004).

## 5. Traitement "plus animé" de la page écurie sans interactivité réelle

- **Decision**: Sur cette itération de maquette, documenter les intentions
  d'animation/interaction (hover, transitions, reveal au scroll) en commentaire ou
  légende visuelle directement sur la page, plutôt que d'implémenter des animations
  JS complexes.
- **Rationale**: Le brief autorise explicitement une maquette statique à condition de
  "suggérer clairement les intentions de mouvement/interaction prévues pour le
  développement" — cohérent avec le périmètre "maquette" plutôt que "produit fini".
- **Alternatives considered**: Implémenter dès maintenant de vraies animations
  (Framer Motion, CSS scroll-driven animations) — non rejeté définitivement, mais
  différé : à faire seulement si le temps le permet, sans bloquer la livraison des 16
  déclinaisons.

## 6. Absence de tests automatisés pour cette feature

- **Decision**: Pas de suite de tests unitaires/e2e à écrire pour cette feature ;
  validation par revue visuelle manuelle (desktop + mobile) des 16 déclinaisons.
- **Rationale**: Le projet frontend n'a pas de framework de test installé à ce jour,
  et la feature est un livrable de design (pas de logique métier testable) — les
  Success Criteria du spec sont eux-mêmes formulés comme des critères d'inspection
  visuelle/parcours (SC-001 à SC-005), pas comme des assertions automatisables.
- **Alternatives considered**: Introduire Playwright/Vitest pour cette feature
  (rejeté : disproportionné pour une maquette, à réévaluer lors d'une feature
  d'implémentation fonctionnelle ultérieure).
