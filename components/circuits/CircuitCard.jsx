import Link from 'next/link'
import { getCountryFlag } from '@/lib/utils'

export default function CircuitCard({ circuit }) {
  const { slug, name, country, city } = circuit

  return (
    <Link href={`/circuits/${slug}`} className="group block">
      <div className="relative bg-surface border border-border rounded-sm p-6 h-full group-hover:border-red-primary transition-colors duration-200">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <p className="text-[11px] text-text-muted uppercase tracking-widest mb-3">
          {getCountryFlag(country)} {country}
        </p>
        <h3 className="text-base font-black uppercase tracking-tight text-text-primary leading-tight">
          {name}
        </h3>
        {city && (
          <p className="text-xs text-text-muted mt-3">{city}</p>
        )}
      </div>
    </Link>
  )
}
