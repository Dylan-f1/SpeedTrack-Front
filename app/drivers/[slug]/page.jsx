import { notFound } from 'next/navigation'
import { getDriver, drivers } from '@/lib/fixtures/drivers'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  return drivers.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }) {
  const driver = getDriver(params.slug)
  if (!driver) return {}
  return { title: `${driver.firstName} ${driver.lastName}` }
}

const flagEmoji = {
  GBR: '🇬🇧', NED: '🇳🇱', MON: '🇲🇨', BRA: '🇧🇷',
  GER: '🇩🇪', FRA: '🇫🇷', AUT: '🇦🇹', ESP: '🇪🇸',
}

export default function DriverProfilePage({ params }) {
  const driver = getDriver(params.slug)
  if (!driver) notFound()

  const { firstName, lastName, nationality, dateOfBirth, number, status, bio, stats, teams, quote } = driver

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[480px] bg-[#0E0E0E] overflow-hidden flex items-end">
        {/* Placeholder photo — à remplacer par <Image> quand les assets arrivent */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />

        {/* Barre rouge verticale gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-primary" />

        <div className="relative max-w-screen-xl mx-auto px-6 pb-12 w-full">
          {/* Badge statut */}
          <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-red-primary text-white mb-4">
            {status === 'legend' ? 'Légende' : 'Actif'}
          </span>

          {/* Nom */}
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-2">
            {firstName}
            <br />
            <span className="text-text-secondary">{lastName}</span>
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
            <span>{flagEmoji[nationality] ?? '🏁'} {nationality}</span>
            <span className="w-px h-4 bg-border" />
            <span>{formatDate(dateOfBirth)}</span>
            <span className="w-px h-4 bg-border" />
            <span>#{number}</span>
          </div>
        </div>

        {/* Numéro watermark côté droit */}
        <span className="absolute right-8 bottom-4 text-[180px] font-black text-white/[0.04] leading-none select-none">
          {number}
        </span>
      </section>

      {/* Stats bar */}
      <section className="bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-5 divide-x divide-border-light">
            {[
              { label: 'Courses', value: stats.races },
              { label: 'Victoires', value: stats.wins },
              { label: 'Podiums', value: stats.podiums },
              { label: 'Poles', value: stats.poles },
              { label: 'Titres', value: stats.championships },
            ].map((s) => (
              <div key={s.label} className="px-6 py-6 text-center">
                <p className="text-3xl font-black text-text-primary">{s.value}</p>
                <p className="text-[11px] text-text-muted uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corps */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Bio */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-4">
              Biographie
            </h2>
            <p className="text-text-secondary leading-relaxed">{bio}</p>
          </div>

          {/* Quote */}
          {quote && (
            <blockquote className="border-l-2 border-red-primary pl-6 py-2">
              <p className="text-lg italic text-text-secondary leading-relaxed">"{quote}"</p>
            </blockquote>
          )}
        </div>

        {/* Timeline écuries */}
        <div>
          <h2 className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-6">
            Équipes
          </h2>
          <ol className="relative border-l border-border ml-2 space-y-6">
            {teams.map((t, i) => (
              <li key={i} className="pl-6">
                <span className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-red-primary border-2 border-background" />
                <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {t.from} — {t.to ?? 'présent'}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </div>
  )
}
