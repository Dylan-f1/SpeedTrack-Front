import Link from 'next/link'
import { formatEraPeriod } from '@/lib/regulations'

// Frise des ères : chaque segment est proportionnel au nombre de saisons qu'elle couvre
export default function EraTimeline({ eras, selectedEra, currentYear }) {
  return (
    <nav aria-label="Ères réglementaires" className="flex flex-col gap-2">
      <div className="flex h-9 w-full gap-0.5 overflow-hidden rounded-lg">
        {eras.map((era) => {
          const lastYear = era.to ?? currentYear
          const isSelected = era.era === selectedEra?.era

          return (
            <Link
              key={era.era}
              href={`/regulations?season=${era.from}#saison`}
              title={`${era.label} — ${formatEraPeriod(era)}`}
              aria-current={isSelected ? 'true' : undefined}
              style={{ flexGrow: lastYear - era.from + 1 }}
              className={`flex min-w-0 basis-0 items-center justify-center px-1 font-mono text-[10px] transition-colors ${
                isSelected
                  ? 'bg-[#e10600] text-white font-bold'
                  : 'bg-[#262626] text-[#a8a7a6] hover:bg-[#393939] hover:text-white'
              }`}
            >
              <span className="truncate">{era.from}</span>
            </Link>
          )
        })}
      </div>
      <div className="flex justify-between font-mono text-[10px] text-[#5e5e5e]">
        <span>{eras[0]?.from}</span>
        <span>{currentYear}</span>
      </div>
    </nav>
  )
}
