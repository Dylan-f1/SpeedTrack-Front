// Les ères réglementaires changent très rarement : un cache d'une heure évite de
// consommer le quota de l'API (partagé par tous les visiteurs une fois déployé)
const REGULATIONS_REVALIDATE_SECONDS = 3600

export async function getRegulationEras() {
  const res = await fetch(`${process.env.API_URL}/regulations`, {
    next: { revalidate: REGULATIONS_REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — /regulations`)
  const eras = await res.json()
  return [...eras].sort((a, b) => a.from - b.from)
}

export function findEraForYear(eras, year) {
  return eras.find((era) => year >= era.from && (era.to == null || year <= era.to)) ?? null
}

export function formatEraPeriod({ from, to }) {
  if (to == null) return `Depuis ${from}`
  return from === to ? `${from}` : `${from} — ${to}`
}
