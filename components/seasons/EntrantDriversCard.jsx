import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import StandingsCard from '@/components/seasons/StandingsCard'
import { pluralize } from '@/components/seasons/pluralize'

const CAR_NUMBER_SEPARATOR = ' / '

// Plateau de la saison, affiché tant que le classement pilotes n'est pas calculable.
export default function EntrantDriversCard({ drivers }) {
  const rows = drivers.map(({ driver, teams, carNumbers }) => ({
    key: driver.slug,
    title: `${driver.firstName} ${driver.lastName}`,
    href: `/drivers/${driver.slug}`,
    badge: driver.nationality && (
      <>
        <Flag code={driver.nationality} /> {driver.nationality}
      </>
    ),
    subtitle: teams.map((team, index) => (
      <span key={team.slug}>
        {index > 0 && ' · '}
        <Link href={`/teams/${team.slug}`} className="hover:text-[#f0eded] transition-colors">
          {team.name}
        </Link>
      </span>
    )),
    value: carNumbers.length > 0 ? carNumbers.join(CAR_NUMBER_SEPARATOR) : null,
    valueLabel: 'N°',
  }))

  return (
    <StandingsCard
      eyebrow="Plateau officiel"
      title="Pilotes engagés"
      badge={`${drivers.length} ${pluralize(drivers.length, 'pilote')}`}
      rows={rows}
      emptyMessage="Aucun pilote engagé référencé pour cette saison."
    />
  )
}
