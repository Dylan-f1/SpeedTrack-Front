const FLAG_TONE_STYLES = {
  yellow: {
    box: 'bg-yellow-400 text-background',
    status: 'text-on-surface-variant',
  },
  green: {
    box: 'bg-emerald-500 text-background',
    status: 'text-emerald-400',
  },
  red: {
    box: 'bg-primary-container text-on-primary',
    status: 'text-primary-container',
  },
  blue: {
    box: 'bg-blue-600 text-background',
    status: 'text-blue-300',
  },
  // Drapeau noir et blanc : dégradé diagonal par-dessus un fond neutre.
  warning: {
    box: 'bg-surface-container-highest text-on-surface',
    status: 'text-tertiary',
    hasDiagonalGradient: true,
  },
  neutralisation: {
    box: 'bg-amber-600 text-on-primary',
    status: 'text-amber-400',
  },
}

export default function RaceFlagCard({ flag }) {
  const toneStyles = FLAG_TONE_STYLES[flag.tone]

  return (
    <div className="bg-surface-container-low p-space-md flex gap-space-md items-start hover:bg-surface-container transition-colors">
      <div
        className={`w-10 h-10 shrink-0 flex items-center justify-center font-bold font-mono text-telemetry-sm shadow-sm relative overflow-hidden ${toneStyles.box}`}
      >
        {toneStyles.hasDiagonalGradient && (
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-surface-bright opacity-60" />
        )}
        <span className={toneStyles.hasDiagonalGradient ? 'relative z-10 text-[10px]' : ''}>
          {flag.code}
        </span>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-space-sm">
          <h3 className="font-sans text-headline-sm font-semibold text-on-surface uppercase">
            {flag.title}
          </h3>
          <span className={`font-sans text-label-caps font-bold shrink-0 ${toneStyles.status}`}>
            {flag.statusLabel}
          </span>
        </div>
        <p className="font-sans text-body-sm text-tertiary">
          {flag.description.map((segment, index) => (
            <span key={segment.label ?? index}>
              {index > 0 && <br />}
              {segment.label && (
                <strong className="text-on-surface font-semibold">{segment.label} </strong>
              )}
              {segment.text}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
