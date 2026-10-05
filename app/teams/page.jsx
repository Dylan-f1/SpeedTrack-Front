import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Pagination from '@/components/ui/Pagination'
import SearchForm from '@/components/ui/SearchForm'
import SectionHeader from '@/components/ui/SectionHeader'
import CurrentTeamCard from '@/components/teams/CurrentTeamCard'
import TeamCard from '@/components/teams/TeamCard'
import { normalizeSearchText } from '@/lib/utils'
import { getTeamsData } from './getTeamsData'

export const metadata = {
  title: 'Écuries',
  description:
    'Toutes les écuries de Formule 1 — le plateau actuel et les constructeurs historiques.',
}

const TEAMS_PER_PAGE = 24

function matchesSearch(team, normalizedSearch) {
  return [team.name, team.fullName].some((label) =>
    normalizeSearchText(label).includes(normalizedSearch)
  )
}

export default async function TeamsPage({ searchParams }) {
  const { page: pageParam, search } = await searchParams
  const activeSearch = search?.trim() ?? ''
  const { teams, currentYear, currentTeams, historicalTeams } = await getTeamsData()

  // En recherche, on cherche dans toutes les écuries (plateau compris) : taper « Ferrari »
  // doit trouver Ferrari même si elle n'est pas dans la liste historique
  const listedTeams = activeSearch
    ? teams.filter((team) => matchesSearch(team, normalizeSearchText(activeSearch)))
    : historicalTeams
  const totalPages = Math.max(1, Math.ceil(listedTeams.length / TEAMS_PER_PAGE))
  const page = Math.min(totalPages, Math.max(1, Number(pageParam) || 1))
  const pageTeams = listedTeams.slice((page - 1) * TEAMS_PER_PAGE, page * TEAMS_PER_PAGE)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-10">
      <Breadcrumb items={[{ label: 'Écuries' }]} />

      <header className="flex flex-col gap-3 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="h-5 w-1 bg-[#e10600] rounded-full" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e8e]">
            Annuaire des écuries
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Écuries
        </h1>
        <p className="text-sm text-[#8e8e8e] max-w-xl leading-relaxed">
          Des pionniers des années 50 aux équipes d&apos;aujourd&apos;hui — les {teams.length}{' '}
          constructeurs engagés en Formule 1.
        </p>
      </header>

      {!activeSearch && currentTeams.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionHeader
            title={`Plateau ${currentYear}`}
            summary={`${currentTeams.length} écuries engagées cette saison`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTeams.map(({ team, drivers }) => (
              <CurrentTeamCard key={team.slug} team={team} drivers={drivers} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-6" id="historique">
        <SectionHeader
          title={activeSearch ? 'Résultats' : 'Écuries historiques'}
          summary={
            activeSearch
              ? `${listedTeams.length} écurie${listedTeams.length > 1 ? 's' : ''} pour « ${activeSearch} »`
              : `${historicalTeams.length} écuries passées par la Formule 1`
          }
        >
          <div className="w-full lg:w-80">
            <SearchForm
              action="/teams"
              defaultValue={activeSearch}
              placeholder="RECHERCHER UNE ÉCURIE…"
              label="Rechercher une écurie par nom"
            />
          </div>
        </SectionHeader>

        {pageTeams.length === 0 ? (
          <div className="bg-[#131313] border border-[#262626] rounded-xl py-16 flex flex-col items-center gap-3 text-center">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[32px] text-[#5e5e5e]"
            >
              search_off
            </span>
            <p className="text-sm text-[#8e8e8e]">
              Aucune écurie ne correspond à « {activeSearch} ».
            </p>
            <Link
              href="/teams"
              className="font-mono text-xs text-[#e10600] hover:text-[#ff4d4d] transition-colors"
            >
              Réinitialiser la recherche
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageTeams.map((team) => (
              <TeamCard key={team.slug} team={team} />
            ))}
          </div>
        )}

        <Pagination
          basePath="/teams"
          searchParams={activeSearch ? { search: activeSearch } : {}}
          page={page}
          totalPages={totalPages}
        />
      </section>
    </div>
  )
}
