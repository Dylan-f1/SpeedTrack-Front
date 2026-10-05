import Breadcrumb from '@/components/ui/Breadcrumb'
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
  // Une erreur de l'API (quota dépassé, serveur indisponible) ne doit pas s'afficher
  // comme « aucun pilote trouvé » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /drivers`)
  return res.json()
}

export default async function DriversPage({ searchParams }) {
  const { page: pageParam, status, search } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const activeStatus = status ?? 'all'
  const activeSearch = search ?? ''

  const { data: drivers, total, totalPages } = await getDrivers({ page, status, search })

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-8">
      <Breadcrumb items={[{ label: 'Pilotes' }]} />

      <header className="flex flex-col gap-3 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="h-5 w-1 bg-[#e10600] rounded-full" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e8e]">
            Annuaire des pilotes
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Pilotes
        </h1>
        <p className="text-sm text-[#8e8e8e] max-w-xl leading-relaxed">
          De Fangio à Verstappen — tous les pilotes qui ont marqué ou marquent encore la Formule 1.
        </p>
      </header>

      <DriversGrid
        drivers={drivers}
        total={total}
        activeStatus={activeStatus}
        activeSearch={activeSearch}
      />

      <Pagination
        basePath="/drivers"
        searchParams={{
          ...(activeStatus !== 'all' ? { status: activeStatus } : {}),
          ...(activeSearch ? { search: activeSearch } : {}),
        }}
        page={page}
        totalPages={totalPages}
      />
    </div>
  )
}
