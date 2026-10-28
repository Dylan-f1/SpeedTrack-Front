'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS, isActiveNavItem } from './navItems'

const PANEL_ID = 'mobile-menu'

// Menu des écrans étroits (sous 1024 px), où les rubriques ne tiennent pas dans l'en-tête
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Pendant l'ouverture : la page derrière ne défile plus, Échap referme et rend le focus
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Le panneau doit être rendu visible avant de pouvoir recevoir le focus
    const focusFrame = requestAnimationFrame(() => panelRef.current?.querySelector('a')?.focus())

    function closeOnEscape(event) {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        onClick={() => setIsOpen((open) => !open)}
        className="-mr-2 min-h-11 px-2 text-[15px] font-semibold text-white lg:hidden"
      >
        {isOpen ? 'Fermer' : 'Menu'}
      </button>

      <nav
        id={PANEL_ID}
        ref={panelRef}
        aria-label="Rubriques"
        inert={!isOpen}
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-background px-5 pb-10 pt-4 transition-[opacity,transform,visibility] duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none sm:px-8 lg:hidden ${
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = isActiveNavItem(href, pathname)

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 border-b border-border py-4 text-[28px] font-extrabold tracking-[-0.03em] ${
                isActive ? 'text-white' : 'text-text-secondary'
              }`}
            >
              {isActive && (
                <span aria-hidden="true" className="h-[3px] w-5 rounded-full bg-red-primary" />
              )}
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
