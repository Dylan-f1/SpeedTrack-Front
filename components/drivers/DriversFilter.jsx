import Link from 'next/link'

const STATUS_TABS = [
  { key: 'all', label: 'Tous' },
  { key: 'active', label: 'En activité' },
  { key: 'former', label: 'Anciens' },
  { key: 'champion', label: 'Champions' },
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
export default function DriversFilter({ activeStatus = 'all', activeSearch = '', counts = {} }) {
  return (
    <nav
      aria-label="Filtrer les pilotes"
      className="chamfer flex max-w-full overflow-x-auto border border-border p-1 [scrollbar-width:none]"
    >
      {STATUS_TABS.map(({ key, label }) => {
        const isActive = activeStatus === key

        return (
          <Link
            key={key}
            href={buildTabHref(key, activeSearch)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap px-3.5 text-[15px] font-medium transition-colors ${
              isActive ? 'bg-[#2a2a2a] text-white' : 'text-[#8e8e8e] hover:text-white'
            }`}
          >
            {label}
            {counts[key] != null && (
              <span
                className={`text-[13px] tabular-nums ${isActive ? 'text-red-primary' : 'text-[#6a6a69]'}`}
              >
                {counts[key]}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
