import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'
import { formatDate } from '@/lib/utils'

const STATUS_LABELS = {
  completed: 'Terminé',
  cancelled: 'Annulé',
  scheduled: 'Prévu',
}

const STATUS_CLASSES = {
  completed: 'bg-[#181818] text-[#8e8e8e]',
  cancelled: 'bg-[#e10600]/20 text-[#ff5b4f]',
  scheduled: 'bg-[#353534] text-[#f0eded]',
}

function formatRoundCode(round) {
  return `R${String(round).padStart(2, '0')}`
}

export default function RoundsTable({ year, races, latestCompletedRound }) {
  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2a2a2a] text-[#8e8e8e] text-label-caps uppercase">
              <th className="py-4 px-6 font-semibold">Manche / Grand Prix</th>
              <th className="py-4 px-6 font-semibold">Pays</th>
              <th className="py-4 px-6 font-semibold">Date</th>
              <th className="py-4 px-6 font-semibold text-right">Statut</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, index) => {
              const status = STATUS_LABELS[race.status] ? race.status : 'scheduled'

              return (
                <tr
                  key={race._id}
                  className={`hover:bg-[#181818] transition-colors ${
                    index % 2 === 1 ? 'bg-[#181818]/30' : ''
                  }`}
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-telemetry-md px-2 py-0.5 rounded ${
                          race.round === latestCompletedRound
                            ? 'bg-[#e10600]'
                            : 'bg-[#353534] text-[#f0eded]'
                        }`}
                      >
                        {formatRoundCode(race.round)}
                      </span>
                      <div>
                        <Link
                          href={`/races/${year}/${race.round}`}
                          className="text-headline-sm text-[#f0eded] font-semibold hover:text-[#e10600] transition-colors"
                        >
                          {race.name ?? race.circuit?.name}
                        </Link>
                        {race.circuit && (
                          <span className="block text-body-sm text-[#8e8e8e]">
                            {race.circuit.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-telemetry-md text-[#f0eded]">
                    {race.circuit && (
                      <span className="inline-flex items-center gap-2">
                        <Flag code={race.circuit.country} /> {race.circuit.country}
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-6 text-telemetry-md text-[#f0eded]">
                    {formatDate(race.raceDate)}
                  </td>
                  <td className="py-5 px-6 text-right">
                    <span
                      className={`text-label-caps uppercase px-2 py-1 rounded ${STATUS_CLASSES[status]}`}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
