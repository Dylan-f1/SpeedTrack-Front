// Contenu éditorial de la page Règlements (saison 2026) — données statiques, pas issues de l'API.

export const REGULATION_FILTERS = [
  { id: 'all', label: 'Tous' },
  { id: 'sportif', label: 'Sportif' },
  { id: 'technique', label: 'Technique' },
  { id: 'financier', label: 'Financier & Plafond' },
  { id: 'securite', label: 'Drapeaux & Sécurité' },
]

export const QUICK_METRICS = [
  { label: 'PLAFOND 2026', value: '215 M$' },
  { label: 'ÉCURIES', value: '11' },
  { label: 'MGU-K', value: '350 KW' },
]

export const REGULATION_PILLARS = [
  {
    id: 'sportif',
    category: 'sportif',
    badge: 'PILIER 01',
    tag: 'CODE SPORTIF FIA',
    title: 'Règlement Sportif',
    description:
      "Définit la tenue des compétitions, les protocoles d'engagement en piste, les pénalités applicables par les commissaires et les structures de qualification.",
    items: [
      {
        label: 'Format du Week-End :',
        text: 'Classique : EL1 et EL2 le vendredi, EL3 et qualifications le samedi, Grand Prix (environ 305 km) le dimanche. Sprint : EL1 et qualifications Sprint le vendredi, Sprint et qualifications le samedi.',
      },
      {
        label: 'Limites de Piste :',
        text: 'Ligne blanche faisant foi. 3 infractions = drapeau noir et blanc. 4e infraction = pénalité de 5 secondes.',
      },
      {
        label: 'Échelle des Pénalités :',
        text: '5s ou 10s ajoutées au pit-stop ou au temps final, Drive-Through, Stop & Go (10s), pénalité sur la grille de la course suivante.',
      },
      {
        label: 'Règle des 107% :',
        text: "Tout pilote échouant à réaliser un temps sous les 107% du meilleur tour en Q1 requiert l'autorisation explicite des commissaires.",
      },
    ],
    keywords:
      'sportif week-end sprint grille depart penalites temps 5s 10s limites piste qualifications 107%',
  },
  {
    id: 'technique',
    category: 'technique',
    badge: 'PILIER 02',
    tag: 'TECHNIQUE DIRECTIVE',
    title: 'Règlement Technique',
    description:
      'Cadre géométrique et mécanique des monoplaces : aérodynamique active, groupe propulseur hybride et tolérances structurelles de sécurité.',
    items: [
      {
        label: 'Unité de Puissance (PU) :',
        text: 'V6 Turbo 1.6L conservé, MGU-H supprimé, MGU-K porté à 350 kW. Carburant 100% durable.',
      },
      {
        label: 'Aérodynamique Active :',
        text: 'Ailerons avant et arrière mobiles en remplacement du DRS : faible traînée en ligne droite, appui maximal en virage.',
      },
      {
        label: 'Dimensions :',
        text: 'Empattement limité à 3400 mm et largeur à 1900 mm, pour des monoplaces plus compactes et plus légères.',
      },
      {
        label: 'Jantes & Pneus :',
        text: 'Roues 18 pouces Pirelli conservées, avec des pneus plus étroits que sur la génération précédente.',
      },
    ],
    keywords:
      'technique moteur v6 hybride turbo mgu-k mgu-h aero active aileron drs pirelli pneus 18 pouces dimensions empattement carburant durable',
  },
  {
    id: 'financier',
    category: 'financier',
    badge: 'PILIER 03',
    tag: 'COST CAP MONITORED',
    title: 'Règlement Financier',
    description:
      'Plafonnement des dépenses opérationnelles pour égaliser les chances compétitives et préserver la viabilité économique de chaque écurie.',
    items: [
      {
        label: 'Plafond Fixé à 215 M$ :',
        text: 'Dépenses relatives aux performances monoplace (développement, pièces, ingénierie et fret).',
      },
      {
        label: 'Exclusions Réglementaires :',
        text: 'Notamment les rémunérations des pilotes, les salaires des 3 plus hauts cadres et les dépenses marketing.',
      },
      {
        label: 'Dépassement Mineur (< 5%) :',
        text: 'Sanctionné financièrement ou par une réduction des essais aérodynamiques en soufflerie.',
      },
      {
        label: 'Dépassement Majeur (> 5%) :',
        text: 'Déduction de points aux championnats Constructeurs et Pilotes, ou exclusion complète du championnat.',
      },
    ],
    keywords:
      'financier budget cap plafond 215 m$ audit fia depenses eligibles sanctions amende soufflerie pilotes salaires',
  },
]

