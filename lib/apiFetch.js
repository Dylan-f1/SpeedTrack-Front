// Cache par défaut de 5 minutes : les données (pilotes, écuries, saisons...) ne changent
// qu'aux resynchronisations, et sans cache chaque affichage de page rappellerait l'API
const DEFAULT_REVALIDATE_SECONDS = 300
const INTERNAL_KEY_HEADER = 'x-internal-api-key'

// Tous les appels à l'API passent par ici. En production, le serveur Next partage quelques
// adresses IP Vercel pour tous les visiteurs : la clé interne permet à l'API d'exempter ces
// appels de sa limite de requêtes par IP (voir INTERNAL_API_KEY côté backend).
export function apiFetch(path, init = {}) {
  const headers = { ...init.headers }
  if (process.env.INTERNAL_API_KEY) headers[INTERNAL_KEY_HEADER] = process.env.INTERNAL_API_KEY

  return fetch(`${process.env.API_URL}${path}`, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    ...init,
    headers,
  })
}
