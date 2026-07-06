import Link from 'next/link'
import { getCountryFlag } from '@/lib/utils'

export default function TeamCard({ team }) {
  const { slug, name, nationality, base, founded } = team

  return (
    <Link href={`/teams/${slug}`} className="group block">
      <div className="relative bg-surface border border-border rounded-sm p-6 h-full flex flex-col justify-between group-hover:border-red-primary transition-colors duration-200">

        {/* Barre accent gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div>
          <p className="text-[11px] text-text-muted uppercase tracking-widest mb-3">
            {getCountryFlag(nationality)} {nationality}
          </p>
          <h3 className="text-lg font-black uppercase tracking-tight text-text-primary leading-tight">
            {name}
          </h3>
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-text-muted">
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
