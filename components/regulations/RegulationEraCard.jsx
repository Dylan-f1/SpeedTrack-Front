import Link from 'next/link'

export default function RegulationEraCard({ era }) {
  const seasonCount = era.seasons?.length ?? 0

  return (
    <Link
      href={`/regulations/${era.era}`}
      className="group bg-surface-container-low flex flex-col justify-between gap-space-lg p-space-lg hover:bg-surface-container transition-colors"
    >
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between gap-space-sm pb-space-sm bg-surface-container/30">
          <span className="font-sans text-label-caps uppercase text-primary-container tracking-wider font-bold">
            {era.era}
          </span>
          {era.engineSpec && (
            <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant font-mono text-telemetry-sm">
              {era.engineSpec}
            </span>
          )}
        </div>
        <h3 className="font-sans text-headline-lg font-semibold text-on-surface uppercase">
          {era.label ?? era.era}
        </h3>
        {era.summary && (
          <p className="font-sans text-body-md text-tertiary line-clamp-3">{era.summary}</p>
        )}
      </div>
      <div className="pt-space-sm flex items-center justify-between">
        <span className="font-mono text-telemetry-sm text-on-surface-variant">
          {seasonCount > 0 && `${seasonCount} SAISON${seasonCount > 1 ? 'S' : ''}`}
        </span>
        <span className="font-sans text-label-caps uppercase text-primary-container font-bold flex items-center gap-1">
          DÉTAILS
          <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
