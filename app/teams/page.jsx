import Link from 'next/link'
import PageOpening from '@/components/ui/PageOpening'
import SearchForm from '@/components/ui/SearchForm'
import CurrentTeamTile from '@/components/teams/CurrentTeamTile'
import TeamIndex from '@/components/teams/TeamIndex'
import { normalizeSearchText } from '@/lib/utils'
import { getTeamsData } from './getTeamsData'

export const metadata = {
  title: 'Écuries',
  description:
    'Toutes les écuries de Formule 1 — le plateau actuel et les constructeurs historiques.',
}

function matchesSearch(team, normalizedSearch) {
  return [team.name, team.fullName].some((label) =>
    normalizeSearchText(label).includes(normalizedSearch)
  )
}

function plural(count, word) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}

function TeamsSection({ title, subtitle, children }) {
  return (
    <section className="pt-12">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="flex items-center gap-3 text-[clamp(26px,2.6vw,36px)] font-extrabold tracking-[-0.03em]">
          <span aria-hidden="true" className="h-[3px] w-6 bg-red-primary" />
          {title}
        </h2>
        {subtitle && <p className="text-[#8e8e8e]">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

export default async function TeamsPage({ searchParams }) {
  const { search } = await searchParams
  const activeSearch = search?.trim() ?? ''
  const { teams, currentYear, currentTeams, historicalTeams } = await getTeamsData()
  const countryCount = new Set(teams.map((team) => team.nationality).filter(Boolean)).size

  // En recherche, on cherche dans toutes les écuries (plateau compris) : taper « Ferrari »
  // doit trouver Ferrari même si elle n'est pas dans la liste historique
  const foundTeams = activeSearch
    ? teams.filter((team) => matchesSearch(team, normalizeSearchText(activeSearch)))
    : null

  return (
    <div className="pb-24">
      <PageOpening
        breadcrumb={[{ label: 'Écuries' }]}
        title="Écuries"
        lead="Des pionniers des années 50 aux équipes d'aujourd'hui, tous les constructeurs engagés en Formule 1."
        keyFigures={[
          { value: teams.length, label: 'écuries depuis 1950' },
          { value: currentTeams.length, label: `engagées en ${currentYear}` },
          { value: countryCount, label: 'pays représentés' },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="border-t border-border pt-6">
          <div className="w-full lg:w-80">
            <SearchForm
              action="/teams"
              defaultValue={activeSearch}
              placeholder="Rechercher une écurie"
              label="Rechercher une écurie par nom"
            />
          </div>
        </div>

        {foundTeams ? (
          <TeamsSection
            title={`Résultats pour « ${activeSearch} »`}
            subtitle={plural(foundTeams.length, 'écurie')}
          >
            {foundTeams.length > 0 ? (
              <TeamIndex teams={foundTeams} />
            ) : (
              <div className="flex flex-col items-start gap-3 py-8">
                <p className="text-xl font-bold">Aucune écurie ne correspond à « {activeSearch} ».</p>
                <Link href="/teams" className="hero-link">
                  Effacer la recherche
                </Link>
              </div>
            )}
          </TeamsSection>
        ) : (
          <>
            {currentTeams.length > 0 && (
              <TeamsSection
                title={`Plateau ${currentYear}`}
                subtitle={`${plural(currentTeams.length, 'écurie')} engagées cette saison`}
              >
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentTeams.map(({ team, drivers }) => (
                    <li key={team.slug}>
                      <CurrentTeamTile team={team} drivers={drivers} />
                    </li>
                  ))}
                </ul>
              </TeamsSection>
            )}

            <TeamsSection
              title="Écuries historiques"
              subtitle={`${plural(historicalTeams.length, 'écurie')}, de A à Z`}
            >
              <TeamIndex teams={historicalTeams} />
            </TeamsSection>
          </>
        )}
      </div>
    </div>
  )
}
