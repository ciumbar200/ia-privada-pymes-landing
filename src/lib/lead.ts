import type { LeadFormData } from '../types/lead'

export type SubmitLeadResult =
  | { status: 'sent' }
  | { status: 'not_configured' }
  | { status: 'error'; message: string }

const leadEndpoint = import.meta.env.VITE_LEAD_ENDPOINT_URL?.trim()

export async function submitLead(data: LeadFormData): Promise<SubmitLeadResult> {
  if (!leadEndpoint) {
    return { status: 'not_configured' }
  }

  try {
    const response = await fetch(leadEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'landing_nexo_ia_empresas',
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: 'No se pudo enviar la solicitud. Revisa el endpoint o inténtalo de nuevo.',
      }
    }

    return { status: 'sent' }
  } catch {
    return {
      status: 'error',
      message: 'Ha ocurrido un error de conexión. Inténtalo en unos minutos.',
    }
  }
}
