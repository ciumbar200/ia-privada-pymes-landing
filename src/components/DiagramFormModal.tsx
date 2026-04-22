import { useEffect, useState } from 'react'
import { trackEvent } from '../lib/analytics'
import { submitLead } from '../lib/lead'
import type { CompanySize, LeadFormData, PrivacyConcern } from '../types/lead'

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

const COMPANY_SIZES: Array<{ value: CompanySize; label: string }> = [
  { value: '1-5', label: '1 a 5 personas' },
  { value: '6-20', label: '6 a 20 personas' },
  { value: '21-50', label: '21 a 50 personas' },
  { value: '51-250', label: '51 a 250 personas' },
  { value: '251+', label: 'Más de 250' },
]

const PRIVACY_OPTIONS: Array<{ value: PrivacyConcern; label: string; detail: string }> = [
  { value: 'bajo', label: 'Estándar', detail: 'Contactos comerciales sin regulación especial' },
  { value: 'medio', label: 'Moderado', detail: 'Algunos datos sensibles o sector regulado' },
  { value: 'alto', label: 'Sensible', detail: 'Sanitario, legal, financiero o GDPR estricto' },
]

const INITIAL: LeadFormData = {
  name: '',
  company: '',
  email: '',
  companySize: '1-5',
  automationGoal: '',
  privacyConcern: 'medio',
}

const TOTAL = 6

type Status = 'idle' | 'sending' | 'sent' | 'demo' | 'error'

// ── Backdrop wrapper ──────────────────────────────────────────────────────

function Backdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-brand-950/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

// ── Step sub-components ───────────────────────────────────────────────────

function StepText({
  question,
  value,
  placeholder,
  type,
  autoComplete,
  onChange,
  onEnter,
}: {
  question: string
  value: string
  placeholder: string
  type: 'text' | 'email'
  autoComplete?: string
  onChange: (v: string) => void
  onEnter: () => void
}) {
  return (
    <div>
      <p className="font-heading text-2xl leading-snug text-brand-950">{question}</p>
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onEnter() } }}
        className="mt-6 w-full border-0 border-b-2 border-brand-200 bg-transparent pb-2 text-xl text-brand-950 outline-none transition placeholder:text-graphite-400 focus:border-action-500"
      />
    </div>
  )
}

function StepTextarea({
  question,
  value,
  placeholder,
  onChange,
}: {
  question: string
  value: string
  placeholder: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="font-heading text-2xl leading-snug text-brand-950">{question}</p>
      <textarea
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        value={value}
        placeholder={placeholder}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="mt-6 w-full resize-none border-0 border-b-2 border-brand-200 bg-transparent pb-2 text-base leading-relaxed text-brand-950 outline-none transition placeholder:text-graphite-400 focus:border-action-500"
      />
    </div>
  )
}

