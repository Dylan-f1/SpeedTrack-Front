const SINGLE_POINT = 1

export default function PointsTable({ table, className, gridClassName }) {
  return (
    <div
      className={`${className} bg-surface-container-low p-space-lg flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between gap-space-sm pb-space-sm bg-surface-container/30">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-container text-[18px]">
              {table.icon}
            </span>
            <h3 className="font-sans text-headline-sm font-semibold uppercase text-on-surface">
              {table.title}
            </h3>
          </div>
          <span className="font-mono text-telemetry-sm text-on-surface-variant shrink-0">
            {table.badge}
          </span>
        </div>
        <div className={`mt-space-md grid ${gridClassName} gap-space-xs`}>
          {table.rows.map((row) => (
            <div
              key={row.label}
              className="bg-surface-container p-space-sm flex flex-col text-center"
            >
              <span className="font-mono text-telemetry-sm text-tertiary">{row.label}</span>
              <span
                className={`font-mono text-telemetry-lg font-bold ${
                  row.highlight ? 'text-primary-container' : 'text-on-surface'
                }`}
              >
                {row.points} {row.points === SINGLE_POINT ? 'pt' : 'pts'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-space-md p-space-sm bg-background flex items-center gap-space-sm">
        <span className="material-symbols-outlined text-[18px] text-tertiary">
          {table.info.icon}
        </span>
        <span className="font-sans text-body-sm text-on-surface-variant">{table.info.text}</span>
      </div>
    </div>
  )
}
