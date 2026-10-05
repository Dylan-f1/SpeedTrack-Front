import Image from 'next/image'
import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'

export default function TeamCurrentDriverCard({ driver, season }) {
  const { slug, firstName, lastName, nationality, imageUrl, carNumber, careerStats } = driver
  const fullName = `${firstName} ${lastName}`

  const careerFigures = careerStats && [
    { label: 'GP', value: careerStats.races },
    { label: 'Victoires', value: careerStats.wins },
    { label: 'Podiums', value: careerStats.podiums },
    { label: 'Poles', value: careerStats.poles },
  ]

  return (
    <Link
      href={`/drivers/${slug}`}
      className="group bg-[#131313] border border-[#262626] hover:border-(--team-accent)/50 rounded-xl p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-lg"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="text-4xl font-black font-mono tracking-tight text-white/80">
            {carNumber != null ? `#${carNumber}` : '—'}
          </span>
          <span className="px-2.5 py-0.5 rounded bg-[#0a0a0a] border border-[#262626] text-[11px] font-mono uppercase text-[#8e8e8e]">
            <Flag code={nationality} /> {nationality}
          </span>
        </div>
        <div className="flex items-center gap-4 my-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#262626] shrink-0 bg-[#0a0a0a] flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={fullName}
                fill
                sizes="64px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="material-symbols-outlined text-[32px] text-[#5e5e5e]">person</span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold uppercase text-white tracking-tight">{fullName}</h3>
            <p className="text-xs text-[#8e8e8e] font-mono mt-0.5">Pilote titulaire {season}</p>
          </div>
        </div>
        {careerFigures && (
          <div className="grid grid-cols-4 gap-3">
            {careerFigures.map((figure) => (
              <div
                key={figure.label}
                className="bg-[#0a0a0a]/70 border border-[#262626]/70 rounded-lg p-3 text-center"
              >
                <span className="block text-[11px] font-mono uppercase text-[#5e5e5e] mb-1">
                  {figure.label}
                </span>
                <span className="font-mono text-sm font-bold text-white">{figure.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
        {careerStats && (
          <div>
            <span className="text-xs font-mono text-[#5e5e5e] uppercase">Titres mondiaux</span>
            <p className="text-sm font-mono font-bold text-white">{careerStats.championships}</p>
          </div>
        )}
        <span className="ml-auto text-xs font-mono font-semibold text-[#8e8e8e] group-hover:text-white transition-colors flex items-center gap-1">
          Voir le profil pilote
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
