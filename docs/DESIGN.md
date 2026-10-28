# Design — « Ligne de course »

Identité choisie par Dylan le 2026-10-28, après plusieurs tours (voir `DECISIONS.md`). Prototype de
référence : `public/identite.html` (variante C) et `public/generique.html` pour la déclinaison
des pages.

## Concept

SpeedTrack se parcourt comme un tour de piste. La **trajectoire** (la ligne idéale qu'un pilote
suit d'un virage à l'autre) est la signature : un trait rouge qui relie les étapes d'une page et se
dessine au défilement. Les étapes d'un parcours sont des **virages** numérotés (V1, V2…), seulement
quand le contenu est vraiment une suite.

Le reste reste sobre : la F1 vient des données, des couleurs d'écurie et de la trajectoire, pas
d'un décor.

## Signature

- Logo : petit virage avec son point de corde, puis « SpeedTrack » en Schibsted Grotesk 900.
- Trajectoire : trait rouge de 3 px, extrémités arrondies, posé sur une piste fantôme en
  pointillés gris ; se dessine selon la progression du défilement ; masquée sous 1024 px ; pas
  d'animation si `prefers-reduced-motion`.
- Ouverture de page : le titre de la page en très grand, sur toute la largeur, **entier** (jamais
  coupé par le bord).

## Typographie

- Une seule famille : **Schibsted Grotesk** (Google Fonts, via `next/font`).
- 900 pour les titres géants, 800 pour les titres de section, 600–700 pour les noms et chiffres,
  400–500 pour le texte.
- Interlettrage serré sur les titres (−0,06 em pour le titre géant, −0,03 à −0,04 em ailleurs).
- Chiffres en `tabular-nums` dans les statistiques.
- Pas de capitales forcées sur les libellés ni de petit sur-titre au-dessus des titres.

## Couleurs

Couleurs du site actuel, conservées à la demande de Dylan :

| Rôle | Valeur |
|---|---|
| Fond | `#131313` |
| Surface | `#1c1b1b` |
| Bordure | `#353534` |
| Texte | `#e5e2e1` |
| Texte secondaire | `#c8c6c5` |
| Texte discret | `#8e8e8e` |
| Accent, trajectoire | `#e10600` |

Sur les fiches pilote et écurie, l'accent prend la **couleur de l'écurie** (`Team.primaryColor`).

## Mise en page

- Sections en deux colonnes : titre fixe à gauche (sticky), contenu à droite ; une colonne sous
  1024 px.
- Listes en lignes séparées par des filets, pas de cartes ; survol = décalage de 16 px et trait
  d'accent à gauche.
- Écran partagé couleur d'écurie + texte pour les blocs pilote ou écurie mis en avant.

## Images

- Hero de l'accueil : image en base (`SiteContent` « home-hero »), servie à sa taille d'origine
  (1376 × 768, image générée par Stitch). Diaporama prévu quand d'autres images seront fournies.
- Pas de photo créditée : Dylan refuse l'affichage du crédit photographe.
