import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SearchForm from '@/components/ui/SearchForm'
import SectionHeader from '@/components/ui/SectionHeader'
import CircuitsWorldMap from '@/components/circuits/CircuitsWorldMap'
import { COUNTRY_NAMES } from '@/components/circuits/countryNames'
import { normalizeSearchText } from '@/lib/utils'

export const metadata = {
  title: 'Circuits',
  description: 'Les circuits de la Formule 1 depuis 1950, sur la carte du monde.',
}

const API_PAGE_LIMIT = 100
// La liste des circuits change rarement : un cache d'une heure ménage le quota de l'API
const LIST_REVALIDATE_SECONDS = 3600

async function getCircuits() {
  const path = `/circuits?limit=${API_PAGE_LIMIT}`
  const res = await fetch(`${process.env.API_URL}${path}`, {
    next: { revalidate: LIST_REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — ${path}`)
  const { data } = await res.json()
  return data
}

function getCountryName(code) {
  return COUNTRY_NAMES[code] ?? code ?? 'Pays inconnu'
}

function matchesSearch(circuit, normalizedSearch) {
  return [circuit.name, circuit.city, getCountryName(circuit.country)].some((label) =>
    normalizeSearchText(label).includes(normalizedSearch)
  )
}

export default async function CircuitsPage({ searchParams }) {
  const { search } = await searchParams
  const activeSearch = search?.trim() ?? ''
  const circuits = await getCircuits()

  const listedCircuits = activeSearch
    ? circuits.filter((circuit) => matchesSearch(circuit, normalizeSearchText(activeSearch)))
    : circuits
  const countryCount = new Set(circuits.map((circuit) => circuit.country)).size

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-10">
      <Breadcrumb items={[{ label: 'Circuits' }]} />

      <header className="flex flex-col gap-3 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="h-5 w-1 bg-[#e10600] rounded-full" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e8e]">
            Atlas des circuits
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Circuits
        </h1>
        <p className="text-sm text-[#8e8e8e] max-w-xl leading-relaxed">
          De Monaco à Suzuka — les {circuits.length} tracés qui ont accueilli la Formule 1, dans{' '}
          {countryCount} pays.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <SectionHeader
          title={activeSearch ? 'Résultats' : 'Carte du monde'}
          summary={
            activeSearch
              ? `${listedCircuits.length} circuit${listedCircuits.length > 1 ? 's' : ''} pour « ${activeSearch} »`
              : `${circuits.length} circuits · ${countryCount} pays`
          }
        >
          <div className="w-full lg:w-80">
            <SearchForm
              action="/circuits"
              defaultValue={activeSearch}
              placeholder="CIRCUIT, VILLE OU PAYS…"
              label="Rechercher un circuit par nom, ville ou pays"
            />
          </div>
        </SectionHeader>
        {listedCircuits.length === 0 ? (
          <div className="bg-[#131313] border border-[#262626] rounded-xl py-16 flex flex-col items-center gap-3 text-center">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[32px] text-[#5e5e5e]"
            >
              search_off
            </span>
            <p className="text-sm text-[#8e8e8e]">
              Aucun circuit ne correspond à « {activeSearch} ».
            </p>
            <Link
              href="/circuits"
              className="font-mono text-xs text-[#e10600] hover:text-[#ff4d4d] transition-colors"
            >
              Réinitialiser la recherche
            </Link>
          </div>
        ) : (
          <CircuitsWorldMap circuits={listedCircuits} />
        )}
      </section>
    </div>
  )
}