function StepCards({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string
  options: Array<{ value: string; label: string }>
  selected: string
  onSelect: (v: string) => void
}) {
  return (
    <div>
      <p className="font-heading text-2xl leading-snug text-brand-950">{question}</p>
      <div className="mt-5 grid gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(o.value)}
            className={`w-full rounded-[1.2rem] border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              selected === o.value
                ? 'border-action-500 bg-action-50 text-action-700'
                : 'border-brand-100 bg-brand-50 text-brand-800 hover:border-brand-300'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepPrivacy({
  selected,
  onSelect,
}: {
  selected: PrivacyConcern
  onSelect: (v: string) => void
}) {
  return (
    <div>
      <p className="font-heading text-2xl leading-snug text-brand-950">
        ¿Cómo de sensibles son los datos de tus clientes?
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {PRIVACY_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(o.value)}
            className={`rounded-[1.4rem] border-2 p-4 text-left transition ${
              selected === o.value
                ? 'border-action-500 bg-action-50'
                : 'border-brand-100 bg-brand-50 hover:border-brand-300'
            }`}
          >
            <p className={`text-sm font-semibold ${selected === o.value ? 'text-action-700' : 'text-brand-900'}`}>
              {o.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-graphite-600">{o.detail}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main modal ────────────────────────────────────────────────────────────

export function DiagramFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<LeadFormData>(INITIAL)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep(0)
      setData(INITIAL)
      setError('')
      setStatus('idle')
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function set<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
    setError('')
  }

  function validate(): string {
    switch (step) {
      case 0: return data.name.trim() ? '' : 'Indica tu nombre para continuar.'
      case 1: return data.company.trim() ? '' : 'Indica el nombre de tu empresa.'
      case 2: return isValidEmail(data.email) ? '' : 'Revisa el formato del email.'
      case 4: return data.automationGoal.trim() ? '' : 'Cuéntanos qué proceso quieres mejorar.'
      default: return ''
    }
  }

  function advance() {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    if (step < TOTAL - 1) {
      setStep((s) => s + 1)
    } else {
      void handleSubmit()
    }
  }

  async function handleSubmit() {
    setStatus('sending')
    trackEvent('diagram_modal_submit', { company_size: data.companySize, privacy: data.privacyConcern })
    const result = await submitLead(data)
    if (result.status === 'sent') {
      setStatus('sent')
      trackEvent('diagram_modal_success')
    } else if (result.status === 'not_configured') {
      setStatus('demo')
    } else {
      setStatus('idle')
      setError('No se pudo enviar la solicitud. Inténtalo de nuevo o usa WhatsApp.')
    }
  }

  if (!open) return null

  // ── Success / demo screen ──────────────────────────────────────────────
  if (status === 'sent' || status === 'demo') {
    return (
      <Backdrop onClose={onClose}>
        <div className="px-8 py-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-growth-100">
            <svg className="h-8 w-8 text-growth-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-5 font-heading text-2xl text-brand-950">
            {status === 'sent' ? '¡Solicitud recibida!' : 'Formulario en modo demo'}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-graphite-700">
            {status === 'sent'
              ? 'Te contactaremos en las próximas horas para revisar tu embudo comercial y proponerte un primer plan.'
              : 'Configura VITE_LEAD_ENDPOINT_URL para activar el envío real. En producción, el lead llega al endpoint configurado.'}
          </p>
          <button type="button" onClick={onClose} className="btn-primary mt-7">
            Entendido
          </button>
        </div>
      </Backdrop>
    )
  }

  // ── Step form ──────────────────────────────────────────────────────────
  const progress = ((step + 1) / TOTAL) * 100

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <StepText
            question="¿Cómo te llamas?"
            value={data.name}
            placeholder="Tu nombre"
            type="text"
            autoComplete="name"
            onChange={(v) => set('name', v)}
            onEnter={advance}
          />
        )
      case 1:
        return (
          <StepText
            question="¿En qué empresa trabajas?"
            value={data.company}
            placeholder="Nombre de tu empresa"
            type="text"
            autoComplete="organization"
            onChange={(v) => set('company', v)}
            onEnter={advance}
          />
        )
      case 2:
        return (
          <StepText
            question="¿Cuál es tu email de trabajo?"
            value={data.email}
            placeholder="tu@empresa.com"
            type="email"
            autoComplete="email"
            onChange={(v) => set('email', v)}
            onEnter={advance}
          />
        )
      case 3:
        return (
          <StepCards
            question="¿Cuántas personas hay en el equipo?"
            options={COMPANY_SIZES}
            selected={data.companySize}
            onSelect={(v) => set('companySize', v as CompanySize)}
          />
        )
      case 4:
        return (
          <StepTextarea
            question="¿Qué proceso quieres mejorar primero?"
            value={data.automationGoal}
            placeholder="Ej: responder leads más rápido, seguimiento comercial, campañas de Google..."
            onChange={(v) => set('automationGoal', v)}
          />
        )
      case 5:
        return (
          <StepPrivacy
            selected={data.privacyConcern}
            onSelect={(v) => set('privacyConcern', v as PrivacyConcern)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Backdrop onClose={onClose}>
      {/* Progress bar */}
      <div className="h-1 w-full bg-brand-100">
        <div
          className="h-full bg-action-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-7 pb-7 pt-6 sm:px-8 sm:pb-8">
        {/* Counter + close */}
        <div className="mb-7 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-500">
            {step + 1} de {TOTAL}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-graphite-500 transition hover:bg-brand-100 hover:text-brand-900"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Step content — key forces re-animation on step change */}
        <div key={step} className="animate-fade-up">
          {renderStep()}
        </div>

        {/* Inline error */}
        {error ? (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {/* Navigation */}
        <div className="mt-8 flex gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => { setStep((s) => s - 1); setError('') }}
              className="btn-secondary flex-shrink-0"
            >
              ← Atrás
            </button>
          ) : null}
          <button
            type="button"
            onClick={advance}
            disabled={status === 'sending'}
            className="btn-primary flex-1"
          >
            {status === 'sending' ? 'Enviando...' : step === TOTAL - 1 ? 'Enviar solicitud' : 'Continuar →'}
          </button>
        </div>

        {step === TOTAL - 1 ? (
          <p className="mt-3 text-center text-xs text-graphite-500">
            Al enviar, aceptas que te contactemos para estudiar tu embudo comercial.
          </p>
        ) : null}
      </div>
    </Backdrop>
  )
}
