import Link from 'next/link'
import NavLinks from './NavLinks'

// Le header est rendu sur chaque page : sans cache, il consommerait une requête du quota
// de l'API (limité par IP, donc partagé par tous les visiteurs une fois déployé)
const CURRENT_SEASON_REVALIDATE_SECONDS = 3600

async function getCurrentSeasonYear() {
  try {
    const res = await fetch(`${process.env.API_URL}/seasons?limit=1`, {
      next: { revalidate: CURRENT_SEASON_REVALIDATE_SECONDS },
    })
    if (!res.ok) return null
    const { data } = await res.json()
    return data?.[0]?.year ?? null
  } catch {
    return null
  }
}

export default async function Header() {
  const currentSeasonYear = await getCurrentSeasonYear()

  return (
    <header className="sticky top-0 z-50 bg-[#131313]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-wider text-white uppercase">
              SPEEDTRACK
            </span>
            <span className="w-2 h-4 bg-[#e10600] rounded-sm group-hover:scale-y-110 transition-transform" />
          </Link>
          <NavLinks />
        </div>

        {currentSeasonYear && (
          <Link
            href={`/seasons/${currentSeasonYear}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#161618] border border-[#2a2a30] text-xs font-mono hover:border-[#e10600]/60 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-[#e10600]" />
            <span className="text-neutral-300 font-bold tracking-wider">
              SAISON {currentSeasonYear}
            </span>
          </Link>
        )}
      </div>
    </header>
  )
}
