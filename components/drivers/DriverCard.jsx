import Image from 'next/image'
import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
}

export default function DriverCard({ driver }) {
  const {
    slug,
    firstName,
    lastName,
    nationality,
    currentNumber,
    currentTeam,
    imageUrl,
    careerStats = {},
  } = driver
  const { races = 0, wins = 0, podiums = 0, championships = 0 } = careerStats
  // Actif = engagé sur la saison en cours (l'API ne renvoie une écurie actuelle que dans ce cas)
  const isActive = Boolean(currentTeam)

  const stats = [
    { label: pluralize(races, 'Course', 'Courses'), value: races },
    { label: pluralize(wins, 'Victoire', 'Victoires'), value: wins },
    { label: pluralize(podiums, 'Podium', 'Podiums'), value: podiums },
  ]

  return (
    <Link
      href={`/drivers/${slug}`}
      className="group bg-[#131313] border border-[#262626] hover:border-[#e10600]/50 rounded-xl overflow-hidden flex flex-col transition-colors"
    >
      <div className="relative aspect-[4/5] bg-[#0e0e0e]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top grayscale-[25%] group-hover:grayscale-0 transition duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[56px] text-[#2a2a2a]"
            >
              person
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />

        {currentNumber != null && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#e10600] font-mono text-xs font-black text-white">
            #{currentNumber}
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {isActive && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0e0e0e]/85 border border-[#262626] font-mono text-[10px] font-semibold uppercase text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              En activité
            </span>
          )}
          {championships > 0 && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0e0e0e]/85 border border-amber-500/40 font-mono text-[10px] font-semibold uppercase text-amber-400">
              <span aria-hidden="true" className="material-symbols-outlined text-[12px]">
                trophy
              </span>
              {championships} {pluralize(championships, 'titre', 'titres')}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-[#8e8e8e]">
            <Flag code={nationality} /> {nationality}
          </p>
          <h3 className="mt-1.5 text-base font-bold uppercase leading-tight text-white">
            <span className="text-[#8e8e8e]">{firstName}</span> {lastName}
          </h3>
          <p className="mt-0.5 truncate font-mono text-xs text-[#8e8e8e]">
            {currentTeam?.name ?? 'Retraité'}
          </p>
        </div>

        <dl className="mt-auto pt-3 border-t border-[#262626] grid grid-cols-3 gap-2 text-center">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase text-[#5e5e5e]">{label}</dt>
              <dd className="font-mono text-sm font-bold text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  )
}
