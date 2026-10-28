import Link from 'next/link'
import HeaderShell from './HeaderShell'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import NavLinks from './NavLinks'
import { apiFetch } from '@/lib/apiFetch'

// Le header est rendu sur chaque page : sans cache, il consommerait une requête du quota
// de l'API (limité par IP, donc partagé par tous les visiteurs une fois déployé)
const CURRENT_SEASON_REVALIDATE_SECONDS = 3600

async function getCurrentSeasonYear() {
  try {
    const res = await apiFetch(`/seasons?limit=1`, {
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
    <HeaderShell>
      <div className="flex h-[72px] items-center gap-10 px-5 sm:px-8">
        <Logo />
        <NavLinks />
        <div className="ml-auto flex items-center gap-5">
          {currentSeasonYear && (
            <Link
              href={`/seasons/${currentSeasonYear}`}
              className="whitespace-nowrap text-sm text-text-secondary transition-colors hover:text-white"
            >
              Saison {currentSeasonYear}
            </Link>
          )}
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  )
}
