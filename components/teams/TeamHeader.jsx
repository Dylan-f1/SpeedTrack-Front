import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Flag } from '@/components/ui/Flag'

// Logos officiels blancs (pensés pour des livrées sombres) : ils disparaîtraient sur le fond
// clair utilisé pour les autres logos, qui sont noirs ou foncés. À terme, cette info
// mériterait un champ en base plutôt qu'une liste ici.
const LIGHT_LOGO_TEAM_SLUGS = new Set([
  'alpine',
  'aston-martin',
  'williams',
  'haas',
  'racing-bulls',
])

export default function TeamHeader({ team }) {
  const { slug, name, fullName, nationality, founded, base, logoUrl, principals = [] } = team
  const currentPrincipal = principals.find((principal) => principal.to === null)
  const logoBackground = LIGHT_LOGO_TEAM_SLUGS.has(slug)
    ? 'bg-[#0e0e0e] border border-[#262626]'
    : 'bg-white'

  const facts = [
    base && { label: 'Siège', value: base },
    currentPrincipal && { label: 'Team principal', value: currentPrincipal.name },
  ].filter(Boolean)

  return (
    <>
      <Breadcrumb items={[{ label: 'Écuries', href: '/teams' }, { label: name }]} />

      <div className="bg-[#131313] border border-[#262626] rounded-xl p-8 sm:p-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-(--team-accent)/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col gap-5 z-10">
          <div className="flex items-center gap-3">
            <span className="h-6 w-1 bg-(--team-accent) rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e8e]">
              <Flag code={nationality} /> {nationality}
              {founded && ` · Fondée en ${founded}`}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            {fullName ?? name}
          </h1>
          {facts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-3 border-t border-[#262626] text-xs">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <span className="text-[#5e5e5e] block uppercase font-mono tracking-wider mb-1">
                    {fact.label}
                  </span>
                  <span className="font-medium text-[#f0eded] text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {logoUrl && (
          <div
            className={`relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 self-start lg:self-center rounded-xl z-10 ${logoBackground}`}
          >
            <Image
              src={logoUrl}
              alt={`Logo ${name}`}
              fill
              sizes="176px"
              className="object-contain p-6"
            />
          </div>
        )}
      </div>
    </>
  )
}
