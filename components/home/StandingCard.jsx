import { formatDriverName } from './formatDriverName'

function formatWins(wins) {
  return `${wins} Victoire${wins > 1 ? 's' : ''}`
}

export default function StandingCard({ standing, leaderPoints }) {
  const isLeader = standing.position === 1
  const barWidth =
    leaderPoints > 0 ? `${Math.round((standing.points / leaderPoints) * 100)}%` : '0%'
  const gapLabel = isLeader ? 'Leader' : `Écart : -${leaderPoints - standing.points} pts`

  return (
    <div className="bg-[#151518] border border-[#2b2b32] rounded-xl p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-mono text-neutral-400 uppercase">
            POS. {standing.position}
            {standing.team?.name && ` • ${standing.team.name}`}
          </span>
          <h3 className="text-2xl font-black text-white mt-1">
            {formatDriverName(standing.driver)}
          </h3>
        </div>
        <span
          className={`text-3xl font-black font-mono ${isLeader ? 'text-amber-500' : 'text-neutral-200'}`}
        >
          {standing.points} <span className="text-xs text-neutral-400">PTS</span>
        </span>
      </div>
      <div className="w-full bg-[#202026] h-1.5 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full ${isLeader ? 'bg-amber-500' : 'bg-[#e10600]'}`}
          style={{ width: barWidth }}
        ></div>
      </div>
      <div className="flex justify-between text-xs font-mono text-neutral-400">
        <span>{formatWins(standing.wins)}</span>
        <span>{gapLabel}</span>
      </div>
    </div>
  )
}
