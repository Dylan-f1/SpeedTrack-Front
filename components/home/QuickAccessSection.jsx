import Link from 'next/link'
import { circuitsAPI, driversAPI, teamsAPI } from '@/lib/api'
import { getRegulationEras } from '@/lib/regulations'
import RacingLine from './RacingLine'

const SLIDE_ON_HOVER =
  'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-4 group-focus-visible:translate-x-4 motion-reduce:transform-none'

async function fetchTotal(request) {
  try {
    const { total } = await request
    return Number.isFinite(total) ? total : null
  } catch {
    return null
  }
}

async function fetchEraCount() {
  try {
    return (await getRegulationEras()).length
  } catch {
    return null
  }
}

export default async function QuickAccessSection() {
  const [activeDriversTotal, teamsTotal, circuitsTotal, eraCount] = await Promise.all([
    fetchTotal(driversAPI.list({ status: 'active', limit: 1 })),
    fetchTotal(teamsAPI.list({ limit: 1 })),
    fetchTotal(circuitsAPI.list({ limit: 1 })),
    fetchEraCount(),
  ])

  // Les rubriques sont les virages du tour : V1, V2… dans l'ordre du parcours
  const corners = [
    {
      title: 'Pilotes',
      total: activeDriversTotal,
      description: 'Biographies, stats et victoires',
      href: '/drivers',
    },
    {
      title: 'Écuries',
      total: teamsTotal,
      description: 'Histoire, palmarès et pilotes',
      href: '/teams',
    },
    {
      title: 'Circuits',
      total: circuitsTotal,
      description: 'Tracés, records et histoire',
      href: '/circuits',
    },
    {
      title: 'Règlements',
      total: eraCount,
      description: 'Ères techniques et sportives',
      href: '/regulations',
    },
  ]

  return (
    <section className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 py-[72px] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-12 lg:py-[110px]">
      <RacingLine />
      <div className="self-start">
        <h2 className="text-[clamp(32px,3.6vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
          Explorer la Formule 1
        </h2>
        <p className="mt-3 text-[#8e8e8e]">Un tour en {corners.length} virages</p>
      </div>
      <nav aria-label="Accès rapide aux rubriques">
        {corners.map((corner, index) => (
          <Link
            key={corner.href}
            href={corner.href}
            data-corner
            className="group relative grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 border-t border-border py-7 last:border-b"
          >
            {/* Survol : le contenu glisse (transform, sans recalcul de mise en page) et un
                trait d'accent apparaît à gauche */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] origin-left scale-x-0 bg-red-primary transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span
              className={`text-[26px] font-extrabold tracking-[-0.03em] lg:text-[32px] ${SLIDE_ON_HOVER}`}
            >
              <span className="mr-3 inline-block min-w-[2.5ch] align-middle text-[15px] font-bold text-red-primary">
                V{index + 1}
              </span>
              {corner.title}
            </span>
            {corner.total !== null && (
              <span className="row-span-2 self-center text-[30px] font-extrabold tracking-[-0.03em] text-text-secondary tabular-nums lg:text-[44px]">
                {corner.total}
              </span>
            )}
            <span className={`text-[#8e8e8e] ${SLIDE_ON_HOVER}`}>{corner.description}</span>
          </Link>
        ))}
      </nav>
    </section>
  )
}
