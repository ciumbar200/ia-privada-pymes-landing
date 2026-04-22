import type { LeadFormData } from '../types/lead'

export type SubmitLeadResult =
  | { status: 'sent' }
  | { status: 'not_configured' }
  | { status: 'error'; message: string }

const leadEndpoint = import.meta.env.VITE_LEAD_ENDPOINT_URL?.trim() || '/api/submit'

export async function submitLead(data: LeadFormData): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(leadEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: data.name,
        email: data.email,
        empresa: data.company,
        telefono: data.phone,
        sector: data.sector,
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
