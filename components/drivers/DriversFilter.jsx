import Link from 'next/link'

const STATUS_TABS = [
  { key: 'all', label: 'Tous' },
  { key: 'active', label: 'En activité' },
  { key: 'former', label: 'Anciens pilotes' },
  { key: 'champion', label: 'Champions du monde' },
]

function buildTabHref(statusKey, search) {
  const params = new URLSearchParams()
  if (statusKey !== 'all') params.set('status', statusKey)
  if (search) params.set('search', search)
  const query = params.toString()
  return query ? `/drivers?${query}` : '/drivers'
}

// Le filtre passe par l'URL (?status=...) et s'applique côté API, pour porter sur
// l'ensemble des pilotes et pas seulement la page affichée. La recherche en cours est conservée.
export default function DriversFilter({ activeStatus = 'all', activeSearch = '' }) {
  return (
    <nav aria-label="Filtrer les pilotes" className="flex flex-wrap items-center gap-2">
      {STATUS_TABS.map(({ key, label }) => {
        const isActive = activeStatus === key

        return (
          <Link
            key={key}
            href={buildTabHref(key, activeSearch)}
            aria-current={isActive ? 'page' : undefined}
            className={`px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-[#e10600] border-[#e10600] text-white'
                : 'bg-[#131313] border-[#262626] text-[#8e8e8e] hover:text-white hover:border-[#393939]'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
