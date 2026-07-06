import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCountryFlag, formatLapTime } from '@/lib/utils'

async function getCircuit(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/circuits/${slug}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const circuit = await getCircuit(slug)
  if (!circuit) return {}
  return { title: circuit.name }
}

export default async function CircuitProfilePage({ params }) {
  const { slug } = await params
  const circuit = await getCircuit(slug)
  if (!circuit) notFound()

  const { name, country, city, layoutHistory = [] } = circuit

  // Prend la configuration la plus récente
  const currentLayout = layoutHistory.at(-1) ?? null

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0E0E0E]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />

        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <Link
            href="/circuits"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary uppercase tracking-widest mb-8 transition-colors"
          >
            ← Circuits
          </Link>

          <p className="text-[11px] text-text-muted uppercase tracking-widest mb-3">
            {getCountryFlag(country)} {country}
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-3">
            {name}
          </h1>
          {city && (
            <p className="text-text-muted text-sm">{city}</p>
          )}
        </div>
      </section>

      {/* Specs de la config actuelle */}
      {currentLayout && (
        <section className="bg-surface border-b border-border">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
              {[
                { label: 'Longueur', value: currentLayout.lengthKm ? `${currentLayout.lengthKm} km` : '—' },
                { label: 'Virages', value: currentLayout.corners ?? '—' },
                { label: 'Record du tour', value: currentLayout.lapRecord?.time ? formatLapTime(currentLayout.lapRecord.time) : '—' },
                { label: 'Depuis', value: currentLayout.from ?? '—' },
              ].map((s) => (
                <div key={s.label} className="px-6 py-6 text-center">
                  <p className="text-2xl font-black text-text-primary">{s.value}</p>
                  <p className="text-[11px] text-text-muted uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Historique des tracés */}
      {layoutHistory.length > 1 && (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Historique des tracés
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-6 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Période</th>
                  <th className="pb-3 pr-6 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Longueur</th>
                  <th className="pb-3 pr-6 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Virages</th>
                  <th className="pb-3 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Record</th>
                </tr>
              </thead>
              <tbody>
                {[...layoutHistory].reverse().map((layout, i) => (
                  <tr key={i} className="border-b border-border-light hover:bg-surface transition-colors">
                    <td className="py-4 pr-6 text-text-primary font-medium">
                      {layout.from} — {layout.to ?? 'présent'}
                    </td>
                    <td className="py-4 pr-6 text-text-secondary">
                      {layout.lengthKm ? `${layout.lengthKm} km` : '—'}
                    </td>
                    <td className="py-4 pr-6 text-text-secondary">
                      {layout.corners ?? '—'}
                    </td>
                    <td className="py-4 text-text-secondary">
                      {layout.lapRecord?.time ? (
                        <>
                          {formatLapTime(layout.lapRecord.time)}
                          {layout.lapRecord.driver && (
                            <span className="text-text-muted text-xs ml-2">
                              {layout.lapRecord.driver}, {layout.lapRecord.year}
                            </span>
                          )}
                        </>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
