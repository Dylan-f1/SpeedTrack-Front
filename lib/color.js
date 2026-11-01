// Au-delà de cette luminance relative, un texte sombre se lit mieux qu'un texte blanc
const LIGHT_BACKGROUND_LUMINANCE = 0.3

function channelLuminance(value) {
  const channel = value / 255
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

// Couleur de texte lisible sur un fond de couleur d'écurie (#RRGGBB)
export function readableTextColor(hexColor) {
  const [red, green, blue] = [1, 3, 5].map((start) =>
    channelLuminance(parseInt(hexColor.slice(start, start + 2), 16))
  )
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue
  return luminance > LIGHT_BACKGROUND_LUMINANCE ? '#131313' : '#ffffff'
}
