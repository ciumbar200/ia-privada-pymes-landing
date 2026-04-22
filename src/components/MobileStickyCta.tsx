import { trackEvent } from '../lib/analytics'

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-action-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <a
        href="#contacto"
        className="btn-primary w-full"
        onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_bar', type: 'primary' })}
      >
        Solicitar diagnóstico comercial
      </a>
    </div>
  )
}
