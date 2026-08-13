// Formulaire GET natif (pas de JS client) : cohérent avec DriversFilter qui pilote
// aussi l'état via l'URL. Le statut actif est conservé en hidden input pour ne pas
// être perdu lors d'une recherche.
export default function DriversSearch({ defaultValue = '', status }) {
  return (
    <form action="/drivers" method="GET" className="w-full max-w-xs">
      {status && status !== 'all' && <input type="hidden" name="status" value={status} />}
      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder="Rechercher un pilote..."
        aria-label="Rechercher un pilote"
        className="w-full bg-surface-elevated text-text-primary text-sm placeholder:text-text-muted px-4 py-2 border-l-2 border-red-dark focus:outline-none focus:border-red-primary"
      />
    </form>
  )
}
