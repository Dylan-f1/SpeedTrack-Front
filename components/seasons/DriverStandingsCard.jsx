import { Flag } from '@/components/ui/Flag'
import StandingsCard from '@/components/seasons/StandingsCard'
import {
  computeLeaderGap,
  formatPosition,
  formatWins,
  isLeader,
} from '@/components/seasons/standingsHelpers'

export default function DriverStandingsCard({ standings, badge }) {
  const rows = standings.map((entry) => ({
    key: entry.driver.slug,
    marker: formatPosition(entry.position),
    isHighlighted: isLeader(entry.position),
    title: `${entry.driver.firstName} ${entry.driver.lastName}`,
    href: `/drivers/${entry.driver.slug}`,
    badge: entry.driver.nationality && (
      <>
        <Flag code={entry.driver.nationality} /> {entry.driver.nationality}
      </>
    ),
    subtitle: [entry.team?.name, formatWins(entry.wins)].filter(Boolean).join(' · '),
    value: entry.points,
    valueLabel: 'pts',
  }))

  return (
    <StandingsCard
      eyebrow="Classement mondial"
      title="Classement pilotes"
      badge={badge}
      rows={rows}
      gap={computeLeaderGap(standings)}
    />
  )
}
