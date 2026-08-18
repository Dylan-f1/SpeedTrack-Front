import Link from 'next/link'

export const metadata = {
  title: 'Saisons',
  description: "Toutes les saisons de Formule 1 — champions, résultats et histoire.",
}

async function getSeasons() {
  const res = await fetch(`${process.env.API_URL}/seasons?limit=100`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export default async function SeasonsPage() {
  const seasons = await getSeasons()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      <div className="mb-10">
        <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-2">
          Archives
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
          Saisons
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          Chaque saison, une nouvelle bataille pour le titre. Retracez l&apos;histoire du championnat.
        </p>
      </div>

      {seasons.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucune saison trouvée.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {seasons.map((season) => (
            <Link
              key={season.year}
              href={`/seasons/${season.year}`}
              className="group bg-surface border border-border rounded-sm p-5 hover:border-red-primary transition-colors duration-200"
            >
              <p className="text-3xl font-black text-text-primary group-hover:text-red-primary transition-colors">
                {season.year}
              </p>
              {season.championDriver && (
                <p className="text-xs text-text-muted mt-3 leading-relaxed">
                  {season.championDriver.firstName} {season.championDriver.lastName}
                </p>
              )}
              {season.championTeam && (
                <p className="text-[10px] text-text-muted mt-0.5">
                  {season.championTeam.name}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
