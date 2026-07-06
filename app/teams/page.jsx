import TeamCard from '@/components/teams/TeamCard'

export const metadata = {
  title: 'Écuries',
  description: "Toutes les écuries de Formule 1 — histoire, base, nationalité.",
}

async function getTeams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams?limit=50`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export default async function TeamsPage() {
  const teams = await getTeams()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      <div className="mb-10">
        <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-2">
          Annuaire
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
          Écuries
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          De Ferrari à Red Bull — les constructeurs qui ont façonné la Formule 1.
        </p>
      </div>

      {teams.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucune écurie trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.slug} team={team} />
          ))}
        </div>
      )}
    </div>
  )
}
