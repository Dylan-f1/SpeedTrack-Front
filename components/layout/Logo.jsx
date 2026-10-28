import Link from 'next/link'

// Signature « Ligne de course » : un virage et son point de corde devant le nom
export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-[21px] font-black tracking-[-0.03em] text-white"
    >
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M3 21 C3 10 8 4 21 3"
          fill="none"
          stroke="#e10600"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="9" cy="9.5" r="2.2" fill="#ffffff" />
      </svg>
      SpeedTrack
    </Link>
  )
}
