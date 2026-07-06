import { createContext, useContext, type ReactNode } from 'react'

export type Lang = 'es'

const LanguageContext = createContext<{ lang: Lang }>({ lang: 'es' })

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageContext.Provider value={{ lang: 'es' }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}