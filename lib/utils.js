// Formatte un temps en ms → "1:23.456"
export function formatLapTime(ms) {
  if (!ms) return '—'
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  const milli = ms % 1000
  return `${min}:${String(sec).padStart(2, '0')}.${String(milli).padStart(3, '0')}`
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

// Minuscules sans accents : « Gálvez » doit être trouvé en tapant « galvez »
export function normalizeSearchText(text = '') {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

// Merge des classes Tailwind conditionnellement
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
