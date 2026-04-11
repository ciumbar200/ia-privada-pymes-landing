import { useState } from 'react'
import { trackEvent } from '../lib/analytics'

interface StickyNavProps {
  brand: string
  items: Array<{ href: string; label: string }>
}

export function StickyNav({ brand, items }: StickyNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#hero" className="font-heading text-base font-semibold text-brand-950">
          {brand}
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-graphite-700 hover:text-brand-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#casos"
            className="btn-secondary"
            onClick={() => trackEvent('cta_click', { location: 'nav', type: 'secondary' })}
          >
            Ver casos de uso
          </a>
          <a
            href="#diagnostico"
            className="btn-primary"
            onClick={() => trackEvent('cta_click', { location: 'nav', type: 'primary' })}
          >
            Solicitar diagnóstico ahora
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#diagnostico"
            className="inline-flex items-center rounded-lg bg-action-500 px-3 py-2 text-xs font-semibold text-white shadow-cta"
            onClick={() => trackEvent('cta_click', { location: 'mobile_top', type: 'primary' })}
          >
            Diagnóstico
          </a>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-900"
            onClick={() => setOpen((state) => !state)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            Menú
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-brand-100 bg-white lg:hidden">
          <nav className="section-shell flex flex-col gap-3 py-4" aria-label="Navegación móvil">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-graphite-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#casos"
              className="btn-secondary"
              onClick={() => {
                trackEvent('cta_click', { location: 'mobile_nav', type: 'secondary' })
                setOpen(false)
              }}
            >
              Ver casos de uso
            </a>
            <a
              href="#diagnostico"
              className="btn-primary"
              onClick={() => {
                trackEvent('cta_click', { location: 'mobile_nav', type: 'primary' })
                setOpen(false)
              }}
            >
              Solicitar diagnóstico ahora
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
