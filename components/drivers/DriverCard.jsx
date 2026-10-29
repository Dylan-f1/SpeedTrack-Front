import Image from 'next/image'
import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import { faceCrop } from '@/lib/cloudinary'
import { readableTextColor } from '@/lib/color'

const PHOTO_WIDTH = 360
const PHOTO_HEIGHT = 480

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
}

// Étiquette en haut à gauche : numéro sur la couleur de l'écurie pour un titulaire,
// titres mondiaux pour un ancien champion, rien sinon
function CardBadge({ currentNumber, currentTeam, championships }) {
  if (currentTeam?.primaryColor && currentNumber != null) {
    return (
      <span
        className="absolute left-3 top-3 px-2 py-0.5 text-sm font-extrabold tabular-nums"
        style={{
          backgroundColor: currentTeam.primaryColor,
          color: readableTextColor(currentTeam.primaryColor),
        }}
      >
        #{currentNumber}
      </span>
    )
  }
  if (championships > 0) {
    return (
      <span className="absolute left-3 top-3 bg-red-primary px-2 py-0.5 text-sm font-bold text-white">
        {championships} {pluralize(championships, 'titre', 'titres')}
      </span>
    )
  }
  return null
}

export default function DriverCard({ driver }) {
  const { slug, firstName, lastName, nationality, imageUrl, currentNumber, currentTeam } = driver
  const { races = 0, wins = 0, podiums = 0, championships = 0 } = driver.careerStats ?? {}
  const stats = [
    `${races} ${pluralize(races, 'Grand Prix', 'Grands Prix')}`,
    `${wins} ${pluralize(wins, 'victoire', 'victoires')}`,
    `${podiums} ${pluralize(podiums, 'podium', 'podiums')}`,
  ]

  return (
    <Link
      href={`/drivers/${slug}`}
      className="chamfer group relative block aspect-[3/4] overflow-hidden border border-border bg-surface transition-colors duration-200 hover:border-[#6a6a69]"
    >
      {imageUrl ? (
        <Image
          src={faceCrop(imageUrl, PHOTO_WIDTH, PHOTO_HEIGHT)}
          alt=""
          fill
          unoptimized
          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] motion-reduce:transform-none"
        />
      ) : (
        // Sans photo : le numéro (ou l'initiale) en grand, à la couleur de l'écurie
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[18%] text-center text-[72px] font-black tracking-[-0.05em]"
          style={{ color: currentTeam?.primaryColor ?? '#2a2a2a' }}
        >
          {currentNumber ?? lastName[0]}
        </span>
      )}
      <span className="absolute inset-0 bg-[linear-gradient(0deg,#131313_0%,rgba(19,19,19,.94)_38%,rgba(19,19,19,.6)_52%,transparent_70%)]" />

      <CardBadge
        currentNumber={currentNumber}
        currentTeam={currentTeam}
        championships={championships}
      />
      <Flag code={nationality} className="absolute right-3 top-3" />

      <span className="absolute inset-x-0 bottom-0 p-3.5">
        <span className="block text-sm text-text-secondary">{firstName}</span>
        <span className="block text-[19px] font-extrabold leading-tight tracking-[-0.02em]">
          {lastName}
        </span>
        <span className="mt-1 flex items-center gap-2 truncate text-[13px] text-[#8e8e8e]">
          {currentTeam ? (
            <>
              <span
                aria-hidden="true"
                className="h-3 w-[3px] shrink-0"
                style={{ backgroundColor: currentTeam.primaryColor ?? '#8e8e8e' }}
              />
              {currentTeam.name}
            </>
          ) : (
            'Retraité'
          )}
        </span>
        {/* Sur deux colonnes étroites (mobile), les chiffres masqueraient toute la photo */}
        <span className="mt-2 hidden border-t border-white/10 pt-2 text-[13px] leading-relaxed text-text-secondary tabular-nums sm:block">
          {stats.map((stat) => (
            <span key={stat} className="block">
              {stat}
            </span>
          ))}
        </span>
      </span>
    </Link>
  )
}
