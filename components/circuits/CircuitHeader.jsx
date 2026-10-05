import { Fragment } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Flag } from '@/components/ui/Flag'
import { COUNTRY_NAMES } from '@/components/circuits/countryNames'

const LENGTH_DECIMALS = 3

function buildSpecs(layout) {
  if (!layout) return []

  return [
    layout.lengthKm != null && {
      label: 'LONGUEUR',
      value: layout.lengthKm.toFixed(LENGTH_DECIMALS),
      unit: 'KM',
    },
    layout.from != null && { label: 'DEPUIS', value: layout.from },
  ].filter(Boolean)
}

export default function CircuitHeader({ circuit, currentLayout }) {
  const { name, country, city } = circuit
  const specs = buildSpecs(currentLayout)

  return (
    <section className="w-full px-6 sm:px-10 py-10 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Breadcrumb items={[{ label: 'Circuits', href: '/circuits' }, { label: name }]} />
        {country && (
          <div className="flex items-center gap-2">
            <Flag code={country} />
            <span className="text-label-caps text-[#f0eded] uppercase tracking-wider ml-1">
              {COUNTRY_NAMES[country] ?? country}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 bg-gradient-to-r from-transparent via-[#2a2a2a]/20 to-transparent">
        <div>
          <span className="text-label-caps text-[#8e8e8e] tracking-widest uppercase block mb-1">
            CIRCUIT SPECIFICATION RECORD
          </span>
          <h1 className="text-display-lg font-black tracking-tighter text-[#f0eded] uppercase">
            {name}
          </h1>
          {city && <p className="text-body-md text-[#8e8e8e] mt-1">{city}</p>}
        </div>
        {specs.length > 0 && (
          <div className="flex items-center gap-6 sm:gap-10">
            {specs.map((spec, index) => (
              <Fragment key={spec.label}>
                {index > 0 && <div className="w-px h-8 bg-[#353534]" />}
                <div className="flex flex-col">
                  <span className="text-label-caps text-[#8e8e8e] uppercase">{spec.label}</span>
                  <span className="text-telemetry-lg text-[#f0eded] font-bold">
                    {spec.value}
                    {spec.unit && (
                      <span className="text-telemetry-sm font-normal text-[#8e8e8e]">
                        {' '}
                        {spec.unit}
                      </span>
                    )}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
