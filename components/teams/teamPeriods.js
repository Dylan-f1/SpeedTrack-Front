// Période d'un mandat ou d'une entité : `to` null signifie « toujours en cours »
export function formatPeriod(from, to) {
  if (from === to) return `${from}`
  return `${from} — ${to ?? 'présent'}`
}

// Compacte une liste d'années triées en plages : [2007, 2008, 2009, 2014] → « 2007–2009, 2014 »
export function formatYearRanges(sortedYears) {
  const ranges = []
  sortedYears.forEach((year) => {
    const lastRange = ranges.at(-1)
    if (lastRange && year === lastRange.end + 1) {
      lastRange.end = year
    } else {
      ranges.push({ start: year, end: year })
    }
  })

  return ranges.map(({ start, end }) => (start === end ? `${start}` : `${start}–${end}`)).join(', ')
}
