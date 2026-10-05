import { seasonsAPI } from '@/lib/api'
import HeroSection from '@/components/home/HeroSection'
import LastRaceSection from '@/components/home/LastRaceSection'
import QuickAccessSection from '@/components/home/QuickAccessSection'
import StandingsSection from '@/components/home/StandingsSection'

async function fetchCurrentSeasonYear() {
  try {
    const { data } = await seasonsAPI.list({ limit: 1 })
    return data?.[0]?.year ?? null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const year = await fetchCurrentSeasonYear()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroSection year={year} />
      {year && <LastRaceSection year={year} />}
      {year && <StandingsSection year={year} />}
      <QuickAccessSection />
    </div>
  )
}
