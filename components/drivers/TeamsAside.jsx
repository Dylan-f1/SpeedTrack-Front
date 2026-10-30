import Link from 'next/link'
import { getTeamTally } from '@/lib/driverCareer'

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
}

// Colonne latérale de la fiche, comme l'encadré d'une fiche encyclopédique : les écuries du
// pilote dans l'ordre d'arrivée, avec leur couleur, leurs années et le nombre de saisons
export default function TeamsAside({ seasons, isCurrent, careerSpan }) {
  const tally = getTeamTally(seasons, isCurrent)

  return (
    <aside aria-labelledby="teams-aside-title" className="border-t border-border py-10 lg:py-12">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="teams-aside-title" className="text-xl font-extrabold tracking-[-0.02em]">
          {pluralize(tally.length, 'Écurie', 'Écuries')}
        </h2>
        {careerSpan && <span className="text-sm text-[#8e8e8e] tabular-nums">{careerSpan}</span>}
      </div>
      <ol className="mt-4">
        {tally.map((team) => (
          <li key={team.slug} className="border-b border-border last:border-b-0">
            <Link href={`/teams/${team.slug}`} className="group flex gap-3 py-3">
              <span
                aria-hidden="true"
                className="w-[3px] shrink-0 self-stretch"
                style={{ backgroundColor: team.color }}
              />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-red-primary">
                  {team.name}
                </span>
                <span className="block text-sm text-[#8e8e8e] tabular-nums">{team.ranges}</span>
              </span>
              <span className="shrink-0 text-sm text-text-secondary tabular-nums">
                {team.seasonCount} {pluralize(team.seasonCount, 'saison', 'saisons')}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  )
}
