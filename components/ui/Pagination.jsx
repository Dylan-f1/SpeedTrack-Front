import Link from 'next/link'

// Construit l'URL de la page ciblée en conservant les autres paramètres de recherche (ex: status)
function buildHref(basePath, searchParams, page) {
  const params = new URLSearchParams(searchParams)
  params.set('page', String(page))
  return `${basePath}?${params.toString()}`
}

export default function Pagination({ basePath, searchParams, page, totalPages }) {
  if (totalPages <= 1) return null

  const hasPrevious = page > 1
  const hasNext = page < totalPages

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <Link
        href={hasPrevious ? buildHref(basePath, searchParams, page - 1) : '#'}
        aria-disabled={!hasPrevious}
        className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
          hasPrevious
            ? 'bg-surface-elevated text-text-secondary hover:text-text-primary'
            : 'bg-surface-elevated text-text-muted/30 pointer-events-none'
        }`}
      >
        Précédent
      </Link>

      <span className="text-xs text-text-muted">
        Page {page} / {totalPages}
      </span>

      <Link
        href={hasNext ? buildHref(basePath, searchParams, page + 1) : '#'}
        aria-disabled={!hasNext}
        className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
          hasNext
            ? 'bg-surface-elevated text-text-secondary hover:text-text-primary'
            : 'bg-surface-elevated text-text-muted/30 pointer-events-none'
        }`}
      >
        Suivant
      </Link>
    </div>
  )
}
