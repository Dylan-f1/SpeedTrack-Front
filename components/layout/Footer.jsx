import Link from 'next/link'

const sections = [
  {
    title: 'SpeedTrack',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Saisons', href: '/seasons' },
      { label: 'Résultats', href: '/races' },
    ],
  },
  {
    title: 'Paddock',
    links: [
      { label: 'Pilotes', href: '/drivers' },
      { label: 'Écuries', href: '/teams' },
    ],
  },
  {
    title: 'Monde F1',
    links: [
      { label: 'Circuits', href: '/circuits' },
      { label: 'Règlements', href: '/regulations' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-black tracking-tight">
              SPEED<span className="text-red-primary">TRACK</span>
            <span className="text-text-muted font-light"> RACING</span>
            </span>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              La référence F1 — pilotes, écuries, circuits et résultats au même endroit.
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-4">
                {s.title}
              </p>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <span>© {new Date().getFullYear()} SpeedTrack Racing. Contenu gratuit.</span>
          <span>
            F1® est une marque déposée de{' '}
            <span className="text-text-secondary">Formula One Licensing BV</span>
          </span>
        </div>

      </div>
    </footer>
  )
}
