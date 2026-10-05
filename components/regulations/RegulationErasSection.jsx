import RegulationEraCard from './RegulationEraCard'
import RegulationsSectionHeader from './RegulationsSectionHeader'

export default function RegulationErasSection({ eras }) {
  return (
    <section className="flex flex-col gap-space-md">
      <RegulationsSectionHeader
        eyebrow="HISTORIQUE TECHNIQUE"
        title="Ères Réglementaires"
        aside={
          <span className="font-mono text-telemetry-sm text-on-surface-variant">
            {eras.length} ÈRE{eras.length > 1 ? 'S' : ''}
          </span>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        {eras.map((era) => (
          <RegulationEraCard key={era.era} era={era} />
        ))}
      </div>
    </section>
  )
}
