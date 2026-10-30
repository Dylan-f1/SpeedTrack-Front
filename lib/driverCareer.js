// Mise en forme de la carrière d'un pilote à partir de ses engagements saison par saison
// (`seasons` de GET /drivers/:slug : [{ year, carNumber, team: { name, slug, primaryColor } }])

// Écuries historiques sans couleur en base : nuances de gris en alternance plutôt qu'une
// couleur inventée, pour distinguer deux écuries voisines sans tromper sur leur livrée
const FALLBACK_GREYS = ['#6a6a69', '#9a9a99', '#4a4a49']

// [2003, 2004, 2005, 2008] → « 2003–2006, 2008 » ; la période en cours finit par « présent »
function formatYearRanges(years, latestYear, isCurrent) {
  const ranges = []
  for (const year of years) {
    const last = ranges.at(-1)
    if (last && year === last.to + 1) last.to = year
    else ranges.push({ from: year, to: year })
  }
  return ranges
    .map(({ from, to }) => {
      if (isCurrent && to === latestYear) return `${from}–présent`
      return from === to ? `${from}` : `${from}–${to}`
    })
    .join(', ')
}

// Bilan par écurie, dans l'ordre d'arrivée : couleur, saisons disputées et années
export function getTeamTally(seasons, isCurrent) {
  const latestYear = seasons.at(-1)?.year
  const tally = new Map()
  let greyIndex = 0

  for (const { year, team } of seasons) {
    if (!tally.has(team.slug)) {
      const color = team.primaryColor ?? FALLBACK_GREYS[greyIndex++ % FALLBACK_GREYS.length]
      tally.set(team.slug, { ...team, color, years: [] })
    }
    const teamYears = tally.get(team.slug).years
    if (!teamYears.includes(year)) teamYears.push(year)
  }

  return [...tally.values()].map((team) => ({
    ...team,
    seasonCount: team.years.length,
    ranges: formatYearRanges(team.years, latestYear, isCurrent),
  }))
}
