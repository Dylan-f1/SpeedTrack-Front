'use client'

import {
  ALL_CATEGORIES_FILTER,
  matchesRegulationUnit,
  useRegulationsFilter,
} from './regulationsFilterContext'

const ACTIVE_FILTER_CLASSES =
  'px-space-md py-space-xs font-sans text-label-caps uppercase tracking-wider bg-primary-container text-on-primary font-bold transition-colors'
const INACTIVE_FILTER_CLASSES =
  'px-space-md py-space-xs font-sans text-label-caps uppercase tracking-wider font-bold bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors'

export default function SearchFilterBar({ filters, units }) {
  const { filter, setFilter, query, setQuery } = useRegulationsFilter()
  const hasActiveFilters = query.trim().length > 0 || filter !== ALL_CATEGORIES_FILTER
  const matchCount = units.filter((unit) => matchesRegulationUnit(unit, filter, query)).length

  const handleReset = () => {
    setQuery('')
    setFilter(ALL_CATEGORIES_FILTER)
  }

  return (
    <>
      <div className="mt-space-md bg-surface-container-low p-space-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            aria-label="Rechercher dans les règlements"
            className="w-full bg-background pl-10 pr-space-md py-space-sm font-sans text-body-md text-on-surface placeholder:text-tertiary-container focus:outline-none focus:ring-1 focus:ring-primary-container"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une règle, une pénalité, un drapeau..."
            type="text"
            value={query}
          />
          {query.length > 0 && (
            <button
              aria-label="Effacer la recherche"
              className="absolute right-space-md text-tertiary hover:text-on-surface"
              onClick={() => setQuery('')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
        <div className="flex items-center flex-wrap gap-space-xs">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              aria-pressed={filter === id}
              className={filter === id ? ACTIVE_FILTER_CLASSES : INACTIVE_FILTER_CLASSES}
              onClick={() => setFilter(id)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {hasActiveFilters && (
        <div className="text-telemetry-sm font-mono text-on-surface-variant flex items-center justify-between gap-space-sm">
          <span>
            RÉSULTATS DE RECHERCHE :{' '}
            <span className="text-primary-container font-bold">{matchCount}</span> SECTION(S)
            TROUVÉE(S)
          </span>
          <button
            className="text-tertiary underline uppercase text-label-caps font-bold font-sans hover:text-on-surface"
            onClick={handleReset}
            type="button"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </>
  )
}
