'use client'

import Link from 'next/link'

// Affiché quand une page ne peut pas être rendue, le plus souvent parce que l'API est
// momentanément indisponible (démarrage du serveur, quota de requêtes dépassé)
export default function Error({ unstable_retry }) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24 flex flex-col items-center gap-6 text-center">
      <span aria-hidden="true" className="material-symbols-outlined text-[48px] text-[#e10600]">
        sensors_off
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">
          Données momentanément indisponibles
        </h1>
        <p className="max-w-md text-sm text-[#8e8e8e] leading-relaxed">
          Le serveur de données ne répond pas pour le moment. Réessayez dans quelques instants.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="px-5 py-2.5 rounded-lg bg-[#e10600] hover:bg-[#ff4d4d] font-mono text-xs font-semibold uppercase text-white transition-colors"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-[#131313] border border-[#262626] hover:border-[#393939] font-mono text-xs font-semibold uppercase text-[#c8c6c5] hover:text-white transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
