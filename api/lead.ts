type Body = {
  name?: string
  company?: string
  website?: string
  email?: string
  phone?: string
  niche?: string
  message?: string
}

const upstreamUrl = 'http://89.117.18.118:8080/submit'

function json(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return json(405, { error: 'Method Not Allowed' })
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: body.name ?? '',
        email: body.email ?? '',
        empresa: body.company ?? '',
        website: body.website ?? '',
        telefono: body.phone ?? '',
        niche: body.niche ?? '',
        message: body.message ?? '',
        source: 'noxo-auditoria-accesibilidad',
      }),
    })

    const responseText = await upstreamResponse.text()
    return new Response(responseText || JSON.stringify({ ok: upstreamResponse.ok }), {
      status: upstreamResponse.status,
      headers: { 'Content-Type': upstreamResponse.headers.get('content-type') || 'application/json' },
    })
  } catch {
    return json(502, { error: 'Upstream submit endpoint failed' })
  }
}
