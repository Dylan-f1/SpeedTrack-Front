import { notFound } from 'next/navigation'
import ConstructorStandingsCard from '@/components/seasons/ConstructorStandingsCard'
import DriverStandingsCard from '@/components/seasons/DriverStandingsCard'
import EntrantDriversCard from '@/components/seasons/EntrantDriversCard'
import EntrantTeamsCard from '@/components/seasons/EntrantTeamsCard'
import RoundsTable from '@/components/seasons/RoundsTable'
import SeasonCounters from '@/components/seasons/SeasonCounters'
import SeasonHeader from '@/components/seasons/SeasonHeader'
import { pluralize } from '@/components/seasons/pluralize'
import { findEraForYear, getRegulationEras } from '@/lib/regulations'
import { getSeasonData, groupEntriesByDriver, groupEntriesByTeam } from './getSeasonData'

const PERCENT = 100

// Le lien vers le règlement est un complément : s'il manque, la fiche saison reste utilisable
async function getRegulationErasOrEmpty() {
  try {
    return await getRegulationEras()
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { year } = await params
  return { title: `Saison ${year}` }
}

function buildCounters({ races, completedRaceCount, driverCount, teamCount, nationalityCount }) {
  const driverCounter = {
    label: 'Pilotes engagés',
    value: driverCount,
    unit: pluralize(driverCount, 'pilote'),
  }
  const teamCounter = {
    label: 'Écuries engagées',
    value: teamCount,
    unit: pluralize(teamCount, 'écurie'),
  }

  if (races.length === 0) {
    return [
      driverCounter,
      teamCounter,
      {
        label: 'Nationalités',
        value: nationalityCount,
        unit: pluralize(nationalityCount, 'pays', 'pays'),
      },
    ]
  }

  return [
    {
      label: 'Calendrier',
      value: races.length,
      unit: `${pluralize(races.length, 'Grand Prix', 'Grands Prix')} · ${completedRaceCount} ${pluralize(completedRaceCount, 'disputé')}`,
      progress: (completedRaceCount / races.length) * PERCENT,
    },
    driverCounter,
    teamCounter,
  ]
}

export default async function SeasonPage({ params }) {
  const { year } = await params
  const [
    { season, driverStandings, constructorStandings, races, seasonYears, driverEntries },
    regulationEras,
  ] = await Promise.all([getSeasonData(year), getRegulationErasOrEmpty()])

  if (!season) notFound()

  const seasonYear = season.year
  const entrantDrivers = groupEntriesByDriver(driverEntries)
  const entrantTeams = groupEntriesByTeam(driverEntries)
  const nationalityCount = new Set(
    entrantDrivers.map(({ driver }) => driver.nationality).filter(Boolean)
  ).size

  const completedRaces = races.filter((race) => race.status === 'completed')
  const latestCompletedRound = completedRaces.at(-1)?.round
  const standingsBadge = latestCompletedRound
    ? `Post R${String(latestCompletedRound).padStart(2, '0')}`
    : null

  const summary =
    entrantDrivers.length > 0
      ? `${entrantDrivers.length} ${pluralize(entrantDrivers.length, 'pilote engagé', 'pilotes engagés')} au sein de ${entrantTeams.length} ${pluralize(entrantTeams.length, 'écurie')}.`
      : 'Plateau de la saison pas encore référencé.'

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-16">
        <SeasonHeader
          year={seasonYear}
          isCurrent={seasonYears[0] === seasonYear}
          previousYear={seasonYears.includes(seasonYear - 1) ? seasonYear - 1 : null}
          nextYear={seasonYears.includes(seasonYear + 1) ? seasonYear + 1 : null}
          championDriver={season.championDriver}
          championTeam={season.championTeam}
          summary={summary}
          regulationEra={findEraForYear(regulationEras, seasonYear)}
        />

        <SeasonCounters
          counters={buildCounters({
            races,
            completedRaceCount: completedRaces.length,
            driverCount: entrantDrivers.length,
            teamCount: entrantTeams.length,
            nationalityCount,
          })}
        />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {driverStandings.length > 0 ? (
            <DriverStandingsCard standings={driverStandings} badge={standingsBadge} />
          ) : (
            <EntrantDriversCard drivers={entrantDrivers} />
          )}
          {constructorStandings.length > 0 ? (
            <ConstructorStandingsCard standings={constructorStandings} badge={standingsBadge} />
          ) : (
            <EntrantTeamsCard teams={entrantTeams} />
          )}
        </section>

        {races.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-label-caps uppercase text-[#8e8e8e]">
                  Historique officiel
                </span>
                <h2 className="text-headline-lg text-[#f0eded]">Calendrier &amp; manches</h2>
              </div>
              <div className="text-telemetry-sm text-[#8e8e8e]">
                {races.length} {pluralize(races.length, 'épreuve')} au calendrier ·{' '}
                {completedRaces.length} {pluralize(completedRaces.length, 'disputée')}
              </div>
            </div>
            <RoundsTable
              year={seasonYear}
              races={races}
              latestCompletedRound={latestCompletedRound}
            />
          </section>
        )}
      </div>
    </div>
  )
}
