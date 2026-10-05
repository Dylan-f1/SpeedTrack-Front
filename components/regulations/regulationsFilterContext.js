'use client'

import { createContext, useContext } from 'react'

export const ALL_CATEGORIES_FILTER = 'all'

export const RegulationsFilterContext = createContext(null)

export function useRegulationsFilter() {
  const context = useContext(RegulationsFilterContext)

  if (!context) {
    throw new Error('useRegulationsFilter must be used within a RegulationsExplorer')
  }

  return context
}

export function matchesRegulationUnit(unit, filter, query) {
  const normalizedQuery = query.trim().toLowerCase()
  const matchesCategory = filter === ALL_CATEGORIES_FILTER || unit.category === filter
  const matchesSearch = normalizedQuery.length === 0 || unit.searchIndex.includes(normalizedQuery)

  return matchesCategory && matchesSearch
}
