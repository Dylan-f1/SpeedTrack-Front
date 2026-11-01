import Link from 'next/link'

// Construit l'URL de la page ciblée en conservant les autres paramètres de recherche (ex: status)
function buildHref(basePath, searchParams, page) {
  const params = new URLSearchParams(searchParams)
  params.set('page', String(page))
  return `${basePath}?${params.toString()}`
}

function PageLink({ href, isEnabled, children }) {
  if (!isEnabled) {
    return (
      <span aria-disabled="true" className="py-3 font-semibold text-white/25">
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className="hero-link py-3">
      {children}
    </Link>
  )
}

export default function Pagination({ basePath, searchParams, page, totalPages }) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 border-t border-border pt-4"
    >
      <PageLink href={buildHref(basePath, searchParams, page - 1)} isEnabled={page > 1}>
        Page précédente
      </PageLink>
      <span className="text-sm text-[#8e8e8e] tabular-nums">
        Page <span className="text-white">{page}</span> sur {totalPages}
      </span>
      <PageLink href={buildHref(basePath, searchParams, page + 1)} isEnabled={page < totalPages}>
        Page suivante
      </PageLink>
    </nav>
  )
}
