// Accordéon natif <details>/<summary> : aucun JavaScript client nécessaire.
export default function FaqAccordion({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
      {items.map((item) => (
        <details
          key={item.question}
          className="bg-surface-container-low p-space-md group transition-all cursor-pointer"
        >
          <summary className="flex items-center justify-between gap-space-sm font-sans text-headline-sm font-semibold text-on-surface uppercase select-none list-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-primary-container">
              expand_more
            </span>
          </summary>
          <div className="mt-space-sm pt-space-xs font-sans text-body-sm text-tertiary leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
