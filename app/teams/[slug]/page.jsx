import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCountryFlag } from '@/lib/utils'

async function getTeam(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${slug}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const team = await getTeam(slug)
  if (!team) return {}
  return { title: team.name }
}

export default async function TeamProfilePage({ params }) {
  const { slug } = await params
  const team = await getTeam(slug)
  if (!team) notFound()

  const {
    name,
    nationality,
    founded,
    base,
    nameHistory = [],
    currentDrivers = [],
    season: seasonYear,
  } = team

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0E0E0E] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />

        <div className="max-w-screen-xl mx-auto px-6 py-12">
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
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6">
                {name}
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

        {/* Pilotes de la saison */}
        {currentDrivers.length > 0 && (
          <div className="lg:col-span-2">
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

        {/* Historique des noms */}
        {nameHistory.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
              Historique du nom
            </h2>
            <ol className="relative border-l border-border ml-2 space-y-5">
              {nameHistory.map((entry, i) => (
                <li key={i} className="pl-6">
                  <span className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-red-primary border-2 border-background" />
                  <p className="text-sm font-semibold text-text-primary">{entry.name}</p>
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
