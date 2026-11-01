'use client'

import { usePathname } from 'next/navigation'

// Sur l'accueil, l'en-tête se pose sur la photo plein écran du hero ;
// ailleurs, il reste collé en haut sur un fond plein
export default function HeaderShell({ children }) {
  const isHome = usePathname() === '/'

  return (
    <header
      className={
        isHome
          ? 'absolute inset-x-0 top-0 z-50'
          : 'sticky top-0 z-50 border-b border-border bg-background'
      }
    >
      {children}
    </header>
  )
}
