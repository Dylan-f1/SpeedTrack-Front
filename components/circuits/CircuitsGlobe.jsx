'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { geoContains, geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldTopology from 'world-atlas/countries-110m.json'
import { Flag } from '@/components/ui/Flag'

// Repère interne du SVG (carré) : le globe est mis à l'échelle en CSS
const SIZE = 800
const BASE_RADIUS = 380
const MIN_ZOOM = 1
const MAX_ZOOM = 8
const FOCUS_ZOOM = 2.6
// Degrés de rotation par unité du repère glissée, divisés par le zoom (plus on est près,
// plus le globe tourne lentement sous le pointeur)
const DRAG_SENSITIVITY = 0.28
const MAX_LATITUDE = 85
// Au-delà de ce déplacement (en px), un appui est un glissé et non un clic sur un circuit
const CLICK_TOLERANCE_PX = 4
const FOCUS_DURATION_MS = 520
// Départ centré sur l'Europe, où se trouvent la plupart des circuits
const INITIAL_ROTATION = [-10, -42]
const VISIBLE_ANGLE = Math.PI / 2 - 0.05

const countries = feature(worldTopology, worldTopology.objects.countries).features
const graticule = geoGraticule10()
const sphere = { type: 'Sphere' }

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function clampZoom(zoom) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))
}

// Plus court chemin en longitude (de 170° à -170° : 20° vers l'est, pas 340° vers l'ouest)
function shortestLongitude(from, to) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180
  return from + delta
}

