// Corps des fiches : texte à gauche, colonne latérale fixe à droite (au-dessus du texte sous
// 1024 px, pour rester visible sans défiler toute la fiche)
export default function ProfileLayout({ aside, children }) {
  return (
    <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,1fr)_340px]">
      {aside && <div className="lg:sticky lg:top-20 lg:order-last lg:self-start">{aside}</div>}
      <div className="min-w-0">{children}</div>
    </div>
  )
}
