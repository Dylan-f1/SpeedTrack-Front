import Link from 'next/link'
import DriverCard from './DriverCard'
import DriversFilter from './DriversFilter'
import DriversSearch from './DriversSearch'

export default function DriversGrid({ drivers, total, activeStatus, activeSearch }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <DriversFilter activeStatus={activeStatus} activeSearch={activeSearch} />
        <div className="flex items-center gap-4">
          <div className="w-full lg:w-80">
            <DriversSearch defaultValue={activeSearch} status={activeStatus} />
          </div>
          <span className="font-mono text-xs text-[#8e8e8e] whitespace-nowrap">
            <span className="text-white font-bold">{total}</span> pilote{total > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {drivers.length === 0 ? (
        <div className="bg-[#131313] border border-[#262626] rounded-xl py-16 flex flex-col items-center gap-3 text-center">
          <span aria-hidden="true" className="material-symbols-outlined text-[32px] text-[#5e5e5e]">
            search_off
          </span>
          <p className="text-sm text-[#8e8e8e]">
            {activeSearch
              ? `Aucun pilote ne correspond à « ${activeSearch} ».`
              : 'Aucun pilote trouvé.'}
          </p>
          {activeSearch && (
            <Link
              href="/drivers"
              className="font-mono text-xs text-[#e10600] hover:text-[#ff4d4d] transition-colors"
            >
              Réinitialiser la recherche
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {drivers.map((driver) => (
            <DriverCard key={driver.slug} driver={driver} />
          ))}
        </div>
      )}
    </section>
  )
}
