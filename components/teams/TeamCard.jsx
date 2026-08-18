import Image from 'next/image'
import Link from 'next/link'
import { getCountryFlag } from '@/lib/utils'

const FALLBACK_COLOR = '#8A8A8A'

export default function TeamCard({ team }) {
  const { slug, name, nationality, base, founded, primaryColor, logoUrl } = team
  const color = primaryColor ?? FALLBACK_COLOR
  const initial = name?.charAt(0).toUpperCase()

  return (
    <Link href={`/teams/${slug}`} className="group block">
      <div className="relative overflow-hidden bg-surface border border-border rounded-sm p-6 h-full flex flex-col justify-between group-hover:border-red-primary transition-colors duration-200">

        {/* Barre accent gauche, couleur de marque */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: color }}
        />

        {logoUrl ? (
          // Badge clair derrière le logo : plusieurs logos d'écurie sont sombres/colorés
          // sur fond transparent et seraient peu visibles sur le fond noir de la card
          <div className="absolute top-3 right-3 w-14 h-14 bg-white rounded-full p-2.5 shadow-sm">
            <Image src={logoUrl} alt="" fill className="object-contain p-2.5" />
          </div>
        ) : (
          /* Repli : lettre watermark en couleur de marque, tant que le vrai logo n'est pas disponible */
          <span
            className="absolute top-2 right-4 text-8xl font-black leading-none select-none"
            style={{ color, opacity: 0.12 }}
          >
            {initial}
          </span>
        )}

        <div className="relative">
          <p className="text-[11px] text-text-muted uppercase tracking-widest mb-3">
            {getCountryFlag(nationality)} {nationality}
          </p>
          <h3 className="text-lg font-black uppercase tracking-tight text-text-primary leading-tight">
            {name}
          </h3>
        </div>

        <div className="relative mt-6 flex items-center gap-4 text-xs text-text-muted">
          {base && <span>{base}</span>}
          {founded && (
            <>
              <span className="w-px h-3 bg-border" />
              <span>Fondée en {founded}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
