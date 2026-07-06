import { useState } from 'react'
import { trackEvent } from '../lib/analytics'
import { submitLead } from '../lib/lead'
import type { LeadFormData, LeadSector } from '../types/lead'

type FormStatus = 'idle' | 'sending' | 'sent' | 'not_configured' | 'error'
type FormErrors = Partial<Record<keyof LeadFormData, string>>

const initialFormData: LeadFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  sector: 'otro',
}

const sectorOptions: Array<{ value: LeadSector; label: string }> = [
  { value: 'coliving-flex-living', label: 'Coliving y flex living' },
  { value: 'inmobiliarias-property-managers', label: 'Inmobiliarias y property managers' },
  { value: 'clinicas-salud-privada', label: 'Clínicas y salud privada' },
  { value: 'academias-formacion', label: 'Academias y formación' },
  { value: 'otro', label: 'Otro sector' },
]

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validateForm(data: LeadFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Indica tu nombre.'
  }

  if (!data.company.trim()) {
    errors.company = 'Indica tu empresa.'
  }

  if (!data.email.trim()) {
    errors.email = 'Indica tu email.'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Revisa el formato del email.'
  }

  if (!data.phone.trim()) {
    errors.phone = 'Indica tu teléfono.'
  }

  if (!data.sector) {
    errors.sector = 'Indica tu sector.'
  }

  return errors
}

export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validateForm(formData)

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setStatus('error')
      setFeedback('Revisa los campos marcados para poder enviar tu solicitud.')
      return
    }

    setErrors({})
    setStatus('sending')
    setFeedback('')
    trackEvent('lead_form_submit_attempt', {
      sector: formData.sector,
    })

    const result = await submitLead(formData)

    if (result.status === 'sent') {
      setStatus('sent')
      setFeedback('Solicitud enviada. Te contactaremos en 24h para tu auditoría IA gratuita.')
      trackEvent('lead_form_submit_success')
      setFormData(initialFormData)
      return
    }

    if (result.status === 'not_configured') {
      setStatus('not_configured')
      setFeedback('El endpoint de captación no está configurado todavía.')
      trackEvent('lead_form_submit_not_configured')
      return
    }

    setStatus('error')
    setFeedback(result.message)
    trackEvent('lead_form_submit_error')
  }

  function updateField<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <form className="glass-card p-6 lg:p-8" onSubmit={handleSubmit} noValidate>
      <h3 className="text-2xl font-semibold text-white">Solicitar auditoría IA gratuita</h3>
      <p className="mt-2 text-sm text-brand-300">
        Déjanos tus datos y te contactamos en 24h para tu auditoría IA gratuita. Sin compromiso.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-100" htmlFor="nombre">
          Nombre
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-electric-400 focus:ring-2 focus:ring-electric-500/30"
            autoComplete="name"
          />
          {errors.name ? <span className="mt-1 block text-xs text-accent-400">{errors.name}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-100" htmlFor="empresa">
          Empresa
          <input
            id="empresa"
            name="empresa"
            type="text"
            value={formData.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-electric-400 focus:ring-2 focus:ring-electric-500/30"
            autoComplete="organization"
          />
          {errors.company ? <span className="mt-1 block text-xs text-accent-400">{errors.company}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-100" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-electric-400 focus:ring-2 focus:ring-electric-500/30"
            autoComplete="email"
          />
          {errors.email ? <span className="mt-1 block text-xs text-accent-400">{errors.email}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-100" htmlFor="telefono">
          Teléfono
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-electric-400 focus:ring-2 focus:ring-electric-500/30"
            autoComplete="tel"
          />
          {errors.phone ? <span className="mt-1 block text-xs text-accent-400">{errors.phone}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-100" htmlFor="sector">
          Sector
          <select
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={(event) => updateField('sector', event.target.value as LeadSector)}
            className="mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-electric-400 focus:ring-2 focus:ring-electric-500/30"
          >
            {sectorOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-brand-900">
                {option.label}
              </option>
            ))}
          </select>
          {errors.sector ? <span className="mt-1 block text-xs text-accent-400">{errors.sector}</span> : null}
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Solicitar auditoría gratuita'}
      </button>

      <p className="mt-3 text-xs text-brand-400">
        Al enviar, aceptas que te contactemos para tu auditoría IA gratuita. Sin compromiso.
      </p>

      {feedback ? (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            status === 'error'
              ? 'border-accent-500/30 bg-accent-500/10 text-accent-300'
              : 'border-success-200/30 bg-success-100/10 text-success-200'
          }`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  )
}