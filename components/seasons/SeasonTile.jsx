import Link from 'next/link'

export default function SeasonTile({ year, eraLabel, isCurrent }) {
  return (
    <Link
      href={`/seasons/${year}`}
      className={`group relative flex flex-col gap-1.5 rounded-xl border p-4 transition-colors ${
        isCurrent
          ? 'bg-[#1a0d0c] border-[#e10600]/60 hover:border-[#e10600]'
          : 'bg-[#131313] border-[#262626] hover:border-[#e10600]/50'
      }`}
    >
      {isCurrent && (
        <span className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase text-[#ff4d4d]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
          En cours
        </span>
      )}
      <span className="font-mono text-2xl font-bold text-white group-hover:text-[#e10600] transition-colors">
        {year}
      </span>
      {eraLabel && (
        <span className="truncate font-mono text-[11px] text-[#5e5e5e]">{eraLabel}</span>
      )}
    </Link>
  )
}
