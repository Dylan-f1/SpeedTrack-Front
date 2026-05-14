'use client'

import { useState } from 'react'

const tabs = [
  { key: 'all', label: 'Tous' },
  { key: 'active', label: 'Actifs' },
  { key: 'legend', label: 'Légendes' },
]

export default function DriversFilter({ onFilterChange }) {
  const [active, setActive] = useState('all')

  function handleTab(key) {
    setActive(key)
    onFilterChange(key)
  }

  return (
    <div className="flex items-center gap-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => handleTab(t.key)}
          className={`
            px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors
            ${active === t.key
              ? 'bg-red-primary text-white'
              : 'bg-surface-elevated text-text-muted border-l-2 border-red-dark hover:text-text-secondary'
            }
          `}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
