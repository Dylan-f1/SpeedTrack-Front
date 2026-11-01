import Link from 'next/link'
import PageOpening from '@/components/ui/PageOpening'
import SearchForm from '@/components/ui/SearchForm'
import CircuitIndex from '@/components/circuits/CircuitIndex'
import CircuitsGlobe from '@/components/circuits/CircuitsGlobeLoader'
import { normalizeSearchText } from '@/lib/utils'
import { apiFetch } from '@/lib/apiFetch'

export const metadata = {
  title: 'Circuits',
  description: 'Les circuits de la Formule 1 depuis 1950, sur un globe interactif.',
}

const API_PAGE_LIMIT = 100
// La liste des circuits change rarement : un cache d'une heure ménage le quota de l'API
const LIST_REVALIDATE_SECONDS = 3600

async function getCircuits() {
  const path = `/circuits?limit=${API_PAGE_LIMIT}`
  const res = await apiFetch(path, {
    next: { revalidate: LIST_REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — ${path}`)
  const { data } = await res.json()
  return data
}

function matchesSearch(circuit, normalizedSearch) {
  return [circuit.name, circuit.city, circuit.countryName].some((label) =>
    normalizeSearchText(label).includes(normalizedSearch)
  )
}

function plural(count, word) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}

function CircuitsSection({ title, subtitle, children }) {
  return (
    <section className="pt-12">
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
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

export default async function CircuitsPage({ searchParams }) {
  const { search } = await searchParams
  const activeSearch = search?.trim() ?? ''
  const circuits = await getCircuits()

  const listedCircuits = activeSearch
    ? circuits.filter((circuit) => matchesSearch(circuit, normalizeSearchText(activeSearch)))
    : circuits
  // Le globe ne peut placer que les circuits dont les coordonnées sont connues
  const locatedCircuits = listedCircuits.filter(
    ({ location }) => location?.lat != null && location?.lng != null
  )
  const countryCount = new Set(circuits.map((circuit) => circuit.country)).size
  const southernCount = circuits.filter(({ location }) => location?.lat < 0).length

  return (
    <div className="pb-24">
      <PageOpening
        breadcrumb={[{ label: 'Circuits' }]}
        title="Circuits"
        lead="De Monaco à Suzuka, tous les tracés qui ont accueilli la Formule 1 depuis 1950."
        keyFigures={[
          { value: circuits.length, label: 'circuits depuis 1950' },
          { value: countryCount, label: 'pays' },
          { value: southernCount, label: "dans l'hémisphère sud" },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="border-t border-border pt-6">
          <div className="w-full lg:w-80">
            <SearchForm
              action="/circuits"
              defaultValue={activeSearch}
              placeholder="Circuit, ville ou pays"
              label="Rechercher un circuit par nom, ville ou pays"
            />
          </div>
        </div>

        {listedCircuits.length === 0 ? (
          <div className="flex flex-col items-start gap-3 py-16">
            <p className="text-xl font-bold">Aucun circuit ne correspond à « {activeSearch} ».</p>
            <Link href="/circuits" className="hero-link">
              Effacer la recherche
            </Link>
          </div>
        ) : (
          <>
            <CircuitsSection
              title={activeSearch ? `Résultats pour « ${activeSearch} »` : 'Sur le globe'}
              subtitle={plural(locatedCircuits.length, 'circuit')}
            >
              <CircuitsGlobe circuits={locatedCircuits} />
            </CircuitsSection>

            <CircuitsSection title="Par pays" subtitle={plural(listedCircuits.length, 'circuit')}>
              <CircuitIndex circuits={listedCircuits} />
            </CircuitsSection>
          </>
        )}
      </div>
    </div>
  )
}
