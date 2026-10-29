// Recadrage serveur par Cloudinary : vignette centrée sur le visage, format et qualité
// adaptés au navigateur. Les URL qui ne viennent pas de Cloudinary sont rendues telles quelles.
const UPLOAD_SEGMENT = '/upload/'

export function faceCrop(imageUrl, width, height) {
  if (!imageUrl?.includes('res.cloudinary.com')) return imageUrl
  const transformation = `c_fill,g_face,w_${width},h_${height},q_auto,f_auto`
  return imageUrl.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}${transformation}/`)
}
