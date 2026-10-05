export default function SectionHeader({ title, summary, children }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#262626] pb-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#e10600]" />
          <h2 className="text-xl font-bold uppercase tracking-tight text-white">{title}</h2>
        </div>
        {summary && <p className="pl-5 font-mono text-xs text-[#8e8e8e]">{summary}</p>}
      </div>
      {children}
    </div>
  )
}
