import DriversGrid from '@/components/drivers/DriversGrid'

export const metadata = {
  title: 'Pilotes',
  description: "L'annuaire complet des pilotes F1 — actifs et légendes.",
}

async function getDrivers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export default async function DriversPage() {
  const drivers = await getDrivers()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">

      {/* En-tête */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-red-primary uppercase tracking-widest mb-2">
          Annuaire
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
          Driver Registry
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          De Senna à Verstappen — tous les pilotes qui ont marqué ou marquent encore la Formule 1.
        </p>
      </div>

      <DriversGrid drivers={drivers} />
    </div>
  )
}
