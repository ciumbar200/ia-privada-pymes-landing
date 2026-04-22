import { trackEvent } from '../lib/analytics'
import { meetingUrl } from '../data/content'

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-graphite-200 bg-white/96 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={meetingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('meeting_link_click', { location: 'mobile_sticky_bar' })}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-xs font-semibold text-brand-900"
        >
          <CalendarIcon />
          15 min
        </a>
        <a
          href="#contacto"
          className="btn-primary flex-1 text-center"
          onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_bar', type: 'primary' })}
        >
          Solicitar diagnóstico
        </a>
      </div>
    </div>
  )
}
