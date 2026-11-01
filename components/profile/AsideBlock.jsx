import Link from 'next/link'

// Bloc de la colonne latérale des fiches, comme l'encadré d'une fiche encyclopédique
export function AsideBlock({ title, meta, children }) {
  return (
    <section className="border-t border-border py-10 lg:py-12">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-extrabold tracking-[-0.02em]">{title}</h2>
        {meta && <span className="text-sm text-[#8e8e8e] tabular-nums">{meta}</span>}
      </div>
      <ol className="mt-4">{children}</ol>
    </section>
  )
}

// Ligne d'un bloc latéral : trait de couleur facultatif, titre, précision dessous, repère à
// droite. Avec `href`, la ligne mène à une autre fiche ; `isHighlighted` marque la fiche en cours.
export function AsideRow({ href, color, title, detail, meta, isHighlighted = false }) {
  const content = (
    <>
      {color && (
        <span
          aria-hidden="true"
          className="w-[3px] shrink-0 self-stretch"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="min-w-0 flex-1">
        <span
          className={`block font-semibold leading-snug ${
            href
              ? 'underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-red-primary'
              : ''
          }`}
        >
          {title}
        </span>
        {detail && <span className="block text-sm text-[#8e8e8e] tabular-nums">{detail}</span>}
      </span>
      {meta && (
        <span
          className={`shrink-0 text-sm tabular-nums ${isHighlighted ? 'font-semibold text-white' : 'text-text-secondary'}`}
        >
          {meta}
        </span>
      )}
    </>
  )

  return (
    <li className="border-b border-border last:border-b-0">
      {href ? (
        <Link href={href} className="group flex gap-3 py-3">
          {content}
        </Link>
      ) : (
        <span className="flex gap-3 py-3" aria-current={isHighlighted ? 'page' : undefined}>
          {content}
        </span>
      )}
    </li>
  )
}
