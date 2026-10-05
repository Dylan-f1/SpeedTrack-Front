import { racesAPI, seasonsAPI } from '@/lib/api'
import PodiumCard from './PodiumCard'
import SectionTitle from './SectionTitle'

const PODIUM_SIZE = 3

async function fetchLastRace(year) {
  try {
    const races = await seasonsAPI.races(year)
    const completedRaces = Array.isArray(races)
      ? races.filter((race) => race.status === 'completed')
      : []
    if (completedRaces.length === 0) return null

    const lastRace = completedRaces.reduce((latest, race) =>
      race.round > latest.round ? race : latest
    )
    const { grandPrix, results } = await racesAPI.result(year, lastRace.round)
    const podium = (results ?? [])
      .filter((result) => result.position >= 1 && result.position <= PODIUM_SIZE)
      .sort((a, b) => a.position - b.position)

    return podium.length > 0 ? { grandPrix, podium } : null
  } catch {
    return null
  }
}

export default async function LastRaceSection({ year }) {
  const lastRace = await fetchLastRace(year)
  if (!lastRace) return null

  const { grandPrix, podium } = lastRace
  const raceName = grandPrix.name ?? grandPrix.circuit?.name
  const winnerLaps = podium[0].position === 1 ? podium[0].laps : null
  const raceInfo = [grandPrix.circuit?.name, winnerLaps && `${winnerLaps} Tours`]
    .filter(Boolean)
    .join(' • ')

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#24242a] pb-3">
        <SectionTitle>
          Dernière Manche : {raceName} {year}
        </SectionTitle>
        <span className="text-xs font-mono text-neutral-400">{raceInfo}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {podium.map((result) => (
          <PodiumCard key={result.position} result={result} />
        ))}
      </div>
    </section>
  )
}
