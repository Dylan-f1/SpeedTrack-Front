'use client'

import { useEffect, useRef } from 'react'

// La trajectoire vit dans la gouttière à gauche des virages : elle s'en écarte entre deux
// virages et vient toucher chacun en son milieu, comme une voiture frôle la corde
const OUTSIDE_OFFSET_PX = 40
const APEX_OFFSET_PX = 6
const CURVE_TENSION = 0.5
// La ligne est entièrement tracée quand le haut de la section arrive à ce point de l'écran
const DRAW_TRIGGER_VIEWPORT_RATIO = 0.75

function buildPath(section) {
  const sectionBox = section.getBoundingClientRect()
  const corners = [...section.querySelectorAll('[data-corner]')]
  if (corners.length === 0) return ''

  const cornersLeft = corners[0].getBoundingClientRect().left - sectionBox.left
  const outsideX = cornersLeft - OUTSIDE_OFFSET_PX
  const apexX = cornersLeft - APEX_OFFSET_PX
  const firstTop = corners[0].getBoundingClientRect().top - sectionBox.top
  let path = `M ${outsideX} ${firstTop}`

  corners.forEach((corner) => {
    const box = corner.getBoundingClientRect()
    const top = box.top - sectionBox.top
    const middle = top + box.height / 2
    const bottom = top + box.height
    const pull = (box.height / 2) * CURVE_TENSION
    path += ` C ${outsideX} ${top + pull}, ${apexX} ${middle - pull}, ${apexX} ${middle}`
    path += ` C ${apexX} ${middle + pull}, ${outsideX} ${bottom - pull}, ${outsideX} ${bottom}`
  })

  return path
}

export default function RacingLine() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    const section = svg.parentElement
    const [ghost, line] = svg.querySelectorAll('path')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let length = 0

    function draw() {
      const box = section.getBoundingClientRect()
      const progress = (window.innerHeight * DRAW_TRIGGER_VIEWPORT_RATIO - box.top) / box.height
      const clamped = reducedMotion ? 1 : Math.min(1, Math.max(0, progress))
      line.style.strokeDashoffset = `${length * (1 - clamped)}`
    }

    function build() {
      const path = buildPath(section)
      ghost.setAttribute('d', path)
      line.setAttribute('d', path)
      length = line.getTotalLength()
      line.style.strokeDasharray = `${length}`
      draw()
    }

    build()
    const resizeObserver = new ResizeObserver(build)
    resizeObserver.observe(section)
    window.addEventListener('scroll', draw, { passive: true })
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', draw)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
    >
      <path
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="3"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <path fill="none" stroke="#e10600" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
