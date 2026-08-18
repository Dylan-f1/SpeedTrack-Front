import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, formatLapTime, getCountryFlag } from '@/lib/utils'

async function fetchRaceData(year, round) {
  const base = process.env.NEXT_PUBLIC_API_URL

  const [raceRes, qualifyingRes] = await Promise.all([
    fetch(`${base}/races/${year}/${round}`, { cache: 'no-store' }),
    fetch(`${base}/races/${year}/${round}/qualifying`, { cache: 'no-store' }),
  ])

  const raceData = raceRes.ok ? await raceRes.json() : null
  const qualifyingData = qualifyingRes.ok ? await qualifyingRes.json() : null

  return { raceData, qualifyingData }
}

export async function generateMetadata({ params }) {
  const { year, round } = await params
  const { raceData } = await fetchRaceData(year, round)
  if (!raceData) return {}
  const name = raceData.grandPrix?.name ?? `Round ${round}`
  return { title: `${name} ${year}` }
}

export default async function RaceResultPage({ params }) {
  const { year, round } = await params
  const { raceData, qualifyingData } = await fetchRaceData(year, round)

  if (!raceData) notFound()

  const { grandPrix, results } = raceData
  const qualifyingResults = qualifyingData?.results ?? []

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0E0E0E]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <Link
            href={`/seasons/${year}`}
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary uppercase tracking-widest mb-8 transition-colors"
          >
            ← Saison {year}
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[11px] text-text-muted uppercase tracking-widest mb-2">
                Round {round} · {year}
                {grandPrix?.circuit && (
                  <> · {getCountryFlag(grandPrix.circuit.country)} {grandPrix.circuit.country}</>
                )}
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                {grandPrix?.name ?? `Grand Prix Round ${round}`}
              </h1>
              {grandPrix?.raceDate && (
                <p className="text-text-muted text-sm mt-3">{formatDate(grandPrix.raceDate)}</p>
              )}
            </div>
            {grandPrix?.circuit && (
              <Link
                href={`/circuits/${grandPrix.circuit.slug}`}
                className="text-xs text-text-muted hover:text-text-secondary transition-colors uppercase tracking-widest"
              >
                {grandPrix.circuit.name} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 py-12 space-y-16">

        {/* Résultats de course */}
        <div>
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Résultats de course
          </h2>
          {results.length === 0 ? (
            <p className="text-text-muted text-sm">Résultats non encore disponibles.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold w-8">Pos</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Pilote</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Écurie</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-center">Grille</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-center">Tours</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Statut</th>
                    <th className="pb-3 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-right">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result._id} className="border-b border-border-light hover:bg-surface transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs font-bold text-text-primary">
                        {result.position ?? 'DNF'}
                      </td>
                      <td className="py-3 pr-4">
                        <Link href={`/drivers/${result.driver?.slug}`} className="font-semibold text-text-primary hover:text-red-primary transition-colors">
                          {result.driver?.firstName} {result.driver?.lastName}
                        </Link>
                        {result.fastestLap && (
                          <span className="ml-2 text-[9px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 font-semibold uppercase tracking-wider rounded-sm">FL</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-text-muted text-xs">
                        <Link href={`/teams/${result.team?.slug}`} className="hover:text-text-secondary transition-colors">
                          {result.team?.name ?? '—'}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-text-muted text-xs text-center">{result.gridPosition ?? '—'}</td>
                      <td className="py-3 pr-4 text-text-muted text-xs text-center">{result.laps ?? '—'}</td>
                      <td className="py-3 pr-4 text-text-secondary text-xs">{result.status ?? '—'}</td>
                      <td className="py-3 text-text-primary font-black text-right">{result.points ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Résultats des qualifications */}
        {qualifyingResults.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
              Qualifications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold w-8">Pos</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Pilote</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Écurie</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-right">Q1</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-right">Q2</th>
                    <th className="pb-3 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-right">Q3</th>
                  </tr>
                </thead>
                <tbody>
                  {qualifyingResults.map((result) => (
                    <tr key={result._id} className="border-b border-border-light hover:bg-surface transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs font-bold text-text-primary">{result.position}</td>
                      <td className="py-3 pr-4">
                        <Link href={`/drivers/${result.driver?.slug}`} className="font-semibold text-text-primary hover:text-red-primary transition-colors">
                          {result.driver?.firstName} {result.driver?.lastName}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-text-muted text-xs">
                        {result.team?.name ?? '—'}
                      </td>
                      <td className="py-3 pr-4 text-text-secondary font-mono text-xs text-right">{result.q1 ? formatLapTime(result.q1) : '—'}</td>
                      <td className="py-3 pr-4 text-text-secondary font-mono text-xs text-right">{result.q2 ? formatLapTime(result.q2) : '—'}</td>
                      <td className="py-3 text-text-primary font-mono text-xs text-right font-semibold">{result.q3 ? formatLapTime(result.q3) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
