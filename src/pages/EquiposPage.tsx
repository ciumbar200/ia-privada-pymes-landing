import { useState } from 'react'
import { trackEvent } from '../lib/analytics'

// NUEVO EQUIPO: duplicar el bloque TeamCard y actualizar contenido

interface Agent {
  icon: string
  name: string
  role: string
}

interface TeamData {
  title: string
  tagline: string
  pills: string[]
  metrics: { value: string; label: string }[]
  agents: Agent[]
  ctaSubject: string
}

const activeTeams: TeamData[] = [
  {
    title: 'Equipo de ventas',
    tagline: 'Como tener un equipo comercial de 8 personas trabajando en paralelo, sin costes fijos.',
    pills: ['Prospección', 'CRM', 'Seguimiento', 'Cierre'],
    metrics: [
      { value: '8', label: 'especialistas' },
      { value: '360°', label: 'ciclo de venta' },
    ],
    agents: [
      { icon: '👔', name: 'Valentín', role: 'Director del equipo' },
      { icon: '🔍', name: 'Prospector', role: 'Capta leads nuevos' },
      { icon: '🔬', name: 'Enricher', role: 'Investiga cada lead' },
      { icon: '✍️', name: 'Copywriter', role: 'Redacta los mensajes' },
      { icon: '📊', name: 'CRM Manager', role: 'Gestiona el pipeline' },
      { icon: '💎', name: 'VIP Watcher', role: 'Detecta grandes cuentas' },
    ],
    ctaSubject: 'Quiero el equipo de ventas',
  },
  {
    title: 'Equipo de marketing',
    tagline: 'Contenido, redes y campañas funcionando solos. Tu marca siempre presente, tú siempre libre.',
    pills: ['Redes sociales', 'SEM', 'Contenido'],
    metrics: [
      { value: '3', label: 'especialistas' },
      { value: 'Omnicanal', label: '' },
    ],
    agents: [
      { icon: '📱', name: 'Social Media Manager', role: 'Crea contenido diario' },
      { icon: '📈', name: 'Ads Optimizer', role: 'Gestiona campañas de pago' },
      { icon: '🎯', name: 'Noxo Growth OS', role: 'Orquesta la estrategia' },
    ],
    ctaSubject: 'Quiero el equipo de marketing',
  },
]

const comingSoonTeams = [
  { title: 'Equipo de atención al cliente', tagline: 'Responde y resuelve sin intervención humana en el 80% de los casos.' },
  { title: 'Equipo de operaciones', tagline: 'Reportes automáticos y coordinación entre departamentos.' },
  { title: 'Equipo financiero', tagline: 'Facturas, alertas de tesorería y seguimiento de pagos.' },
]

function TeamCard({ team, isOpen, onToggle }: { team: TeamData; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`group rounded-2xl border bg-white transition-all duration-300 ${isOpen ? 'border-brand-300 shadow-lg shadow-brand-100/50' : 'border-graphite-200 hover:border-graphite-300 hover:shadow-md'}`}>
      <div className="cursor-pointer p-7" onClick={onToggle}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">Activo</span>
          </div>
          <svg className={`h-5 w-5 text-graphite-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-brand-950">{team.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-graphite-600">{team.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {team.pills.map((pill) => (
            <span key={pill} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 border border-brand-100">
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-5 border-t border-graphite-100 pt-4 text-sm text-graphite-500">
          {team.metrics.map((m) => (
            <span key={m.value}><strong className="font-semibold text-brand-950">{m.value}</strong> {m.label}</span>
          ))}
        </div>
      </div>
      <div className={`grid transition-all duration-400 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-graphite-100 px-7 py-6">
            <div className="flex flex-col gap-3">
              {team.agents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-3 rounded-xl bg-brand-50/60 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-950 text-base">
                    {agent.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-950">{agent.name}</div>
                    <div className="text-xs text-graphite-500">{agent.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={`mailto:hola@noxoiaempresas.com?subject=${encodeURIComponent(team.ctaSubject)}`}
              onClick={() => trackEvent('cta_equipo', { team: team.title })}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Quiero este equipo
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EquiposPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="font-heading text-base font-semibold text-brand-950">
            Nexo IA
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
            <a href="/" className="text-sm font-medium text-graphite-700 hover:text-brand-900 transition-colors">Inicio</a>
            <a href="/equipos" className="text-sm font-medium text-brand-900">Equipos</a>
            <a href="mailto:hola@noxoiaempresas.com" className="text-sm font-medium text-graphite-700 hover:text-brand-900 transition-colors">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-green-800">Equipos en producción</span>
        </div>
        <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-950 md:text-5xl">
          Tu empresa funciona sola.<br />Tú decides dónde poner el foco.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-graphite-600">
          Cada equipo es un conjunto de agentes especializados que trabajan coordinados, sin descanso. No son bots. Son roles digitales con objetivos reales.
        </p>
        <div className="mt-10 flex justify-center gap-12">
          <div className="text-center">
            <div className="font-heading text-2xl font-bold text-brand-950">24/7</div>
            <div className="mt-0.5 text-xs text-graphite-500">Operación continua</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl font-bold text-brand-950">+8</div>
            <div className="mt-0.5 text-xs text-graphite-500">Agentes por equipo</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-2xl font-bold text-brand-950">0</div>
            <div className="mt-0.5 text-xs text-graphite-500">Días de baja</div>
          </div>
        </div>
      </section>

      {/* Active Teams */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-graphite-400">Equipos disponibles</p>
        <div className="grid gap-6 md:grid-cols-2">
          {activeTeams.map((team, i) => (
            <TeamCard
              key={team.title}
              team={team}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-graphite-400">Próximamente</p>
        <div className="grid gap-6 md:grid-cols-3">
          {comingSoonTeams.map((team) => (
            <div key={team.title} className="rounded-2xl border-2 border-dashed border-graphite-200 bg-white/50 p-7 opacity-60">
              <h3 className="font-heading text-lg font-bold text-brand-950">{team.title}</h3>
              <p className="mt-2 text-sm text-graphite-500">{team.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-graphite-200 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-950">¿Quieres un equipo a medida?</h2>
        <p className="mt-3 text-graphite-600">Cuéntanos tu sector y lo diseñamos juntos.</p>
        <a
          href="mailto:hola@noxoiaempresas.com?subject=Equipo%20a%20medida"
          onClick={() => trackEvent('cta_a_medida', { source: 'equipos' })}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-950 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Hablemos
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-graphite-200 py-6 text-center text-xs text-graphite-400">
        © 2026 Nexo IA Empresas — Automatización con IA para pymes
      </footer>
    </div>
  )
}
