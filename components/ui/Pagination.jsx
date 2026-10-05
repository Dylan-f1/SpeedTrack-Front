import Link from 'next/link'

// Construit l'URL de la page ciblée en conservant les autres paramètres de recherche (ex: status)
function buildHref(basePath, searchParams, page) {
  const params = new URLSearchParams(searchParams)
  params.set('page', String(page))
  return `${basePath}?${params.toString()}`
}

const BUTTON_CLASSES =
  'px-4 py-2 rounded-lg border font-mono text-xs flex items-center gap-2 transition-colors'
const ENABLED_CLASSES =
  'bg-[#131313] border-[#262626] text-[#8e8e8e] hover:text-white hover:border-[#e10600]/50'
const DISABLED_CLASSES = 'bg-[#131313] border-[#262626] text-[#8e8e8e] opacity-30'

function PageButton({ href, isEnabled, children }) {
  if (!isEnabled) {
    return (
      <span aria-disabled="true" className={`${BUTTON_CLASSES} ${DISABLED_CLASSES}`}>
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={`${BUTTON_CLASSES} ${ENABLED_CLASSES}`}>
      {children}
    </Link>
  )
}

export default function Pagination({ basePath, searchParams, page, totalPages }) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 pt-6 border-t border-[#262626]"
    >
      <PageButton href={buildHref(basePath, searchParams, page - 1)} isEnabled={page > 1}>
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Précédent
      </PageButton>

      <span className="font-mono text-xs text-[#8e8e8e]">
        Page <span className="text-white font-bold">{page}</span> / {totalPages}
      </span>

      <PageButton href={buildHref(basePath, searchParams, page + 1)} isEnabled={page < totalPages}>
        Suivant
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </PageButton>
    </nav>
  )
}
