import Image from 'next/image'
import Link from 'next/link'

const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuChi_hNClMpC235dF6bkJSWKiFyImFZR_p3BzfdWekHLZZwn7k4yZgHOOSxsUUplFZ-VMX4uj0USi6-kkd4GW9ZHbmAyqU1os2GBT7mqe0y_078s5BZOkAAfRd2LBSYt2cXj5i-JleF3QQWFTPoNBz_FQb5HTcd_axtTB-eUFHUJjFUnobp3MFQDhUvFp7OeZGA5mhMa3MvYnvMkBPODSJETKCR02SyOcjszzKH86U0Z8S7bU6KQKFq3Q'
const HERO_IMAGE_SIZES = '(min-width: 1024px) 560px, 100vw'

export default function HeroSection({ year }) {
  const seasonHref = year ? `/seasons/${year}` : '/seasons'
  const seasonLabel = year ? `EXPLORER LA SAISON ${year}` : 'EXPLORER LES SAISONS'

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
      <div className="lg:col-span-6 space-y-6">
        {year && (
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#18181b] border border-[#2e2e33] text-[11px] font-mono tracking-wider uppercase text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span>SAISON F1 {year}</span>
          </div>
        )}
        <div>
          <h1 className="text-5xl sm:text-7xl font-black text-white uppercase leading-none tracking-[-0.04em]">
            SPEEDTRACK
          </h1>
          <div className="h-1.5 w-28 bg-[#e10600] mt-3 rounded-full"></div>
        </div>
        <div className="space-y-1 text-lg sm:text-xl text-neutral-300">
          <p className="font-medium text-neutral-400">La télémétrie F1 simplifiée.</p>
          <p className="font-extrabold text-white">Données pures, sans bruit.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={seasonHref}
            className="px-6 py-3.5 rounded-full bg-[#e10600] hover:bg-[#c30500] text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-red-950/40 transition"
          >
            <span>{seasonLabel}</span>
            <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
          </Link>
          <Link
            href="/drivers"
            className="px-5 py-3.5 rounded-full bg-[#18181b] hover:bg-[#232327] border border-[#2e2e33] text-neutral-200 font-bold text-xs uppercase tracking-wider transition"
          >
            VOIR LES PILOTES
          </Link>
          <Link
            href="/regulations"
            className="px-5 py-3.5 rounded-full bg-[#18181b] hover:bg-[#232327] border border-[#2e2e33] text-neutral-300 font-bold text-xs uppercase tracking-wider transition"
          >
            RÈGLEMENTS F1
          </Link>
        </div>
      </div>
      <div className="lg:col-span-6">
        <div className="relative bg-gradient-to-b from-[#19191d] to-[#121214] border border-[#2b2b32] rounded-2xl p-5 shadow-2xl">
          <div className="relative my-4 aspect-[16/9] w-full bg-black/60 rounded-xl overflow-hidden border border-[#242429]">
            <Image
              src={HERO_IMAGE_URL}
              alt="Monoplace de Formule 1"
              fill
              priority
              sizes={HERO_IMAGE_SIZES}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
