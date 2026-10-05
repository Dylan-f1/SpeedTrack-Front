import Link from 'next/link'
import StandingsCard from '@/components/seasons/StandingsCard'
import { pluralize } from '@/components/seasons/pluralize'

// Écuries engagées, affichées tant que le classement constructeurs n'est pas calculable.
export default function EntrantTeamsCard({ teams }) {
  const rows = teams.map(({ team, drivers }) => ({
    key: team.slug,
    title: team.name,
    href: `/teams/${team.slug}`,
    subtitle: drivers.map((driver, index) => (
      <span key={driver.slug}>
        {index > 0 && ' · '}
        <Link href={`/drivers/${driver.slug}`} className="hover:text-[#f0eded] transition-colors">
          {driver.firstName} {driver.lastName}
        </Link>
      </span>
    )),
    value: drivers.length,
    valueLabel: pluralize(drivers.length, 'pilote'),
  }))

  return (
    <StandingsCard
      eyebrow="Plateau officiel"
      title="Écuries engagées"
      badge={`${teams.length} ${pluralize(teams.length, 'écurie')}`}
      rows={rows}
      emptyMessage="Aucune écurie engagée référencée pour cette saison."
    />
  )
}
