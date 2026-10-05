import Link from 'next/link'

// Carte liste de la maquette (classements, plateau) : chaque ligne porte un
// repère à gauche (position), un titre lié, une pastille, un sous-titre et une
// valeur mise en avant à droite (points, numéro...).
export default function StandingsCard({ eyebrow, title, badge, rows, gap, emptyMessage }) {
  return (
    <div className="bg-[#121212] p-6 sm:p-8 rounded-xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-label-caps uppercase text-[#8e8e8e]">{eyebrow}</span>
          <h2 className="text-headline-lg text-[#f0eded]">{title}</h2>
        </div>
        {badge && (
          <span className="text-telemetry-sm px-2.5 py-1 bg-[#353534] text-[#8e8e8e] rounded uppercase shrink-0">
            {badge}
          </span>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="text-body-md text-[#8e8e8e]">{emptyMessage}</p>
      ) : (
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {rows.map((row) => (
            <div
              key={row.key}
              className="group relative flex items-center justify-between gap-4 p-3.5 bg-[#181818] rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {row.marker && (
                  <span
                    className={`text-telemetry-md w-6 text-center shrink-0 ${
                      row.isHighlighted ? 'text-[#e10600] font-black' : 'text-[#8e8e8e] font-bold'
                    }`}
                  >
                    {row.marker}
                  </span>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-headline-sm text-[#f0eded] font-semibold truncate">
                      <Link href={row.href} className="hover:text-[#e10600] transition-colors">
                        {row.title}
                      </Link>
                    </h3>
                    {row.badge && (
                      <span className="inline-flex items-center gap-1 text-label-caps text-[#8e8e8e] bg-[#353534] px-1.5 py-0.5 rounded shrink-0">
                        {row.badge}
                      </span>
                    )}
                  </div>
                  {row.subtitle && (
                    <span className="block text-body-sm text-[#8e8e8e]">{row.subtitle}</span>
                  )}
                </div>
              </div>
              {row.value != null && (
                <div className="text-right shrink-0">
                  <span className="text-telemetry-lg text-[#f0eded]">{row.value}</span>
                  <span className="text-label-caps uppercase text-[#8e8e8e] block">
                    {row.valueLabel}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {gap && (
        <div className="pt-4 space-y-2">
          <div className="flex justify-between text-label-caps text-[#8e8e8e] uppercase">
            <span>{gap.title}</span>
            <span className="text-[#ff5b4f] font-bold">{gap.value}</span>
          </div>
          <div className="flex w-full h-2 rounded-full overflow-hidden bg-[#353534]">
            <div className="bg-[#e10600] h-full" style={{ width: `${gap.leaderSharePercent}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}
