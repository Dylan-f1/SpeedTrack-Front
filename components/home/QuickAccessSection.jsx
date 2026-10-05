import Link from 'next/link'
import { circuitsAPI, driversAPI, teamsAPI } from '@/lib/api'
import SectionTitle from './SectionTitle'

async function fetchTotal(request) {
  try {
    const { total } = await request
    return Number.isFinite(total) ? total : null
  } catch {
    return null
  }
}

function formatStat(total, label) {
  return total === null ? label : `${total} ${label}`
}

export default async function QuickAccessSection() {
  const [activeDriversTotal, teamsTotal, circuitsTotal] = await Promise.all([
    fetchTotal(driversAPI.list({ status: 'active', limit: 1 })),
    fetchTotal(teamsAPI.list({ limit: 1 })),
    fetchTotal(circuitsAPI.list({ limit: 1 })),
  ])

  const shortcuts = [
    {
      stat: formatStat(activeDriversTotal, 'PILOTES ACTIFS'),
      title: 'PILOTES',
      description: 'Biographies, stats & victoires',
      href: '/drivers',
    },
    {
      stat: formatStat(teamsTotal, 'ÉCURIES'),
      title: 'ÉCURIES',
      description: 'Histoire, palmarès & pilotes',
      href: '/teams',
    },
    {
      stat: formatStat(circuitsTotal, 'CIRCUITS'),
      title: 'CIRCUITS',
      description: 'Tracés, records & histoire',
      href: '/circuits',
    },
    {
      stat: 'FIA',
      title: 'RÈGLEMENTS',
      description: 'Ères techniques & sportives',
      href: '/regulations',
    },
  ]

  return (
    <section className="space-y-4">
      <div className="border-b border-[#24242a] pb-3">
        <SectionTitle>Accès Rapide SpeedTrack</SectionTitle>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shortcuts.map((shortcut) => (
          <Link
            key={shortcut.href}
            href={shortcut.href}
            className="group p-5 bg-[#141416] hover:bg-[#1a1a1f] border border-[#24242a] hover:border-[#e10600]/60 rounded-xl transition duration-200 flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-center text-neutral-400 group-hover:text-white">
              <span className="text-xs font-mono uppercase">{shortcut.stat}</span>
              <span className="material-symbols-outlined text-xl text-neutral-500 group-hover:text-[#e10600] transition">
                arrow_forward
              </span>
            </div>
            <div>
              <h4 className="text-xl font-black text-white group-hover:text-[#e10600] transition">
                {shortcut.title}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">{shortcut.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
