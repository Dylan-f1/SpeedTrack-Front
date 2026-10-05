// Période d'exploitation d'une configuration : "2004 — 2019" ou "2004 — présent"
export function formatLayoutPeriod({ from, to }) {
  return `${from ?? '—'} — ${to ?? 'présent'}`
}
