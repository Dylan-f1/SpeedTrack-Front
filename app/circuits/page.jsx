import CircuitCard from '@/components/circuits/CircuitCard'

export const metadata = {
  title: 'Circuits',
  description: "Les circuits emblématiques de la Formule 1 — tracés, records et histoire.",
}

async function getCircuits() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/circuits?limit=100`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export default async function CircuitsPage() {
  const circuits = await getCircuits()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      <div className="mb-10">
        <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-2">
          Annuaire
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
          Circuits
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          De Monaco à Suzuka — les tracés qui ont écrit la légende de la Formule 1.
        </p>
      </div>

      {circuits.length === 0 ? (
        <p className="text-text-muted text-sm py-12 text-center">Aucun circuit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {circuits.map((circuit) => (
            <CircuitCard key={circuit.slug} circuit={circuit} />
          ))}
        </div>
      )}
    </div>
  )
}
