import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeader from '@/components/ui/SectionHeader'
import EraTimeline from '@/components/regulations/EraTimeline'
import SeasonTile from '@/components/seasons/SeasonTile'
import { findEraForYear, getRegulationEras } from '@/lib/regulations'
import { getSeasonYears } from '@/lib/seasons'

export const metadata = {
  title: 'Saisons',
  description: 'Toutes les saisons du championnat du monde de Formule 1 depuis 1950.',
}

const DECADE_LENGTH = 10

// Les ères ne sont qu'un repère sur cette page : si elles manquent, la liste reste utilisable
async function getRegulationErasOrEmpty() {
  try {
    return await getRegulationEras()
  } catch {
    return []
  }
}

function groupByDecade(years) {
  const yearsByDecade = new Map()
  for (const year of years) {
    const decade = Math.floor(year / DECADE_LENGTH) * DECADE_LENGTH
    yearsByDecade.set(decade, [...(yearsByDecade.get(decade) ?? []), year])
  }
  return [...yearsByDecade.entries()].map(([decade, decadeYears]) => ({ decade, decadeYears }))
}

export default async function SeasonsPage() {
  const [seasonYears, regulationEras] = await Promise.all([
    getSeasonYears(),
    getRegulationErasOrEmpty(),
  ])
  const currentYear = seasonYears[0]
  const firstYear = seasonYears.at(-1)
  const decades = groupByDecade(seasonYears)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-10">
      <Breadcrumb items={[{ label: 'Saisons' }]} />

      <header className="flex flex-col gap-3 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="h-5 w-1 bg-[#e10600] rounded-full" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e8e]">
            Archives du championnat
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Saisons
        </h1>
        <p className="text-sm text-[#8e8e8e] max-w-xl leading-relaxed">
          De {firstYear} à {currentYear} — {seasonYears.length} saisons de championnat du monde,
          avec leur plateau et le règlement en vigueur.
        </p>
      </header>

      {regulationEras.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader
            title="Ères réglementaires"
            summary="Cliquez sur une ère pour voir son règlement"
          />
          <EraTimeline eras={regulationEras} selectedEra={null} currentYear={currentYear} />
        </section>
      )}

      {decades.map(({ decade, decadeYears }) => (
        <section key={decade} className="flex flex-col gap-4">
          <SectionHeader
            title={`Années ${decade}`}
            summary={`${decadeYears.length} saison${decadeYears.length > 1 ? 's' : ''}`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {decadeYears.map((year) => (
              <SeasonTile
                key={year}
                year={year}
                eraLabel={findEraForYear(regulationEras, year)?.label}
                isCurrent={year === currentYear}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
