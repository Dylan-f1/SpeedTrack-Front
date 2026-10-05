import Image from 'next/image'

export default function CircuitTrackMap({ name, imageUrl, corners }) {
  return (
    <section className="w-full px-6 sm:px-10 max-w-7xl mx-auto mb-10">
      <div className="p-6 sm:p-8 bg-[#121212] shadow-sm flex flex-col justify-between relative min-h-[460px]">
        <div className="z-10">
          <span className="text-label-caps text-[#8e8e8e] tracking-widest uppercase">
            PROFIL DU TRACÉ
          </span>
          <div className="text-headline-sm text-[#f0eded] mt-0.5">{name}</div>
        </div>
        <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center my-4">
          <div className="relative w-full h-full p-4">
            <Image
              src={imageUrl}
              alt={`Tracé du circuit ${name}`}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-contain contrast-125 drop-shadow-[0_0_15px_rgba(225,6,0,0.25)]"
            />
            {corners != null && (
              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-[#0e0e0e]/90 border border-white/10 px-3 py-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
                <span className="text-telemetry-sm text-[#f0eded] uppercase tracking-wider">
                  {corners} virages
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
