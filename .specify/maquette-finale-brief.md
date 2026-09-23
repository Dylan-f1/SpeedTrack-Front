SpeedTrack — Brief de maquette (site web F1)

CONTEXTE PRODUIT
SpeedTrack est une plateforme F1 gratuite et exhaustive (pilotes, écuries, circuits,
saisons, résultats, règlements), pensée pour les fans débutants comme confirmés.
Le contenu doit donner l'impression d'un outil de référence sérieux, pas d'un blog.
Un compte utilisateur est prévu, notamment pour les favoris : au-delà du confort
personnel, ce système doit servir de cas d'usage à des créateurs de contenu (YouTube
F1 et autres) qui veulent constituer et organiser des listes de pilotes/écuries/
circuits pour préparer leurs vidéos.

IDENTITÉ VISUELLE À CONSERVER
- Thème sombre uniquement (pas de mode clair)
- Fond principal quasi noir : #131313
- Surfaces / cartes : #1c1b1b, surfaces élevées #2a2a2a
- Bordures subtiles : #353534 / #393939
- Rouge accent (identité de marque) : #e10600, variante claire #ff4d4d
- Texte : blanc #ffffff (primaire), gris clair #c8c6c5 (secondaire), gris #717070 (muted)
- Typo : sans-serif type Geist, très lisible, pas de fioritures

INSPIRATION
Dashboards de course et écrans de télémétrie F1 officiels, F1.com, Autosport
(autosport.com) pour le ton éditorial et la densité d'info journalistique sport,
mais avec une exécution plus épurée et un système de couleurs strictement limité
à la palette ci-dessus.

DIRECTION DEMANDÉE
Ce n'est PAS un simple re-skin des pages actuelles. Repartir d'une feuille blanche sur
la mise en page, la hiérarchie d'information et les composants — mais rester fidèle
à l'identité de couleurs et à une ambiance "cockpit / télémétrie F1" : dense en
données mais lisible, précis, avec des accents rouges utilisés avec parcimonie
(CTA, états actifs, highlights) plutôt que partout.

POSTURE DE CONCEPTION — TROIS REGARDS CROISÉS
Chaque page doit être conçue en assumant simultanément trois postures, pas une seule :
- En UX Designer : penser d'abord structure, hiérarchie de l'information, parcours
  utilisateur, logique de navigation — avant toute question esthétique. C'est ce
  niveau qui doit satisfaire les heuristiques de Nielsen listées plus bas.
- En UI Designer : une fois la structure posée, soigner l'exécution visuelle — grille,
  typographie, espacement, usage de la couleur, micro-détails qui donnent une
  impression de finition professionnelle et non générique.
- En utilisateur final (fan de F1 ou créateur de contenu) : se demander concrètement
  "est-ce que j'ai envie de rester sur cette page ?", "est-ce que je comprends
  immédiatement où cliquer pour trouver ce que je cherche ?", "est-ce que cette page
  me procure du plaisir à consulter ou juste de l'info froide ?"
Une page n'est considérée aboutie que si elle passe les trois filtres.

ÉQUILIBRE MINIMALISME / ENGAGEMENT
Éviter le scroll excessif : privilégier une information dense mais bien organisée
plutôt que des pages qui s'étirent inutilement (sections courtes, contenu priorisé
au-dessus de la ligne de flottaison). Rester minimaliste dans le traitement visuel,
mais pas austère : chaque page doit avoir au moins un ou deux moments "cool" qui
donnent envie de rester sur le site et d'explorer (mise en scène visuelle forte d'un
élément clé — photo pilote, livrée écurie, tracé de circuit — pas juste des blocs de
texte et des tableaux). L'objectif est la rétention, pas la densité pure.

