import Breadcrumb from '@/components/ui/Breadcrumb'
import { findEraForYear, getRegulationEras } from '@/lib/regulations'
import { getSeasonYears } from '@/lib/seasons'
import {
  ERA_2026_CATEGORY,
  ERA_2026_PILLARS,
  FAQ_CATEGORY,
  FAQ_ITEMS,
  POINTS_CATEGORY,
  POINTS_MAIN,
  POINTS_SPRINT,
  QUICK_METRICS,
  RACE_FLAGS,
  RACE_FLAGS_CATEGORY,
  REGULATION_FILTERS,
  REGULATION_PILLARS,
} from '@/lib/content/regulations'
import {
  ERA_2026_SEARCH_INDEX,
  FAQ_SEARCH_INDEX,
  PILLAR_SEARCH_INDEXES,
  POINTS_SEARCH_INDEX,
  RACE_FLAGS_SEARCH_INDEX,
  REGULATION_SEARCH_UNITS,
} from '@/components/regulations/regulationsSearchIndex'
import RegulationsExplorer from '@/components/regulations/RegulationsExplorer'
import SearchFilterBar from '@/components/regulations/SearchFilterBar'
import FilterableSection from '@/components/regulations/FilterableSection'
import RegulationsSectionHeader from '@/components/regulations/RegulationsSectionHeader'
import PillarCard from '@/components/regulations/PillarCard'
import RaceFlagCard from '@/components/regulations/RaceFlagCard'
import PointsTable from '@/components/regulations/PointsTable'
import Era2026Card from '@/components/regulations/Era2026Card'
import FaqAccordion from '@/components/regulations/FaqAccordion'
import RegulationErasSection from '@/components/regulations/RegulationErasSection'
import SeasonRegulationPanel from '@/components/regulations/SeasonRegulationPanel'

export const metadata = {
  title: 'Règlements',
  description:
    'Les règles sportives, techniques et financières de la Formule 1 en 2026, et ses grandes ères réglementaires.',
}

