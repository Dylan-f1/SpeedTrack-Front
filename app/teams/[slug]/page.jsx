import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Flag, countryName } from '@/components/ui/Flag'
import DriverCard from '@/components/drivers/DriverCard'
import { AsideBlock, AsideRow } from '@/components/profile/AsideBlock'
import KeyFigures from '@/components/profile/KeyFigures'
import ProfileLayout from '@/components/profile/ProfileLayout'
import ProfileOpening from '@/components/profile/ProfileOpening'
import ProfileSection from '@/components/profile/ProfileSection'
import TeamRoster from '@/components/teams/TeamRoster'
import TeamSeasons from '@/components/teams/TeamSeasons'
import { formatPeriod } from '@/components/teams/teamPeriods'
import { buildDriverRegistry } from './buildDriverRegistry'
import { apiFetch } from '@/lib/apiFetch'

// Couleur d'accent du site, utilisée quand l'écurie n'a pas de couleur de livrée en base
const SPEEDTRACK_RED = '#e10600'
const WIKIPEDIA_LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr'
const HTTP_NOT_FOUND = 404

async function getTeam(slug) {
  const res = await apiFetch(`/teams/${slug}`)
  if (res.status === HTTP_NOT_FOUND) return null
  // Une autre erreur (quota de l'API dépassé, serveur indisponible) ne doit pas se
  // déguiser en « écurie introuvable » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /teams/${slug}`)
  return res.json()
}

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
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
    fullName,
    nationality,
    founded,
    base,
    logoUrl,
    logoBackground,
    primaryColor,
    description,
    descriptionSource,
    heritageNote,
    season,
    currentDrivers = [],
    driversByYear = [],
    lineage = [],
    principals = [],
    notablePeople = [],
  } = team

  const accentColor = primaryColor ?? SPEEDTRACK_RED
  const registry = buildDriverRegistry(driversByYear)
  const currentPrincipal = principals.find((principal) => principal.to === null)
  // Les textes repris de Wikipédia imposent la mention de la licence CC BY-SA
  const isWikipediaSource = descriptionSource?.includes('Wikipédia')

  // driversByYear est trié par année décroissante
  const hasSeasons = driversByYear.length > 0
  const lastYear = hasSeasons ? driversByYear[0].year : null
  const firstYear = hasSeasons ? driversByYear.at(-1).year : null
  const isActive = hasSeasons && lastYear === season
  const championshipSpan = hasSeasons ? formatPeriod(firstYear, isActive ? null : lastYear) : null
  const nationalitiesCount = new Set(registry.map((driver) => driver.nationality)).size

  const facts = [
    {
      label: 'Nationalité',
      value: (
        <span className="flex items-center gap-2">
          <Flag code={nationality} />
          {countryName(nationality)}
        </span>
      ),
    },
    founded && { label: 'Fondée en', value: founded },
    base && { label: 'Siège', value: base },
    currentPrincipal && { label: 'Team principal', value: currentPrincipal.name },
    hasSeasons && { label: 'En championnat', value: championshipSpan },
  ].filter(Boolean)

  const figures = hasSeasons
    ? [
        {
          value: driversByYear.length,
          label: pluralize(driversByYear.length, 'Saison', 'Saisons'),
          note: championshipSpan,
        },
        {
          value: registry.length,
          label: pluralize(registry.length, 'Pilote engagé', 'Pilotes engagés'),
          note: `${nationalitiesCount} ${pluralize(nationalitiesCount, 'nationalité', 'nationalités')}`,
        },
        {
          value: firstYear,
          label: 'Première saison',
          note: isActive ? `Engagée en ${season}` : `Dernière saison ${lastYear}`,
        },
      ]
    : []

  const hasAside = lineage.length > 1 || principals.length > 0 || notablePeople.length > 0
  const aside = hasAside && (
    <>
      {lineage.length > 1 && (
        <AsideBlock title="Lignée" meta={`${lineage[0].name} → ${lineage.at(-1).name}`}>
          {lineage.map((entry) => {
            const isCurrent = entry.slug === slug
            return (
              <AsideRow
                key={entry.slug}
                href={isCurrent ? undefined : `/teams/${entry.slug}`}
                color={entry.primaryColor ?? '#6a6a69'}
                title={entry.name}
                detail={entry.from ? formatPeriod(entry.from, entry.to) : null}
                meta={isCurrent ? 'Cette fiche' : null}
                isHighlighted={isCurrent}
              />
            )
          })}
        </AsideBlock>
      )}
      {principals.length > 0 && (
        <AsideBlock title="Team principals" meta={principals.length}>
          {principals.map((person) => (
            <AsideRow
              key={`${person.name}-${person.from}`}
              title={person.name}
              detail={formatPeriod(person.from, person.to)}
              meta={person.to === null ? 'En poste' : null}
              isHighlighted={person.to === null}
            />
          ))}
        </AsideBlock>
      )}
      {notablePeople.length > 0 && (
        <AsideBlock title="Personnalités marquantes" meta={notablePeople.length}>
          {notablePeople.map((person) => (
            <AsideRow
              key={`${person.name}-${person.from}`}
              title={person.name}
              detail={[person.role, formatPeriod(person.from, person.to)]
                .filter(Boolean)
                .join(', ')}
            />
          ))}
        </AsideBlock>
      )}
    </>
  )

  return (
    <div className="pb-24">
      <ProfileOpening
        breadcrumb={[{ label: 'Écuries', href: '/teams' }, { label: name }]}
        kicker={fullName && fullName !== name ? fullName : null}
        title={name}
        facts={facts}
        panelColor={primaryColor}
        // Sans logo en base (écuries historiques), l'initiale en grand tient lieu de repère
        panelMark={logoUrl ? null : name[0]}
        media={
          logoUrl && (
            <div
              className={`chamfer absolute left-1/2 top-1/2 aspect-square w-[min(56%,280px)] -translate-x-1/2 -translate-y-1/2 ${
                logoBackground === 'dark' ? 'bg-[#131313]' : 'bg-white'
              }`}
            >
              <Image
                src={logoUrl}
                alt={`Logo ${name}`}
                fill
                priority
                sizes="280px"
                className="object-contain p-[14%]"
              />
            </div>
          )
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {figures.length > 0 && <KeyFigures figures={figures} accentColor={accentColor} />}

        <ProfileLayout aside={aside}>
          {(description || heritageNote) && (
            <ProfileSection title="Histoire" accentColor={accentColor}>
              {description && (
                <p className="max-w-[65ch] whitespace-pre-line text-lg leading-relaxed text-text-secondary">
                  {description}
                </p>
              )}
              {descriptionSource && (
                <p className="mt-4 text-sm text-[#8e8e8e]">
                  Source : {descriptionSource}
                  {isWikipediaSource && (
                    <>
                      , texte sous licence{' '}
                      <a
                        href={WIKIPEDIA_LICENSE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-text-secondary"
                      >
                        CC BY-SA 4.0
                      </a>
                    </>
                  )}
                </p>
              )}
              {heritageNote && (
                <div
                  className="mt-8 max-w-[65ch] border-l-2 pl-6"
                  style={{ borderColor: accentColor }}
                >
                  <p className="font-semibold">Héritage</p>
                  <p className="mt-1 leading-relaxed text-text-secondary">{heritageNote}</p>
                </div>
              )}
            </ProfileSection>
          )}

          {currentDrivers.length > 0 && (
            <ProfileSection title={`Titulaires ${season}`} accentColor={accentColor}>
              <ul className="grid grid-cols-2 gap-3 sm:max-w-[560px]">
                {currentDrivers.map((driver) => (
                  <li key={driver.slug}>
                    <DriverCard
                      driver={{
                        ...driver,
                        currentNumber: driver.carNumber,
                        currentTeam: { name, primaryColor },
                      }}
                    />
                  </li>
                ))}
              </ul>
            </ProfileSection>
          )}

          {registry.length > 0 && (
            <ProfileSection title="Pilotes de l'écurie" accentColor={accentColor}>
              <p className="-mt-2 mb-4 text-[#8e8e8e]">
                {registry.length} {pluralize(registry.length, 'pilote', 'pilotes')}, du plus récent
                au plus ancien
              </p>
              <TeamRoster drivers={registry} />
            </ProfileSection>
          )}

          {hasSeasons && (
            <ProfileSection title="Saison par saison" accentColor={accentColor}>
              <TeamSeasons driversByYear={driversByYear} />
            </ProfileSection>
          )}
        </ProfileLayout>
      </div>
    </div>
  )
}
