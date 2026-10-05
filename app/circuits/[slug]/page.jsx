import { notFound } from 'next/navigation'
import CircuitHeader from '@/components/circuits/CircuitHeader'
import CircuitMetricCards from '@/components/circuits/CircuitMetricCards'
import CircuitTrackMap from '@/components/circuits/CircuitTrackMap'
import CircuitLayoutHistory from '@/components/circuits/CircuitLayoutHistory'
import CircuitSpecsPending from '@/components/circuits/CircuitSpecsPending'

const HTTP_NOT_FOUND = 404

async function getCircuit(slug) {
  const res = await fetch(`${process.env.API_URL}/circuits/${slug}`, {
    cache: 'no-store',
  })
  if (res.status === HTTP_NOT_FOUND) return null
  // Une autre erreur (quota de l'API dépassé, serveur indisponible) ne doit pas se
  // déguiser en « circuit introuvable » : on la laisse remonter à l'écran d'erreur
  if (!res.ok) throw new Error(`API error ${res.status} — /circuits/${slug}`)
  return res.json()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const circuit = await getCircuit(slug)
  if (!circuit) return {}

  return { title: circuit.name }
}

export default async function CircuitPage({ params }) {
  const { slug } = await params
  const circuit = await getCircuit(slug)
  if (!circuit) notFound()

  const { name, imageUrl, layoutHistory = [] } = circuit
  // La configuration la plus récente est la dernière de l'historique
  const currentLayout = layoutHistory.at(-1) ?? null

  return (
    <div className="flex flex-col w-full">
      <CircuitHeader circuit={circuit} currentLayout={currentLayout} />
      {currentLayout && <CircuitMetricCards layout={currentLayout} />}
      {imageUrl && (
        <CircuitTrackMap name={name} imageUrl={imageUrl} corners={currentLayout?.corners} />
      )}
      {layoutHistory.length > 1 && <CircuitLayoutHistory layoutHistory={layoutHistory} />}
      {!currentLayout && <CircuitSpecsPending />}
    </div>
  )
}
