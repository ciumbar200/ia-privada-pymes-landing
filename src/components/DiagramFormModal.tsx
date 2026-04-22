import { useEffect, useState } from 'react'
import { trackEvent } from '../lib/analytics'
import { submitLead } from '../lib/lead'
import type { LeadFormData, LeadSector } from '../types/lead'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const SECTOR_OPTIONS: Array<{ value: LeadSector; label: string }> = [
  { value: 'coliving-flex-living', label: 'Coliving y flex living' },
  { value: 'inmobiliarias-property-managers', label: 'Inmobiliarias y property managers' },
  { value: 'clinicas-salud-privada', label: 'Clínicas y salud privada' },
  { value: 'academias-formacion', label: 'Academias y formación' },
  { value: 'otro', label: 'Otro sector' },
]

const INITIAL: LeadFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  sector: 'otro',
}

const TOTAL = 5

type Status = 'idle' | 'sending' | 'sent' | 'demo' | 'error'

function Backdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-brand-950/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-elevated"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function StepText({
  question,
  fieldName,
  value,
  placeholder,
  type,
  autoComplete,
  onChange,
  onEnter,
}: {
  question: string
  fieldName: string
  value: string
  placeholder: string
  type: 'text' | 'email' | 'tel'
  autoComplete?: string
  onChange: (value: string) => void
  onEnter: () => void
}) {
  return (
    <div>
      <p className="font-heading text-2xl leading-snug text-brand-950">{question}</p>
      <input
        autoFocus
        name={fieldName}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            onEnter()
          }
        }}
        className="mt-6 w-full border-0 border-b-2 border-brand-200 bg-transparent pb-2 text-xl text-brand-950 outline-none transition placeholder:text-graphite-400 focus:border-action-500"
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
  options: Array<{ value: LeadSector; label: string }>
  selected: string
  onSelect: (value: LeadSector) => void
}) {
  return (
    <div>
      <p className="font-heading text-2xl leading-snug text-brand-950">{question}</p>
      <div className="mt-5 grid gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`w-full rounded-[1.2rem] border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              selected === option.value
                ? 'border-action-500 bg-action-50 text-action-700'
                : 'border-brand-100 bg-brand-50 text-brand-800 hover:border-brand-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function DiagramFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<LeadFormData>(INITIAL)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setStep(0)
      setData(INITIAL)
      setError('')
      setStatus('idle')
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function setField<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setData((current) => ({ ...current, [key]: value }))
    setError('')
  }

  function validate(): string {
    switch (step) {
      case 0:
        return data.name.trim() ? '' : 'Indica tu nombre para continuar.'
      case 1:
        return data.company.trim() ? '' : 'Indica el nombre de tu empresa.'
      case 2:
        return isValidEmail(data.email) ? '' : 'Revisa el formato del email.'
      case 3:
        return data.phone.trim() ? '' : 'Indica tu teléfono.'
      default:
        return ''
    }
  }

  function advance() {
    const nextError = validate()

    if (nextError) {
      setError(nextError)
      return
    }

    setError('')

    if (step < TOTAL - 1) {
      setStep((current) => current + 1)
      return
    }

    void handleSubmit()
  }

  async function handleSubmit() {
    setStatus('sending')
    trackEvent('diagram_modal_submit', { sector: data.sector })

    const result = await submitLead(data)

    if (result.status === 'sent') {
      setStatus('sent')
      trackEvent('diagram_modal_success')
      return
    }

    if (result.status === 'not_configured') {
      setStatus('demo')
      return
    }

    setStatus('idle')
    setError('No se pudo enviar la solicitud. Inténtalo de nuevo o usa WhatsApp.')
  }

  if (!open) return null

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
              ? 'Te contactaremos en las próximas horas para revisar tu caso.'
              : 'El endpoint de captación no está disponible todavía. Revisa la conexión del formulario.'}
          </p>
          <button type="button" onClick={onClose} className="btn-primary mt-7">
            Entendido
          </button>
        </div>
      </Backdrop>
    )
  }

  const progress = ((step + 1) / TOTAL) * 100

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <StepText
            question="¿Cómo te llamas?"
            fieldName="nombre"
            value={data.name}
            placeholder="Tu nombre"
            type="text"
            autoComplete="name"
            onChange={(value) => setField('name', value)}
            onEnter={advance}
          />
        )
      case 1:
        return (
          <StepText
            question="¿En qué empresa trabajas?"
            fieldName="empresa"
            value={data.company}
            placeholder="Nombre de tu empresa"
            type="text"
            autoComplete="organization"
            onChange={(value) => setField('company', value)}
            onEnter={advance}
          />
        )
      case 2:
        return (
          <StepText
            question="¿Cuál es tu email?"
            fieldName="email"
            value={data.email}
            placeholder="tu@empresa.com"
            type="email"
            autoComplete="email"
            onChange={(value) => setField('email', value)}
            onEnter={advance}
          />
        )
      case 3:
        return (
          <StepText
            question="¿Qué teléfono usamos para contactarte?"
            fieldName="telefono"
            value={data.phone}
            placeholder="+34 600 000 000"
            type="tel"
            autoComplete="tel"
            onChange={(value) => setField('phone', value)}
            onEnter={advance}
          />
        )
      case 4:
        return (
          <StepCards
            question="¿De qué sector es tu empresa?"
            options={SECTOR_OPTIONS}
            selected={data.sector}
            onSelect={(value) => setField('sector', value)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Backdrop onClose={onClose}>
      <div className="px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
              Paso {step + 1} de {TOTAL}
            </p>
            <p className="mt-1 text-sm text-graphite-600">Déjanos tus datos y te contactamos.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-brand-100 p-2 text-graphite-500 transition hover:border-brand-300 hover:text-brand-950"
            aria-label="Cerrar"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.22 4.22a.75.75 0 0 1 1.06 0L10 8.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L11.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-100">
          <div className="h-full rounded-full bg-action-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-8 min-h-[15rem]">{renderStep()}</div>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setError('')
              setStep((current) => Math.max(0, current - 1))
            }}
            disabled={step === 0 || status === 'sending'}
            className="btn-secondary"
          >
            Atrás
          </button>

          <button type="button" onClick={advance} disabled={status === 'sending'} className="btn-primary min-w-[10rem]">
            {status === 'sending' ? 'Enviando...' : step === TOTAL - 1 ? 'Enviar' : 'Continuar'}
          </button>
        </div>
      </div>
    </Backdrop>
  )
}
