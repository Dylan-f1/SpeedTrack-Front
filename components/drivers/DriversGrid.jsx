import DriverCard from './DriverCard'
import DriversFilter from './DriversFilter'

export default function DriversGrid({ drivers, total, activeStatus }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DriversFilter activeStatus={activeStatus} />
        <span className="text-xs text-text-muted">
          {total} pilote{total > 1 ? 's' : ''}
        </span>
      </div>

      {drivers.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucun pilote trouvé.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {drivers.map((d) => (
            <DriverCard key={d.slug} driver={d} />
          ))}
        </div>
      )}
    </div>
  )
}
