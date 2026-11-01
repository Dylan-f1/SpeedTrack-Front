import Image from 'next/image'
import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import { readableTextColor } from '@/lib/color'

const FALLBACK_COLOR = '#2a2a2a'

// Vignette d'une écurie du plateau : la couleur de l'écurie sert de fond, comme le panneau de
// la fiche pilote. Logo dans un carré biseauté (fond sombre pour les logos blancs), puis le nom
// et les deux titulaires avec leur numéro.
export default function CurrentTeamTile({ team, drivers }) {
  const { slug, name, fullName, nationality, logoUrl, logoBackground, primaryColor } = team
  const color = primaryColor ?? FALLBACK_COLOR
  const textColor = readableTextColor(color)

  return (
    <Link
      href={`/teams/${slug}`}
      className="chamfer group relative flex h-full flex-col sm:min-h-[248px] justify-between overflow-hidden p-5"
      style={{ backgroundColor: color, color: textColor }}
    >
      {/* Assombrit légèrement la vignette au survol, sans toucher à la mise en page */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-[0.12]"
      />

      <span className="relative flex items-start justify-between gap-4">
        <span
          className={`chamfer relative size-14 shrink-0 ${
            logoBackground === 'dark' ? 'bg-[#131313]' : 'bg-white'
          }`}
        >
          {logoUrl ? (
            <Image src={logoUrl} alt="" fill sizes="56px" className="object-contain p-2.5" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-[#6a6a69]">
              {name[0]}
            </span>
          )}
        </span>
        <Flag code={nationality} />
      </span>

      <span className="relative mt-5 block sm:mt-8">
        <span className="block text-[26px] font-extrabold leading-tight tracking-[-0.03em]">
          {name}
        </span>
        {fullName && fullName !== name && (
          <span className="mt-0.5 block truncate text-sm opacity-75">{fullName}</span>
        )}
        {drivers.length > 0 && (
          <span
            className="mt-4 block border-t pt-3"
            style={{ borderColor: `color-mix(in srgb, ${textColor} 25%, transparent)` }}
          >
            {drivers.map((driver) => (
              <span key={driver.slug} className="flex items-baseline gap-3 leading-relaxed">
                <span className="w-8 shrink-0 text-sm font-bold tabular-nums opacity-75">
                  {driver.carNumber}
                </span>
                <span>
                  {driver.firstName} <span className="font-bold">{driver.lastName}</span>
                </span>
              </span>
            ))}
          </span>
        )}
      </span>
    </Link>
  )
}
