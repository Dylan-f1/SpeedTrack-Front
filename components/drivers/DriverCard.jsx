import Image from 'next/image'
import Link from 'next/link'

const flagEmoji = {
  GBR: '🇬🇧', NED: '🇳🇱', MON: '🇲🇨', BRA: '🇧🇷',
  GER: '🇩🇪', FRA: '🇫🇷', AUT: '🇦🇹', ESP: '🇪🇸',
}

export default function DriverCard({ driver }) {
  const { slug, firstName, lastName, nationality, currentNumber, status, currentTeam, imageUrl } = driver
  const statusLabel = status === 'champion' ? 'Champion du monde' : status === 'former' ? 'Ancien pilote' : null

  return (
    <Link href={`/drivers/${slug}`} className="group block">
      <div className="relative overflow-hidden bg-surface aspect-[3/4] rounded-sm">

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-background" />
        )}

        {/* Numero watermark */}
        <span className="absolute top-3 right-4 text-6xl font-black text-white/5 leading-none select-none">
          {currentNumber ?? '—'}
        </span>

        {/* Badge statut */}
        {statusLabel && (
          <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white ${
            status === 'champion' ? 'bg-amber-500' : 'bg-red-primary'
          }`}>
            {statusLabel}
          </span>
        )}

        {/* Infos bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <p className="text-[11px] text-text-muted mb-1">
            {flagEmoji[nationality] ?? '🏁'} {currentTeam?.name ?? 'Retraité'}
          </p>
          <p className="text-base font-bold text-text-primary leading-tight">
            {firstName}{' '}
            <span className="text-text-secondary">{lastName}</span>
          </p>
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 border border-red-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </Link>
  )
}
