const API_PAGE_LIMIT = 100
const NO_STORE = { cache: 'no-store' }
const HTTP_NOT_FOUND = 404

// 404 = ressource absente (saison inexistante) ; toute autre erreur (quota de l'API
// dépassé, serveur indisponible) remonte à l'écran d'erreur au lieu d'afficher une page vide
async function fetchJson(path) {
  const res = await fetch(`${process.env.API_URL}${path}`, NO_STORE)
  if (res.status === HTTP_NOT_FOUND) return null
  if (!res.ok) throw new Error(`API error ${res.status} — ${path}`)
  return res.json()
}

// L'API plafonne à 100 résultats par page : certaines saisons des années 50
// dépassent ce plateau (pilotes de l'Indy 500), on récupère donc toutes les pages.
async function fetchAllDriverEntries(year) {
  const entriesPath = (page) => `/driver-entries?year=${year}&limit=${API_PAGE_LIMIT}&page=${page}`
  const firstPage = await fetchJson(entriesPath(1))
  if (!firstPage) return []

  const remainingPageNumbers = Array.from(
    { length: Math.max(0, firstPage.totalPages - 1) },
    (_, index) => index + 2
  )
  const remainingPages = await Promise.all(
    remainingPageNumbers.map((page) => fetchJson(entriesPath(page)))
  )

  return [firstPage, ...remainingPages].flatMap((page) => page?.data ?? [])
}

export async function getSeasonData(year) {
  const [season, driverStandings, constructorStandings, races, seasons, driverEntries] =
    await Promise.all([
      fetchJson(`/seasons/${year}`),
      fetchJson(`/seasons/${year}/standings/drivers`),
      fetchJson(`/seasons/${year}/standings/constructors`),
      fetchJson(`/seasons/${year}/races`),
      fetchJson(`/seasons?limit=${API_PAGE_LIMIT}`),
      fetchAllDriverEntries(year),
    ])

  return {
    season,
    driverStandings: driverStandings ?? [],
    constructorStandings: constructorStandings ?? [],
    races: races ?? [],
    seasonYears: (seasons?.data ?? []).map((item) => item.year),
    driverEntries,
  }
}

// Regroupe les engagements (un par couple pilote / écurie) par pilote,
// un pilote ayant pu courir pour plusieurs écuries dans la même saison.
export function groupEntriesByDriver(entries) {
  const driversBySlug = new Map()

  for (const entry of entries) {
    const current = driversBySlug.get(entry.driver.slug) ?? {
      driver: entry.driver,
      teams: [],
      carNumbers: [],
    }
    if (entry.team && !current.teams.some((team) => team.slug === entry.team.slug)) {
      current.teams.push(entry.team)
    }
    if (entry.carNumber != null && !current.carNumbers.includes(entry.carNumber)) {
      current.carNumbers.push(entry.carNumber)
    }
    driversBySlug.set(entry.driver.slug, current)
  }

  return [...driversBySlug.values()].sort((a, b) =>
    a.driver.lastName.localeCompare(b.driver.lastName, 'fr')
  )
}

export function groupEntriesByTeam(entries) {
  const teamsBySlug = new Map()

  for (const entry of entries) {
    if (!entry.team) continue
    const current = teamsBySlug.get(entry.team.slug) ?? { team: entry.team, drivers: [] }
    if (!current.drivers.some((driver) => driver.slug === entry.driver.slug)) {
      current.drivers.push(entry.driver)
    }
    teamsBySlug.set(entry.team.slug, current)
  }

  return [...teamsBySlug.values()].sort((a, b) => a.team.name.localeCompare(b.team.name, 'fr'))
}
