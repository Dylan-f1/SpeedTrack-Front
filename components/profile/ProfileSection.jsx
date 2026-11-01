// Section de la colonne principale de la fiche : titre au-dessus du texte. Le trait avant le
// titre prend la couleur d'accent de la fiche (celle de l'écurie).
export default function ProfileSection({ title, accentColor, children }) {
  return (
    <section className="border-t border-border py-10 lg:py-12">
      <h2 className="flex items-center gap-3 text-[clamp(26px,2.6vw,36px)] font-extrabold tracking-[-0.03em]">
        <span aria-hidden="true" className="h-[3px] w-6" style={{ backgroundColor: accentColor }} />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}
