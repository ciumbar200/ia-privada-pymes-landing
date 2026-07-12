type Body = {
  name?: string
  company?: string
  website?: string
  email?: string
  phone?: string
  niche?: string
  message?: string
  _gotcha?: string
}

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8608535831:AAGcUaKQS0HNXfmYCT-G53qy92ru45nak3Q'
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7022240895'

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

  // Honeypot anti-spam: si _gotcha tiene valor, es un bot
  if (body._gotcha) {
    return json(200, { ok: true })
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

    // Enviar notificación a Telegram (no bloquea el flujo si falla)
    try {
      const tgMessage = `🔔 LEAD Noxo\nFormulario: contacto\nNombre: ${body.name ?? '-'}\nEmail: ${body.email ?? '-'}\nEmpresa: ${body.company ?? '-'}\nWeb: ${body.website ?? '-'}\nTeléfono: ${body.phone ?? '-'}\nMensaje: ${body.message ?? '-'}`

      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: tgMessage,
        }),
      })
    } catch {
      // Telegram falló, pero el lead ya se procesó correctamente
    }

    return new Response(responseText || JSON.stringify({ ok: upstreamResponse.ok }), {
      status: upstreamResponse.status,
      headers: { 'Content-Type': upstreamResponse.headers.get('content-type') || 'application/json' },
    })
  } catch {
    return json(502, { error: 'Upstream submit endpoint failed' })
  }
}
