'use client'

import { useState } from 'react'
import DriverCard from './DriverCard'
import DriversFilter from './DriversFilter'

export default function DriversGrid({ drivers }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? drivers : drivers.filter((d) => d.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DriversFilter onFilterChange={setFilter} />
        <span className="text-xs text-text-muted">
          {filtered.length} pilote{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucun pilote trouvé.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((d) => (
            <DriverCard key={d.slug} driver={d} />
          ))}
        </div>
      )}
    </div>
  )
}
