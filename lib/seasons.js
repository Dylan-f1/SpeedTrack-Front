const API_PAGE_LIMIT = 100
// La liste des saisons ne change qu'une fois par an : cache d'une heure pour ménager le quota
const SEASONS_REVALIDATE_SECONDS = 3600

// Années de toutes les saisons, de la plus récente à la plus ancienne
export async function getSeasonYears() {
  const path = `/seasons?limit=${API_PAGE_LIMIT}`
  const res = await fetch(`${process.env.API_URL}${path}`, {
    next: { revalidate: SEASONS_REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — ${path}`)
  const { data } = await res.json()
  return data.map((season) => season.year).sort((a, b) => b - a)
}