export default async function RegulationsPage({ searchParams }) {
  const { season } = await searchParams
  const [regulationEras, seasonYears] = await Promise.all([getRegulationEras(), getSeasonYears()])
  const currentYear = seasonYears[0]
  const requestedYear = Number(season)
  const selectedYear = seasonYears.includes(requestedYear) ? requestedYear : currentYear
  const selectedEra = findEraForYear(regulationEras, selectedYear)

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-margin-desktop pt-8">
        <Breadcrumb items={[{ label: 'Règlements' }]} />
      </div>

      <RegulationsExplorer>
        <section className="w-full px-margin-desktop pt-space-xl pb-space-lg bg-background">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="px-space-sm py-1 bg-surface-container font-sans text-label-caps uppercase tracking-widest text-primary-container font-bold">
                RÈGLEMENT FIA
              </span>
              <span className="text-tertiary-container text-body-sm font-mono">•</span>
              <span className="font-mono text-telemetry-sm text-on-surface-variant uppercase">
                SAISON 2026 · RÈGLEMENT EN VIGUEUR
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="space-y-space-xs">
                <h1 className="font-sans text-display-lg font-bold text-on-surface uppercase tracking-tight">
                  Règlements de la <span className="text-primary-container">Formule 1</span>
                </h1>
                <p className="font-sans text-body-lg text-tertiary max-w-3xl">
                  Guide structuré des règles techniques, sportives et financières en vigueur dans le
                  Championnat du Monde FIA de Formule 1. Clarté, transparence et repères
                  opérationnels instantanés.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-low p-space-sm">
                {QUICK_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="px-space-md py-space-xs bg-surface-container flex flex-col"
                  >
                    <span className="font-sans text-label-caps font-bold text-on-surface-variant">
                      {metric.label}
                    </span>
                    <span className="font-mono text-telemetry-md text-on-surface font-bold">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <SearchFilterBar filters={REGULATION_FILTERS} units={REGULATION_SEARCH_UNITS} />
          </div>
        </section>

        <SeasonRegulationPanel
          eras={regulationEras}
          selectedEra={selectedEra}
          selectedYear={selectedYear}
          currentYear={currentYear}
          seasonYears={seasonYears}
        />

        <div className="w-full px-margin-desktop py-space-xl max-w-7xl mx-auto flex flex-col gap-space-xl">
          <section className="flex flex-col gap-space-md">
            <RegulationsSectionHeader
              eyebrow="STRUCTURE MAJEURE"
              title="Les Trois Piliers Réglementaires"
              aside={
                <span className="font-mono text-telemetry-sm text-tertiary hidden md:inline-block">
                  LIVRE DE RÈGLES FIA
                </span>
              }
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-desktop">
              {REGULATION_PILLARS.map((pillar) => (
                <FilterableSection
                  key={pillar.id}
                  as="article"
                  category={pillar.category}
                  searchIndex={PILLAR_SEARCH_INDEXES[pillar.id]}
                  className="bg-surface-container-low flex flex-col p-space-lg hover:bg-surface-container transition-colors"
                >
                  <PillarCard pillar={pillar} />
                </FilterableSection>
              ))}
            </div>
          </section>

          <FilterableSection
            as="section"
            category={RACE_FLAGS_CATEGORY}
            searchIndex={RACE_FLAGS_SEARCH_INDEX}
            className="flex flex-col gap-space-md"
          >
            <RegulationsSectionHeader
              eyebrow="SIGNAUX VISUELS & COMMISSIONS DE PISTE"
              title="Drapeaux & Procédures de Course"
              aside={
                <span className="font-mono text-telemetry-sm text-on-surface-variant hidden sm:inline-block">
                  PROTOCOLES DIGITAUX &amp; PHYSIQUES FIA
                </span>
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
              {RACE_FLAGS.map((flag) => (
                <RaceFlagCard key={flag.code} flag={flag} />
              ))}
            </div>
          </FilterableSection>

          <FilterableSection
            as="section"
            category={POINTS_CATEGORY}
            searchIndex={POINTS_SEARCH_INDEX}
            className="flex flex-col gap-space-md"
          >
            <RegulationsSectionHeader
              eyebrow="SYSTÈME DE SCORING"
              title="Barème Officiel des Points"
              aside={
                <div className="flex items-center gap-space-xs font-mono text-telemetry-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    sports_score
                  </span>
                  <span>SAISON 2026</span>
                </div>
              }
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
              <PointsTable
                table={POINTS_MAIN}
                className="lg:col-span-7"
                gridClassName="grid-cols-2 sm:grid-cols-5"
              />
              <PointsTable
                table={POINTS_SPRINT}
                className="lg:col-span-5"
                gridClassName="grid-cols-4"
              />
            </div>
          </FilterableSection>

          <FilterableSection
            as="section"
            category={ERA_2026_CATEGORY}
            searchIndex={ERA_2026_SEARCH_INDEX}
            className="bg-surface-container-lowest p-space-lg lg:p-space-xl flex flex-col gap-space-lg relative overflow-hidden"
          >
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <RegulationsSectionHeader
                eyebrow="NOUVELLE ÈRE TECHNIQUE"
                title="Règlement 2026 en Bref"
                aside={
                  <span className="shrink-0 self-start lg:self-auto px-space-md py-space-xs bg-surface-container text-on-surface font-mono text-telemetry-sm uppercase font-bold tracking-wider">
                    EN VIGUEUR DEPUIS 2026
                  </span>
                }
              >
                <p className="font-sans text-body-md text-tertiary">
                  La génération de monoplaces introduite en 2026 rééquilibre la puissance
                  thermique/électrique et remplace le DRS par une aérodynamique active.
                </p>
              </RegulationsSectionHeader>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop relative z-10">
              {ERA_2026_PILLARS.map((pillar) => (
                <Era2026Card key={pillar.title} pillar={pillar} />
              ))}
            </div>
          </FilterableSection>

          <FilterableSection
            as="section"
            category={FAQ_CATEGORY}
            searchIndex={FAQ_SEARCH_INDEX}
            className="flex flex-col gap-space-md"
          >
            <RegulationsSectionHeader
              eyebrow="CLARIFICATIONS & FAQ"
              title="Règles Souvent Mal Comprises"
            />
            <FaqAccordion items={FAQ_ITEMS} />
          </FilterableSection>

          {regulationEras.length > 0 && (
            <RegulationErasSection eras={regulationEras} selectedEra={selectedEra} />
          )}
        </div>
      </RegulationsExplorer>
    </div>
  )
}
