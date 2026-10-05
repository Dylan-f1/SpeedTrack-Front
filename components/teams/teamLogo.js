// `logoBackground` vient de la base : 'dark' pour les logos blancs, qui disparaîtraient
// sur le fond clair utilisé pour les autres logos (noirs ou foncés)
export function getLogoBackgroundClass(logoBackground) {
  return logoBackground === 'dark' ? 'bg-[#0e0e0e] border border-[#262626]' : 'bg-white'
}
