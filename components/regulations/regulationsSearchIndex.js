// Texte en minuscules dans lequel la barre de recherche cherche une sous-chaîne.
const toSearchIndex = (textParts) => textParts.filter(Boolean).join(' ').toLowerCase()

const describeSegments = (segments) =>
  segments.map((segment) => [segment.label, segment.text, segment.strong].join(' '))

const describePointsTable = (table) => [
  table.title,
  table.badge,
  table.info?.text,
  ...table.rows.map((row) => `${row.label} ${row.points}`),
]

// Construit, à partir du règlement reçu de l'API, le texte indexé de chaque bloc
// filtrable de la page et la liste des blocs utilisée pour compter les résultats
export function buildRegulationSearchIndexes({ pillars, raceFlags, points, highlights, faq }) {
  const pillarIndexes = Object.fromEntries(
    pillars.map((pillar) => [
      pillar.id,
      toSearchIndex([
        pillar.keywords,
        pillar.title,
        pillar.description,
        ...pillar.items.map((item) => `${item.label} ${item.text}`),
      ]),
    ])
  )

  const raceFlagsIndex = toSearchIndex([
    raceFlags.keywords,
    ...raceFlags.flags.flatMap((flag) => [
      flag.title,
      flag.statusLabel,
      ...describeSegments(flag.description),
    ]),
  ])

  const pointsIndex = toSearchIndex([
    points.keywords,
    ...describePointsTable(points.main),
    ...describePointsTable(points.sprint),
  ])

  const highlightsIndex = toSearchIndex([
    highlights.keywords,
    highlights.title,
    highlights.intro,
    ...highlights.pillars.flatMap((pillar) => [
      pillar.eyebrow,
      pillar.title,
      pillar.footer,
      ...describeSegments(pillar.description),
    ]),
  ])

  const faqIndex = toSearchIndex([
    faq.keywords,
    ...faq.items.map((item) => `${item.question} ${item.answer}`),
  ])

  const units = [
    ...pillars.map((pillar) => ({
      category: pillar.category,
      searchIndex: pillarIndexes[pillar.id],
    })),
    { category: raceFlags.category, searchIndex: raceFlagsIndex },
    { category: points.category, searchIndex: pointsIndex },
    { category: highlights.category, searchIndex: highlightsIndex },
    { category: faq.category, searchIndex: faqIndex },
  ]

  return { pillarIndexes, raceFlagsIndex, pointsIndex, highlightsIndex, faqIndex, units }
}
