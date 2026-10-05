import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Flag } from '@/components/ui/Flag'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProfileStatCard from '@/components/drivers/ProfileStatCard'
import ProfilePortraitCard from '@/components/drivers/ProfilePortraitCard'
import ProfileCareerCard from '@/components/drivers/ProfileCareerCard'
import ProfileTeamHistoryItem from '@/components/drivers/ProfileTeamHistoryItem'

const STATUS_LABELS = {
  champion: 'Champion du monde',
  active: 'Actif',
  former: 'Ancien pilote',
}

const STATUS_DOT_CLASSES = {
  champion: 'bg-amber-400',
  active: 'bg-emerald-400',
  former: 'bg-neutral-500',
}

const WIKIPEDIA_LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr'
const PERCENT = 100
const HTTP_NOT_FOUND = 404

async function getDriver(slug) {
  const res = await fetch(`${process.env.API_URL}/drivers/${slug}`, {
    cache: 'no-store',
  })
  if (res.status === HTTP_NOT_FOUND) return null
  // Une autre erreur (quota de l'API dépassé, serveur indisponible) ne doit pas se
  // déguiser en « pilote introuvable » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /drivers/${slug}`)
  return res.json()
}

// Part des courses (en %) : null quand le pilote n'a disputé aucune course,
// pour ne pas afficher de barre sans signification.
function getRaceRatio(value, races) {
  if (!races) return null
  return Math.round((value / races) * PERCENT)
}

function formatCareerSpan(start, end) {
  return end === null ? `${start} — Présent` : `${start} — ${end}`
}