EXIGENCE DE QUALITÉ — IMPORTANT
Ceci est une maquette de design, pas un prototype généré rapidement. Le résultat doit
avoir l'air pensé et dessiné à la main par un·e designer produit, avec des détails
d'exécution intentionnels (grille cohérente, alignements précis, micro-hiérarchie
typographique, espacements asymétriques réfléchis) — PAS l'aspect générique d'une
maquette produite par une IA (pas de gradients décoratifs gratuits, pas de rangées
d'icônes interchangeables, pas de symétrie parfaite systématique, pas de cartes
toutes identiques sans variation). Chaque page doit respecter les 10 heuristiques
d'utilisabilité de Jakob Nielsen :
1. Visibilité de l'état du système (indiquer où on est : saison active, filtres actifs...)
2. Correspondance entre le système et le monde réel (vocabulaire F1 authentique)
3. Contrôle et liberté de l'utilisateur (retour arrière, fil d'Ariane clair)
4. Cohérence et standards (mêmes patterns de carte/tableau/navigation partout)
5. Prévention des erreurs (états vides, filtres sans résultat pensés)
6. Reconnaissance plutôt que rappel (labels explicites, pas d'icônes ambiguës seules)
7. Flexibilité et efficacité d'usage (accès rapide pilotes/écuries/saisons depuis l'accueil)
8. Design esthétique et minimaliste (pas de surcharge, hiérarchie claire)
9. Aide à la reconnaissance/diagnostic/récupération des erreurs (états 404, no data)
10. Aide et documentation (contexte suffisant sans mode d'emploi nécessaire)

PAGES À MAQUETTER

1. Accueil (/)
   Hub d'entrée : mise en avant de la saison en cours, accès rapide
   pilotes/écuries/circuits/règlements, dernier résultat de course.
   Point d'entrée compte utilisateur visible dans le header (connexion/avatar).

2. Liste pilotes (/drivers)
   Grille/liste de cartes pilotes avec photo, écurie actuelle, nationalité.
   Chaque carte intègre le casque du pilote (illustration/rendu du design de casque)
   comme élément visuel identitaire, ainsi qu'une icône favori.

3. Détail pilote (/drivers/:slug)
   Photo, bio, stats de carrière (victoires, podiums, points, titres), historique
   des écuries saison par saison. Icône favori sur la page.
   Section "Casques" en rail latéral sticky : reste visible pendant le défilement
   et présente la galerie des différents casques portés par le pilote au fil de
   sa carrière/des saisons.

4. Détail écurie (/teams/:slug)
   Identité écurie, historique, pilotes actuels/passés, palmarès. Icône favori.
   Traitement plus animé/dynamique que les autres pages détail : composition moins
   statique (sectionnement dynamique, couleur de livrée de l'écurie utilisée comme
   élément graphique fort, mise en scène moins "tableau" et plus éditoriale). Si la
   maquette est statique, suggérer clairement les intentions de mouvement/interaction
   prévues pour le développement (hover, transitions, reveal au scroll).

5. Détail circuit (/circuits/:slug)
   Infos circuit (longueur, virages, pays), historique des vainqueurs. Icône favori.
   Représentation visuelle du tracé du circuit : image ou conception stylisée en 3D
   du layout (vue isométrique ou perspective), pas seulement un schéma plat en 2D.

6. Détail course (/races/:year/:round)
   Résultats course + qualifications, classement complet.

7. Détail saison (/seasons/:year)
   Classement pilotes et constructeurs calculé, calendrier des courses de la saison.

8. Favoris (/favoris)
   Page dédiée listant les pilotes/écuries/circuits sauvegardés par l'utilisateur.
   Pensée pour un usage "outil de travail" (créateurs de contenu qui préparent des
   vidéos) tout en restant engageante visuellement — pas une liste austère : reprendre
   les mêmes traitements visuels forts (casques, livrées, tracés) que sur les pages
   sources plutôt qu'une simple liste texte.

CONTRAINTES
- Livrer DEUX maquettes distinctes et complètes par page : une version desktop et
  une version mobile (pas une seule maquette responsive unique) — répartition
  50% desktop / 50% mobile dans l'effort de conception
- Les classements/résultats sont des tableaux de données : la lisibilité et le scan
  visuel priment sur la décoration
- Photos pilotes/écuries en portrait, sourcées Wikimedia Commons (licence libre)

LIVRABLE ATTENDU
Pour chaque page listée : une maquette desktop ET une maquette mobile, avec une
hiérarchie visuelle claire, en respectant strictement la palette ci-dessus, les
heuristiques de Nielsen, la posture UX/UI/utilisateur ci-dessus, et l'équilibre
minimalisme/engagement décrit plus haut.
