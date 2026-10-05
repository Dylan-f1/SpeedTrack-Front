// Le contenu du règlement ne change qu'entre deux saisons : cache d'une heure pour
// ménager le quota de l'API (partagé par tous les visiteurs une fois déployé)
const RULEBOOK_REVALIDATE_SECONDS = 3600

// Règlement en vigueur = le plus récent (l'API les renvoie de la saison la plus récente
// à la plus ancienne)
export async function getCurrentRulebook() {
  const res = await fetch(`${process.env.API_URL}/rulebooks`, {
    next: { revalidate: RULEBOOK_REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — /rulebooks`)
  const rulebooks = await res.json()
  if (rulebooks.length === 0) throw new Error('Aucun règlement en base')
  return rulebooks[0]
}
