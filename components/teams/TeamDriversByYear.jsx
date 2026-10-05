import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import TeamSectionTitle from '@/components/teams/TeamSectionTitle'

// Tout l'historique des engagements de l'écurie, saison par saison (année décroissante)
export default function TeamDriversByYear({ driversByYear }) {
  const seasonsCount = driversByYear.length

  return (
    <section className="flex flex-col gap-6">
      <TeamSectionTitle
        title="Pilotes par année"
        aside={`${seasonsCount} saison${seasonsCount > 1 ? 's' : ''}`}
      />
      <div className="bg-[#131313] border border-[#262626] rounded-xl px-6 py-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
        {driversByYear.map(({ year, drivers }) => (
          <div key={year} className="flex items-baseline gap-5 py-3 border-b border-[#262626]/70">
            <span className="text-sm font-mono font-bold text-white w-12 shrink-0">{year}</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {drivers.map((driver) => (
                <Link
                  key={driver.slug}
                  href={`/drivers/${driver.slug}`}
                  className="text-[#8e8e8e] hover:text-white transition-colors whitespace-nowrap"
                >
                  <Flag code={driver.nationality} /> {driver.firstName} {driver.lastName}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
