'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
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
    <nav className="flex items-center gap-1">
      {links.map(({ label, href }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={`
              relative px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors
              ${isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'}
            `}
          >
            {label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-primary" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
