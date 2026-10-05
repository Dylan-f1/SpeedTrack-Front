import Link from 'next/link'

const DIRECTIONS = {
  previous: { label: 'Saison précédente', icon: 'chevron_left', align: 'text-left' },
  next: { label: 'Saison suivante', icon: 'chevron_right', align: 'text-right' },
}

export default function SeasonNavLink({ year, direction }) {
  const { label, icon, align } = DIRECTIONS[direction]
  const isPrevious = direction === 'previous'

  if (!year) {
    return (
      <div className={`space-y-1 opacity-40 ${align}`}>
        <span className="text-label-caps uppercase text-[#8e8e8e] block">{label}</span>
        <span className="text-telemetry-md text-[#8e8e8e] block">—</span>
      </div>
    )
  }

  const iconElement = <span className="material-symbols-outlined text-[18px]">{icon}</span>

  return (
    <Link href={`/seasons/${year}`} className={`group block space-y-1 ${align}`}>
      <span className="text-label-caps uppercase text-[#8e8e8e] block">{label}</span>
      <span className="inline-flex items-center gap-1 text-headline-sm text-[#f0eded] font-semibold group-hover:text-[#e10600] transition-colors">
        {isPrevious && iconElement}
        {year}
        {!isPrevious && iconElement}
      </span>
    </Link>
  )
}
