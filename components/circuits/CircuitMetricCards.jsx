import { formatLapTime } from '@/lib/utils'
import { formatLayoutPeriod } from '@/components/circuits/formatLayoutPeriod'

export default function CircuitMetricCards({ layout }) {
  const { corners, lapRecord } = layout
  const hasCorners = corners != null
  const hasLapRecord = Boolean(lapRecord?.time)

  if (!hasCorners && !hasLapRecord) return null

  return (
    <section className="w-full px-6 sm:px-10 max-w-7xl mx-auto mb-10">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {hasCorners && (
          <div className="p-6 bg-[#121212] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-label-caps text-[#8e8e8e] tracking-wider uppercase">
                CONFIGURATION
              </span>
              <span className="text-telemetry-sm text-[#8e8e8e]">{formatLayoutPeriod(layout)}</span>
            </div>
            <div className="my-6">
              <div className="text-display-lg font-black tracking-tight text-[#f0eded]">
                {corners}
              </div>
              <div className="text-body-sm text-[#8e8e8e] uppercase tracking-wider mt-1">
                Virages
              </div>
            </div>
          </div>
        )}

        {hasLapRecord && (
          <div className="p-6 bg-[#121212] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-label-caps text-[#8e8e8e] tracking-wider uppercase">
                RECORD DU TOUR
              </span>
              {lapRecord.year && (
                <span className="text-telemetry-sm text-[#8e8e8e]">{lapRecord.year}</span>
              )}
            </div>
            <div className="my-6">
              <div className="text-telemetry-lg font-bold tracking-tight text-[#ff5b4f]">
                {formatLapTime(lapRecord.time)}
              </div>
              {lapRecord.driver && (
                <div className="text-body-sm text-[#a6a6a6] truncate uppercase mt-1">
                  {lapRecord.driver}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
