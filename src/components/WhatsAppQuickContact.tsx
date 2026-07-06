import { trackEvent } from '../lib/analytics'

interface WhatsAppQuickContactProps {
  shortMessage: string
}

function normalizePhone(values: string): string {
  return values.replace(/[^\d]/g, '')
}

export function WhatsAppQuickContact({ shortMessage }: WhatsAppQuickContactProps) {
  const rawPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '34600000000'
  const phone = normalizePhone(rawPhone)
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(shortMessage)}`

  return (
    <aside className="glass-card h-full p-6 lg:p-8">
      <span className="section-kicker">Contacto rápido</span>
      <h3 className="text-2xl font-semibold text-white">¿Prefieres WhatsApp?</h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-300">
        Si prefieres un primer contacto directo, usa este mensaje y te respondemos para agendar tu auditoría.
      </p>

      <div className="mt-4 rounded-xl border border-brand-700 bg-brand-900/50 p-4 text-sm leading-relaxed text-brand-100">
        {shortMessage}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-secondary mt-5 w-full"
        onClick={() => trackEvent('cta_click', { location: 'whatsapp_card', type: 'secondary' })}
      >
        Contactar por WhatsApp
      </a>
    </aside>
  )
}