import TeamCurrentDriverCard from '@/components/teams/TeamCurrentDriverCard'
import TeamSectionTitle from '@/components/teams/TeamSectionTitle'

export default function TeamCurrentDrivers({ drivers, season }) {
  return (
    <section className="flex flex-col gap-6">
      <TeamSectionTitle title="Pilotes titulaires" aside={`Saison Formule 1 ${season}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drivers.map((driver) => (
          <TeamCurrentDriverCard key={driver.slug} driver={driver} season={season} />
        ))}
      </div>
    </section>
  )
}
