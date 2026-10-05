import { geoContains, geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldTopology from 'world-atlas/countries-110m.json'

const MAP_WIDTH = 960
const MAP_HEIGHT = 480
const ANTARCTICA_ID = '010'
const LABEL_OFFSET_Y = -12

// Calculé une seule fois au chargement du module : la carte est rendue côté serveur,
// le navigateur ne reçoit qu'un SVG (aucune librairie de carte côté client)
const countries = feature(worldTopology, worldTopology.objects.countries).features.filter(
  (country) => country.id !== ANTARCTICA_ID
)
const projection = geoNaturalEarth1().fitExtent(
  [
    [0, 0],
    [MAP_WIDTH, MAP_HEIGHT],
  ],
  { type: 'FeatureCollection', features: countries }
)
const pathGenerator = geoPath(projection)

function getHostCountryIds(circuits) {
  const hostIds = new Set()
  for (const { location } of circuits) {
    const point = [location.lng, location.lat]
    const host = countries.find((country) => geoContains(country, point))
    if (host) hostIds.add(host.id)
  }
  return hostIds
}

export default function CircuitsWorldMap({ circuits }) {
  const locatedCircuits = circuits.filter(
    ({ location }) => location?.lat != null && location?.lng != null
  )
  const hostCountryIds = getHostCountryIds(locatedCircuits)

  return (
    <figure className="bg-[#0e0e0e] border border-[#262626] rounded-xl overflow-hidden">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-auto"
        role="group"
        aria-label={`Carte du monde des ${locatedCircuits.length} circuits`}
      >
        <g>
          {countries.map((country) => (
            <path
              key={country.id ?? country.properties.name}
              d={pathGenerator(country)}
              fill={hostCountryIds.has(country.id) ? '#2a2a2a' : '#1a1a1a'}
              stroke="#0e0e0e"
              strokeWidth={0.5}
            />
          ))}
        </g>

        <g>
          {locatedCircuits.map(({ slug, name, city, location }) => {
            const [x, y] = projection([location.lng, location.lat])

            return (
              <a key={slug} href={`/circuits/${slug}`} className="group outline-none">
                <title>{city ? `${name} — ${city}` : name}</title>
                <circle cx={x} cy={y} r={10} fill="transparent" />
                <circle
                  cx={x}
                  cy={y}
                  r={7}
                  fill="#e10600"
                  className="opacity-15 group-hover:opacity-40 group-focus-visible:opacity-40 transition-opacity"
                />
                <circle cx={x} cy={y} r={3} fill="#e10600" stroke="#0e0e0e" strokeWidth={1} />
                <text
                  x={x}
                  y={y + LABEL_OFFSET_Y}
                  textAnchor="middle"
                  fill="#ffffff"
                  stroke="#0e0e0e"
                  strokeWidth={3}
                  paintOrder="stroke"
                  className="pointer-events-none font-mono text-[11px] font-semibold uppercase opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                >
                  {name}
                </text>
              </a>
            )
          })}
        </g>
      </svg>
      <figcaption className="flex items-center gap-2 px-4 py-3 border-t border-[#262626] font-mono text-[11px] text-[#5e5e5e]">
        <span className="w-2 h-2 rounded-full bg-[#e10600]" />
        {locatedCircuits.length} circuits · survolez un point pour voir son nom, cliquez pour ouvrir
        sa fiche
      </figcaption>
    </figure>
  )
}
