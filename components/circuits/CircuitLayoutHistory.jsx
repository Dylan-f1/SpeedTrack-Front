import { formatLapTime } from '@/lib/utils'
import { formatLayoutPeriod } from '@/components/circuits/formatLayoutPeriod'

const COLUMNS = ['Période', 'Longueur', 'Virages', 'Record']

export default function CircuitLayoutHistory({ layoutHistory }) {
  // Configuration la plus récente en premier
  const layouts = [...layoutHistory].reverse()

  return (
    <section className="w-full px-6 sm:px-10 max-w-7xl mx-auto mb-16">
      <div className="p-6 sm:p-8 bg-[#121212] shadow-sm border-t border-[#e10600] flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div>
            <span className="text-label-caps text-[#e10600] tracking-widest uppercase block mb-1">
              ÉVOLUTION DU CIRCUIT
            </span>
            <h2 className="text-headline-lg font-bold text-[#f0eded] uppercase tracking-tight">
              Historique des tracés
            </h2>
          </div>
          <span className="text-telemetry-sm text-[#8e8e8e] uppercase">
            {layouts.length} configurations
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    className="pb-3 pr-6 text-label-caps text-[#8e8e8e] uppercase font-normal"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {layouts.map((layout) => (
                <tr
                  key={`${layout.from}-${layout.to}`}
                  className="border-t border-white/[0.06] hover:bg-[#181818] transition-colors"
                >
                  <td className="py-4 pr-6 text-telemetry-md text-[#f0eded] font-bold">
                    {formatLayoutPeriod(layout)}
                  </td>
                  <td className="py-4 pr-6 text-telemetry-md text-[#f0eded]">
                    {layout.lengthKm != null ? `${layout.lengthKm} km` : '—'}
                  </td>
                  <td className="py-4 pr-6 text-telemetry-md text-[#f0eded]">
                    {layout.corners ?? '—'}
                  </td>
                  <td className="py-4 text-telemetry-md">
                    {layout.lapRecord?.time ? (
                      <>
                        <span className="text-[#ff5b4f] font-bold">
                          {formatLapTime(layout.lapRecord.time)}
                        </span>
                        {layout.lapRecord.driver && (
                          <span className="text-body-sm text-[#8e8e8e] ml-2">
                            {layout.lapRecord.driver}, {layout.lapRecord.year}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-[#8e8e8e]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
