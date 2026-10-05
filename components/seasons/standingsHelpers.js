import { pluralize } from '@/components/seasons/pluralize'

const LEADER_POSITION = 1
const PERCENT = 100

export function formatPosition(position) {
  return String(position).padStart(2, '0')
}

export function isLeader(position) {
  return position === LEADER_POSITION
}

export function formatWins(wins) {
  return wins > 0 ? `${wins} ${pluralize(wins, 'victoire')}` : null
}

// Écart de points entre le leader et son dauphin, avec la part du leader sur
// leurs deux totaux pour la jauge de la maquette.
export function computeLeaderGap(standings) {
  const [leader, runnerUp] = standings
  if (!leader || !runnerUp) return null

  const combinedPoints = leader.points + runnerUp.points
  if (combinedPoints === 0) return null

  return {
    title: 'Écart P1 - P2',
    value: `${leader.points - runnerUp.points} pts`,
    leaderSharePercent: (leader.points / combinedPoints) * PERCENT,
  }
}
