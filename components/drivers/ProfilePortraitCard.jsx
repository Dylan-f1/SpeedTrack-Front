import Image from 'next/image'
import Link from 'next/link'

// Carte portrait de l'en-tête : photo du pilote (crédit obligatoire, licences CC)
// et écurie actuelle — ou la dernière écurie pour un pilote retiré.
export default function ProfilePortraitCard({
  fullName,
  imageUrl,
  imageCredit,
  imageLicense,
  team,
  isCurrentTeam,
  currentNumber,
}) {
  const creditLabel = imageLicense ? `${imageCredit} (${imageLicense})` : imageCredit

  return (
    <div className="w-full max-w-sm bg-[#181818] border border-white/10 rounded-2xl p-4 shadow-2xl relative">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 relative flex items-center justify-center">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={fullName}
                fill
                priority
                sizes="96px"
                className="object-cover object-top contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </>
          ) : (
            <span
              className="material-symbols-outlined text-[48px] text-neutral-600"
              aria-label="Photo indisponible"
            >
              person
            </span>
          )}
        </div>
        {team && (
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d46]">
              {isCurrentTeam ? 'Écurie actuelle' : 'Dernière écurie'}
            </span>
            <Link
              href={`/teams/${team.slug}`}
              className="text-base font-bold text-white tracking-wide uppercase hover:text-[#ff4d46] transition-colors"
            >
              {team.name}
            </Link>
            {isCurrentTeam && currentNumber && (
              <span className="text-xs text-neutral-400 font-mono mt-1">
                Numéro #{currentNumber}
              </span>
            )}
          </div>
        )}
      </div>
      {imageUrl && imageCredit && (
        <p className="mt-3 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-neutral-500 leading-relaxed break-words">
          Photo : {creditLabel}
        </p>
      )}
    </div>
  )
}
