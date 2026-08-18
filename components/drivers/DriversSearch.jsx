// Formulaire GET natif (pas de JS client) : cohérent avec DriversFilter qui pilote
// aussi l'état via l'URL. Le statut actif est conservé en hidden input pour ne pas
// être perdu lors d'une recherche.
export default function DriversSearch({ defaultValue = '', status }) {
  return (
    <form action="/drivers" method="GET" className="relative w-full">
      {status && status !== 'all' && <input type="hidden" name="status" value={status} />}

      <svg
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder="Rechercher un pilote par nom..."
        aria-label="Rechercher un pilote"
        className="w-full bg-surface-elevated text-text-primary text-sm placeholder:text-text-muted pl-11 pr-4 py-3 rounded-sm border border-border-light focus:outline-none focus:border-red-primary transition-colors"
      />
    </form>
  )
}
