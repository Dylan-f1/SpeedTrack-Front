import Link from 'next/link'
import { seasonsAPI } from '@/lib/api'
import SectionTitle from './SectionTitle'
import StandingCard from './StandingCard'

const TOP_STANDINGS_SIZE = 3

async function fetchTopStandings(year) {
  try {
    const standings = await seasonsAPI.driverStandings(year)
    return Array.isArray(standings) ? standings.slice(0, TOP_STANDINGS_SIZE) : []
  } catch {
    return []
  }
}

export default async function StandingsSection({ year }) {
  const topStandings = await fetchTopStandings(year)
  if (topStandings.length === 0) return null

  const leaderPoints = topStandings[0].points

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#24242a] pb-3">
        <SectionTitle>Classement Championnat Pilotes (Top 3)</SectionTitle>
        <Link
          href={`/seasons/${year}`}
          className="text-xs font-mono text-[#e10600] hover:underline"
        >
          Voir classement complet →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topStandings.map((standing) => (
          <StandingCard key={standing.position} standing={standing} leaderPoints={leaderPoints} />
        ))}
      </div>
    </section>
  )
}
