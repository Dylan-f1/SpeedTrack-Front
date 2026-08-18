import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getCountryFlag } from '@/lib/utils'

async function fetchAll(year) {
  const base = process.env.API_URL

  const [seasonRes, driverStandingsRes, constructorStandingsRes, racesRes] = await Promise.all([
    fetch(`${base}/seasons/${year}`, { cache: 'no-store' }),
    fetch(`${base}/seasons/${year}/standings/drivers`, { cache: 'no-store' }),
    fetch(`${base}/seasons/${year}/standings/constructors`, { cache: 'no-store' }),
    fetch(`${base}/seasons/${year}/races`, { cache: 'no-store' }),
  ])

  const season = seasonRes.ok ? await seasonRes.json() : null
  const driverStandings = driverStandingsRes.ok ? await driverStandingsRes.json() : []
  const constructorStandings = constructorStandingsRes.ok ? await constructorStandingsRes.json() : []
  const races = racesRes.ok ? await racesRes.json() : []

  return { season, driverStandings, constructorStandings, races }
}

export async function generateMetadata({ params }) {
  const { year } = await params
  return { title: `Saison ${year}` }
}

export default async function SeasonPage({ params }) {
  const { year } = await params
  const { season, driverStandings, constructorStandings, races } = await fetchAll(year)

  if (!season) notFound()

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0E0E0E]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <Link
            href="/seasons"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary uppercase tracking-widest mb-8 transition-colors"
          >
            ← Saisons
          </Link>
          <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Championnat du monde</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
            {year}
          </h1>

          {(season.championDriver || season.championTeam) && (
            <div className="flex flex-wrap gap-6 mt-6 text-sm text-text-muted">
              {season.championDriver && (
                <span>
                  Champion pilote —{' '}
                  <Link href={`/drivers/${season.championDriver.slug}`} className="text-text-primary hover:text-red-primary transition-colors font-medium">
                    {season.championDriver.firstName} {season.championDriver.lastName}
                  </Link>
                </span>
              )}
              {season.championTeam && (
                <span>
                  Champion constructeur —{' '}
                  <Link href={`/teams/${season.championTeam.slug}`} className="text-text-primary hover:text-red-primary transition-colors font-medium">
                    {season.championTeam.name}
                  </Link>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Classement pilotes */}
        <div>
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Classement pilotes
          </h2>
          {driverStandings.length === 0 ? (
            <p className="text-text-muted text-sm">Pas encore de résultats.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold w-8">#</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Pilote</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Écurie</th>
                    <th className="pb-3 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-right">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {driverStandings.map((entry) => (
                    <tr key={entry.driverSlug} className="border-b border-border-light hover:bg-surface transition-colors">
                      <td className="py-3 pr-4 text-text-muted font-mono text-xs">{entry.position}</td>
                      <td className="py-3 pr-4">
                        <Link href={`/drivers/${entry.driverSlug}`} className="font-semibold text-text-primary hover:text-red-primary transition-colors">
                          {entry.firstName} {entry.lastName}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-text-muted text-xs">
                        {entry.team?.name ?? '—'}
                      </td>
                      <td className="py-3 text-text-primary font-black text-right">{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Classement constructeurs */}
        <div>
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Classement constructeurs
          </h2>
          {constructorStandings.length === 0 ? (
            <p className="text-text-muted text-sm">Pas encore de résultats.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold w-8">#</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Écurie</th>
                    <th className="pb-3 pr-4 text-[11px] text-text-muted uppercase tracking-widest font-semibold">Victoires</th>
                    <th className="pb-3 text-[11px] text-text-muted uppercase tracking-widest font-semibold text-right">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {constructorStandings.map((entry) => (
                    <tr key={entry.teamSlug} className="border-b border-border-light hover:bg-surface transition-colors">
                      <td className="py-3 pr-4 text-text-muted font-mono text-xs">{entry.position}</td>
                      <td className="py-3 pr-4">
                        <Link href={`/teams/${entry.teamSlug}`} className="font-semibold text-text-primary hover:text-red-primary transition-colors">
                          {entry.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-text-secondary">{entry.wins}</td>
                      <td className="py-3 text-text-primary font-black text-right">{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Calendrier */}
      {races.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-6 pb-12">
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Calendrier — {races.length} Grand{races.length > 1 ? 's' : ''} Prix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {races.map((race) => (
              <Link
                key={race._id}
                href={`/races/${year}/${race.round}`}
                className="group flex items-center gap-4 bg-surface border border-border rounded-sm p-4 hover:border-red-primary transition-colors"
              >
                <span className="text-2xl font-black text-white/10 w-10 text-center shrink-0 leading-none">
                  {race.round}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate group-hover:text-red-primary transition-colors">
                    {race.name ?? race.circuit?.name}
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5 flex items-center gap-1">
                    {race.circuit && (
                      <span>{getCountryFlag(race.circuit.country)} {race.circuit.country}</span>
                    )}
                    {race.raceDate && (
                      <>
                        <span className="w-px h-3 bg-border inline-block mx-1" />
                        <span>{formatDate(race.raceDate)}</span>
                      </>
                    )}
                  </p>
                </div>
                <span className={`ml-auto shrink-0 text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider rounded-sm ${
                  race.status === 'completed'
                    ? 'bg-green-900/40 text-green-400'
                    : race.status === 'cancelled'
                    ? 'bg-red-dark text-red-light'
                    : 'bg-surface-elevated text-text-muted'
                }`}>
                  {race.status === 'completed' ? 'Terminé' : race.status === 'cancelled' ? 'Annulé' : 'Prévu'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
