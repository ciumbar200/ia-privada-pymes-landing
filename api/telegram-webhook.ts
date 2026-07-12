/**
 * Telegram Webhook Helper — Reutilizable en cualquier Vercel serverless function
 * 
 * Envía una alerta instantánea a Telegram cuando un lead/evento ocurre.
 * Funciona en servidor (anti-adblocker). Si Telegram falla, no bloquea el flujo.
 * 
 * USO:
 *   import { notifyTelegram } from './telegram-webhook';
 *   
 *   await notifyTelegram({
 *     type: 'lead',           // lead | response | payment
 *     business: 'Noxo',       // Noxo | Nexus | Oportunia | Moon
 *     fields: { name, email, company, message }
 *   });
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8608535831:AAGcUaKQS0HNXfmYCT-G53qy92ru45nak3Q';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7022240895';

const EMOJI: Record<string, string> = {
  lead: '🔔',
  response: '📩',
  payment: '💰',
};

export async function notifyTelegram(opts: {
  type: 'lead' | 'response' | 'payment';
  business: string;
  formName?: string;
  fields: Record<string, string | undefined>;
}): Promise<void> {
  const emoji = EMOJI[opts.type] || '🔔';
  const lines: string[] = [`${emoji} ${opts.business.toUpperCase()}`];
  
  if (opts.formName) lines.push(`Formulario: ${opts.formName}`);
  
  for (const [key, value] of Object.entries(opts.fields)) {
    if (value) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      lines.push(`${label}: ${value}`);
    }
  }
  
  lines.push(`Hace: ahora`);

  const text = lines.join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(5000), // 5s timeout — no bloquear
    });
  } catch (err) {
    // Telegram falla silenciosamente — el lead se procesa igual
    console.error('[telegram-webhook] Failed to notify:', err);
  }
}

/**
 * Honeypot check — devuelve true si el campo trampa tiene valor (es un bot).
 * Uso: if (isHoneypot(body._gotcha)) return fakeSuccess();
 */
export function isHoneypot(value?: string): boolean {
  return !!value && value.length > 0;
}
