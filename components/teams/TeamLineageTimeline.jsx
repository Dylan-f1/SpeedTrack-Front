import Link from 'next/link'
import { formatPeriod } from '@/components/teams/teamPeriods'

// Frise des entités successives d'une même structure (ex. Toleman → Benetton → … → Alpine) :
// chaque écurie garde sa propre fiche, l'écurie consultée est mise en avant
export default function TeamLineageTimeline({ lineage, currentSlug }) {
  return (
    <div className="bg-[#131313] border border-[#262626] rounded-xl p-8">
      <span className="block text-xs font-mono uppercase tracking-wider text-[#5e5e5e] mb-6">
        Lignée de l&apos;écurie
      </span>
      <div className="relative border-l border-[#262626] pl-6 ml-2 sm:ml-4 flex flex-col gap-8">
        {lineage.map((entry) => {
          const isCurrent = entry.slug === currentSlug
          const period = formatPeriod(entry.from, entry.to)

          return (
            <div key={entry.slug} className="relative group">
              <div
                className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                  isCurrent
                    ? 'bg-(--team-accent) border-(--team-accent)'
                    : 'bg-[#131313] border-[#5e5e5e] group-hover:border-(--team-accent)'
                }`}
              />
              <span className="text-xs font-mono font-bold text-[#8e8e8e]">{period}</span>
              {isCurrent ? (
                <>
                  <h4 className="text-base font-bold text-white mt-1">{entry.name}</h4>
                  <p className="text-sm text-[#8e8e8e] mt-1">Écurie consultée</p>
                </>
              ) : (
                <Link href={`/teams/${entry.slug}`} className="block">
                  <h4 className="text-base font-bold text-white mt-1">{entry.name}</h4>
                  <p className="text-sm text-[#8e8e8e] group-hover:text-white mt-1 flex items-center gap-1 transition-colors">
                    Voir la fiche de l&apos;écurie
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </p>
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
