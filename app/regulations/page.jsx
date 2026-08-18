import Link from 'next/link'

export const metadata = {
  title: 'Règlements',
  description: "Les grandes ères réglementaires de la Formule 1 — moteurs, châssis et règles.",
}

async function getRegulations() {
  const res = await fetch(`${process.env.API_URL}/regulations`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = await res.json()
  return Array.isArray(json) ? json : (json.data ?? [])
}

export default async function RegulationsPage() {
  const regulations = await getRegulations()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      <div className="mb-10">
        <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-2">
          Technique
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
          Règlements
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          Chaque ère réglementaire a redefini la Formule 1. Des turbo aux hybrides, l&apos;histoire technique du sport.
        </p>
      </div>

      {regulations.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucun règlement trouvé.</p>
      ) : (
        <div className="space-y-3">
          {regulations.map((reg) => (
            <Link
              key={reg.era}
              href={`/regulations/${reg.era}`}
              className="group flex items-center gap-6 bg-surface border border-border rounded-sm px-6 py-5 hover:border-red-primary transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-black uppercase tracking-tight text-text-primary group-hover:text-red-primary transition-colors">
                  {reg.label ?? reg.era}
                </h3>
                {reg.engineSpec && (
                  <p className="text-xs text-text-muted mt-1">{reg.engineSpec}</p>
                )}
                {reg.summary && (
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2">{reg.summary}</p>
                )}
              </div>
              {reg.seasons?.length > 0 && (
                <span className="shrink-0 text-xs text-text-muted">
                  {reg.seasons.length} saison{reg.seasons.length > 1 ? 's' : ''}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