export const RACE_FLAGS_CATEGORY = 'securite'
export const RACE_FLAGS_KEYWORDS =
  'drapeaux securite safety car virtual safety car vsc drapeau jaune rouge vert bleu noir et blanc red flag yellow flag'

// `tone` est traduit en couleurs par RaceFlagCard.
export const RACE_FLAGS = [
  {
    code: 'YEL',
    tone: 'yellow',
    title: 'Drapeau Jaune',
    statusLabel: 'SECTEUR 1/2/3',
    description: [
      {
        label: 'Simple :',
        text: 'Ralentir impérativement, dépassements strictement interdits. Danger hors de la trajectoire directe.',
      },
      {
        label: 'Double Jaune :',
        text: "Danger majeur obstruant la piste. Se tenir prêt à changer de direction ou s'arrêter.",
      },
    ],
  },
  {
    code: 'GRN',
    tone: 'green',
    title: 'Drapeau Vert',
    statusLabel: 'PISTE LIBRE',
    description: [
      {
        text: 'Fin de zone de danger, restart après neutralisation ou début de séance. Vitesse normale de course autorisée et dépassements réactivés dès le franchissement du panneau.',
      },
    ],
  },
  {
    code: 'RED',
    tone: 'red',
    title: 'Drapeau Rouge',
    statusLabel: 'SUSPENSION',
    description: [
      {
        text: "Session immédiatement interrompue suite à un accident sévère ou une météo impraticable. Réduction immédiate d'allure et rentrée obligatoire dans la voie des stands.",
      },
    ],
  },
  {
    code: 'BLU',
    tone: 'blue',
    title: 'Drapeau Bleu',
    statusLabel: 'RETARDATAIRE',
    description: [
      {
        text: "Indique au pilote qu'une monoplace plus rapide le rattrape pour lui prendre un tour. Le retardataire doit faciliter le dépassement à la première occasion.",
      },
    ],
  },
  {
    code: 'B&W',
    tone: 'warning',
    title: 'Noir & Blanc',
    statusLabel: 'AVERTISSEMENT',
    description: [
      {
        text: 'Affiché avec le numéro de la monoplace. Signalement pour comportement non-sportif (tassement, changement intempestif de trajectoire au freinage ou abus des limites de piste).',
      },
    ],
  },
  {
    code: 'SC',
    tone: 'neutralisation',
    title: 'Safety Car / VSC',
    statusLabel: 'NEUTRALISATION',
    description: [
      {
        label: 'VSC :',
        text: 'Temps de référence minimal (delta) imposé par le boîtier électronique. Dépassements interdits.',
      },
      {
        label: 'SC :',
        text: 'Regroupement derrière la voiture de sécurité. La direction de course peut autoriser les retardataires à se dédoubler.',
      },
    ],
  },
]

export const POINTS_CATEGORY = 'sportif'
export const POINTS_KEYWORDS =
  'points bareme attribution top 10 course sprint meilleur tour grand prix victoire champion'

export const POINTS_MAIN = {
  icon: 'trophy',
  title: 'Course Principale (Grand Prix)',
  badge: 'TOP 10 PILOTES',
  rows: [
    { label: 'P1 (VICTOIRE)', points: 25, highlight: true },
    { label: 'P2', points: 18 },
    { label: 'P3', points: 15 },
    { label: 'P4', points: 12 },
    { label: 'P5', points: 10 },
    { label: 'P6', points: 8 },
    { label: 'P7', points: 6 },
    { label: 'P8', points: 4 },
    { label: 'P9', points: 2 },
    { label: 'P10', points: 1 },
  ],
  info: {
    icon: 'timer',
    text: 'Le point bonus du meilleur tour en course est supprimé depuis la saison 2025.',
  },
}

