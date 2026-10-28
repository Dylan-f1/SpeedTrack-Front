import Image from 'next/image'
import Link from 'next/link'

// « SpeedTrack » en Schibsted 900 (interlettrage −0,06 em) mesure environ 5,65 fois la taille
// de la police : en divisant la largeur disponible par 5,8, le mot occupe toute la largeur
// sans jamais être coupé, et sans calcul côté navigateur
const TITLE_WIDTH_IN_EM = 5.8

export default function HeroSection({ year, content }) {
  const seasonHref = year ? `/seasons/${year}` : '/seasons'
  const seasonLabel = year ? `Explorer la saison ${year}` : 'Explorer les saisons'

  return (
    <section className="relative h-svh min-h-[680px] overflow-hidden">
      {content?.imageUrl && (
        // Image déjà dimensionnée sur Cloudinary : servie telle quelle pour rester nette
        <Image
          src={content.imageUrl}
          alt={content.imageAlt ?? ''}
          fill
          priority
          unoptimized
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,19,19,.85)_0%,rgba(19,19,19,.15)_45%,rgba(19,19,19,.6)_100%)]" />

      <div className="absolute left-5 right-5 top-[100px] z-10 max-w-[36ch] sm:left-8 lg:top-32">
        {content && (
          <p className="text-[22px] leading-snug text-white/75">
            {content.taglineMuted}
            <strong className="block font-semibold text-white">{content.taglineStrong}</strong>
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <Link
            href={seasonHref}
            className="bg-red-primary px-6 py-[15px] font-bold text-white transition-[filter,transform] duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
          >
            {seasonLabel}
          </Link>
          <Link href="/drivers" className="hero-link">
            Voir les pilotes
          </Link>
          <Link href="/regulations" className="hero-link">
            Règlements F1
          </Link>
        </div>
      </div>

      <h1
        className="absolute bottom-5 left-5 z-10 -ml-[0.045em] whitespace-nowrap font-black leading-none tracking-[-0.06em] text-[#e5e2e1] sm:bottom-10 sm:left-8"
        style={{ fontSize: `calc((100vw - 4rem) / ${TITLE_WIDTH_IN_EM})` }}
      >
        SpeedTrack
      </h1>
    </section>
  )
}
