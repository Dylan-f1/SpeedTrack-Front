import Link from 'next/link'
import { Flag } from '@/components/ui/Flag'

function groupByCountry(circuits) {
  const groups = new Map()
  for (const circuit of circuits) {
    const country = circuit.countryName ?? circuit.country
    if (!groups.has(country)) groups.set(country, { code: circuit.country, circuits: [] })
    groups.get(country).circuits.push(circuit)
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'fr'))
    .map(([country, group]) => ({
      country,
      code: group.code,
      circuits: group.circuits.sort((a, b) => a.name.localeCompare(b.name, 'fr')),
    }))
}

// Tous les circuits par pays, en colonnes : la liste reste lisible au clavier et au lecteur
// d'écran, là où le globe demande un pointeur
export default function CircuitIndex({ circuits }) {
  return (
    <div className="columns-1 gap-x-10 sm:columns-2 lg:columns-3 xl:columns-4">
      {groupByCountry(circuits).map(({ country, code, circuits: countryCircuits }) => (
        <section key={country} aria-label={country} className="mb-8 break-inside-avoid">
          <h3 className="flex items-center gap-2.5 border-b border-border pb-2 text-lg font-extrabold tracking-[-0.02em]">
            <Flag code={code} />
            {country}
          </h3>
          <ul className="mt-2">
            {countryCircuits.map((circuit) => (
              <li key={circuit.slug}>
                <Link href={`/circuits/${circuit.slug}`} className="group block py-1.5">
                  <span className="block leading-snug underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-red-primary">
                    {circuit.name}
                  </span>
                  {circuit.city && (
                    <span className="block text-sm text-[#8e8e8e]">{circuit.city}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
