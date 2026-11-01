import Breadcrumb from './Breadcrumb'

// Ouverture compacte des pages intérieures : fil d'Ariane, titre et introduction à gauche,
// chiffres clés à droite. Le contenu de la page commence dans le premier écran.
export default function PageOpening({ breadcrumb, title, lead, keyFigures = [] }) {
  return (
    <section className="grid grid-cols-1 items-end gap-x-12 gap-y-6 px-5 pb-7 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:pb-10">
      <div>
        <Breadcrumb items={breadcrumb} />
        <h1 className="-ml-[0.03em] mt-4 text-[clamp(48px,6vw,88px)] font-black leading-[0.95] tracking-[-0.05em]">
          {title}
        </h1>
        {lead && (
          <p className="mt-3.5 max-w-[46ch] text-lg leading-relaxed text-text-secondary lg:text-[19px]">
            {lead}
          </p>
        )}
      </div>
      {keyFigures.length > 0 && (
        <dl className="flex gap-5 lg:gap-10">
          {keyFigures.map(({ value, label }, index) => (
            <div
              key={label}
              className={`flex flex-col-reverse border-l-2 pl-3.5 ${
                index === 0 ? 'border-red-primary' : 'border-border'
              }`}
            >
              <dt className="mt-1.5 text-sm text-[#8e8e8e]">{label}</dt>
              <dd className="text-[clamp(32px,3.4vw,48px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
