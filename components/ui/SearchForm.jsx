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
    <form action={action} method="GET" role="search" className="w-full">
      {Object.entries(hiddenParams).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={label}
        className="chamfer min-h-12 w-full border border-border bg-transparent px-4 text-white transition-colors placeholder:text-[#8e8e8e] focus:border-red-primary focus:outline-none"
      />
    </form>
  )
}
