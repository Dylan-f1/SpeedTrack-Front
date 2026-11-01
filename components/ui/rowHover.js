// Survol des listes en lignes « Ligne de course » : le contenu glisse vers la droite (transform,
// sans recalcul de mise en page) et un trait d'accent grandit depuis la gauche.
// La ligne doit porter les classes `group relative`.
const EASE_OUT = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

export const ROW_SLIDE = `transition-transform duration-200 ${EASE_OUT} group-hover:translate-x-4 group-focus-visible:translate-x-4 motion-reduce:transform-none`

export const ROW_ACCENT_BAR = `absolute inset-y-0 left-0 w-[3px] origin-left scale-x-0 bg-red-primary transition-transform duration-200 ${EASE_OUT} group-hover:scale-x-100 group-focus-visible:scale-x-100`
