import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Flag } from '@/components/ui/Flag'

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
    description,
    heritageNote,
    principals = [],
    notablePeople = [],
    lineage = [],
    currentDrivers = [],
    driversByYear = [],
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
                <Flag code={nationality} /> {nationality}
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
          {/* Description générale */}
          {description && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Histoire
              </h2>
              <p className="text-text-secondary leading-relaxed">{description}</p>
            </div>
          )}

          {/* Récit d'héritage */}
          {heritageNote && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Héritage
              </h2>
              <p className="text-text-secondary leading-relaxed">{heritageNote}</p>
            </div>
          )}

          {/* Team principals */}
          {principals.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Team principals
              </h2>
              <ul className="space-y-2">
                {principals.map((p, i) => (
                  <li key={i} className="flex items-baseline justify-between text-sm border-b border-border-light pb-2">
                    <span className="text-text-primary font-semibold">{p.name}</span>
                    <span className="text-text-muted text-xs">{p.from} — {p.to ?? 'présent'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Personnalités marquantes */}
          {notablePeople.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Personnalités marquantes
              </h2>
              <ul className="space-y-2">
                {notablePeople.map((p, i) => (
                  <li key={i} className="flex items-baseline justify-between text-sm border-b border-border-light pb-2">
                    <span>
                      <span className="text-text-primary font-semibold">{p.name}</span>
                      <span className="text-text-muted"> — {p.role}</span>
                    </span>
                    <span className="text-text-muted text-xs whitespace-nowrap ml-4">{p.from} — {p.to ?? 'présent'}</span>
                  </li>
                ))}
              </ul>
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
                        <Flag code={driver.nationality} /> {driver.nationality}
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

      {/* Pilotes par année : tout l'historique de l'écurie, pas juste la saison en cours */}
      {driversByYear.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-6 pb-16">
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Pilotes par année
          </h2>
          <div className="border-t border-border-light">
            {driversByYear.map(({ year, drivers }) => (
              <div key={year} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-3 border-b border-border-light">
                <span className="text-sm font-black text-text-primary w-16 shrink-0">{year}</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-text-muted">
                  {drivers.map((driver, i) => (
                    <span key={driver.slug}>
                      <Link href={`/drivers/${driver.slug}`} className="hover:text-red-primary transition-colors">
                        {driver.firstName} {driver.lastName}
                      </Link>
                      {i < drivers.length - 1 && <span>,</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
