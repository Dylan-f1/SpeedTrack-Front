import TeamLineageTimeline from '@/components/teams/TeamLineageTimeline'
import TeamPeopleCard from '@/components/teams/TeamPeopleCard'
import TeamSectionTitle from '@/components/teams/TeamSectionTitle'

const WIKIPEDIA_LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr'

export default function TeamHistory({ team }) {
  const {
    slug,
    description,
    descriptionSource,
    heritageNote,
    lineage = [],
    principals = [],
    notablePeople = [],
  } = team

  const hasLineage = lineage.length > 1
  const hasPeople = principals.length > 0 || notablePeople.length > 0
  // Les textes repris de Wikipédia imposent la mention de la licence CC BY-SA
  const isWikipediaSource = descriptionSource?.includes('Wikipédia')
  const lineageSummary = hasLineage ? `${lineage[0].name} → ${lineage.at(-1).name}` : null

  return (
    <section className="flex flex-col gap-6">
      <TeamSectionTitle title="Histoire & Faits Marquants" aside={lineageSummary} />

      {(description || heritageNote) && (
        <div className="bg-[#131313] border border-[#262626] rounded-xl p-8 flex flex-col gap-6">
          {description && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-[#c8c6c5] leading-relaxed max-w-4xl">{description}</p>
              {descriptionSource && (
                <p className="text-[11px] font-mono text-[#5e5e5e]">
                  Source : {descriptionSource}
                  {isWikipediaSource && (
                    <>
                      {' · Texte sous licence '}
                      <a
                        href={WIKIPEDIA_LICENSE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                      >
                        CC BY-SA 4.0
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          )}
          {heritageNote && (
            <div className="border-l-2 border-(--team-accent) pl-4">
              <span className="block text-xs font-mono uppercase tracking-wider text-[#5e5e5e] mb-1.5">
                Héritage
              </span>
              <p className="text-sm text-[#8e8e8e] leading-relaxed max-w-4xl">{heritageNote}</p>
            </div>
          )}
        </div>
      )}

      {hasLineage && <TeamLineageTimeline lineage={lineage} currentSlug={slug} />}

      {hasPeople && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {principals.length > 0 && <TeamPeopleCard title="Team principals" people={principals} />}
          {notablePeople.length > 0 && (
            <TeamPeopleCard title="Personnalités marquantes" people={notablePeople} />
          )}
        </div>
      )}
    </section>
  )
}
