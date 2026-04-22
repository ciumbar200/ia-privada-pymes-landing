import { useState } from 'react'
import { trackEvent } from '../lib/analytics'
import { submitLead } from '../lib/lead'
import type { CompanySize, LeadFormData, PrivacyConcern } from '../types/lead'

type FormStatus = 'idle' | 'sending' | 'sent' | 'not_configured' | 'error'

type FormErrors = Partial<Record<keyof LeadFormData, string>>

const initialFormData: LeadFormData = {
  name: '',
  company: '',
  email: '',
  companySize: '1-5',
  automationGoal: '',
  privacyConcern: 'medio',
}

const companySizeOptions: Array<{ value: CompanySize; label: string }> = [
  { value: '1-5', label: '1-5 personas' },
  { value: '6-20', label: '6-20 personas' },
  { value: '21-50', label: '21-50 personas' },
  { value: '51-250', label: '51-250 personas' },
  { value: '251+', label: '251+ personas' },
]

const privacyOptions: Array<{ value: PrivacyConcern; label: string }> = [
  { value: 'bajo', label: 'Bajo' },
  { value: 'medio', label: 'Medio' },
  { value: 'alto', label: 'Alto' },
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

  if (!data.automationGoal.trim()) {
    errors.automationGoal = 'Cuéntanos qué te gustaría automatizar.'
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
      company_size: formData.companySize,
      privacy_concern: formData.privacyConcern,
    })

    const result = await submitLead(formData)

    if (result.status === 'sent') {
      setStatus('sent')
      setFeedback('Solicitud enviada. Te contactaremos para concretar el diagnóstico inicial.')
      trackEvent('lead_form_submit_success')
      setFormData(initialFormData)
      return
    }

    if (result.status === 'not_configured') {
      setStatus('not_configured')
      setFeedback(
        'Formulario operativo en modo demo. Configura VITE_LEAD_ENDPOINT_URL para activar el envío real o usa WhatsApp para contacto inmediato.',
      )
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
        Revisamos captación, seguimiento y cierre de leads para detectar dónde estás perdiendo velocidad y conversión.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-900">
          Nombre
          <input
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="name"
          />
          {errors.name ? <span className="mt-1 block text-xs text-red-700">{errors.name}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900">
          Empresa
          <input
            type="text"
            value={formData.company}
            onChange={(event) => updateField('company', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="organization"
          />
          {errors.company ? <span className="mt-1 block text-xs text-red-700">{errors.company}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900">
          Email
          <input
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            autoComplete="email"
          />
          {errors.email ? <span className="mt-1 block text-xs text-red-700">{errors.email}</span> : null}
        </label>

        <label className="text-sm font-medium text-brand-900">
          Tamaño de empresa
          <select
            value={formData.companySize}
            onChange={(event) => updateField('companySize', event.target.value as CompanySize)}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            {companySizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-brand-900">
          Qué te gustaría mejorar
          <textarea
            value={formData.automationGoal}
            onChange={(event) => updateField('automationGoal', event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            placeholder="Ejemplo: leads de Idealista y WhatsApp, seguimiento comercial, visitas, propuestas o cierre..."
          />
          {errors.automationGoal ? (
            <span className="mt-1 block text-xs text-red-700">{errors.automationGoal}</span>
          ) : null}
        </label>

        <label className="text-sm font-medium text-brand-900">
          Nivel de preocupación por privacidad
          <select
            value={formData.privacyConcern}
            onChange={(event) =>
              updateField('privacyConcern', event.target.value as PrivacyConcern)
            }
            className="mt-2 w-full rounded-xl border border-graphite-300 bg-white px-3 py-2 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          >
            {privacyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="btn-primary mt-6 w-full"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Enviando...' : 'Solicitar diagnóstico comercial'}
      </button>

      <p className="mt-3 text-xs text-graphite-600">
        Al enviar, aceptas que te contactemos para estudiar tu embudo comercial y proponerte un primer plan.
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