export const POINTS_SPRINT = {
  icon: 'bolt',
  title: 'Course Sprint (100 KM)',
  badge: 'TOP 8 SEULEMENT',
  rows: [
    { label: '1er', points: 8, highlight: true },
    { label: '2e', points: 7 },
    { label: '3e', points: 6 },
    { label: '4e', points: 5 },
    { label: '5e', points: 4 },
    { label: '6e', points: 3 },
    { label: '7e', points: 2 },
    { label: '8e', points: 1 },
  ],
  info: {
    icon: 'info',
    text: "Ni arrêt obligatoire au stand, ni obligation d'utiliser deux composés de pneus.",
  },
}

export const ERA_2026_CATEGORY = 'technique'
export const ERA_2026_KEYWORDS =
  '2026 nouvelle ere reglement moteur mgu-k mgu-h aero active aileron drs carburant durable dimensions poids'

export const ERA_2026_PILLARS = [
  {
    icon: 'air',
    eyebrow: 'AÉRODYNAMIQUE ACTIVE',
    title: 'Ailerons Avant & Arrière Mobiles',
    description: [
      { text: "Fin du DRS classique au profit d'ailerons actifs : une " },
      { strong: 'configuration à faible traînée' },
      { text: ' dans les lignes droites et une ' },
      { strong: 'configuration à fort appui' },
      { text: ' en virage.' },
    ],
    footer: 'FIN DU DRS',
  },
  {
    icon: 'electric_bolt',
    eyebrow: 'GROUPE HYBRIDE 50/50',
    title: '350 kW Électrique + Carburant Durable',
    description: [
      {
        text: 'Suppression du MGU-H. Le MGU-K triple sa puissance à 350 kW (~475 ch), pour une répartition proche de 50% thermique / 50% électrique, avec un carburant 100% durable.',
      },
    ],
    footer: 'CARBURANT 100% DURABLE',
  },
  {
    icon: 'straighten',
    eyebrow: 'CONCEPT « NIMBLE CAR »',
    title: '-20 cm Empattement / -10 cm Largeur',
    description: [
      {
        text: 'Monoplaces plus légères (environ 30 kg de moins en masse minimale), empattement réduit à 3400 mm max et largeur resserrée à 1900 mm pour gagner en agilité.',
      },
    ],
    footer: 'EMPATTEMENT 3400 MM · LARGEUR 1900 MM',
  },
]

export const FAQ_CATEGORY = 'sportif'
export const FAQ_KEYWORDS =
  'questions reponses faq regles clarifications parc ferme superlicence depart vole faux depart pneus composes'

export const FAQ_ITEMS = [
  {
    question: "Qu'implique exactement le « Parc Fermé » ?",
    answer:
      "Dès le début des qualifications, les monoplaces passent sous régime de Parc Fermé : les réglages ne peuvent plus être modifiés, hormis les rares ajustements autorisés par le règlement. Toute modification non autorisée oblige le pilote à s'élancer depuis la voie des stands.",
  },
  {
    question: 'Comment fonctionne la Superlicence à points ?',
    answer:
      'Chaque pilote peut cumuler au maximum 12 points de pénalité sur sa Superlicence sur une période glissante de 12 mois. Au 12e point, il est automatiquement suspendu pour le Grand Prix suivant.',
  },
  {
    question: 'Quelle est la règle des deux composés de pneus ?',
    answer:
      "Lors d'une course disputée sur le sec, chaque pilote doit utiliser au moins deux spécifications de pneus secs différentes (ex : Tendres puis Médiums). Cette contrainte est levée dès qu'un pneu pluie (Intermédiaire ou Wet) est chaussé.",
  },
  {
    question: 'Quelles sont les tolérances de faux départ ?',
    answer:
      "Un transpondeur officiel de la FIA détecte tout mouvement de la voiture avant l'extinction des cinq feux rouges. Au-delà de la tolérance du capteur, les commissaires sanctionnent le pilote, le plus souvent par une pénalité en temps ou un Drive-Through.",
  },
]
