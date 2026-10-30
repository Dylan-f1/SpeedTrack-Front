import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { faceCrop } from '@/lib/cloudinary'
import { readableTextColor } from '@/lib/color'

const PORTRAIT_WIDTH = 600
const PORTRAIT_HEIGHT = 800
const NEUTRAL_PANEL = '#2a2a2a'

// Ouverture de la fiche en écran partagé : identité à gauche, panneau à la couleur de
// l'écurie à droite avec le numéro en grand et le portrait biseauté (comme dans la liste)
export default function ProfileOpening({
  firstName,
  lastName,
  imageUrl,
  number,
  accentColor,
  facts,
}) {
  const fullName = `${firstName} ${lastName}`
  const panelColor = accentColor ?? NEUTRAL_PANEL

  return (
    <section className="grid grid-cols-1 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(360px,40%)]">
      <div className="flex flex-col justify-end px-5 pb-10 pt-8 sm:px-8 lg:pb-14">
        <Breadcrumb items={[{ label: 'Pilotes', href: '/drivers' }, { label: fullName }]} />
        <p className="mt-10 text-[clamp(22px,2.2vw,30px)] font-medium leading-none text-text-secondary lg:mt-auto">
          {firstName}
        </p>
        <h1 className="-ml-[0.03em] mt-2 break-words text-[clamp(48px,7vw,104px)] font-black leading-[0.95] tracking-[-0.05em]">
          {lastName}
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

      {/* Sans photo, le panneau n'apporte rien sur mobile : la fiche commence par le nom */}
      <div
        className={`relative order-first h-[320px] overflow-hidden sm:h-[420px] lg:order-none lg:block lg:h-auto ${
          imageUrl ? '' : 'hidden'
        }`}
        style={{ backgroundColor: panelColor }}
      >
        {/* Numéro de course, ou l'initiale pour un pilote sans numéro connu */}
        <span
          aria-hidden="true"
          className="absolute -right-[0.04em] -top-[0.12em] select-none text-[clamp(220px,26vw,400px)] font-black leading-none tracking-[-0.06em] tabular-nums opacity-20"
          style={{ color: readableTextColor(panelColor) }}
        >
          {number ?? lastName[0]}
        </span>
        {imageUrl && (
          <div className="chamfer absolute bottom-0 left-1/2 aspect-[3/4] w-[min(64%,340px)] -translate-x-1/2 bg-surface lg:bottom-14">
            <Image
              src={faceCrop(imageUrl, PORTRAIT_WIDTH, PORTRAIT_HEIGHT)}
              alt={fullName}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
