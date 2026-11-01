import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import { normalizeSearchText } from '@/lib/utils'

// Les noms qui commencent par un chiffre (« 1st Racing »…) sont rangés ensemble
const DIGIT_GROUP = '0–9'

function getInitial(name) {
  const initial = normalizeSearchText(name)[0]?.toUpperCase() ?? '?'
  return /\d/.test(initial) ? DIGIT_GROUP : initial
}

function groupByInitial(teams) {
  const groups = new Map()
  for (const team of [...teams].sort((a, b) => a.name.localeCompare(b.name, 'fr'))) {
    const initial = getInitial(team.name)
    if (!groups.has(initial)) groups.set(initial, [])
    groups.get(initial).push(team)
  }
  return [...groups.entries()]
}

// Index alphabétique en colonnes : la plupart des écuries historiques n'ont en base que leur
// nom et leur nationalité, une vignette serait vide. Tout tient sur une page, sans pagination.
export default function TeamIndex({ teams }) {
  return (
    <div className="columns-1 gap-x-10 sm:columns-2 lg:columns-3 xl:columns-4">
      {groupByInitial(teams).map(([initial, group]) => (
        <section key={initial} aria-label={`Écuries en ${initial}`} className="mb-8 break-inside-avoid">
          <h3 className="border-b border-border pb-2 text-2xl font-black tracking-[-0.03em] text-red-primary">
            {initial}
          </h3>
          <ul className="mt-2">
            {group.map((team) => (
              <li key={team.slug}>
                <Link
                  href={`/teams/${team.slug}`}
                  className="group flex items-center gap-2.5 py-1.5"
                >
                  <Flag code={team.nationality} className="shrink-0" />
                  <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-red-primary">
                    {team.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
