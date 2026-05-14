import Link from 'next/link'
import NavLinks from './NavLinks'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tight leading-none">
            SPEED<span className="text-red-primary">TRACK</span>
            <span className="text-text-muted font-light"> RACING</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks />
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-red-primary animate-pulse" />
            2025
          </span>
        </div>

      </div>
    </header>
  )
}
