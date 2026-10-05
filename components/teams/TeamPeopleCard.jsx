import { formatPeriod } from '@/components/teams/teamPeriods'

export default function TeamPeopleCard({ title, people }) {
  return (
    <div className="bg-[#131313] border border-[#262626] rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#8e8e8e]">{title}</h3>
        <span className="text-xs font-mono text-[#5e5e5e]">{people.length}</span>
      </div>
      <ul className="flex flex-col">
        {people.map((person) => {
          const isInOffice = person.to === null

          return (
            <li
              key={`${person.name}-${person.from}`}
              className="flex items-start justify-between gap-4 py-3 border-t border-[#262626]"
            >
              <div>
                <p className="text-sm font-semibold text-white">{person.name}</p>
                {person.role && <p className="text-xs text-[#8e8e8e] mt-0.5">{person.role}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isInOffice && (
                  <span className="px-2 py-0.5 rounded border border-(--team-accent) bg-(--team-accent)/10 text-[10px] font-mono font-bold uppercase text-white">
                    En poste
                  </span>
                )}
                <span className="text-xs font-mono text-[#8e8e8e] whitespace-nowrap">
                  {formatPeriod(person.from, person.to)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
