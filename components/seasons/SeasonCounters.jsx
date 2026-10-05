export default function SeasonCounters({ counters }) {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {counters.map((counter) => (
        <div key={counter.label} className="bg-[#121212] p-5 rounded-lg space-y-2">
          <span className="text-label-caps uppercase text-[#8e8e8e]">{counter.label}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-telemetry-lg text-[#f0eded]">{counter.value}</span>
            <span className="text-body-sm text-[#8e8e8e]">{counter.unit}</span>
          </div>
          {counter.progress !== undefined && (
            <div className="w-full bg-[#353534] h-1 rounded-full overflow-hidden">
              <div className="bg-[#e10600] h-full" style={{ width: `${counter.progress}%` }} />
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
