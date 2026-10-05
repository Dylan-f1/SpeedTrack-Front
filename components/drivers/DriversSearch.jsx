// Formulaire GET natif (pas de JS client) : cohérent avec DriversFilter qui pilote
// aussi l'état via l'URL. Le statut actif est conservé en hidden input pour ne pas
// être perdu lors d'une recherche.
export default function DriversSearch({ defaultValue = '', status }) {
  return (
    <form action="/drivers" method="GET" role="search" className="relative w-full">
      {status && status !== 'all' && <input type="hidden" name="status" value={status} />}

      <span
        aria-hidden="true"
        className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#5e5e5e]"
      >
        search
      </span>
      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder="RECHERCHER UN PILOTE…"
        aria-label="Rechercher un pilote par nom"
        className="w-full bg-[#131313] border border-[#262626] rounded-lg pl-10 pr-3 py-2 font-mono text-xs text-white placeholder:text-[#5e5e5e] focus:outline-none focus:border-[#e10600] transition-colors"
      />
    </form>
  )
}
