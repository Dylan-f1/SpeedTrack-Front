const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function get(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`API error ${res.status} — ${endpoint}`)
  return res.json()
}

export const driversAPI = {
  list: (query = '') => get(`/drivers${query}`),
  get: (slug) => get(`/drivers/${slug}`),
}

export const teamsAPI = {
  list: () => get('/teams'),
  get: (slug) => get(`/teams/${slug}`),
}

export const seasonsAPI = {
  list: () => get('/seasons'),
  get: (year) => get(`/seasons/${year}`),
  driverStandings: (year) => get(`/seasons/${year}/standings/drivers`),
  constructorStandings: (year) => get(`/seasons/${year}/standings/constructors`),
  races: (year) => get(`/seasons/${year}/races`),
}

export const circuitsAPI = {
  list: () => get('/circuits'),
  get: (slug) => get(`/circuits/${slug}`),
}

export const racesAPI = {
  result: (year, round) => get(`/races/${year}/${round}`),
  qualifying: (year, round) => get(`/races/${year}/${round}/qualifying`),
}
