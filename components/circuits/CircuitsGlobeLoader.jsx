'use client'

import dynamic from 'next/dynamic'

// Le globe n'est rendu que dans le navigateur : les tracés calculés par le serveur ne
// correspondaient pas au dernier chiffre près à ceux du navigateur (trigonométrie de Node et
// de Chrome), d'où une erreur d'hydratation. Il est interactif de toute façon.
const CircuitsGlobe = dynamic(() => import('./CircuitsGlobe'), {
  ssr: false,
  // Même emprise que le globe pour que la page ne saute pas à son arrivée
  loading: () => (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="mx-auto aspect-square w-full max-w-[760px] p-[2.5%]">
        <div className="size-full rounded-full border border-[#2a2a2a] bg-[#171717]" />
      </div>
    </div>
  ),
})

export default function CircuitsGlobeLoader({ circuits }) {
  return <CircuitsGlobe circuits={circuits} />
}
