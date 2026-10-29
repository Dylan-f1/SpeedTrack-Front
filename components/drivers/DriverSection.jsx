import DriverCard from './DriverCard'

export default function DriverSection({ title, subtitle, drivers, children }) {
  return (
    <section className="pt-12">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="flex items-center gap-3 text-[clamp(26px,2.6vw,36px)] font-extrabold tracking-[-0.03em]">
          <span aria-hidden="true" className="h-[3px] w-6 bg-red-primary" />
          {title}
        </h2>
        {subtitle && <p className="text-[#8e8e8e]">{subtitle}</p>}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
        {drivers.map((driver) => (
          <li key={driver.slug}>
            <DriverCard driver={driver} />
          </li>
        ))}
      </ul>
      {children}
    </section>
  )
}
