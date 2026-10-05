'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Pilotes', href: '/drivers' },
  { label: 'Écuries', href: '/teams' },
  { label: 'Circuits', href: '/circuits' },
  { label: 'Saisons', href: '/seasons' },
  { label: 'Résultats', href: '/races' },
  { label: 'Règlements', href: '/regulations' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-neutral-400">
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={
              isActive
                ? 'text-white border-b-2 border-[#e10600] pb-1 font-bold'
                : 'hover:text-white transition-colors'
            }
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
