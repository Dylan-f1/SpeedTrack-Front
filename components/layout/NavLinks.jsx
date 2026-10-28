'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, isActiveNavItem } from './navItems'

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden h-full items-stretch gap-7 text-[15px] font-medium text-white/75 lg:flex">
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = isActiveNavItem(href, pathname)

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center border-b-2 pt-0.5 transition-colors hover:text-white ${
              isActive ? 'border-red-primary text-white' : 'border-transparent'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
