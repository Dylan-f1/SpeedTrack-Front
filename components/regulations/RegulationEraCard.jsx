import Link from 'next/link'
import { formatEraPeriod } from '@/lib/regulations'

export default function RegulationEraCard({ era, isSelected }) {
  const seasonCount = era.seasons?.length ?? 0

  return (
    <Link
      href={`/regulations?season=${era.from}#saison`}
      aria-current={isSelected ? 'true' : undefined}
      className={`group flex flex-col justify-between gap-space-lg p-space-lg border transition-colors ${
        isSelected
          ? 'bg-surface-container border-primary-container'
          : 'bg-surface-container-low border-transparent hover:bg-surface-container'
      }`}
    >
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between gap-space-sm pb-space-sm">
          <span className="font-mono text-telemetry-sm uppercase text-primary-container font-bold">
            {formatEraPeriod(era)}
          </span>
          {isSelected && (
            <span className="px-2 py-0.5 bg-primary-container font-mono text-[10px] font-bold uppercase text-white">
              Saison choisie
            </span>
          )}
        </div>
        <h3 className="font-sans text-headline-lg font-semibold text-on-surface uppercase">
          {era.label ?? era.era}
        </h3>
        {era.engineSpec && (
          <p className="font-mono text-telemetry-sm text-on-surface-variant">{era.engineSpec}</p>
        )}
        {era.summary && (
          <p className="font-sans text-body-md text-tertiary line-clamp-3">{era.summary}</p>
        )}
      </div>
      <div className="pt-space-sm flex items-center justify-between">
        <span className="font-mono text-telemetry-sm text-on-surface-variant">
          {seasonCount > 0 && `${seasonCount} SAISON${seasonCount > 1 ? 'S' : ''}`}
        </span>
        <span className="font-sans text-label-caps uppercase text-primary-container font-bold flex items-center gap-1">
          VOIR
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5"
          >
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
