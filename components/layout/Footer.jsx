import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Pilotes', href: '/drivers' },
  { label: 'Écuries', href: '/teams' },
  { label: 'Circuits', href: '/circuits' },
  { label: 'Saisons', href: '/seasons' },
  { label: 'Règlements', href: '/regulations' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0c0c] py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-black text-white text-lg tracking-wider uppercase">
              SPEEDTRACK
            </span>
            <span className="w-1.5 h-3.5 bg-[#e10600] rounded-xs" />
            <span className="text-xs font-mono text-neutral-500">
              © {new Date().getFullYear()} SPEEDTRACK
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono uppercase tracking-wider text-neutral-400">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
