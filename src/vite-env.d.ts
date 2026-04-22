/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_APOLLO_INBOUND?: string
  readonly VITE_LEAD_ENDPOINT_URL?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_APOLLO_APP_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  ApolloInbound?: {
    formEnrichment?: {
      init: (options: {
        appId: string
        onReady?: () => void
        onError?: (error: unknown) => void
      }) => void
    }
  }
}
