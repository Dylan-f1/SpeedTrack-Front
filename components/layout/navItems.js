// Rubriques du site, partagées par le menu de bureau et le menu mobile
export const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'Pilotes', href: '/drivers' },
  { label: 'Écuries', href: '/teams' },
  { label: 'Circuits', href: '/circuits' },
  { label: 'Saisons', href: '/seasons' },
  { label: 'Résultats', href: '/races' },
  { label: 'Règlements', href: '/regulations' },
]

export function isActiveNavItem(href, pathname) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}
