import Link from 'next/link'
import { formatDate, getCountryFlag } from '@/lib/utils'

export const metadata = {
  title: 'Résultats',
  description: "Calendrier et résultats des Grands Prix de Formule 1.",
}

async function getLatestSeasonRaces() {
  const base = process.env.API_URL

  // Récupère la saison la plus récente
  const seasonsRes = await fetch(`${base}/seasons?limit=1`, { cache: 'no-store' })
  if (!seasonsRes.ok) return { year: null, races: [] }

  const { data: seasons } = await seasonsRes.json()
  const latestSeason = seasons?.[0]
  if (!latestSeason) return { year: null, races: [] }

  const racesRes = await fetch(`${base}/seasons/${latestSeason.year}/races`, { cache: 'no-store' })
  const races = racesRes.ok ? await racesRes.json() : []

  return { year: latestSeason.year, races }
}

export default async function RacesPage() {
  const { year, races } = await getLatestSeasonRaces()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-2">
            Résultats
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
            Grands Prix {year ?? ''}
          </h1>
          <p className="text-text-muted text-sm max-w-xl">
            Tous les résultats de la saison en cours. Sélectionnez un Grand Prix.
          </p>
        </div>
        <Link
          href="/seasons"
          className="text-xs text-text-muted hover:text-text-secondary uppercase tracking-widest transition-colors"
        >
          Autres saisons →
        </Link>
      </div>

      {races.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucun Grand Prix trouvé.</p>
      ) : (
        <div className="space-y-2">
          {races.map((race) => (
            <Link
              key={race._id}
              href={`/races/${year}/${race.round}`}
              className="group flex items-center gap-6 bg-surface border border-border rounded-sm px-6 py-4 hover:border-red-primary transition-colors"
            >
              {/* Numéro de manche */}
              <span className="text-3xl font-black text-white/10 w-12 text-right shrink-0 leading-none">
                {race.round}
              </span>

              {/* Drapeau + nom */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-text-primary text-base truncate group-hover:text-red-primary transition-colors">
                  {race.name ?? race.circuit?.name ?? `Round ${race.round}`}
                </p>
                <p className="text-xs text-text-muted mt-0.5 flex items-center gap-2">
                  {race.circuit && (
                    <span>{getCountryFlag(race.circuit.country)} {race.circuit.name}</span>
                  )}
                </p>
              </div>

              {/* Date */}
              {race.raceDate && (
                <span className="text-xs text-text-muted shrink-0 hidden sm:block">
                  {formatDate(race.raceDate)}
                </span>
              )}

              {/* Statut */}
              <span className={`shrink-0 text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider rounded-sm ${
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
      )}
    </div>
  )
}
