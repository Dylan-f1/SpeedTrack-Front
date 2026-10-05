import Link from 'next/link'

const INITIALS_LENGTH = 2

// "Red Bull Racing" → "RB", "Ferrari" → "FE" : pas de logo d'écurie en base,
// on reprend le monogramme de la maquette à partir du nom.
function getTeamInitials(name) {
  const words = name.split(/[\s-]+/).filter(Boolean)
  if (words.length >= INITIALS_LENGTH) {
    return words
      .slice(0, INITIALS_LENGTH)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }
  return name.slice(0, INITIALS_LENGTH).toUpperCase()
}

function formatPeriod(from, to) {
  if (to === null) return `${from} — Présent`
  if (from === to) return `${from}`
  return `${from} — ${to}`
}

export default function ProfileTeamHistoryItem({ team }) {
  const { name, slug, from, to } = team
  const isCurrent = to === null

  return (
    <Link
      href={`/teams/${slug}`}
      className={`group p-3.5 bg-[#202020] hover:bg-[#282828] border rounded-lg transition-all flex items-center justify-between ${
        isCurrent
          ? 'border-[#e10600]/40 hover:border-[#e10600]'
          : 'border-white/[0.06] hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded border flex items-center justify-center font-mono text-sm shrink-0 ${
            isCurrent
              ? 'bg-[#e10600]/10 border-[#e10600]/30 text-[#ff4d46] font-black'
              : 'bg-white/[0.05] border-white/10 text-neutral-300 font-bold'
          }`}
        >
          {getTeamInitials(name)}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-bold text-white transition-colors ${
                isCurrent ? 'group-hover:text-[#ff4d46]' : 'group-hover:text-neutral-200'
              }`}
            >
              {name}
            </span>
            {isCurrent && (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#e10600] text-white rounded font-semibold uppercase">
                Actuel
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-neutral-400">{formatPeriod(from, to)}</span>
        </div>
      </div>
      <span className="material-symbols-outlined text-neutral-500 group-hover:text-white transition-colors">
        arrow_forward
      </span>
    </Link>
  )
}
