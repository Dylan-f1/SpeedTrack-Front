const API_PAGE_LIMIT = 100
// La liste des écuries et le plateau changent rarement (resynchronisation manuelle) : un
// cache d'une heure évite de consommer le quota de l'API, partagé par tous les visiteurs
const LIST_REVALIDATE_SECONDS = 3600

async function fetchApi(path) {
  const res = await fetch(`${process.env.API_URL}${path}`, {
    next: { revalidate: LIST_REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — ${path}`)
  return res.json()
}

// L'API plafonne à 100 résultats par page : on récupère toutes les pages pour avoir les 214 écuries
async function fetchAllTeams() {
  const firstPage = await fetchApi(`/teams?limit=${API_PAGE_LIMIT}&page=1`)
  const remainingPageNumbers = Array.from(
    { length: Math.max(0, firstPage.totalPages - 1) },
    (_, index) => index + 2
  )
  const remainingPages = await Promise.all(
    remainingPageNumbers.map((page) => fetchApi(`/teams?limit=${API_PAGE_LIMIT}&page=${page}`))
  )
  return [firstPage, ...remainingPages].flatMap((page) => page.data)
}

async function fetchCurrentSeasonEntries() {
  const { data: seasons } = await fetchApi('/seasons?limit=1')
  const currentYear = seasons[0]?.year ?? null
  if (!currentYear) return { currentYear, entries: [] }

  const { data: entries } = await fetchApi(
    `/driver-entries?year=${currentYear}&limit=${API_PAGE_LIMIT}`
  )
  return { currentYear, entries }
}

function groupDriversByTeamSlug(entries) {
  const driversByTeamSlug = new Map()
  for (const { team, driver, carNumber } of entries) {
    if (!team) continue
    const drivers = driversByTeamSlug.get(team.slug) ?? []
    drivers.push({ ...driver, carNumber })
    driversByTeamSlug.set(team.slug, drivers)
  }
  for (const drivers of driversByTeamSlug.values()) {
    drivers.sort((a, b) => (a.carNumber ?? Infinity) - (b.carNumber ?? Infinity))
  }
  return driversByTeamSlug
}

export async function getTeamsData() {
  const [teams, { currentYear, entries }] = await Promise.all([
    fetchAllTeams(),
    fetchCurrentSeasonEntries(),
  ])
  const driversByTeamSlug = groupDriversByTeamSlug(entries)

  const currentTeams = teams
    .filter((team) => driversByTeamSlug.has(team.slug))
    .map((team) => ({ team, drivers: driversByTeamSlug.get(team.slug) }))
  const historicalTeams = teams.filter((team) => !driversByTeamSlug.has(team.slug))

  return { teams, currentYear, currentTeams, historicalTeams }
}
