import { notFound } from 'next/navigation'
import TeamCurrentDrivers from '@/components/teams/TeamCurrentDrivers'
import TeamDriverRegistry from '@/components/teams/TeamDriverRegistry'
import TeamDriversByYear from '@/components/teams/TeamDriversByYear'
import TeamHeader from '@/components/teams/TeamHeader'
import TeamHistory from '@/components/teams/TeamHistory'
import TeamStatCards from '@/components/teams/TeamStatCards'
import { buildDriverRegistry } from './buildDriverRegistry'

// Couleur d'accent du site, utilisée quand l'écurie n'a pas de couleur de livrée en base
const DEFAULT_ACCENT_COLOR = '#e10600'
const HTTP_NOT_FOUND = 404

async function getTeam(slug) {
  const res = await fetch(`${process.env.API_URL}/teams/${slug}`, {
    cache: 'no-store',
  })
  if (res.status === HTTP_NOT_FOUND) return null
  // Une autre erreur (quota de l'API dépassé, serveur indisponible) ne doit pas se
  // déguiser en « écurie introuvable » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /teams/${slug}`)
  return res.json()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const team = await getTeam(slug)
  if (!team) return {}

  return { title: team.fullName ?? team.name }
}

export default async function TeamPage({ params }) {
  const { slug } = await params
  const team = await getTeam(slug)
  if (!team) notFound()

  const {
    name,
    primaryColor,
    description,
    heritageNote,
    season,
    currentDrivers = [],
    driversByYear = [],
    lineage = [],
    principals = [],
    notablePeople = [],
  } = team

  const registry = buildDriverRegistry(driversByYear)
  const hasHistory =
    description ||
    heritageNote ||
    lineage.length > 1 ||
    principals.length > 0 ||
    notablePeople.length > 0

  return (
    // La couleur de livrée de l'écurie remplace le rouge de la maquette pour tous les accents
    <div
      className="w-full pt-8 pb-20"
      style={{ '--team-accent': primaryColor ?? DEFAULT_ACCENT_COLOR }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col gap-14">
        <header className="flex flex-col gap-8">
          <TeamHeader team={team} />
          {driversByYear.length > 0 && (
            <TeamStatCards driversByYear={driversByYear} registry={registry} season={season} />
          )}
        </header>

        {currentDrivers.length > 0 && (
          <TeamCurrentDrivers drivers={currentDrivers} season={season} />
        )}

        {registry.length > 0 && <TeamDriverRegistry teamName={name} drivers={registry} />}

        {hasHistory && <TeamHistory team={team} />}

        {driversByYear.length > 0 && <TeamDriversByYear driversByYear={driversByYear} />}
      </div>
    </div>
  )
}
