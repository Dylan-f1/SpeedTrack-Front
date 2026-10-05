// Logos officiels blancs (pensés pour des livrées sombres) : ils disparaîtraient sur le fond
// clair utilisé pour les autres logos, qui sont noirs ou foncés. À terme, cette info
// mériterait un champ en base plutôt qu'une liste ici.
const LIGHT_LOGO_TEAM_SLUGS = new Set([
  'alpine',
  'aston-martin',
  'williams',
  'haas',
  'racing-bulls',
])

export function getLogoBackgroundClass(teamSlug) {
  return LIGHT_LOGO_TEAM_SLUGS.has(teamSlug) ? 'bg-[#0e0e0e] border border-[#262626]' : 'bg-white'
}
