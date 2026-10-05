// Chiffres calculés à partir de l'historique réel des engagements (driversByYear),
// en remplacement des palmarès de la maquette qui ne sont pas stockés en base
export default function TeamStatCards({ driversByYear, registry, season }) {
  const seasonsCount = driversByYear.length
  // driversByYear est trié par année décroissante
  const lastYear = driversByYear[0].year
  const firstYear = driversByYear.at(-1).year
  const nationalitiesCount = new Set(registry.map((driver) => driver.nationality)).size
  const isActive = lastYear === season

  const stats = [
    {
      label: 'Saisons en championnat',
      value: seasonsCount,
      note: firstYear === lastYear ? `${firstYear}` : `${firstYear} — ${lastYear}`,
    },
    {
      label: 'Pilotes engagés',
      value: registry.length,
      note: `${nationalitiesCount} nationalité${nationalitiesCount > 1 ? 's' : ''}`,
    },
    {
      label: 'Première saison',
      value: firstYear,
      note: isActive ? `Engagée en ${season}` : `Dernière saison ${lastYear}`,
      isHighlighted: isActive,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#131313] border border-[#262626] rounded-xl p-6 flex flex-col justify-between group hover:border-(--team-accent)/40 transition-colors"
        >
          <span className="text-xs uppercase font-mono text-[#8e8e8e] tracking-wider">
            {stat.label}
          </span>
          <div className="flex items-baseline justify-between gap-3 mt-3">
            <span className="text-4xl font-extrabold text-white tracking-tight">{stat.value}</span>
            <span
              className={`text-xs font-mono flex items-center gap-1.5 ${
                stat.isHighlighted ? 'text-white font-medium' : 'text-[#8e8e8e]'
              }`}
            >
              {stat.isHighlighted && (
                <span className="w-1.5 h-1.5 rounded-full bg-(--team-accent)" />
              )}
              {stat.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
