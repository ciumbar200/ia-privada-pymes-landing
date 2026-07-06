import { useEffect, useState, type ReactNode } from 'react'
import {
  brandName,
  contactSectionId,
  deliverables,
  demoAudit,
  footerLinkGroups,
  niches,
  pagesByPath,
  primaryNav,
  problemPoints,
  pricingPlans,
  reviewItems,
  siteUrl,
  type PageData,
} from './data/content'
import { trackEvent } from './lib/analytics'

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function upsertMetaAttribute(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element) }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) { element = document.createElement('link'); element.setAttribute('rel', rel); document.head.appendChild(element) }
  element.setAttribute('href', href)
}

function SectionBlock({ id, eyebrow, title, intro, children, subdued = false }: { id?: string; eyebrow?: string; title: string; intro?: string; children: ReactNode; subdued?: boolean }) {
  return (
    <section id={id} className={`py-16 lg:py-20 ${subdued ? 'bg-brand-900/30' : ''}`}>
      <div className="section-shell">
        <div className="max-w-3xl">
          {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
          <h2 className="max-w-4xl text-3xl leading-tight md:text-4xl">{title}</h2>
          {intro ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-200 md:text-lg">{intro}</p> : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function Header({ currentPage }: { currentPage: PageData }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 8) }
    handleScroll(); window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  function resolveNavHref(href: string) { return href.startsWith('/#') ? (currentPage.path === '/' ? href.slice(1) : href) : href }
  return (
    <header className={`fixed inset-x-0 top-0 z-[100] border-b border-brand-800/60 bg-brand-950/90 backdrop-blur transition-shadow ${scrolled ? 'shadow-elevated' : ''}`}>
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="/" className="inline-flex min-w-0 items-center font-heading text-base font-semibold tracking-tight text-white" aria-label={`${brandName} - Inicio`}>
          <span className="text-gradient">{brandName}</span>
        </a>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegación principal">
          {primaryNav.map((item) => (
            <a key={item.href} href={resolveNavHref(item.href)} aria-current={currentPage.path === item.href ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition hover:text-white ${currentPage.path === item.href ? 'bg-electric-500/15 text-electric-300' : 'text-brand-300 hover:bg-brand-800/50'}`}>{item.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="/contacto" className="btn-primary" onClick={() => trackEvent('cta_click', { location: 'nav' })}>Solicitar auditoría</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="/contacto" className="inline-flex items-center rounded-lg bg-accent-500 px-3 py-2 text-xs font-semibold text-white shadow-cta" onClick={() => trackEvent('cta_click', { location: 'mobile_top' })}>Auditoría</a>
          <button type="button" className="inline-flex items-center rounded-lg border border-brand-700 bg-brand-800/50 px-3 py-2 text-sm font-semibold text-brand-100" onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Abrir menú">Menú</button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-brand-800 bg-brand-950/95 lg:hidden">
          <nav className="section-shell flex flex-col gap-3 py-4" aria-label="Navegación móvil">
            {primaryNav.map((item) => (
              <a key={item.href} href={resolveNavHref(item.href)} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-2 text-sm font-medium ${currentPage.path === item.href ? 'bg-electric-500/15 text-electric-300' : 'text-brand-300'}`}>{item.label}</a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-brand-800/60 bg-brand-950 py-10">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-heading text-xl text-white">{brandName}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-400">Auditorías de accesibilidad web para empresas que venden, reservan o captan clientes online. Informe claro, priorizado y accionable en 48h.</p>
          <p className="mt-5 text-sm text-brand-500">© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-electric-300">{group.title}</p>
              <div className="mt-4 space-y-3">{group.links.map((link) => (<a key={link.href} href={link.href} className="block text-sm text-brand-300 hover:text-white">{link.label}</a>))}</div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-800 bg-brand-950/95 p-3 backdrop-blur lg:hidden">
      <a href="/contacto" className="btn-primary w-full text-center">Solicitar auditoría express</a>
    </div>
  )
}

function Hero({ page }: { page: PageData }) {
  return (
    <header id="hero" className="relative overflow-hidden border-b border-brand-800/60 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-faint opacity-30" aria-hidden="true" />
      <div className="section-shell grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span className="section-kicker">{page.hero.eyebrow}</span>
          <h1 className="max-w-4xl text-4xl leading-tight md:text-5xl lg:text-6xl">{page.h1}</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-brand-200 md:text-lg">{page.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={page.hero.primaryCtaHref} className="btn-primary" onClick={() => trackEvent('cta_click', { location: 'hero', type: 'primary', page: page.path })}>{page.hero.primaryCtaLabel}</a>
            <a href={page.hero.secondaryCtaHref} className="btn-secondary" onClick={() => trackEvent('cta_click', { location: 'hero', type: 'secondary', page: page.path })}>{page.hero.secondaryCtaLabel}</a>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {page.hero.bullets.map((item) => (<li key={item} className="rounded-[1.35rem] border border-brand-700/50 bg-brand-900/40 px-4 py-4 text-sm font-semibold text-brand-100 backdrop-blur">{item}</li>))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-electric-500/20 bg-gradient-to-br from-brand-900 to-brand-950 p-8 text-white shadow-elevated">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric-300">Qué hacemos</p>
          <h2 className="mt-4 text-3xl text-white">Detectamos. Priorizamos. Recomendamos.</h2>
          <div className="mt-7 space-y-5">
            <div className="border-b border-brand-700/50 pb-5"><p className="text-sm font-semibold text-accent-400">Escaneo técnico</p><p className="mt-2 text-sm leading-relaxed text-brand-200">Analizamos tu web con herramientas open source: axe-core, Lighthouse y Pa11y.</p></div>
            <div className="border-b border-brand-700/50 pb-5"><p className="text-sm font-semibold text-accent-400">Informe claro</p><p className="mt-2 text-sm leading-relaxed text-brand-200">PDF con capturas, score general y top 10 problemas priorizados por impacto real.</p></div>
            <div><p className="text-sm font-semibold text-accent-400">Recomendaciones</p><p className="mt-2 text-sm leading-relaxed text-brand-200">Qué corregir primero, por qué importa y cómo hacerlo. En lenguaje humano.</p></div>
          </div>
        </div>
      </div>
    </header>
  )
}

function ProblemSection() {
  return (
    <SectionBlock id="problema" eyebrow="El problema" title="Tu web puede parecer correcta y aun así fallar para muchos usuarios" intro="Muchas webs tienen errores que no se ven a simple vista. Si una persona no puede navegar, reservar o comprar, tu web no está haciendo bien su trabajo." subdued>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {problemPoints.map((p) => (<article key={p} className="glass-card rounded-[1.6rem] p-5"><p className="text-sm leading-relaxed text-brand-300">{p}</p></article>))}
      </div>
    </SectionBlock>
  )
}

function WhatWeReviewSection() {
  const icons: Record<string, string> = { contrast: '◐', keyboard: '⌨', forms: '▤', buttons: '▭', images: '🖼', structure: '▦', mobile: '📱', technical: '⚙', recommendations: '✓' }
  return (
    <SectionBlock id="que-revisamos" eyebrow="Qué revisamos" title="Revisamos los puntos que más afectan a usuarios y conversión" intro="No es un escaneo genérico. Analizamos los elementos que impactan directamente en la experiencia de usuarios reales.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviewItems.map((item) => (
          <article key={item.title} className="glass-card glass-card-hover rounded-[1.75rem] p-6">
            <span className="text-2xl" aria-hidden="true">{icons[item.icon] || '•'}</span>
            <p className="mt-3 font-heading text-xl text-white">{item.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-300">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}

function WhatWeDeliverSection() {
  return (
    <SectionBlock id="que-entregamos" eyebrow="Qué entregamos" title="Un informe claro, no un documento técnico imposible de leer" intro="Recibes un PDF con todo lo necesario para entender el estado de tu web y qué hacer para mejorar." subdued>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-electric-500/20 bg-gradient-to-br from-brand-900 to-brand-950 p-8 text-white shadow-elevated">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric-300">Incluye</p>
          <ul className="mt-6 space-y-4">
            {deliverables.map((item) => (<li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-100"><span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent-400" /><span>{item}</span></li>))}
          </ul>
        </div>
        <div className="space-y-4">
          <article className="glass-card rounded-[1.75rem] p-6"><p className="font-heading text-xl text-white">Nivel de riesgo: bajo / medio / alto</p><p className="mt-3 text-sm leading-relaxed text-brand-300">Te decimos si tu web tiene riesgos leves, moderados o críticos.</p></article>
          <article className="glass-card rounded-[1.75rem] p-6"><p className="font-heading text-xl text-white">Top 10 prioridades</p><p className="mt-3 text-sm leading-relaxed text-brand-300">Los 10 errores que más impactan en usuarios y conversión, ordenados.</p></article>
          <article className="glass-card rounded-[1.75rem] p-6"><p className="font-heading text-xl text-white">Próximos pasos</p><p className="mt-3 text-sm leading-relaxed text-brand-300">Checklist accionable para tu equipo o agencia.</p></article>
          <a href="/contacto" className="btn-primary w-full text-center">Quiero mi auditoría express</a>
        </div>
      </div>
    </SectionBlock>
  )
}

function PricingSection({ compact = false }: { compact?: boolean }) {
  return (
    <SectionBlock id="precios" eyebrow="Precios" title={compact ? 'Dos opciones claras' : 'Dos opciones claras. Empieza por la auditoría.'} intro="Auditoría express por 149€ con informe en 48h. Mantenimiento mensual por 49€/mes.">
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
        {pricingPlans.map((plan) => (
          <article key={plan.name} className={`glass-card rounded-[1.75rem] p-8 ${plan.featured ? 'border-electric-400/50 shadow-glow' : ''}`}>
            <p className="font-heading text-xl text-white">{plan.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-300">{plan.tagline}</p>
            <div className="mt-5 flex items-baseline gap-2"><span className="font-heading text-4xl text-white">{plan.price}</span><span className="text-sm text-brand-400">{plan.period}</span></div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (<li key={f} className="flex gap-3 text-sm leading-relaxed text-brand-200"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" /><span>{f}</span></li>))}
            </ul>
            <a href={plan.ctaHref} className={`mt-8 w-full text-center ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}>{plan.ctaLabel}</a>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}

function DisclaimerSection() {
  return (
    <section className="py-12 lg:py-16"><div className="section-shell">
      <div className="glass-card rounded-[1.75rem] border-accent-500/20 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">Importante</p>
        <p className="mt-4 text-sm leading-relaxed text-brand-300 md:text-base">La auditoría automatizada no sustituye una auditoría legal completa ni pruebas manuales avanzadas con usuarios reales. Nuestro servicio detecta problemas técnicos frecuentes, prioriza mejoras prácticas y ayuda a mantener una web más accesible de forma continua.</p>
      </div>
    </div></section>
  )
}

function NichesSection() {
  return (
    <SectionBlock id="nichos" eyebrow="Nichos" title="Especialmente útil para" intro="Si tu negocio depende de que los usuarios completen acciones online, la accesibilidad te afecta directamente." subdued>
      <div className="grid gap-3 md:grid-cols-3">
        {niches.map((n) => (<article key={n} className="glass-card rounded-[1.35rem] p-5"><p className="text-sm font-semibold text-brand-100">{n}</p></article>))}
      </div>
    </SectionBlock>
  )
}

function AuditContactForm() {
  const [formData, setFormData] = useState({ name: '', company: '', website: '', email: '', phone: '', niche: 'clinica-dental', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({})

  function validate() {
    const e: Partial<Record<keyof typeof formData, string>> = {}
    if (!formData.name.trim()) e.name = 'Indica tu nombre.'
    if (!formData.company.trim()) e.company = 'Indica tu empresa.'
    if (!formData.website.trim()) e.website = 'Indica la URL de tu web.'
    else if (!/^https?:\/\//.test(formData.website)) e.website = 'La URL debe empezar por http:// o https://'
    if (!formData.email.trim()) e.email = 'Indica tu email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Revisa el formato del email.'
    if (!formData.phone.trim()) e.phone = 'Indica tu teléfono.'
    return e
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); setStatus('error'); setFeedback('Revisa los campos marcados.'); return }
    setErrors({}); setStatus('sending'); setFeedback('')
    trackEvent('lead_form_submit_attempt', { niche: formData.niche })
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      if (!r.ok) throw new Error('fail')
      setStatus('sent'); setFeedback('Solicitud enviada. Te contactaremos en 24h y recibirás tu informe en 48h.')
      trackEvent('lead_form_submit_success')
      setFormData({ name: '', company: '', website: '', email: '', phone: '', niche: 'clinica-dental', message: '' })
    } catch { setStatus('error'); setFeedback('No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp.'); trackEvent('lead_form_submit_error') }
  }

  function updateField<K extends keyof typeof formData>(key: K, value: string) { setFormData((c) => ({ ...c, [key]: value })) }
  const ic = 'mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-electric-400 focus:ring-2 focus:ring-electric-500/30'

  return (
    <form className="glass-card p-6 lg:p-8" onSubmit={handleSubmit} noValidate>
      <h3 className="text-2xl font-semibold text-white">Solicitar auditoría express</h3>
      <p className="mt-2 text-sm text-brand-300">149€ · Informe en 48h · Sin compromiso</p>
      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-100" htmlFor="name">Nombre<input id="name" name="name" type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={ic} autoComplete="name" />{errors.name ? <span className="mt-1 block text-xs text-accent-400">{errors.name}</span> : null}</label>
        <label className="text-sm font-medium text-brand-100" htmlFor="company">Empresa<input id="company" name="company" type="text" value={formData.company} onChange={(e) => updateField('company', e.target.value)} className={ic} autoComplete="organization" />{errors.company ? <span className="mt-1 block text-xs text-accent-400">{errors.company}</span> : null}</label>
        <label className="text-sm font-medium text-brand-100" htmlFor="website">URL de la web<input id="website" name="website" type="url" placeholder="https://tu-web.com" value={formData.website} onChange={(e) => updateField('website', e.target.value)} className={ic} />{errors.website ? <span className="mt-1 block text-xs text-accent-400">{errors.website}</span> : null}</label>
        <label className="text-sm font-medium text-brand-100" htmlFor="email">Email<input id="email" name="email" type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={ic} autoComplete="email" />{errors.email ? <span className="mt-1 block text-xs text-accent-400">{errors.email}</span> : null}</label>
        <label className="text-sm font-medium text-brand-100" htmlFor="phone">Teléfono / WhatsApp<input id="phone" name="phone" type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className={ic} autoComplete="tel" />{errors.phone ? <span className="mt-1 block text-xs text-accent-400">{errors.phone}</span> : null}</label>
        <label className="text-sm font-medium text-brand-100" htmlFor="niche">Tipo de negocio<select id="niche" name="niche" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={ic}><option value="clinica-dental">Clínica dental</option><option value="clinica-estetica">Clínica estética</option><option value="academia">Academia</option><option value="restaurante">Restaurante con reservas</option><option value="ecommerce">Ecommerce pequeño</option><option value="inmobiliaria">Inmobiliaria</option><option value="hotel">Hotel pequeño</option><option value="otro">Otro</option></select></label>
        <label className="text-sm font-medium text-brand-100" htmlFor="message">Mensaje (opcional)<textarea id="message" name="message" rows={3} value={formData.message} onChange={(e) => updateField('message', e.target.value)} className={ic} /></label>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Analizar mi web'}</button>
      {feedback ? <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${status === 'error' ? 'border-accent-500/30 bg-accent-500/10 text-accent-300' : 'border-success-200/30 bg-success-100/10 text-success-200'}`} role="status">{feedback}</p> : null}
    </form>
  )
}

function ContactFormSection() {
  return (
    <section id={contactSectionId} className="border-t border-brand-800/60 py-16 lg:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <span className="section-kicker">Contacto</span>
          <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">Analizar mi web</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-200 md:text-lg">Indícanos tu web y tus datos. Te enviamos el informe en 48 horas. Sin compromiso.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="glass-card rounded-[1.6rem] p-6"><p className="font-heading text-xl text-white">48 horas</p><p className="mt-3 text-sm leading-relaxed text-brand-300">Desde que recibimos tu solicitud hasta que tienes el informe.</p></article>
            <article className="glass-card rounded-[1.6rem] p-6"><p className="font-heading text-xl text-white">Sin compromiso</p><p className="mt-3 text-sm leading-relaxed text-brand-300">La auditoría es un informe. Si quieres corregir, lo haces tú o te ayudamos.</p></article>
          </div>
        </div>
        <div className="grid gap-5"><AuditContactForm /></div>
      </div>
    </section>
  )
}

function severityColor(severity: string) {
  switch (severity) {
    case 'critical': return 'text-accent-400 border-accent-500/30 bg-accent-500/10'
    case 'serious': return 'text-orange-400 border-orange-500/30 bg-orange-500/10'
    case 'moderate': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
    default: return 'text-brand-300 border-brand-700 bg-brand-900/40'
  }
}

function scoreColor(score: number) {
  if (score >= 90) return 'text-success-500'
  if (score >= 50) return 'text-yellow-400'
  return 'text-accent-400'
}

function DemoReportPage() {
  const d = demoAudit
  return (
    <>
      <div className="section-shell pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-400">
          <a href="/" className="hover:text-white">Inicio</a><span className="mx-2">/</span><span className="text-brand-200">Ejemplo de informe</span>
        </nav>
      </div>

      <section className="py-12">
        <div className="section-shell">
          <span className="section-kicker">Demo</span>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight md:text-5xl">Así es el informe que recibirás</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-200 md:text-lg">Ejemplo ficticio para "Clínica Demo". No usa datos reales. Te muestra qué recibes al contratar una auditoría express.</p>
        </div>
      </section>

      {/* Score general */}
      <section className="py-8">
        <div className="section-shell">
          <div className="glass-card rounded-[2rem] p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric-300">Auditoría de accesibilidad</p>
                <p className="mt-2 font-heading text-2xl text-white">{d.company}</p>
                <p className="text-sm text-brand-400">{d.url}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Score general</p>
                <p className={`font-heading text-6xl ${scoreColor(d.scores.accessibility)}`}>{d.scores.accessibility}</p>
                <p className="text-sm text-brand-400">Nivel de riesgo: <span className="font-semibold text-yellow-400">{d.riskLevel}</span></p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(d.scores).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-brand-700/50 bg-brand-900/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">{key === 'bestPractices' ? 'Best Practices' : key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className={`mt-2 font-heading text-3xl ${scoreColor(value)}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-3"><p className="text-xs text-brand-400">Críticos</p><p className="text-xl font-bold text-accent-400">{d.summary.critical}</p></div>
              <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3"><p className="text-xs text-brand-400">Serios</p><p className="text-xl font-bold text-orange-400">{d.summary.serious}</p></div>
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3"><p className="text-xs text-brand-400">Moderados</p><p className="text-xl font-bold text-yellow-400">{d.summary.moderate}</p></div>
              <div className="rounded-lg border border-brand-700 bg-brand-900/40 px-4 py-3"><p className="text-xs text-brand-400">Menores</p><p className="text-xl font-bold text-brand-300">{d.summary.minor}</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Issues list */}
      <section className="py-8">
        <div className="section-shell">
          <h2 className="text-3xl">Problemas detectados</h2>
          <p className="mt-3 text-sm text-brand-300">Ordenados por severidad e impacto en usuarios.</p>
          <div className="mt-8 space-y-4">
            {d.issues.map((issue, i) => (
              <article key={i} className="glass-card rounded-[1.5rem] p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${severityColor(issue.severity)}`}>{issue.severity}</span>
                  <span className="rounded-full border border-brand-700 bg-brand-900/40 px-3 py-1 text-xs font-medium text-brand-300">{issue.type}</span>
                  <p className="font-heading text-lg text-white">{issue.title}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-300">{issue.description}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Selector</p><code className="mt-1 block text-sm text-electric-300">{issue.selector}</code></div>
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Impacto</p><p className="mt-1 text-sm text-brand-300">{issue.impact}</p></div>
                </div>
                <div className="mt-4 rounded-xl border border-success-200/20 bg-success-100/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-success-200">Recomendación</p>
                  <p className="mt-1 text-sm text-brand-200">{issue.recommendation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="py-8">
        <div className="section-shell">
          <div className="glass-card rounded-[1.75rem] border-accent-500/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">Limitaciones del análisis</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-300">Este informe combina análisis automatizado y explicación asistida por IA. No sustituye una auditoría legal completa ni pruebas manuales exhaustivas, pero ayuda a detectar y priorizar problemas frecuentes de accesibilidad web.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="section-shell text-center">
          <h2 className="text-3xl md:text-4xl">¿Quieres este informe para tu web?</h2>
          <p className="mt-4 text-sm text-brand-300">Auditoría express por 149€. Informe en 48h.</p>
          <a href="/contacto" className="btn-primary mt-6 inline-flex">Solicitar auditoría express</a>
        </div>
      </section>
    </>
  )
}

function PricingPage() {
  return (
    <>
      <section className="py-12">
        <div className="section-shell">
          <span className="section-kicker">Precios</span>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight md:text-5xl">Precios claros. Sin sorpresas.</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-200 md:text-lg">Empieza con una auditoría express por 149€. Si quieres mantener tu web controlada mes a mes, añade mantenimiento por 49€/mes.</p>
        </div>
      </section>
      <PricingSection />
      <DisclaimerSection />
      <section className="py-12">
        <div className="section-shell text-center">
          <h2 className="text-2xl md:text-3xl">¿Tienes dudas?</h2>
          <p className="mt-3 text-sm text-brand-300">Escríbenos y te respondemos en 24h.</p>
          <a href="/contacto" className="btn-primary mt-6 inline-flex">Contactar</a>
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <section className="py-12">
        <div className="section-shell">
          <span className="section-kicker">Contacto</span>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight md:text-5xl">Solicita tu auditoría express</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-200 md:text-lg">Indícanos tu web y tus datos de contacto. Te enviamos el informe en 48 horas con los problemas detectados, prioridades y recomendaciones claras.</p>
        </div>
      </section>
      <ContactFormSection />
    </>
  )
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null
  return (
    <SectionBlock id="faq" eyebrow="FAQ" title="Preguntas frecuentes" subdued>
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map((faq) => (
          <article key={faq.question} className="glass-card rounded-[1.75rem] p-6">
            <p className="font-heading text-lg text-white">{faq.question}</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-300">{faq.answer}</p>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}

// ── Main App ────────────────────────────────────────────────────────────────

function App() {
  const currentPath = normalizePath(window.location.pathname)
  const currentPage = pagesByPath[currentPath] ?? pagesByPath['/']

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${currentPage.path === '/' ? '' : currentPage.path}`
    document.title = currentPage.title
    upsertMetaAttribute('name', 'description', currentPage.metaDescription)
    upsertMetaAttribute('name', 'robots', 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1')
    upsertMetaAttribute('name', 'author', brandName)
    upsertMetaAttribute('property', 'og:type', 'website')
    upsertMetaAttribute('property', 'og:locale', 'es_ES')
    upsertMetaAttribute('property', 'og:site_name', brandName)
    upsertMetaAttribute('property', 'og:title', currentPage.title)
    upsertMetaAttribute('property', 'og:description', currentPage.metaDescription)
    upsertMetaAttribute('property', 'og:url', canonicalUrl)
    upsertMetaAttribute('name', 'twitter:card', 'summary_large_image')
    upsertMetaAttribute('name', 'twitter:title', currentPage.title)
    upsertMetaAttribute('name', 'twitter:description', currentPage.metaDescription)
    upsertLink('canonical', canonicalUrl)
  }, [currentPage])

  return (
    <div className="relative isolate overflow-x-hidden pb-20 md:pb-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-electric-500/10 via-brand-900/5 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-electric-500/10 blur-3xl" aria-hidden="true" />

      <Header currentPage={currentPage} />
      <div aria-hidden="true" className="h-16" />

      <main>
        {currentPage.path === '/' && (
          <>
            <Hero page={currentPage} />
            <ProblemSection />
            <WhatWeReviewSection />
            <WhatWeDeliverSection />
            <PricingSection />
            <DisclaimerSection />
            <NichesSection />
            <ContactFormSection />
            <FaqSection faqs={currentPage.faqs} />
          </>
        )}
        {currentPage.path === '/demo-auditoria' && <DemoReportPage />}
        {currentPage.path === '/precios' && <PricingPage />}
        {currentPage.path === '/contacto' && <ContactPage />}
      </main>

      <Footer />
      <MobileStickyCta />
    </div>
  )
}

export default App
