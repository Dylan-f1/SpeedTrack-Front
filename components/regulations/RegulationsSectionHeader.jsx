export default function RegulationsSectionHeader({ eyebrow, title, aside, children }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div>
        <span className="font-sans text-label-caps text-primary-container tracking-widest uppercase font-bold">
          {eyebrow}
        </span>
        <h2 className="font-sans text-headline-xl font-bold text-on-surface uppercase">{title}</h2>
        {children}
      </div>
      {aside}
    </div>
  )
}
