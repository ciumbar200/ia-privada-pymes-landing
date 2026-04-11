export type AnalyticsPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    __NEXO_TRACK_EVENT__?: (name: string, payload?: AnalyticsPayload) => void
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.__NEXO_TRACK_EVENT__ === 'function') {
    window.__NEXO_TRACK_EVENT__(name, payload)
  }
}
