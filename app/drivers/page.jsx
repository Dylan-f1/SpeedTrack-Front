import Link from 'next/link'
import DriverSection from '@/components/drivers/DriverSection'
import DriversFilter from '@/components/drivers/DriversFilter'
import PageOpening from '@/components/ui/PageOpening'
import Pagination from '@/components/ui/Pagination'
import SearchForm from '@/components/ui/SearchForm'
import { apiFetch } from '@/lib/apiFetch'

export const metadata = {
  title: 'Pilotes',
  description: "L'annuaire complet des pilotes F1 — actifs et légendes.",
}

const DRIVERS_PER_PAGE = 24
// Un plateau F1 compte une vingtaine de titulaires : tous tiennent sur une seule page
const ACTIVE_DRIVERS_LIMIT = 40

const SECTION_TITLES = {
  all: 'Tous les pilotes',
  active: 'En activité',
  former: 'Anciens pilotes',
  champion: 'Champions du monde',
}

async function getDrivers({ page = 1, limit = DRIVERS_PER_PAGE, status, search }) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status && status !== 'all') params.set('status', status)
  if (search) params.set('search', search)

  const res = await apiFetch(`/drivers?${params.toString()}`)
  // Une erreur de l'API (quota dépassé, serveur indisponible) ne doit pas s'afficher
  // comme « aucun pilote trouvé » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /drivers`)
  return res.json()
}

// Totaux par onglet du filtre (une requête d'un seul pilote suffit pour lire le total)
async function getStatusCounts() {
  const statuses = ['all', 'active', 'former', 'champion']
  const totals = await Promise.all(
    statuses.map((status) => getDrivers({ limit: 1, status }).then(({ total }) => total))
  )
  return Object.fromEntries(statuses.map((status, index) => [status, totals[index]]))
}

function plural(count, word) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}

export default async function DriversPage({ searchParams }) {
  const { page: pageParam, status, search } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const activeStatus = status ?? 'all'
  const activeSearch = search ?? ''
  // Sans filtre ni recherche, la page se coupe en deux sections sans doublon :
  // les titulaires de la saison, puis les anciens pilotes (paginés)
  const isOverview = activeStatus === 'all' && !activeSearch
  const listedStatus = isOverview ? 'former' : activeStatus

  const [counts, listed, activeDrivers] = await Promise.all([
    getStatusCounts(),
    getDrivers({ page, status: listedStatus, search: activeSearch }),
    isOverview && page === 1
      ? getDrivers({ limit: ACTIVE_DRIVERS_LIMIT, status: 'active' }).then(({ data }) => data)
      : null,
  ])

  const sectionTitle = activeSearch
    ? `Résultats pour « ${activeSearch} »`
    : SECTION_TITLES[listedStatus]

  return (
    <div className="pb-24">
      <PageOpening
        breadcrumb={[{ label: 'Pilotes' }]}
        title="Pilotes"
        lead="De Fangio à Verstappen, tous les pilotes qui ont marqué ou marquent encore la Formule 1."
        keyFigures={[
          { value: counts.all, label: 'pilotes depuis 1950' },
          { value: counts.active, label: 'en activité' },
          { value: counts.champion, label: 'champions du monde' },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-80">
            <SearchForm
              action="/drivers"
              defaultValue={activeSearch}
              placeholder="Rechercher un pilote"
              label="Rechercher un pilote par nom"
              hiddenParams={activeStatus !== 'all' ? { status: activeStatus } : {}}
            />
          </div>
          <DriversFilter activeStatus={activeStatus} activeSearch={activeSearch} counts={counts} />
        </div>

        {activeDrivers?.length > 0 && (
          <DriverSection
            title="Plateau 2026"
            subtitle={plural(activeDrivers.length, 'titulaire')}
            drivers={activeDrivers}
          />
        )}

        {listed.data.length > 0 ? (
          <DriverSection
            title={sectionTitle}
            subtitle={`${plural(listed.total, 'pilote')}, de A à Z`}
            drivers={listed.data}
          >
            <div className="pt-8">
              <Pagination
                basePath="/drivers"
                searchParams={{
                  ...(activeStatus !== 'all' ? { status: activeStatus } : {}),
                  ...(activeSearch ? { search: activeSearch } : {}),
                }}
                page={page}
                totalPages={listed.totalPages}
              />
            </div>
          </DriverSection>
        ) : (
          <div className="flex flex-col items-start gap-3 py-16">
            <p className="text-xl font-bold">
              {activeSearch
                ? `Aucun pilote ne correspond à « ${activeSearch} ».`
                : 'Aucun pilote trouvé.'}
            </p>
            {activeSearch && (
              <Link href="/drivers" className="hero-link">
                Effacer la recherche
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
