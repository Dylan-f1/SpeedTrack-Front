import { seasonsAPI } from '@/lib/api'
import { getSiteContent } from '@/lib/siteContent'
import HeroSection from '@/components/home/HeroSection'
import LastRaceSection from '@/components/home/LastRaceSection'
import QuickAccessSection from '@/components/home/QuickAccessSection'
import StandingsSection from '@/components/home/StandingsSection'

const HOME_HERO_KEY = 'home-hero'

// Le hero reste affichable (titre et boutons) même si son contenu éditorial manque
async function fetchHeroContent() {
  try {
    return await getSiteContent(HOME_HERO_KEY)
  } catch {
    return null
  }
}

async function fetchCurrentSeasonYear() {
  try {
    const { data } = await seasonsAPI.list({ limit: 1 })
    return data?.[0]?.year ?? null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [year, heroContent] = await Promise.all([fetchCurrentSeasonYear(), fetchHeroContent()])

  return (
    <>
      <HeroSection year={year} content={heroContent} />
      <QuickAccessSection />
      {year && (
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-16 sm:px-6 lg:px-8">
          <LastRaceSection year={year} />
          <StandingsSection year={year} />
        </div>
      )}
    </>
  )
}
