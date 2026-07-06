import Link from 'next/link'

const tabs = [
  { key: 'all', label: 'Tous' },
  { key: 'active', label: 'Actifs' },
  { key: 'former', label: 'Anciens pilotes' },
  { key: 'champion', label: 'Champions du monde' },
]

// activeStatus vient de l'URL (?status=...) : le filtre est appliqué côté API, pas en mémoire,
// pour rester correct sur l'ensemble des pilotes et pas seulement la page affichée
export default function DriversFilter({ activeStatus = 'all' }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.key === 'all' ? '/drivers' : `/drivers?status=${t.key}`}
          className={`
            px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors
            ${activeStatus === t.key
              ? 'bg-red-primary text-white'
              : 'bg-surface-elevated text-text-muted border-l-2 border-red-dark hover:text-text-secondary'
            }
          `}
        >
          {t.label}
        </Link>
      ))}
    </div>
  )
}
