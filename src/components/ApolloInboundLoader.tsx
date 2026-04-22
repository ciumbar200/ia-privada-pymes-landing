import { useEffect } from 'react'

const apolloScriptId = 'apollo-inbound-script'
const allowedHosts = new Set(['noxoiaempresas.com', 'www.noxoiaempresas.com'])

export function ApolloInboundLoader() {
  useEffect(() => {
    const appId = import.meta.env.VITE_APOLLO_APP_ID?.trim() || '69e9495c725c9d00217650cd'
    const host = window.location.hostname

    if (!appId || !allowedHosts.has(host)) {
      return
    }

    if (document.getElementById(apolloScriptId)) {
      if (window.ApolloInbound?.formEnrichment) {
        window.ApolloInbound.formEnrichment.init({
          appId,
        })
      }
      return
    }

    const script = document.createElement('script')
    script.id = apolloScriptId
    script.src = `https://assets.apollo.io/js/apollo-inbound.js?nocache=${Math.random().toString(36).slice(2)}`
    script.async = true
    script.onload = () => {
      try {
        window.ApolloInbound?.formEnrichment?.init({
          appId,
          onError: (error) => {
            console.error('[Apollo] Form enrichment init error:', error)
          },
        })
      } catch (error) {
        console.error('[Apollo] Error initializing form enrichment:', error)
      }
    }
    script.onerror = () => {
      console.error('[Apollo] Failed to load form enrichment script')
    }

    document.head.appendChild(script)
  }, [])

  return null
}
