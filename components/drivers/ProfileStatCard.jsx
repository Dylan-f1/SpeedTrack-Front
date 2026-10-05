// Carte de statistique de carrière. La barre représente un taux par rapport au
// nombre de courses disputées : elle n'est affichée que si ce taux a un sens.
export default function ProfileStatCard({
  label,
  value,
  unit,
  ratio,
  valueClass,
  unitClass,
  hoverClass,
  barClass,
}) {
  const hasRatio = ratio !== null

  return (
    <div
      className={`bg-[#181818] border border-white/[0.08] p-5 rounded-xl flex flex-col transition-all ${hoverClass}`}
    >
      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
        {label}
      </span>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={`text-3xl sm:text-4xl font-mono font-bold tracking-tight ${valueClass}`}>
          {value}
        </span>
        <span className={`text-xs font-mono ${unitClass}`}>{unit}</span>
      </div>
      {hasRatio && (
        <div>
          <div className="w-full bg-white/[0.06] h-1 mt-4 rounded-full overflow-hidden">
            <div className={`h-full ${barClass}`} style={{ width: `${ratio}%` }} />
          </div>
          <span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
            {ratio} % des courses
          </span>
        </div>
      )}
    </div>
  )
}
