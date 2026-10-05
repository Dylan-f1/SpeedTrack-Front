export default function PillarCard({ pillar }) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-sm bg-surface-container/30">
        <span className="font-sans text-label-caps uppercase text-primary-container tracking-wider font-bold">
          {pillar.badge}
        </span>
        <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant font-mono text-telemetry-sm">
          {pillar.tag}
        </span>
      </div>
      <h3 className="font-sans text-headline-lg font-semibold text-on-surface uppercase">
        {pillar.title}
      </h3>
      <p className="font-sans text-body-md text-tertiary">{pillar.description}</p>
      <ul className="flex flex-col gap-space-sm text-body-sm font-sans text-on-surface-variant">
        {pillar.items.map((item) => (
          <li key={item.label} className="flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-[15px] text-primary-container mt-0.5">
              check
            </span>
            <div>
              <strong className="text-on-surface font-semibold">{item.label}</strong> {item.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
