import Link from 'next/link'

const sections = [
  {
    label: 'Pilotes',
    href: '/drivers',
    description: 'De Senna à Verstappen — tous les pilotes qui ont marqué ou marquent encore la F1.',
    tag: 'Annuaire',
  },
  {
    label: 'Écuries',
    href: '/teams',
    description: "Ferrari, Red Bull, Mercedes... l'histoire des constructeurs qui font la F1.",
    tag: 'Annuaire',
  },
  {
    label: 'Circuits',
    href: '/circuits',
    description: 'Monaco, Silverstone, Suzuka — les tracés légendaires du championnat du monde.',
    tag: 'Annuaire',
  },
  {
    label: 'Saisons',
    href: '/seasons',
    description: 'Classements, champions et calendriers de chaque saison depuis les origines.',
    tag: 'Archives',
  },
  {
    label: 'Résultats',
    href: '/races',
    description: 'Grilles, classements de course et records de qualifications.',
    tag: 'Résultats',
  },
  {
    label: 'Règlements',
    href: '/regulations',
    description: 'Les grandes ères techniques qui ont redéfini la Formule 1.',
    tag: 'Technique',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#0E0E0E]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />

        {/* Watermark F1 */}
        <span className="absolute right-0 bottom-0 text-[30vw] font-black text-white/[0.025] leading-none select-none pointer-events-none">
          F1
        </span>

        <div className="relative max-w-screen-xl mx-auto px-6 py-20 w-full">
          <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            La référence Formule 1
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none mb-6">
            Speed<span className="text-red-primary">Track</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            Pilotes, écuries, circuits, saisons et règlements — toute l&apos;histoire de la Formule 1 en un seul endroit.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/drivers"
              className="px-6 py-3 bg-red-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
            >
              Explorer les pilotes
            </Link>
            <Link
              href="/seasons"
              className="px-6 py-3 bg-surface border border-border text-text-primary text-sm font-bold uppercase tracking-widest hover:border-red-primary transition-colors"
            >
              Saisons
            </Link>
          </div>
        </div>
      </section>

      {/* Grille des sections */}
      <section className="max-w-screen-xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-8">
          Explorer
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative bg-surface border border-border rounded-sm p-6 hover:border-red-primary transition-colors duration-200"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              <p className="text-[10px] text-red-primary uppercase tracking-widest font-semibold mb-3">
                {section.tag}
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight text-text-primary group-hover:text-red-primary transition-colors mb-3">
                {section.label}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
