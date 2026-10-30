import Breadcrumb from '@/components/ui/Breadcrumb'
import { readableTextColor } from '@/lib/color'

const NEUTRAL_PANEL = '#2a2a2a'

// Ouverture des fiches (pilote, écurie) en écran partagé : identité à gauche (sur-titre,
// titre, faits), panneau à la couleur de l'écurie à droite avec un repère en grand
// (numéro, initiale) et un visuel biseauté (portrait, logo)
export default function ProfileOpening({
  breadcrumb,
  kicker,
  title,
  facts,
  panelColor,
  panelMark,
  media,
}) {
  const color = panelColor ?? NEUTRAL_PANEL

  return (
    <section className="grid grid-cols-1 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(360px,40%)]">
      <div className="flex flex-col justify-end px-5 pb-10 pt-8 sm:px-8 lg:pb-14">
        <Breadcrumb items={breadcrumb} />
        {kicker && (
          <p className="mt-10 text-[clamp(22px,2.2vw,30px)] font-medium leading-tight text-text-secondary lg:mt-auto">
            {kicker}
          </p>
        )}
        <h1
          className={`-ml-[0.03em] break-words text-[clamp(48px,7vw,104px)] font-black leading-[0.95] tracking-[-0.05em] ${
            kicker ? 'mt-2' : 'mt-10 lg:mt-auto'
          }`}
        >
          {title}
        </h1>
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:max-w-[720px]">
          {facts.map(({ label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="text-sm text-[#8e8e8e]">{label}</dt>
              <dd className="mt-1 font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Sans visuel, le panneau n'apporte rien sur mobile : la fiche commence par le titre */}
      <div
        className={`relative order-first h-[320px] overflow-hidden sm:h-[420px] lg:order-none lg:block lg:h-auto ${
          media ? '' : 'hidden'
        }`}
        style={{ backgroundColor: color }}
      >
        {panelMark != null && (
          <span
            aria-hidden="true"
            className="absolute -right-[0.04em] -top-[0.12em] select-none text-[clamp(220px,26vw,400px)] font-black leading-none tracking-[-0.06em] tabular-nums opacity-20"
            style={{ color: readableTextColor(color) }}
          >
            {panelMark}
          </span>
        )}
        {media}
      </div>
    </section>
  )
}
