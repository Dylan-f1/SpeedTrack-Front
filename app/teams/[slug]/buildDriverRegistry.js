import { formatYearRanges } from '@/components/teams/teamPeriods'

const MODERN_ERA_START = 1996

// Transforme « pilotes par année » en registre « un pilote = une entrée », avec sa
// période de présence dans l'écurie. Calculé côté serveur pour n'envoyer au
// composant client que les données utiles au filtrage et à la pagination.
export function buildDriverRegistry(driversByYear) {
  const driversBySlug = new Map()

  driversByYear.forEach(({ year, drivers }) => {
    drivers.forEach((driver) => {
      const entry = driversBySlug.get(driver.slug) ?? {
        slug: driver.slug,
        firstName: driver.firstName,
        lastName: driver.lastName,
        nationality: driver.nationality,
        carNumber: null,
        years: [],
      }
      if (!entry.years.includes(year)) entry.years.push(year)
      // driversByYear est trié par année décroissante : le premier numéro rencontré est le plus récent
      if (entry.carNumber == null && driver.carNumber != null) entry.carNumber = driver.carNumber
      driversBySlug.set(driver.slug, entry)
    })
  })

  return [...driversBySlug.values()]
    .map(({ years, ...driver }) => {
      const sortedYears = [...years].sort((a, b) => a - b)
      const firstYear = sortedYears[0]
      const lastYear = sortedYears.at(-1)

      return {
        ...driver,
        firstYear,
        lastYear,
        seasonsCount: sortedYears.length,
        yearsLabel: formatYearRanges(sortedYears),
        hasGaps: sortedYears.length !== lastYear - firstYear + 1,
        isModern: lastYear >= MODERN_ERA_START,
        isClassic: firstYear < MODERN_ERA_START,
      }
    })
    .sort(
      (a, b) =>
        b.lastYear - a.lastYear ||
        b.firstYear - a.firstYear ||
        a.lastName.localeCompare(b.lastName, 'fr')
    )
}
