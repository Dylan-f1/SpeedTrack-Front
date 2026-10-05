import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'

const FALLBACK_ACCENT_COLOR = '#393939'

export default function TeamCard({ team }) {
  const { slug, name, nationality, founded, base, primaryColor } = team
  const details = [founded && `Fondée en ${founded}`, base].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/teams/${slug}`}
      className="group bg-[#131313] border border-[#262626] hover:border-[#e10600]/50 rounded-xl p-4 flex flex-col gap-3 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#8e8e8e]">
          <Flag code={nationality} /> {nationality}
        </span>
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: primaryColor ?? FALLBACK_ACCENT_COLOR }}
        />
      </div>
      <h3 className="text-base font-bold uppercase leading-tight text-white">{name}</h3>
      <div className="mt-auto pt-3 border-t border-[#262626] flex items-center justify-between gap-3 font-mono text-xs">
        <span className="truncate text-[#5e5e5e]">{details}</span>
        <span className="shrink-0 flex items-center gap-1 font-semibold text-[#8e8e8e] group-hover:text-white transition-colors">
          Fiche
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform"
          >
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
