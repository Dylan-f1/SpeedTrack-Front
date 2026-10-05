import {
  ERA_2026_CATEGORY,
  ERA_2026_KEYWORDS,
  ERA_2026_PILLARS,
  FAQ_CATEGORY,
  FAQ_ITEMS,
  FAQ_KEYWORDS,
  POINTS_CATEGORY,
  POINTS_KEYWORDS,
  POINTS_MAIN,
  POINTS_SPRINT,
  RACE_FLAGS,
  RACE_FLAGS_CATEGORY,
  RACE_FLAGS_KEYWORDS,
  REGULATION_PILLARS,
} from '@/lib/content/regulations'

// Texte en minuscules dans lequel la barre de recherche cherche une sous-chaîne.
const toSearchIndex = (textParts) => textParts.filter(Boolean).join(' ').toLowerCase()

const describeSegments = (segments) =>
  segments.map((segment) => [segment.label, segment.text, segment.strong].join(' '))

const describePointsTable = (table) => [
  table.title,
  table.badge,
  table.info.text,
  ...table.rows.map((row) => `${row.label} ${row.points}`),
]

export const PILLAR_SEARCH_INDEXES = Object.fromEntries(
  REGULATION_PILLARS.map((pillar) => [
    pillar.id,
    toSearchIndex([
      pillar.keywords,
      pillar.title,
      pillar.description,
      ...pillar.items.map((item) => `${item.label} ${item.text}`),
    ]),
  ])
)

export const RACE_FLAGS_SEARCH_INDEX = toSearchIndex([
  RACE_FLAGS_KEYWORDS,
  ...RACE_FLAGS.flatMap((flag) => [
    flag.title,
    flag.statusLabel,
    ...describeSegments(flag.description),
  ]),
])

export const POINTS_SEARCH_INDEX = toSearchIndex([
  POINTS_KEYWORDS,
  ...describePointsTable(POINTS_MAIN),
  ...describePointsTable(POINTS_SPRINT),
])

export const ERA_2026_SEARCH_INDEX = toSearchIndex([
  ERA_2026_KEYWORDS,
  ...ERA_2026_PILLARS.flatMap((pillar) => [
    pillar.eyebrow,
    pillar.title,
    pillar.footer,
    ...describeSegments(pillar.description),
  ]),
])

export const FAQ_SEARCH_INDEX = toSearchIndex([
  FAQ_KEYWORDS,
  ...FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`),
])

// Blocs filtrables de la page, utilisés pour compter les résultats de recherche.
export const REGULATION_SEARCH_UNITS = [
  ...REGULATION_PILLARS.map((pillar) => ({
    category: pillar.category,
    searchIndex: PILLAR_SEARCH_INDEXES[pillar.id],
  })),
  { category: RACE_FLAGS_CATEGORY, searchIndex: RACE_FLAGS_SEARCH_INDEX },
  { category: POINTS_CATEGORY, searchIndex: POINTS_SEARCH_INDEX },
  { category: ERA_2026_CATEGORY, searchIndex: ERA_2026_SEARCH_INDEX },
  { category: FAQ_CATEGORY, searchIndex: FAQ_SEARCH_INDEX },
]
