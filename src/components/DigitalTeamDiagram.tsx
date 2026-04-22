import { useState } from 'react'
import { trackEvent } from '../lib/analytics'
import type { DigitalTeamDiagramData } from '../data/content'

// ── SVG coordinate system ─────────────────────────────────────────────────
const VW = 560
const VH = 400
const CX = 280
const CY = 200

// Six satellite positions (top, clockwise)
const SATS = [
  { x: 280, y: 50 },
  { x: 447, y: 126 },
  { x: 447, y: 274 },
  { x: 280, y: 350 },
  { x: 113, y: 274 },
  { x: 113, y: 126 },
]

const ACCENT: Record<string, string> = {
  responde: '#f97316',
  clasifica: '#7aa8d7',
  sigue: '#fb923c',
  organiza: '#4f88c7',
  prepara: '#7aa8d7',
  alerta: '#ea580c',
  captura: '#22c55e',
  publica: '#7aa8d7',
  ads: '#f97316',
  coordina: '#f97316',
}

function accent(tag: string) {
  return ACCENT[tag.toLowerCase()] ?? '#4f88c7'
}

function pos(x: number, y: number) {
  return { left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` }
}

export function DigitalTeamDiagram({
  diagram,
  pagePath,
  onCtaClick,
}: {
  diagram: DigitalTeamDiagramData
  pagePath: string
  onCtaClick?: () => void
}) {
  const [active, setActive] = useState(-1)
  const role = active === -1 ? diagram.centralRole : diagram.roles[active]

  function pick(i: number) {
    setActive(i)
    trackEvent('diagram_role_view', {
      page: pagePath,
      role: i === -1 ? diagram.centralRole.title : diagram.roles[i]?.title,
    })
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-elevated backdrop-blur-sm">
      {/* Header */}
      <div className="px-6 py-7 md:px-8 md:py-8">
        <span className="section-kicker">Equipo digital en acción</span>
        <h2 className="mt-1 text-3xl leading-tight md:text-4xl">{diagram.title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-graphite-700">{diagram.subtitle}</p>
      </div>

      {/* Body */}
      <div className="border-t border-white/60 lg:grid lg:grid-cols-[3fr_2fr]">

        {/* ── Left: diagram ─────────────────────────────────────────── */}
        <div className="border-b border-white/60 p-4 lg:border-b-0 lg:border-r lg:p-6">

          {/* Desktop hub-and-spoke */}
          <div
            className="relative mx-auto hidden max-w-[540px] lg:block"
            style={{ aspectRatio: `${VW}/${VH}` }}
          >
            {/* SVG: orbit ring + connection lines + animated dots */}
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Faint orbit ellipse */}
              <ellipse
                cx={CX} cy={CY}
                rx={184} ry={140}
                fill="none"
                stroke="#e9f0f9"
                strokeWidth="1"
                strokeDasharray="5 8"
              />

              {/* Motion paths: satellite → center */}
              <defs>
                {SATS.map((s, i) => (
                  <path key={i} id={`mp${i}`} d={`M${s.x} ${s.y} L${CX} ${CY}`} />
                ))}
              </defs>

              {/* Per-role: connection line + animated flowing dot */}
              {diagram.roles.map((r, i) => {
                const s = SATS[i]
                if (!s) return null
                const on = active === i
                const a = accent(r.tag)
                return (
                  <g key={i}>
                    <line
                      x1={CX} y1={CY} x2={s.x} y2={s.y}
                      stroke={on ? a : '#d2e0f2'}
                      strokeWidth={on ? 2.5 : 1.5}
                      strokeDasharray={on ? '' : '6 5'}
                      style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
                    />
                    <circle r={on ? 5 : 3.5} fill={on ? a : '#abc8e6'} opacity={on ? 1 : 0.75}>
                      <animateMotion
                        dur={on ? '1.4s' : '2.6s'}
                        repeatCount="indefinite"
                        begin={`${i * 0.42}s`}
                      >
                        <mpath href={`#mp${i}`} />
                      </animateMotion>
                    </circle>
                  </g>
                )
              })}
            </svg>

            {/* Central node */}
            <button
              type="button"
              onClick={() => pick(-1)}
              style={{ ...pos(CX, CY), transform: 'translate(-50%,-50%)', width: '22%' }}
              className={`absolute z-10 rounded-[1.5rem] p-3.5 text-center transition-all duration-200 ${
                active === -1
                  ? 'bg-brand-950 shadow-elevated ring-4 ring-action-400/35'
                  : 'bg-brand-950 shadow-elevated hover:ring-2 hover:ring-brand-400/40'
              }`}
              aria-pressed={active === -1}
            >
              {active === -1 && (
                <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-action-400/10 animate-pulse-slow" />
              )}
              <span className="relative block text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-action-300">
                {diagram.centralRole.tag}
              </span>
              <p className="relative mt-1.5 font-heading text-[0.72rem] font-semibold leading-snug text-white">
                {diagram.centralRole.title}
              </p>
            </button>

            {/* Satellite nodes */}
            {diagram.roles.map((r, i) => {
              const s = SATS[i]
              if (!s) return null
              const on = active === i
              const a = accent(r.tag)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  style={{
                    ...pos(s.x, s.y),
                    transform: 'translate(-50%,-50%)',
                    width: '17%',
                    ...(on ? { boxShadow: `0 0 0 3px ${a}, 0 24px 60px -28px rgba(17,31,49,0.30)` } : {}),
                  }}
                  className={`absolute z-10 rounded-[1.3rem] p-2.5 text-center transition-all duration-200 ${
                    on
                      ? 'bg-brand-950'
                      : 'border border-white/80 bg-white/92 shadow-soft hover:-translate-y-0.5 hover:shadow-elevated'
                  }`}
                  aria-pressed={on}
                >
                  <span className={`block text-[0.54rem] font-semibold uppercase tracking-[0.09em] ${on ? 'text-action-300' : 'text-brand-600'}`}>
                    {r.tag}
                  </span>
                  <p className={`mt-1 text-[0.64rem] font-semibold leading-snug ${on ? 'text-white' : 'text-brand-950'}`}>
                    {r.title}
                  </p>
                </button>
              )
            })}

            {/* Interaction hint */}
            <p className="absolute bottom-1 left-0 right-0 text-center text-[0.6rem] text-graphite-400">
              Haz clic en un rol para ver el detalle
            </p>
          </div>

          {/* Mobile: wrapped pills */}
          <div className="lg:hidden">
            <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
              Selecciona un rol
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => pick(-1)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  active === -1
                    ? 'bg-brand-950 text-white'
                    : 'border border-brand-200 bg-white text-brand-800 hover:bg-brand-50'
                }`}
              >
                {diagram.centralRole.tag} · {diagram.centralRole.title}
              </button>
              {diagram.roles.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    active === i
                      ? 'bg-brand-950 text-white'
                      : 'border border-brand-200 bg-white text-brand-800 hover:bg-brand-50'
                  }`}
                >
                  {r.tag} · {r.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: detail panel ────────────────────────────────────── */}
        <aside className="relative overflow-hidden bg-brand-950">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-action-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />

          <div className="relative flex h-full flex-col px-6 py-6 md:px-7 md:py-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-400">
              Rol seleccionado
            </p>

            <span
              key={`tag-${role.title}`}
              className="mt-2 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-action-300"
            >
              {role.tag}
            </span>

            <h3
              key={`h-${role.title}`}
              className="mt-2 font-heading text-xl leading-snug text-white animate-fade-up"
            >
              {role.title}
            </h3>

            <div
              key={`body-${role.title}`}
              className="mt-5 grow space-y-4 border-t border-white/10 pt-5 animate-fade-up"
            >
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand-400">Qué hace</p>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{role.summary}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand-400">Ejemplo real</p>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{role.example}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand-400">Beneficio</p>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{role.benefit}</p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.2rem] bg-white/[0.08] px-4 py-3.5">
              <p className="text-xs leading-relaxed text-brand-300">{diagram.supportText}</p>
            </div>

            {onCtaClick ? (
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { location: 'team_diagram', page: pagePath })
                  onCtaClick()
                }}
                className="btn-primary mt-4 w-full"
              >
                {diagram.ctaLabel}
              </button>
            ) : (
              <a
                href={diagram.ctaHref}
                className="btn-primary mt-4 w-full"
                onClick={() => trackEvent('cta_click', { location: 'team_diagram', page: pagePath })}
              >
                {diagram.ctaLabel}
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
