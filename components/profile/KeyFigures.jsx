const BORDER_COLOR = '#353534'

// Bande de chiffres clés sous l'ouverture d'une fiche : valeur en grand, libellé, précision
// éventuelle (« 29 % des courses ») ; le trait du premier chiffre prend la couleur d'accent
export default function KeyFigures({ figures, accentColor }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border py-10 sm:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
      {figures.map(({ value, label, note }, index) => (
        <div
          key={label}
          className="flex flex-col-reverse justify-end border-l-2 pl-4"
          style={{ borderColor: index === 0 ? accentColor : BORDER_COLOR }}
        >
          <dt className="mt-2 text-[#8e8e8e]">
            <span className="block font-semibold text-text-secondary">{label}</span>
            {note && <span className="text-sm">{note}</span>}
          </dt>
          <dd className="text-[clamp(40px,4.4vw,64px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