function buildStats({ races = 0, wins = 0, poles = 0, podiums = 0, championships = 0 }) {
  const stats = [
    {
      label: 'Courses disputées',
      value: races,
      unit: 'GP',
      ratio: null,
      valueClass: 'text-white',
      unitClass: 'text-[#ff4d46] font-semibold',
      hoverClass: 'hover:border-white/20',
    },
    {
      label: 'Victoires Grand Prix',
      value: wins,
      unit: 'WINS',
      ratio: getRaceRatio(wins, races),
      valueClass: 'text-[#ff4d46]',
      unitClass: 'text-neutral-400',
      hoverClass: 'hover:border-[#e10600]/40',
      barClass: 'bg-[#ff4d46]',
    },
    {
      label: 'Pole positions',
      value: poles,
      unit: 'POLES',
      ratio: getRaceRatio(poles, races),
      valueClass: 'text-white',
      unitClass: 'text-neutral-400',
      hoverClass: 'hover:border-white/20',
      barClass: 'bg-neutral-300',
    },
    {
      label: 'Podiums en carrière',
      value: podiums,
      unit: 'PODIUMS',
      ratio: getRaceRatio(podiums, races),
      valueClass: 'text-white',
      unitClass: 'text-neutral-400',
      hoverClass: 'hover:border-white/20',
      barClass: 'bg-amber-400',
    },
  ]

  if (championships > 0) {
    stats.push({
      label: 'Titres mondiaux',
      value: championships,
      unit: championships > 1 ? 'TITRES' : 'TITRE',
      ratio: null,
      valueClass: 'text-amber-400',
      unitClass: 'text-neutral-400',
      hoverClass: 'hover:border-amber-400/40',
    })
  }

  return stats
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
  } = driver

  const fullName = `${firstName} ${lastName}`
  const statusLabel = STATUS_LABELS[status] ?? STATUS_LABELS.former

  // L'API marque la période en cours (saison la plus récente) avec to = null
  const lastTeam = teams.at(-1) ?? null
  const currentTeam = lastTeam?.to === null ? lastTeam : null

  const hasTeams = teams.length > 0
  const careerStart = hasTeams ? Math.min(...teams.map((team) => team.from)) : null
  const careerEnd = hasTeams && !currentTeam ? Math.max(...teams.map((team) => team.to)) : null
  const careerSpan = hasTeams ? formatCareerSpan(careerStart, careerEnd) : null
  const teamCount = new Set(teams.map((team) => team.slug)).size
  const teamsMostRecentFirst = [...teams].reverse()

  const identity = [
    currentTeam && { label: 'Écurie', value: currentTeam.name },
    { label: 'Naissance', value: formatDate(dateOfBirth) },
    hasTeams && { label: 'Carrière F1', value: careerSpan },
  ].filter(Boolean)

  const stats = buildStats(careerStats)
  const hasSideColumn = Boolean(careerNarrative || quote)
  const columnSpanClass = hasTeams && hasSideColumn ? 'lg:col-span-6' : 'lg:col-span-12'

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
        <Breadcrumb items={[{ label: 'Pilotes', href: '/drivers' }, { label: fullName }]} />
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1b1b] border border-white/10 rounded-md self-start md:self-auto">
          <span
            className={`w-2 h-2 rounded-full ${STATUS_DOT_CLASSES[status] ?? STATUS_DOT_CLASSES.former}`}
          />
          <span className="font-mono text-[11px] text-white/90 font-bold uppercase tracking-wider">
            {statusLabel}
          </span>
        </div>
      </div>

      <section className="relative pb-12 overflow-hidden">
        {currentNumber && (
          <div className="absolute -right-6 -top-12 text-[170px] sm:text-[230px] font-mono font-black text-white/[0.03] select-none pointer-events-none leading-none z-0">
            #{currentNumber}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {currentNumber && (
                <span className="px-3 py-1 rounded bg-[#e10600] text-white font-mono text-sm font-black tracking-wider">
                  #{currentNumber}
                </span>
              )}
              {currentTeam && (
                <>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {currentTeam.name}
                  </span>
                  <span className="text-neutral-600">•</span>
                </>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#ff4d46] bg-[#e10600]/10 px-2 py-0.5 rounded border border-[#e10600]/30">
                <Flag code={nationality} />
                {nationality}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {firstName} <span className="text-[#e10600]">{lastName}</span>
            </h1>
            {bio && (
              <div className="max-w-2xl">
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">
                  {bio}
                </p>
                {bioSource && (
                  <p className="mt-2 text-[10px] font-mono text-neutral-500">
                    Source : {bioSource} — texte sous licence{' '}
                    <a
                      href={WIKIPEDIA_LICENSE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-neutral-300 transition-colors"
                    >
                      CC BY-SA 4.0
                    </a>
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center gap-6 pt-2 text-xs font-mono text-neutral-400 flex-wrap">
              {identity.map((item, index) => (
                <div key={item.label} className="flex items-center gap-6">
                  {index > 0 && <div className="w-px h-7 bg-white/10" />}
                  <div>
                    <span className="text-neutral-500 uppercase block text-[10px] tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-white font-semibold text-sm">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <ProfilePortraitCard
              fullName={fullName}
              imageUrl={imageUrl}
              imageCredit={imageCredit}
              imageLicense={imageLicense}
              team={currentTeam ?? lastTeam}
              isCurrentTeam={Boolean(currentTeam)}
              currentNumber={currentNumber}
            />
          </div>
        </div>
      </section>

      <section
        className={`grid grid-cols-2 gap-4 pb-12 ${
          stats.length > 4 ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-4'
        }`}
      >
        {stats.map((stat) => (
          <ProfileStatCard key={stat.label} {...stat} />
        ))}
      </section>

      {(hasTeams || hasSideColumn) && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
          {hasTeams && (
            <div className={`${columnSpanClass} flex flex-col gap-4`}>
              <div className="bg-[#181818] border border-white/[0.08] p-6 rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                    Historique des écuries F1
                  </span>
                  <span className="text-xs font-mono text-neutral-400 uppercase">{careerSpan}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {teamsMostRecentFirst.map((team) => (
                    <ProfileTeamHistoryItem key={`${team.slug}-${team.from}`} team={team} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {hasSideColumn && (
            <div className={`${columnSpanClass} flex flex-col gap-4`}>
              {careerNarrative && (
                <ProfileCareerCard
                  narrative={careerNarrative}
                  careerStart={careerStart}
                  careerEnd={careerEnd}
                  careerSpan={careerSpan}
                  teamCount={teamCount}
                />
              )}
              {quote && (
                <blockquote className="bg-[#181818] border border-white/[0.08] p-6 rounded-xl flex flex-col gap-4">
                  <span className="pb-3 border-b border-white/[0.08] text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#ff4d46]">
                      format_quote
                    </span>
                    Citation
                  </span>
                  <p className="text-lg italic text-neutral-300 leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <footer className="text-xs font-mono uppercase tracking-wider text-[#ff4d46]">
                    — {fullName}
                  </footer>
                </blockquote>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
