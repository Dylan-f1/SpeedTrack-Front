// Carte « Parcours » : reprend le bloc « Fait marquant » de la maquette avec le
// récit de carrière du pilote et des repères tirés de son historique d'écuries.
export default function ProfileCareerCard({
  narrative,
  careerStart,
  careerEnd,
  careerSpan,
  teamCount,
}) {
  const hasCareerSpan = careerStart !== null
  const isActive = careerEnd === null

  return (
    <div className="bg-gradient-to-br from-[#1f1616] to-[#181818] border border-[#e10600]/30 p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
      {hasCareerSpan && (
        <div className="absolute -right-8 -bottom-8 text-9xl font-mono font-black text-[#e10600]/[0.06] select-none pointer-events-none">
          {careerStart}
        </div>
      )}
      <div className="relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e10600]/20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff4d46] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">route</span>
            Parcours
          </span>
          {hasCareerSpan && (
            <span className="text-xs font-mono bg-[#e10600] text-white px-2 py-0.5 rounded font-bold uppercase">
              {careerSpan}
            </span>
          )}
        </div>
        <p className="text-neutral-300 text-sm mt-5 leading-relaxed font-normal">{narrative}</p>
        {hasCareerSpan && (
          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/[0.08]">
            <div className="bg-black/40 p-3 rounded border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                Débuts F1
              </span>
              <span className="text-sm font-mono font-bold text-white">{careerStart}</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                Écuries
              </span>
              <span className="text-sm font-mono font-bold text-[#ff4d46]">{teamCount}</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                Dernière saison
              </span>
              <span
                className={`text-sm font-mono font-bold ${isActive ? 'text-emerald-400' : 'text-white'}`}
              >
                {isActive ? 'En activité' : careerEnd}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
