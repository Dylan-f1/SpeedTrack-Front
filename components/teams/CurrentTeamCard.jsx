import Image from 'next/image'
import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import { getLogoBackgroundClass } from '@/components/teams/teamLogo'

const DEFAULT_ACCENT_COLOR = '#e10600'

export default function CurrentTeamCard({ team, drivers }) {
  const { slug, name, fullName, nationality, base, logoUrl, primaryColor } = team
  const accentColor = primaryColor ?? DEFAULT_ACCENT_COLOR

  return (
    <Link
      href={`/teams/${slug}`}
      className="group bg-[#131313] border border-[#262626] hover:border-[#393939] rounded-xl overflow-hidden flex flex-col transition-colors"
    >
      <span className="h-1 w-full" style={{ backgroundColor: accentColor }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start gap-4">
          <div className={`relative w-14 h-14 shrink-0 rounded-lg ${getLogoBackgroundClass(slug)}`}>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`Logo ${name}`}
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center font-black text-xl text-[#5e5e5e]">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 font-mono text-[11px] text-[#8e8e8e]">
              <Flag code={nationality} /> {nationality}
            </p>
            <h3 className="mt-1 text-lg font-bold uppercase leading-tight text-white">{name}</h3>
            {fullName && fullName !== name && (
              <p className="mt-0.5 truncate text-xs text-[#8e8e8e]">{fullName}</p>
            )}
          </div>
        </div>

        {drivers.length > 0 && (
          <ul className="flex flex-col gap-1.5 pt-4 border-t border-[#262626]">
            {drivers.map((driver) => (
              <li key={driver.slug} className="flex items-center gap-3 text-sm">
                <span className="w-9 font-mono text-xs font-bold" style={{ color: accentColor }}>
                  {driver.carNumber != null && `#${driver.carNumber}`}
                </span>
                <span className="text-[#c8c6c5]">
                  {driver.firstName}{' '}
                  <span className="font-semibold text-white">{driver.lastName}</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 border-t border-[#262626] flex items-center justify-between font-mono text-xs">
          <span className="truncate text-[#5e5e5e]">{base}</span>
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
      </div>
    </Link>
  )
}
