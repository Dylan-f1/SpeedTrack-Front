const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

function buildUrl(endpoint, params = {}) {
  const defined = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  const query = new URLSearchParams(defined).toString()
  return `${BASE_URL}${endpoint}${query ? `?${query}` : ''}`
}

async function get(endpoint, params = {}) {
  const res = await fetch(buildUrl(endpoint, params), { cache: 'no-store' })
  if (!res.ok) throw new Error(`API error ${res.status} — ${endpoint}`)
  return res.json()
}

export const driversAPI = {
  list: (params) => get('/drivers', params),
  get: (slug) => get(`/drivers/${slug}`),
  races: (slug, params) => get(`/drivers/${slug}/races`, params),
  stats: (slug, params) => get(`/drivers/${slug}/stats`, params),
}

export const teamsAPI = {
  list: (params) => get('/teams', params),
  get: (slug, params) => get(`/teams/${slug}`, params),
}

export const seasonsAPI = {
  list: (params) => get('/seasons', params),
  get: (year) => get(`/seasons/${year}`),
  driverStandings: (year) => get(`/seasons/${year}/standings/drivers`),
  constructorStandings: (year) => get(`/seasons/${year}/standings/constructors`),
  races: (year) => get(`/seasons/${year}/races`),
}

export const circuitsAPI = {
  list: (params) => get('/circuits', params),
  get: (slug) => get(`/circuits/${slug}`),
}

export const racesAPI = {
  list: (params) => get('/races', params),
  result: (year, round) => get(`/races/${year}/${round}`),
  qualifying: (year, round) => get(`/races/${year}/${round}/qualifying`),
}

export const regulationsAPI = {
  list: (params) => get('/regulations', params),
  get: (era) => get(`/regulations/${era}`),
}
