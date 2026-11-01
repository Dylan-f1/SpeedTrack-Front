import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'

// Au-delà, les pilotes suivants sont repliés : les grandes écuries en comptent plus de 100
const VISIBLE_DRIVERS = 24

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
}

function RosterItem({ driver }) {
  return (
    <li className="break-inside-avoid border-b border-border">
      <Link href={`/drivers/${driver.slug}`} className="group flex items-baseline gap-3 py-3">
        <Flag code={driver.nationality} className="shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block leading-snug">
            {driver.firstName}{' '}
            <span className="font-bold underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-red-primary">
              {driver.lastName}
            </span>
          </span>
          <span className="block text-sm text-[#8e8e8e] tabular-nums">{driver.yearsLabel}</span>
        </span>
        <span className="shrink-0 text-sm text-text-secondary tabular-nums">
          {driver.seasonsCount} {pluralize(driver.seasonsCount, 'saison', 'saisons')}
        </span>
      </Link>
    </li>
  )
}

// Tous les pilotes passés par l'écurie, du plus récent au plus ancien, en deux colonnes ;
// la suite se déplie sans JavaScript (<details>)
export default function TeamRoster({ drivers }) {
  const visible = drivers.slice(0, VISIBLE_DRIVERS)
  const folded = drivers.slice(VISIBLE_DRIVERS)

  return (
    <>
      <ul className="gap-x-10 sm:columns-2">
        {visible.map((driver) => (
          <RosterItem key={driver.slug} driver={driver} />
        ))}
      </ul>
      {folded.length > 0 && (
        <details className="group/more mt-2">
          <summary className="hero-link w-fit cursor-pointer list-none py-3 [&::-webkit-details-marker]:hidden">
            <span className="group-open/more:hidden">
              Afficher les {folded.length} autres {pluralize(folded.length, 'pilote', 'pilotes')}
            </span>
            <span className="hidden group-open/more:inline">Masquer</span>
          </summary>
          <ul className="gap-x-10 sm:columns-2">
            {folded.map((driver) => (
              <RosterItem key={driver.slug} driver={driver} />
            ))}
          </ul>
        </details>
      )}
    </>
  )
}
