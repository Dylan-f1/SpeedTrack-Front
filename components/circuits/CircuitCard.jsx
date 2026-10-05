import Link from 'next/link'

const LENGTH_DECIMALS = 3
const COORDINATE_DECIMALS = 2

function formatCoordinates({ lat, lng }) {
  const latitude = `${Math.abs(lat).toFixed(COORDINATE_DECIMALS)}°${lat >= 0 ? 'N' : 'S'}`
  const longitude = `${Math.abs(lng).toFixed(COORDINATE_DECIMALS)}°${lng >= 0 ? 'E' : 'O'}`
  return `${latitude} ${longitude}`
}

export default function CircuitCard({ circuit }) {
  const { slug, name, city, location, layoutHistory = [] } = circuit
  const currentLayout = layoutHistory.at(-1)
  const specs = [
    currentLayout?.lengthKm && `${currentLayout.lengthKm.toFixed(LENGTH_DECIMALS)} km`,
    currentLayout?.corners && `${currentLayout.corners} virages`,
  ].filter(Boolean)
  // Sans caractéristiques en base, les coordonnées GPS donnent quand même une info réelle
  if (specs.length === 0 && location?.lat != null) specs.push(formatCoordinates(location))

  return (
    <Link
      href={`/circuits/${slug}`}
      className="group bg-[#131313] border border-[#262626] hover:border-[#e10600]/50 rounded-xl p-4 flex flex-col gap-3 transition-colors"
    >
      <div>
        <h3 className="text-base font-bold uppercase leading-tight text-white">{name}</h3>
        {city && <p className="mt-1 font-mono text-xs text-[#8e8e8e]">{city}</p>}
      </div>
      <div className="mt-auto pt-3 border-t border-[#262626] flex items-center justify-between gap-3 font-mono text-xs">
        <span className="truncate text-[#5e5e5e]">{specs.join(' · ')}</span>
        <span className="shrink-0 flex items-center gap-1 font-semibold text-[#8e8e8e] group-hover:text-white transition-colors">
          Fiche
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform"
          >
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
