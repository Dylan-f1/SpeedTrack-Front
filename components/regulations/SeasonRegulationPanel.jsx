import Link from 'next/link'
import { formatEraPeriod } from '@/lib/regulations'
import EraTimeline from './EraTimeline'
import SeasonSelectForm from './SeasonSelectForm'

export default function SeasonRegulationPanel({
  eras,
  selectedEra,
  selectedYear,
  currentYear,
  seasonYears,
}) {
  const isCurrentSeason = selectedYear === currentYear

  return (
    <section
      id="saison"
      className="w-full max-w-7xl mx-auto px-margin-desktop pt-space-xl scroll-mt-24"
    >
      <div className="bg-[#131313] border border-[#262626] rounded-xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#e10600]">
              Règlement d&apos;une saison
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Saison {selectedYear}
            </h2>
          </div>
          <SeasonSelectForm seasonYears={seasonYears} selectedYear={selectedYear} />
        </div>

        {selectedEra ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#262626]">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold uppercase text-white">{selectedEra.label}</h3>
                <span className="px-2 py-0.5 rounded bg-[#0e0e0e] border border-[#262626] font-mono text-xs text-[#8e8e8e]">
                  {formatEraPeriod(selectedEra)}
                </span>
              </div>
              {selectedEra.summary && (
                <p className="text-body-lg text-[#c8c6c5] leading-relaxed">{selectedEra.summary}</p>
              )}
              {selectedEra.details && (
                <p className="text-sm text-[#8e8e8e] leading-relaxed">{selectedEra.details}</p>
              )}
            </div>
            <dl className="flex flex-col gap-4 lg:pl-6 lg:border-l border-[#262626]">
              {selectedEra.engineSpec && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5e5e5e]">
                    Motorisation
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-white">{selectedEra.engineSpec}</dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5e5e5e]">
                  Saison
                </dt>
                <dd className="mt-1">
                  <Link
                    href={`/seasons/${selectedYear}`}
                    className="font-mono text-sm text-white hover:text-[#e10600] transition-colors"
                  >
                    Voir la fiche de la saison {selectedYear} →
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="pt-6 border-t border-[#262626] text-sm text-[#8e8e8e]">
            Aucune ère réglementaire n&apos;est encore renseignée pour {selectedYear}.
          </p>
        )}

        <EraTimeline eras={eras} selectedEra={selectedEra} currentYear={currentYear} />

        {!isCurrentSeason && (
          <p className="flex items-center gap-2 font-mono text-xs text-[#8e8e8e]">
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              info
            </span>
            Les sections ci-dessous décrivent le règlement en vigueur en {currentYear}.
          </p>
        )}
      </div>
    </section>
  )
}
