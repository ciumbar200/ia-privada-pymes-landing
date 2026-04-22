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
      setFeedback('Solicitud enviada. Te contactaremos para revisar tu caso.')
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
    <form className="surface-card p-6 lg:p-8" onSubmit={handleSubmit} noValidate>
      <h3 className="text-2xl font-semibold">Solicitar diagnóstico comercial</h3>
      <p className="mt-2 text-sm text-graphite-700">
        Déjanos tus datos y te contactamos para revisar captación, seguimiento y cierre de leads.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-900" htmlFor="nombre">
          Nombre
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="name"
          />
          {errors.name ? <span className="mt-1 block text-xs text-red-700">{errors.name}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900" htmlFor="empresa">
          Empresa
          <input
            id="empresa"
            name="empresa"
            type="text"
            value={formData.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="organization"
          />
          {errors.company ? <span className="mt-1 block text-xs text-red-700">{errors.company}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="email"
          />
          {errors.email ? <span className="mt-1 block text-xs text-red-700">{errors.email}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900" htmlFor="telefono">
          Teléfono
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="tel"
          />
          {errors.phone ? <span className="mt-1 block text-xs text-red-700">{errors.phone}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900" htmlFor="sector">
          Sector
          <select
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={(event) => updateField('sector', event.target.value as LeadSector)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            {sectorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.sector ? <span className="mt-1 block text-xs text-red-700">{errors.sector}</span> : null}
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Solicitar diagnóstico comercial'}
      </button>

      <p className="mt-3 text-xs text-graphite-600">
        Al enviar, aceptas que te contactemos para revisar tu caso y proponerte un siguiente paso.
      </p>

      {feedback ? (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            status === 'error'
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-brand-200 bg-brand-100/60 text-brand-800'
          }`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  )
}
