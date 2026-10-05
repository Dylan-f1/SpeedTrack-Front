import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'

function getEraLabel({ isModern, isClassic }) {
  if (isModern && isClassic) return 'Ères classique et moderne'
  return isModern ? 'Ère moderne' : 'Ère classique'
}

export default function TeamRegistryDriverCard({ driver }) {
  const {
    slug,
    firstName,
    lastName,
    nationality,
    carNumber,
    firstYear,
    lastYear,
    seasonsCount,
    yearsLabel,
    hasGaps,
  } = driver

  const period = firstYear === lastYear ? `${firstYear}` : `${firstYear} — ${lastYear}`
  // Des passages discontinus ne se lisent pas dans la période : on détaille alors les saisons
  const tagline = hasGaps ? `Saisons ${yearsLabel}` : getEraLabel(driver)

  return (
    <Link
      href={`/drivers/${slug}`}
      className="bg-[#131313] border border-[#262626] hover:border-(--team-accent)/50 rounded-xl p-4 flex flex-col justify-between transition-all group relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <span className="text-lg font-black font-mono text-white/80">
          {carNumber != null && `#${carNumber}`}
        </span>
        <span className="px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#262626] text-[11px] font-mono text-[#8e8e8e]">
          {period}
        </span>
      </div>
      <div className="my-2.5">
        <div className="flex items-baseline gap-2">
          <h4 className="text-base font-bold uppercase text-white">
            {firstName} {lastName}
          </h4>
          <span className="text-xs text-[#5e5e5e] font-mono whitespace-nowrap">
            <Flag code={nationality} /> {nationality}
          </span>
        </div>
        <p className="text-xs font-mono mt-0.5 text-[#8e8e8e]">{tagline}</p>
      </div>
      <div className="pt-2.5 border-t border-[#262626] flex items-center justify-between text-xs font-mono">
        <span className="text-[#5e5e5e]">{`${seasonsCount} saison${seasonsCount > 1 ? 's' : ''}`}</span>
        <span className="text-[#8e8e8e] group-hover:text-white font-semibold flex items-center gap-1 transition-colors">
          Profil
          <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
