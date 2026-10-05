// Formulaire GET natif (pas de JS client) : la recherche passe par l'URL comme les filtres
// et la pagination. Les autres paramètres actifs sont conservés en champs cachés.
export default function SearchForm({
  action,
  defaultValue = '',
  placeholder,
  label,
  hiddenParams = {},
}) {
  return (
    <form action={action} method="GET" role="search" className="relative w-full">
      {Object.entries(hiddenParams).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

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
        placeholder={placeholder}
        aria-label={label}
        className="w-full bg-[#131313] border border-[#262626] rounded-lg pl-10 pr-3 py-2 font-mono text-xs text-white placeholder:text-[#5e5e5e] focus:outline-none focus:border-[#e10600] transition-colors"
      />
    </form>
  )
}
