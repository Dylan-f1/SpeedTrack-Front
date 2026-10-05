import StandingsCard from '@/components/seasons/StandingsCard'
import {
  computeLeaderGap,
  formatPosition,
  formatWins,
  isLeader,
} from '@/components/seasons/standingsHelpers'

export default function ConstructorStandingsCard({ standings, badge }) {
  const rows = standings.map((entry) => ({
    key: entry.team.slug,
    marker: formatPosition(entry.position),
    isHighlighted: isLeader(entry.position),
    title: entry.team.name,
    href: `/teams/${entry.team.slug}`,
    subtitle: formatWins(entry.wins),
    value: entry.points,
    valueLabel: 'pts',
  }))

  return (
    <StandingsCard
      eyebrow="Championnat teams"
      title="Championnat constructeurs"
      badge={badge}
      rows={rows}
      gap={computeLeaderGap(standings)}
    />
  )
}
