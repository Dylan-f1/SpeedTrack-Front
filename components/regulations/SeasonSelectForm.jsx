// Formulaire GET sans JavaScript : la saison choisie passe dans l'URL (?season=2024),
// ce qui rend chaque règlement de saison partageable et accessible depuis la fiche saison
export default function SeasonSelectForm({ seasonYears, selectedYear }) {
  return (
    <form action="/regulations#saison" method="GET" className="flex items-center gap-2">
      <label htmlFor="season-select" className="font-mono text-xs uppercase text-[#8e8e8e]">
        Saison
      </label>
      <select
        id="season-select"
        name="season"
        defaultValue={selectedYear}
        className="bg-[#0e0e0e] border border-[#262626] rounded-lg px-3 py-2 font-mono text-sm text-white focus:outline-none focus:border-[#e10600]"
      >
        {seasonYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-3.5 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff4d4d] font-mono text-xs font-semibold uppercase text-white transition-colors"
      >
        Afficher
      </button>
    </form>
  )
}
