import DriversGrid from '@/components/drivers/DriversGrid'
import Pagination from '@/components/ui/Pagination'

export const metadata = {
  title: 'Pilotes',
  description: "L'annuaire complet des pilotes F1 — actifs et légendes.",
}

const DRIVERS_PER_PAGE = 24

async function getDrivers({ page, status, search }) {
  const params = new URLSearchParams({ page: String(page), limit: String(DRIVERS_PER_PAGE) })
  if (status && status !== 'all') params.set('status', status)
  if (search) params.set('search', search)

  const res = await fetch(`${process.env.API_URL}/drivers?${params.toString()}`, {
    cache: 'no-store',
  })
  if (!res.ok) return { data: [], total: 0, totalPages: 0 }
  return res.json()
}

export default async function DriversPage({ searchParams }) {
  const { page: pageParam, status, search } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const { data: drivers, total, totalPages } = await getDrivers({ page, status, search })

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

      <DriversGrid
        drivers={drivers}
        total={total}
        activeStatus={status ?? 'all'}
        activeSearch={search ?? ''}
      />

      <Pagination
        basePath="/drivers"
        searchParams={{
          ...(status && status !== 'all' ? { status } : {}),
          ...(search ? { search } : {}),
        }}
        page={page}
        totalPages={totalPages}
      />
    </div>
  )
}
