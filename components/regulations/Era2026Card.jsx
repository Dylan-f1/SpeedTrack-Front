export default function Era2026Card({ pillar }) {
  return (
    <div className="bg-surface-container-low p-space-md flex flex-col justify-between gap-space-md">
      <div className="space-y-space-xs">
        <div className="flex items-center gap-space-xs text-primary-container">
          <span className="material-symbols-outlined text-[20px]">{pillar.icon}</span>
          <span className="font-sans text-label-caps uppercase font-bold">{pillar.eyebrow}</span>
        </div>
        <h3 className="font-sans text-headline-sm font-semibold text-on-surface uppercase">
          {pillar.title}
        </h3>
        <p className="font-sans text-body-sm text-tertiary">
          {pillar.description.map((segment) =>
            segment.strong ? (
              <strong key={segment.strong} className="text-on-surface">
                {segment.strong}
              </strong>
            ) : (
              <span key={segment.text}>{segment.text}</span>
            )
          )}
        </p>
      </div>
      <div className="font-mono text-telemetry-sm text-on-surface-variant pt-space-xs bg-background/40">
        {pillar.footer}
      </div>
    </div>
  )
}
