'use client'

import { useMemo, useState } from 'react'
import { ALL_CATEGORIES_FILTER, RegulationsFilterContext } from './regulationsFilterContext'

export default function RegulationsExplorer({ children }) {
  const [filter, setFilter] = useState(ALL_CATEGORIES_FILTER)
  const [query, setQuery] = useState('')

  const filterState = useMemo(() => ({ filter, setFilter, query, setQuery }), [filter, query])

  return (
    <RegulationsFilterContext.Provider value={filterState}>
      {children}
    </RegulationsFilterContext.Provider>
  )
}
