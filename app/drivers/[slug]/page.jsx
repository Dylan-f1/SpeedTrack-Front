import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { faceCrop } from '@/lib/cloudinary'
import { Flag, countryName } from '@/components/ui/Flag'
import KeyFigures from '@/components/profile/KeyFigures'
import ProfileLayout from '@/components/profile/ProfileLayout'
import ProfileOpening from '@/components/profile/ProfileOpening'
import ProfileSection from '@/components/profile/ProfileSection'
import TeamsAside from '@/components/drivers/TeamsAside'
import { apiFetch } from '@/lib/apiFetch'

const WIKIPEDIA_LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr'
const SPEEDTRACK_RED = '#e10600'
const PORTRAIT_WIDTH = 600
const PORTRAIT_HEIGHT = 800
const PERCENT = 100
const HTTP_NOT_FOUND = 404

async function getDriver(slug) {
  const res = await apiFetch(`/drivers/${slug}`)
  if (res.status === HTTP_NOT_FOUND) return null
  // Une autre erreur (quota de l'API dépassé, serveur indisponible) ne doit pas se
  // déguiser en « pilote introuvable » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /drivers/${slug}`)
  return res.json()
}

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
}

// Part des courses : rien quand le pilote n'a disputé aucune course
function getRaceRatio(value, races) {
  if (!races) return null
  return `${Math.round((value / races) * PERCENT)} % des courses`
}

function formatCareerSpan(start, end) {
  return end === null ? `${start} – présent` : `${start} – ${end}`
}

function getStatusLabel(status, championships) {
  if (championships > 0) {
    return `Champion du monde, ${championships} ${pluralize(championships, 'titre', 'titres')}`
  }
  return status === 'active' ? 'En activité' : 'Ancien pilote'
}

function buildFigures({ races = 0, wins = 0, poles = 0, podiums = 0, championships = 0 }) {
  const figures = [
    { value: races, label: pluralize(races, 'Grand Prix', 'Grands Prix') },
    {
      value: wins,
      label: pluralize(wins, 'Victoire', 'Victoires'),
      note: getRaceRatio(wins, races),
    },
    {
      value: poles,
      label: pluralize(poles, 'Pole position', 'Pole positions'),
      note: getRaceRatio(poles, races),
    },
    {
      value: podiums,
      label: pluralize(podiums, 'Podium', 'Podiums'),
      note: getRaceRatio(podiums, races),
    },
  ]
  if (championships > 0) {
    figures.push({
      value: championships,
      label: pluralize(championships, 'Titre mondial', 'Titres mondiaux'),
    })
  }
  return figures
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const driver = await getDriver(slug)
  if (!driver) return {}
  return { title: `${driver.firstName} ${driver.lastName} — Fiche Pilote` }
}

export default async function DriverProfilePage({ params }) {
  const { slug } = await params
  const driver = await getDriver(slug)
  if (!driver) notFound()

  const {
    firstName,
    lastName,
    nationality,
    dateOfBirth,
    currentNumber,
    status,
    bio,
    bioSource,
    careerNarrative,
    quote,
    imageUrl,
    imageCredit,
    imageLicense,
    careerStats = {},
    teams = [],
    seasons = [],
  } = driver

  const fullName = `${firstName} ${lastName}`

  // L'API marque la période en cours (saison la plus récente) avec to = null
  const lastTeam = teams.at(-1) ?? null
  const currentTeam = lastTeam?.to === null ? lastTeam : null
  // Accent de la fiche : couleur de l'écurie actuelle, ou de la dernière pour un ancien pilote
  const teamColor = lastTeam?.primaryColor ?? null
  const accentColor = teamColor ?? SPEEDTRACK_RED

  const hasTeams = teams.length > 0
  const careerStart = hasTeams ? Math.min(...teams.map((team) => team.from)) : null
  const careerEnd = hasTeams && !currentTeam ? Math.max(...teams.map((team) => team.to)) : null
  const careerSpan = hasTeams ? formatCareerSpan(careerStart, careerEnd) : null

  const facts = [
    { label: 'Statut', value: getStatusLabel(status, careerStats.championships) },
    lastTeam && {
      label: currentTeam ? 'Écurie' : 'Dernière écurie',
      value: (
        <Link href={`/teams/${lastTeam.slug}`} className="hero-link font-semibold">
          {lastTeam.name}
        </Link>
      ),
    },
    currentTeam && currentNumber != null && { label: 'Numéro', value: currentNumber },
    {
      label: 'Nationalité',
      value: (
        <span className="flex items-center gap-2">
          <Flag code={nationality} />
          {countryName(nationality)}
        </span>
      ),
    },
    dateOfBirth && { label: 'Naissance', value: formatDate(dateOfBirth) },
    hasTeams && { label: 'Carrière F1', value: careerSpan },
  ].filter(Boolean)

  const figures = buildFigures(careerStats)

  return (
    <div className="pb-24">
      <ProfileOpening
        breadcrumb={[{ label: 'Pilotes', href: '/drivers' }, { label: fullName }]}
        kicker={firstName}
        title={lastName}
        facts={facts}
        panelColor={teamColor}
        // Numéro de course, ou l'initiale pour un pilote sans numéro connu
        panelMark={(currentTeam ? currentNumber : null) ?? lastName[0]}
        media={
          imageUrl && (
            <div className="chamfer absolute bottom-0 left-1/2 aspect-[3/4] w-[min(64%,340px)] -translate-x-1/2 bg-surface lg:bottom-14">
              <Image
                src={faceCrop(imageUrl, PORTRAIT_WIDTH, PORTRAIT_HEIGHT)}
                alt={fullName}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          )
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <KeyFigures figures={figures} accentColor={accentColor} />

        <ProfileLayout
          aside={
            seasons.length > 0 && (
              <TeamsAside
                seasons={seasons}
                isCurrent={Boolean(currentTeam)}
                careerSpan={careerSpan}
              />
            )
          }
        >
          {bio && (
            <ProfileSection title="Biographie" accentColor={accentColor}>
              <p className="max-w-[65ch] whitespace-pre-line text-lg leading-relaxed text-text-secondary">
                {bio}
              </p>
              {bioSource && (
                <p className="mt-4 text-sm text-[#8e8e8e]">
                  Source : {bioSource}, texte sous licence{' '}
                  <a
                    href={WIKIPEDIA_LICENSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text-secondary"
                  >
                    CC BY-SA 4.0
                  </a>
                </p>
              )}
            </ProfileSection>
          )}

          {careerNarrative && (
            <ProfileSection title="Parcours" accentColor={accentColor}>
              <p className="max-w-[65ch] whitespace-pre-line text-lg leading-relaxed text-text-secondary">
                {careerNarrative}
              </p>
            </ProfileSection>
          )}

          {quote && (
            <ProfileSection title="Citation" accentColor={accentColor}>
              <blockquote
                className="max-w-[40ch] border-l-2 pl-6"
                style={{ borderColor: accentColor }}
              >
                <p className="text-[clamp(22px,2.2vw,30px)] font-medium leading-snug">
                  « {quote} »
                </p>
                <footer className="mt-3 text-[#8e8e8e]">{fullName}</footer>
              </blockquote>
            </ProfileSection>
          )}
        </ProfileLayout>

        {/* Les photos en base sont sous licence Creative Commons : le crédit est obligatoire */}
        {imageUrl && imageCredit && (
          <p className="border-t border-border pt-6 text-sm text-[#8e8e8e]">
            Photo : {imageLicense ? `${imageCredit} (${imageLicense})` : imageCredit}
          </p>
        )}
      </div>
    </div>
  )
}
