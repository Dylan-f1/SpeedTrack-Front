export default function SectionTitle({ children }) {
  return (
    <div className="flex items-center space-x-3">
      <span className="h-3 w-1 bg-[#e10600] rounded-sm"></span>
      <h2 className="text-lg font-bold text-white tracking-wide uppercase font-mono">{children}</h2>
    </div>
  )
}
