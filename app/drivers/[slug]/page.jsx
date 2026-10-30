import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Flag, countryName } from '@/components/ui/Flag'
import ProfileOpening from '@/components/drivers/ProfileOpening'
import ProfileSection from '@/components/drivers/ProfileSection'
import TeamsAside from '@/components/drivers/TeamsAside'
import { apiFetch } from '@/lib/apiFetch'

const WIKIPEDIA_LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr'
const SPEEDTRACK_RED = '#e10600'
const BORDER_COLOR = '#353534'
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

// Part des courses (en %) : null quand le pilote n'a disputé aucune course
function getRaceRatio(value, races) {
  if (!races) return null
  return Math.round((value / races) * PERCENT)
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
      ratio: getRaceRatio(wins, races),
    },
    {
      value: poles,
      label: pluralize(poles, 'Pole position', 'Pole positions'),
      ratio: getRaceRatio(poles, races),
    },
    {
      value: podiums,
      label: pluralize(podiums, 'Podium', 'Podiums'),
      ratio: getRaceRatio(podiums, races),
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
        firstName={firstName}
        lastName={lastName}
        imageUrl={imageUrl}
        number={currentTeam ? currentNumber : null}
        accentColor={teamColor}
        facts={facts}
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border py-10 sm:grid-cols-3 lg:grid-cols-5">
          {figures.map(({ value, label, ratio }, index) => (
            <div
              key={label}
              className="flex flex-col-reverse justify-end border-l-2 pl-4"
              style={{ borderColor: index === 0 ? accentColor : BORDER_COLOR }}
            >
              <dt className="mt-2 text-[#8e8e8e]">
                <span className="block font-semibold text-text-secondary">{label}</span>
                {ratio != null && <span className="text-sm">{ratio} % des courses</span>}
              </dt>
              <dd className="text-[clamp(40px,4.4vw,64px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Texte à gauche, écuries dans une colonne latérale fixe à droite (au-dessus du texte
            sous 1024 px, pour rester visibles sans défiler toute la fiche) */}
        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,1fr)_340px]">
          {seasons.length > 0 && (
            <div className="lg:sticky lg:top-20 lg:order-last lg:self-start">
              <TeamsAside
                seasons={seasons}
                isCurrent={Boolean(currentTeam)}
                careerSpan={careerSpan}
              />
            </div>
          )}

          <div className="min-w-0">
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
          </div>
        </div>

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
