import { AsideBlock, AsideRow } from '@/components/profile/AsideBlock'
import { getTeamTally } from '@/lib/driverCareer'

function pluralize(count, singular, plural) {
  return count > 1 ? plural : singular
}

// Colonne latérale de la fiche pilote : ses écuries dans l'ordre d'arrivée, avec leur couleur,
// leurs années et le nombre de saisons
export default function TeamsAside({ seasons, isCurrent, careerSpan }) {
  const tally = getTeamTally(seasons, isCurrent)

  return (
    <AsideBlock title={pluralize(tally.length, 'Écurie', 'Écuries')} meta={careerSpan}>
      {tally.map((team) => (
        <AsideRow
          key={team.slug}
          href={`/teams/${team.slug}`}
          color={team.color}
          title={team.name}
          detail={team.ranges}
          meta={`${team.seasonCount} ${pluralize(team.seasonCount, 'saison', 'saisons')}`}
        />
      ))}
    </AsideBlock>
  )
}
