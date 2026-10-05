import { Flag } from '@/components/ui/Flag'
import { formatDriverName } from './formatDriverName'

const PODIUM_STYLES = {
  1: { label: 'VAINQUEUR GRAND PRIX', labelClass: 'text-[#e10600] font-bold' },
  2: { label: 'DEUXIÈME PLACE', labelClass: 'text-neutral-400' },
  3: { label: 'PODIUM', labelClass: 'text-amber-500' },
}

export default function PodiumCard({ result }) {
  const isWinner = result.position === 1
  const { label, labelClass } = PODIUM_STYLES[result.position]
  const gridLabel = result.gridPosition ? `GRILLE : P${result.gridPosition}` : result.status

  return (
    <div
      className={`bg-[#161619] rounded-xl p-4 relative overflow-hidden ${
        isWinner ? 'border-2 border-[#e10600]/80 shadow-lg' : 'border border-[#2b2b32]'
      }`}
    >
      <div
        className={`absolute -right-4 -top-6 text-7xl font-black select-none ${
          isWinner ? 'text-neutral-800/40' : 'text-neutral-800/30'
        }`}
      >
        P{result.position}
      </div>
      <div className={`text-[10px] font-mono uppercase tracking-wider mb-2 ${labelClass}`}>
        {label}
      </div>
      <div className="flex items-baseline justify-between mb-1">
        <h3 className={`text-xl text-white ${isWinner ? 'font-black' : 'font-bold'}`}>
          {formatDriverName(result.driver)}
        </h3>
        {result.driver?.nationality && (
          <Flag code={result.driver.nationality} className="text-lg" />
        )}
      </div>
      <div className="text-xs text-neutral-400 font-semibold mb-3">{result.team?.name}</div>
      <div className="border-t border-[#26262c] pt-2 flex justify-between text-xs font-mono text-neutral-300">
        <span>{gridLabel}</span>
        <span className="text-emerald-400 font-bold">
          +{result.points} PTS
          {result.fastestLap && <span title="Meilleur tour en course"> (FL)</span>}
        </span>
      </div>
    </div>
  )
}
