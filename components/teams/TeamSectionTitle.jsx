export default function TeamSectionTitle({ title, aside }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262626] pb-4">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-(--team-accent)" />
        <h2 className="text-xl font-bold uppercase tracking-tight text-white">{title}</h2>
      </div>
      {aside && <span className="font-mono text-xs uppercase text-[#8e8e8e]">{aside}</span>}
    </div>
  )
}