export default function CircuitsGlobe({ circuits }) {
  const svgRef = useRef(null)
  const dragRef = useRef(null)
  const animationRef = useRef(null)
  // Doigts posés sur le globe (pincement pour zoomer sur écran tactile)
  const pointersRef = useRef(new Map())
  const pinchRef = useRef(null)
  const [rotation, setRotation] = useState(INITIAL_ROTATION)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [selectedSlug, setSelectedSlug] = useState(null)
  const [hoveredSlug, setHoveredSlug] = useState(null)
  // Unités du repère par pixel affiché : points et étiquettes gardent la même taille à l'écran,
  // que le globe fasse 340 px (mobile) ou 760 px de large
  const [unit, setUnit] = useState(1)

  const hostCountryIds = useMemo(() => {
    const ids = new Set()
    for (const { location } of circuits) {
      const host = countries.find((country) => geoContains(country, [location.lng, location.lat]))
      if (host) ids.add(host.id)
    }
    return ids
  }, [circuits])

  const projection = geoOrthographic()
    .scale(BASE_RADIUS * zoom)
    .translate([SIZE / 2, SIZE / 2])
    .rotate(rotation)
    .clipAngle(90)
  const path = geoPath(projection)
  const center = [-rotation[0], -rotation[1]]

  const visibleCircuits = circuits.filter(
    ({ location }) => geoDistance([location.lng, location.lat], center) < VISIBLE_ANGLE
  )
  const selected = circuits.find((circuit) => circuit.slug === selectedSlug) ?? null

  function stopAnimation() {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = null
  }

  // Fait tourner le globe jusqu'au circuit et rapproche la vue ; saut direct si l'utilisateur
  // a demandé moins de mouvement
  function focusOn(circuit) {
    stopAnimation()
    setSelectedSlug(circuit.slug)
    const target = [-circuit.location.lng, -circuit.location.lat]
    const targetZoom = Math.max(zoom, FOCUS_ZOOM)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRotation(target)
      setZoom(targetZoom)
      return
    }

    const startRotation = rotation
    const startZoom = zoom
    const endLongitude = shortestLongitude(startRotation[0], target[0])
    // L'heure de départ est celle de la première frame, fournie par requestAnimationFrame
    let startTime = null

    const step = (now) => {
      startTime ??= now
      const progress = easeOutCubic(Math.min(1, (now - startTime) / FOCUS_DURATION_MS))
      setRotation([
        startRotation[0] + (endLongitude - startRotation[0]) * progress,
        startRotation[1] + (target[1] - startRotation[1]) * progress,
      ])
      setZoom(startZoom + (targetZoom - startZoom) * progress)
      animationRef.current = progress < 1 ? requestAnimationFrame(step) : null
    }
    animationRef.current = requestAnimationFrame(step)
  }

  // Conversion des pixels écran vers le repère interne du SVG
  function toViewBoxUnits(pixels) {
    const width = svgRef.current?.getBoundingClientRect().width || SIZE
    return (pixels * SIZE) / width
  }

  function getPinchDistance() {
    const [first, second] = [...pointersRef.current.values()]
    return Math.hypot(first.x - second.x, first.y - second.y)
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return
    stopAnimation()
    if (event.pointerType === 'touch') {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    }

    // Deuxième doigt posé : on passe du glissé (rotation) au pincement (zoom)
    if (pointersRef.current.size === 2) {
      pinchRef.current = { distance: getPinchDistance(), zoom }
      if (dragRef.current) dragRef.current.moved = true
      return
    }

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
      pointerId: event.pointerId,
    }
  }

  function handlePointerMove(event) {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    }
    const pinch = pinchRef.current
    if (pinch && pointersRef.current.size === 2) {
      setZoom(clampZoom((pinch.zoom * getPinchDistance()) / pinch.distance))
      return
    }

    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const dx = event.clientX - drag.lastX
    const dy = event.clientY - drag.lastY
    drag.lastX = event.clientX
    drag.lastY = event.clientY

    if (!drag.moved) {
      const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY)
      if (distance < CLICK_TOLERANCE_PX) return
      drag.moved = true
      svgRef.current?.setPointerCapture(event.pointerId)
    }

    const factor = DRAG_SENSITIVITY / zoom
    setRotation(([longitude, latitude]) => [
      longitude + toViewBoxUnits(dx) * factor,
      Math.max(-MAX_LATITUDE, Math.min(MAX_LATITUDE, latitude - toViewBoxUnits(dy) * factor)),
    ])
  }

  function handlePointerUp(event) {
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size < 2) pinchRef.current = null
    const drag = dragRef.current
    if (drag?.moved) svgRef.current?.releasePointerCapture(event.pointerId)
    // Le clic qui suit un glissé ne doit pas sélectionner le circuit sous le pointeur
    if (drag) setTimeout(() => (dragRef.current = null), 0)
  }

  function handleCircuitClick(circuit) {
    if (dragRef.current?.moved) return
    focusOn(circuit)
  }

  // La molette zoome sur le globe ; écouteur non passif pour empêcher le défilement de la page
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined
    const handleWheel = (event) => {
      event.preventDefault()
      stopAnimation()
      setZoom((current) => clampZoom(current * Math.exp(-event.deltaY * 0.0015)))
    }
    svg.addEventListener('wheel', handleWheel, { passive: false })
    return () => svg.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => stopAnimation, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setUnit(SIZE / entry.contentRect.width)
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  const labelSlugs = new Set([selectedSlug, hoveredSlug].filter(Boolean))

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <div className="relative mx-auto w-full max-w-[760px]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
          role="group"
          aria-label={`Globe des ${circuits.length} circuits. Glissez pour faire tourner, molette ou pincement pour zoomer.`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <path d={path(sphere)} fill="#171717" stroke="#2a2a2a" strokeWidth={1} />
          <path d={path(graticule)} fill="none" stroke="#222221" strokeWidth={0.6} />
          {countries.map((country) => (
            <path
              key={country.id ?? country.properties.name}
              d={path(country)}
              fill={hostCountryIds.has(country.id) ? '#3a3a39' : '#2a2a2a'}
              stroke="#171717"
              strokeWidth={0.6}
            />
          ))}

          {visibleCircuits.map((circuit) => {
            const [x, y] = projection([circuit.location.lng, circuit.location.lat])
            const isSelected = circuit.slug === selectedSlug
            return (
              <g
                key={circuit.slug}
                role="button"
                tabIndex={0}
                aria-label={`${circuit.name}, ${circuit.city ?? ''} ${circuit.countryName ?? ''}`}
                aria-pressed={isSelected}
                className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-white"
                onClick={() => handleCircuitClick(circuit)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    focusOn(circuit)
                  }
                }}
                onPointerEnter={() => setHoveredSlug(circuit.slug)}
                onPointerLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(circuit.slug)}
                onBlur={() => setHoveredSlug(null)}
              >
                {/* Zone de clic plus large que le point visible (22 px de diamètre) */}
                <circle cx={x} cy={y} r={11 * unit} fill="transparent" />
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={9 * unit}
                    fill="none"
                    stroke="#e10600"
                    strokeWidth={2 * unit}
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={(isSelected ? 5 : 4) * unit}
                  fill="#e10600"
                  stroke="#171717"
                  strokeWidth={1.5 * unit}
                />
              </g>
            )
          })}

          {visibleCircuits
            .filter((circuit) => labelSlugs.has(circuit.slug))
            .map((circuit) => {
              const [x, y] = projection([circuit.location.lng, circuit.location.lat])
              return (
                <text
                  key={`label-${circuit.slug}`}
                  x={x}
                  y={y - 14 * unit}
                  textAnchor="middle"
                  fill="#ffffff"
                  stroke="#171717"
                  strokeWidth={4 * unit}
                  paintOrder="stroke"
                  fontSize={15 * unit}
                  className="pointer-events-none font-bold"
                >
                  {circuit.name}
                </text>
              )
            })}
        </svg>
      </div>

      <aside aria-live="polite" className="border-t border-border pt-6 lg:sticky lg:top-24">
        {selected ? (
          <div>
            <p className="flex items-center gap-2 text-[#8e8e8e]">
              <Flag code={selected.country} />
              {[selected.city, selected.countryName].filter(Boolean).join(', ')}
            </p>
            <h2 className="mt-2 text-[clamp(28px,2.6vw,38px)] font-extrabold leading-tight tracking-[-0.03em]">
              {selected.name}
            </h2>
            <p className="mt-3 text-sm text-[#8e8e8e] tabular-nums">
              {Math.abs(selected.location.lat).toFixed(2)}° {selected.location.lat >= 0 ? 'N' : 'S'}
              , {Math.abs(selected.location.lng).toFixed(2)}°{' '}
              {selected.location.lng >= 0 ? 'E' : 'O'}
            </p>
            <Link
              href={`/circuits/${selected.slug}`}
              className="hero-link mt-6 inline-block text-lg"
            >
              Voir la fiche du circuit
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-extrabold tracking-[-0.02em]">
              {circuits.length} {circuits.length > 1 ? 'circuits' : 'circuit'} sur le globe
            </h2>
            <p className="mt-2 leading-relaxed text-text-secondary">
              Faites tourner le globe en le glissant, zoomez à la molette (ou en pinçant sur
              téléphone), puis choisissez un point rouge pour voir le circuit.
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}
