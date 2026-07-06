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

// Merge des classes Tailwind conditionnellement
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

const COUNTRY_FLAGS = {
  GBR: '🇬🇧', NED: '🇳🇱', MON: '🇲🇨', BRA: '🇧🇷',
  GER: '🇩🇪', FRA: '🇫🇷', AUT: '🇦🇹', ESP: '🇪🇸',
  ITA: '🇮🇹', USA: '🇺🇸', MEX: '🇲🇽', CAN: '🇨🇦',
  AUS: '🇦🇺', JPN: '🇯🇵', CHN: '🇨🇳', BHR: '🇧🇭',
  SAU: '🇸🇦', UAE: '🇦🇪', SGP: '🇸🇬', HUN: '🇭🇺',
  BEL: '🇧🇪', SUI: '🇨🇭', FIN: '🇫🇮', DEN: '🇩🇰',
  POL: '🇵🇱', ARG: '🇦🇷', ZAF: '🇿🇦', THA: '🇹🇭',
  PRT: '🇵🇹', SWE: '🇸🇪', NOR: '🇳🇴', CZE: '🇨🇿',
}

export function getCountryFlag(code) {
  return COUNTRY_FLAGS[code] ?? '🏁'
}
