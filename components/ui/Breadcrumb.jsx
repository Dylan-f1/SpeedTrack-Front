import Link from 'next/link'

const HOME_CRUMB = { label: 'Accueil', href: '/' }

// Fil d'Ariane commun aux pages : toujours Accueil, puis la section, puis la page courante
// (le dernier élément n'a pas de lien)
export default function Breadcrumb({ items }) {
  const crumbs = [HOME_CRUMB, ...items]

  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8e8e8e]">
        {crumbs.map((crumb, index) => {
          const isCurrentPage = index === crumbs.length - 1

          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {isCurrentPage ? (
                <span aria-current="page" className="font-semibold text-white">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-white/20">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
