import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCountryFlag } from '@/lib/utils'

async function getTeam(slug) {
  const res = await fetch(`${process.env.API_URL}/teams/${slug}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const team = await getTeam(slug)
  if (!team) return {}
  return { title: team.fullName ?? team.name }
}

const FALLBACK_COLOR = '#8A8A8A'

export default async function TeamProfilePage({ params }) {
  const { slug } = await params
  const team = await getTeam(slug)
  if (!team) notFound()

  const {
    name,
    fullName,
    nationality,
    founded,
    base,
    primaryColor,
    logoUrl,
    heritageNote,
    lineage = [],
    currentDrivers = [],
    season: seasonYear,
  } = team

  const color = primaryColor ?? FALLBACK_COLOR
  const initial = name?.charAt(0).toUpperCase()

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0E0E0E] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />

        {logoUrl ? (
          // Badge clair derrière le logo : plusieurs logos d'écurie sont sombres/colorés
          // sur fond transparent et seraient peu visibles sur le fond noir du hero
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-52 h-52 bg-white rounded-full p-8 shadow-lg">
            <Image src={logoUrl} alt="" fill className="object-contain p-8" />
          </div>
        ) : (
          /* Repli : lettre watermark en couleur de marque, tant que le vrai logo n'est pas disponible */
          <span
            className="absolute right-8 top-1/2 -translate-y-1/2 text-[220px] font-black leading-none select-none"
            style={{ color, opacity: 0.08 }}
          >
            {initial}
          </span>
        )}

        <div className="relative max-w-screen-xl mx-auto px-6 py-12">
          <Link
            href="/teams"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary uppercase tracking-widest mb-8 transition-colors"
          >
            ← Écuries
          </Link>

          <div className="flex items-start gap-8">
            <div className="flex-1">
              <p className="text-[11px] text-text-muted uppercase tracking-widest mb-3">
                {getCountryFlag(nationality)} {nationality}
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                {fullName ?? name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
                {base && <span>{base}</span>}
                {founded && (
                  <>
                    <span className="w-px h-4 bg-border" />
                    <span>Fondée en {founded}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corps */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div className="lg:col-span-2 space-y-10">
          {/* Récit d'héritage */}
          {heritageNote && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Héritage
              </h2>
              <p className="text-text-secondary leading-relaxed">{heritageNote}</p>
            </div>
          )}

          {/* Pilotes de la saison */}
          {currentDrivers.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
                Pilotes {seasonYear ?? ''}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentDrivers.map((driver) => (
                  <Link
                    key={driver.slug}
                    href={`/drivers/${driver.slug}`}
                    className="flex items-center gap-4 bg-surface border border-border rounded-sm p-4 hover:border-red-primary transition-colors"
                  >
                    <span className="text-3xl font-black text-white/10 w-12 text-right leading-none">
                      {driver.carNumber ?? '—'}
                    </span>
                    <div>
                      <p className="font-bold text-text-primary">
                        {driver.firstName} {driver.lastName}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {getCountryFlag(driver.nationality)} {driver.nationality}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Frise de lignée : chaque écurie garde sa propre fiche */}
        {lineage.length > 1 && (
          <div>
            <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
              Lignée
            </h2>
            <ol className="relative border-l border-border ml-2 space-y-5">
              {lineage.map((entry) => (
                <li key={entry.slug} className="pl-6">
                  <span
                    className="absolute -left-[5px] w-2.5 h-2.5 rounded-full border-2 border-background"
                    style={{ backgroundColor: entry.primaryColor ?? FALLBACK_COLOR }}
                  />
                  {entry.slug === slug ? (
                    <p className="text-sm font-semibold text-text-primary">{entry.name}</p>
                  ) : (
                    <Link
                      href={`/teams/${entry.slug}`}
                      className="text-sm font-semibold text-text-primary hover:text-red-primary transition-colors"
                    >
                      {entry.name}
                    </Link>
                  )}
                  <p className="text-xs text-text-muted mt-0.5">
                    {entry.from} — {entry.to ?? 'présent'}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
