import Link from 'next/link'

// Engagements saison par saison (année décroissante), repliés par défaut : c'est la même
// information que la liste des pilotes, lue dans l'autre sens
export default function TeamSeasons({ driversByYear }) {
  return (
    <details className="group/seasons">
      <summary className="hero-link w-fit cursor-pointer list-none py-1 [&::-webkit-details-marker]:hidden">
        <span className="group-open/seasons:hidden">
          Afficher les {driversByYear.length} saisons
        </span>
        <span className="hidden group-open/seasons:inline">Masquer les saisons</span>
      </summary>
      <ol className="mt-4 border-t border-border">
        {driversByYear.map(({ year, drivers }) => (
          <li key={year} className="flex gap-6 border-b border-border py-3">
            <span className="w-12 shrink-0 font-bold tabular-nums">{year}</span>
            <span className="flex flex-wrap gap-x-5 gap-y-1">
              {drivers.map((driver) => (
                <Link
                  key={driver.slug}
                  href={`/drivers/${driver.slug}`}
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  {driver.firstName} {driver.lastName}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </details>
  )
}
