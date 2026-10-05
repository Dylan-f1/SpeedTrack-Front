// Les contenus éditoriaux changent rarement : cache d'une heure pour ménager le quota de l'API
const SITE_CONTENT_REVALIDATE_SECONDS = 3600
const HTTP_NOT_FOUND = 404

// Contenu d'un bloc éditorial (ex: "home-hero"), ou null s'il n'existe pas en base
export async function getSiteContent(key) {
  const path = `/site-contents/${key}`
  const res = await fetch(`${process.env.API_URL}${path}`, {
    next: { revalidate: SITE_CONTENT_REVALIDATE_SECONDS },
  })
  if (res.status === HTTP_NOT_FOUND) return null
  if (!res.ok) throw new Error(`API error ${res.status} — ${path}`)
  const { content } = await res.json()
  return content
}
