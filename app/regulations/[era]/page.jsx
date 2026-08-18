import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getRegulation(era) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/regulations/${era}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({ params }) {
  const { era } = await params
  const regulation = await getRegulation(era)
  if (!regulation) return {}
  return { title: regulation.label ?? era }
}

export default async function RegulationPage({ params }) {
  const { era } = await params
  const regulation = await getRegulation(era)
  if (!regulation) notFound()

  const { label, engineSpec, summary, details, seasons = [] } = regulation

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0E0E0E]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <Link
            href="/regulations"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary uppercase tracking-widest mb-8 transition-colors"
          >
            ← Règlements
          </Link>

          {engineSpec && (
            <p className="text-[11px] text-text-muted uppercase tracking-widest mb-3">{engineSpec}</p>
          )}
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
            {label ?? era}
          </h1>

          {seasons.length > 0 && (
            <p className="text-text-muted text-sm mt-4">
              {seasons.length} saison{seasons.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Contenu */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        <div className="lg:col-span-2 space-y-10">
          {summary && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Résumé
              </h2>
              <p className="text-text-secondary leading-relaxed">{summary}</p>
            </div>
          )}

          {details && (
            <div>
              <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
                Détails techniques
              </h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">{details}</p>
            </div>
          )}
        </div>

        {/* Saisons liées */}
        {seasons.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
              Saisons
            </h2>
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => {
                const year = season?.year ?? season
                return (
                  <Link
                    key={year}
                    href={`/seasons/${year}`}
                    className="px-3 py-1.5 text-sm font-semibold bg-surface border border-border rounded-sm hover:border-red-primary transition-colors text-text-primary"
                  >
                    {year}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
