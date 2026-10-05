import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SeasonNavLink from '@/components/seasons/SeasonNavLink'
import { formatEraPeriod } from '@/lib/regulations'

export default function SeasonHeader({
  year,
  isCurrent,
  previousYear,
  nextYear,
  championDriver,
  championTeam,
  summary,
  regulationEra,
}) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Saisons', href: '/seasons' }, { label: `Saison ${year}` }]} />
        <div className="flex items-center gap-3">
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#353534] text-[#f0eded] text-label-caps uppercase rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
              En cours
            </span>
          )}
          <span className="text-telemetry-sm text-[#8e8e8e] uppercase">
            FIA Formula One World Championship
          </span>
        </div>
        <h1 className="text-display-lg text-[#f0eded] uppercase tracking-tight">Saison {year}</h1>
        <p className="text-body-md text-[#8e8e8e] max-w-xl">{summary}</p>
        {regulationEra && (
          <Link
            href={`/regulations?season=${year}#saison`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131313] border border-[#262626] hover:border-[#e10600]/60 font-mono text-xs text-[#c8c6c5] hover:text-white transition-colors"
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[16px] text-[#e10600]"
            >
              gavel
            </span>
            Règlement : {regulationEra.label} · {formatEraPeriod(regulationEra)}
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
          </Link>
        )}
        {(championDriver || championTeam) && (
          <div className="flex flex-wrap gap-6 text-body-md text-[#8e8e8e]">
            {championDriver && (
              <span>
                Champion pilote —{' '}
                <Link
                  href={`/drivers/${championDriver.slug}`}
                  className="text-[#f0eded] font-semibold hover:text-[#e10600] transition-colors"
                >
                  {championDriver.firstName} {championDriver.lastName}
                </Link>
              </span>
            )}
            {championTeam && (
              <span>
                Champion constructeur —{' '}
                <Link
                  href={`/teams/${championTeam.slug}`}
                  className="text-[#f0eded] font-semibold hover:text-[#e10600] transition-colors"
                >
                  {championTeam.name}
                </Link>
              </span>
            )}
          </div>
        )}
      </div>
      <nav
        aria-label="Navigation entre saisons"
        className="bg-[#121212] p-5 rounded-lg flex items-center gap-6 shadow-sm"
      >
        <SeasonNavLink year={previousYear} direction="previous" />
        <div className="border-l border-[#353534] pl-6">
          <SeasonNavLink year={nextYear} direction="next" />
        </div>
      </nav>
    </header>
  )
}
