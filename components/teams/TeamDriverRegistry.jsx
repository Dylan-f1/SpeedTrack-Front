'use client'

import { useState } from 'react'
import TeamRegistryDriverCard from '@/components/teams/TeamRegistryDriverCard'

const PAGE_SIZE = 9
// Pages voisines de la page courante affichées dans la pagination numérotée
const PAGE_NEIGHBOURS = 1

const ERA_FILTERS = [
  { id: 'all', label: 'Tous', matches: () => true },
  { id: 'modern', label: 'Ère moderne (1996+)', matches: (driver) => driver.isModern },
  { id: 'classic', label: 'Ère classique (1950–1995)', matches: (driver) => driver.isClassic },
]

// Première, dernière et pages autour de la courante ; les trous deviennent des ellipses
function getPageItems(currentPage, totalPages) {
  const pages = [1, totalPages]
  for (let offset = -PAGE_NEIGHBOURS; offset <= PAGE_NEIGHBOURS; offset++) {
    pages.push(currentPage + offset)
  }
  const sortedPages = [...new Set(pages)]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  return sortedPages.flatMap((page, index) => {
    const previousPage = sortedPages[index - 1]
    return previousPage && page - previousPage > 1 ? [`gap-${page}`, page] : [page]
  })
}

export default function TeamDriverRegistry({ teamName, drivers }) {
  const [activeFilterId, setActiveFilterId] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const firstYear = Math.min(...drivers.map((driver) => driver.firstYear))
  const lastYear = Math.max(...drivers.map((driver) => driver.lastYear))
  const nationalitiesCount = new Set(drivers.map((driver) => driver.nationality)).size

  // Un filtre d'ère vide ou identique à « Tous » n'apporte rien : on ne le propose pas
  const filters = ERA_FILTERS.map((filter) => ({
    ...filter,
    count: drivers.filter(filter.matches).length,
  })).filter((filter) => filter.id === 'all' || (filter.count > 0 && filter.count < drivers.length))
  const activeFilter = filters.find((filter) => filter.id === activeFilterId) ?? filters[0]

  const filteredDrivers = drivers.filter(activeFilter.matches)
  const totalPages = Math.max(1, Math.ceil(filteredDrivers.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredDrivers.length)
  const visibleDrivers = filteredDrivers.slice(startIndex, endIndex)

  const isFirstPage = safePage <= 1
  const isLastPage = safePage >= totalPages
  const hasPagination = totalPages > 1

  const handleFilterChange = (filterId) => {
    setActiveFilterId(filterId)
    setCurrentPage(1)
  }

  const goToPrevPage = () => setCurrentPage(Math.max(1, safePage - 1))
  const goToNextPage = () => setCurrentPage(Math.min(totalPages, safePage + 1))

  const period = firstYear === lastYear ? `${firstYear}` : `${firstYear} — ${lastYear}`
  const driversPlural = drivers.length > 1 ? 's' : ''
  const nationalitiesPlural = nationalitiesCount > 1 ? 's' : ''
  const summary = `${drivers.length} pilote${driversPlural} engagé${driversPlural} en Grand Prix · ${nationalitiesCount} nationalité${nationalitiesPlural}`

  return (
    <section className="flex flex-col gap-6" id="drivers-directory">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#262626] pb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-(--team-accent)" />
            <h2 className="text-xl font-bold uppercase tracking-tight text-white">
              Registre historique des pilotes {teamName} ({period})
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8e8e8e] pl-5">{summary}</p>
        </div>
        <span className="font-mono text-xs text-[#8e8e8e] self-start md:self-auto">
          Affichage {startIndex + 1}–{endIndex} sur {filteredDrivers.length} sélectionnés
        </span>
      </div>

      {(filters.length > 1 || hasPagination) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {filters.length > 1 &&
              filters.map((filter) => {
                const stateClass =
                  filter.id === activeFilter.id
                    ? 'border-(--team-accent) bg-(--team-accent)/10 text-white'
                    : 'border-[#262626] hover:border-(--team-accent)/50 bg-[#131313] hover:bg-[#181818] text-[#8e8e8e] hover:text-white'

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => handleFilterChange(filter.id)}
                    className={`px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all ${stateClass}`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                )
              })}
          </div>
          {hasPagination && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={isFirstPage}
                title="Page précédente"
                className="w-8 h-8 rounded-lg bg-[#131313] border border-[#262626] hover:border-(--team-accent) hover:text-white text-[#8e8e8e] flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <div className="flex items-center gap-1 font-mono text-xs text-[#8e8e8e] px-2">
                Page <span className="text-white font-bold ml-1">{safePage}</span>/
                <span>{totalPages}</span>
              </div>
              <button
                type="button"
                onClick={goToNextPage}
                disabled={isLastPage}
                title="Page suivante"
                className="w-8 h-8 rounded-lg bg-[#131313] border border-[#262626] hover:border-(--team-accent) hover:text-white text-[#8e8e8e] flex items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {visibleDrivers.map((driver) => (
          <TeamRegistryDriverCard key={driver.slug} driver={driver} />
        ))}
      </div>

      {hasPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#262626]">
          <button
            type="button"
            onClick={goToPrevPage}
            disabled={isFirstPage}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#131313] hover:bg-[#181818] border border-[#262626] hover:border-(--team-accent)/50 text-[#8e8e8e] hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Précédent</span>
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {getPageItems(safePage, totalPages).map((item) =>
              typeof item === 'string' ? (
                <span key={item} className="px-1 font-mono text-xs text-[#5e5e5e]">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCurrentPage(item)}
                  className={`px-3 py-1 rounded-md border font-mono text-xs transition-all ${
                    item === safePage
                      ? 'border-(--team-accent) bg-(--team-accent)/20 text-white font-bold'
                      : 'bg-[#131313] hover:bg-[#181818] border-[#262626] text-[#8e8e8e] hover:text-white font-medium'
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={isLastPage}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#131313] hover:bg-[#181818] border border-[#262626] hover:border-(--team-accent)/50 text-[#8e8e8e] hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>Suivant</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      )}
    </section>
  )
}
