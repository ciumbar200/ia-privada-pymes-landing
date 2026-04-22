import { trackEvent } from '../lib/analytics'
import { meetingUrl } from '../data/content'

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7h14" stroke="#f97316" strokeWidth="1.5" />
      <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function MeetingBar() {
  return (
    <div className="fixed bottom-6 right-6 z-[150] hidden md:block">
      <a
        href={meetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('meeting_link_click', { location: 'meeting_bar_desktop' })}
        className="flex items-center gap-2 rounded-full border border-brand-700 bg-brand-950 px-4 py-2.5 text-sm font-semibold text-white shadow-elevated transition hover:-translate-y-0.5 hover:bg-brand-800 animate-float-gentle"
      >
        <CalendarIcon />
        Reunión 15 min gratis
      </a>
    </div>
  )
}
