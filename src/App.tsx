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
import { VolumetricStudio } from './components/VolumetricStudio'

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

// Trust stats moved into VolumetricStudio hero context

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-8 8a1 1 0 01-1.42 0l-4-4a1 1 0 111.42-1.42L8 12.58l7.29-7.29a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M5 10h10m0 0l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionBlock({ id, eyebrow, title, intro, children, subdued = false }: { id?: string; eyebrow?: string; title: string; intro?: string; children: ReactNode; subdued?: boolean }) {
  return (
    <section id={id} className={`py-16 lg:py-24 ${subdued ? 'bg-brand-50' : ''}`}>
      <div className="section-shell">
        <div className="max-w-3xl">
          {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-brand-900 md:text-4xl">{title}</h2>
          {intro ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-600 md:text-lg">{intro}</p> : null}
        </div>
        <div className="mt-12">{children}</div>
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
    <header className={`fixed inset-x-0 top-0 z-[100] border-b transition-all ${scrolled ? 'border-brand-200 bg-white/95 shadow-soft backdrop-blur' : 'border-transparent bg-transparent'}`}>
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="/" className={`inline-flex min-w-0 items-center gap-2 font-heading text-base font-semibold tracking-tight ${scrolled ? 'text-brand-900' : 'text-white'}`} aria-label={`${brandName} - Inicio`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${scrolled ? 'bg-accent-600' : 'bg-white/20 backdrop-blur'} text-sm font-bold text-white`}>N</span>
          <span>{brandName}</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {primaryNav.map((item) => (
            <a key={item.href} href={resolveNavHref(item.href)} aria-current={currentPage.path === item.href ? 'page' : undefined}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${currentPage.path === item.href ? 'bg-accent-50 text-accent-700' : scrolled ? 'text-brand-600 hover:bg-brand-50 hover:text-brand-900' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>{item.label}</a>
          ))}
        </nav>
        <div className={`hidden items-center gap-3 lg:flex`}><a href="/contacto" className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${scrolled ? 'bg-accent-600 hover:bg-accent-500 shadow-cta' : 'bg-white/15 backdrop-blur hover:bg-white/25 border border-white/20'}`} onClick={() => trackEvent('cta_click', { location: 'nav' })}>Solicitar auditoría</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="/contacto" className={`inline-flex items-center rounded-lg ${scrolled ? 'bg-accent-600' : 'bg-white/15 backdrop-blur'} px-3 py-2 text-xs font-semibold text-white shadow-cta`} onClick={() => trackEvent('cta_click', { location: 'mobile_top' })}>Auditoría</a>
          <button type="button" className={`inline-flex items-center rounded-lg border ${scrolled ? 'border-brand-300 bg-white text-brand-700' : 'border-white/20 bg-white/5 text-white/90 backdrop-blur'} px-3 py-2 text-sm font-semibold`} onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Abrir menú">Menú</button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-brand-200 bg-white lg:hidden">
          <nav className="section-shell flex flex-col gap-2 py-4" aria-label="Navegación móvil">
            {primaryNav.map((item) => (
              <a key={item.href} href={resolveNavHref(item.href)} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2.5 text-sm font-medium ${currentPage.path === item.href ? 'bg-accent-50 text-accent-700' : 'text-brand-600 hover:bg-brand-50'}`}>{item.label}</a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-brand-800 bg-brand-900 py-12">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-sm font-bold text-white">N</span>
            <p className="font-heading text-xl text-white">{brandName}</p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-400">Auditorías de accesibilidad web para empresas que venden, reservan o captan clientes online. Informe claro, priorizado y accionable en 48h.</p>
          <p className="mt-6 text-sm text-brand-500">© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-400">{group.title}</p>
              <div className="mt-4 space-y-3">{group.links.map((link) => (<a key={link.href} href={link.href} className="block text-sm text-brand-400 transition hover:text-white">{link.label}</a>))}</div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-200 bg-white/95 p-3 shadow-elevated backdrop-blur lg:hidden">
      <a href="/contacto" className="btn-primary w-full text-center">Solicitar auditoría express</a>
    </div>
  )
}

function Hero({ page }: { page: PageData }) {
  return (
    <header id="hero" className="relative h-screen min-h-[680px] w-full overflow-hidden bg-black">
      <VolumetricStudio className="absolute inset-0 h-full w-full" />
      <div className="relative z-40 flex h-full items-center">
        <div className="section-shell w-full">
          <div className="max-w-3xl animate-fade-up">
            <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
              {page.hero.eyebrow}
            </span>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-[3.5rem]">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {page.hero.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={page.hero.primaryCtaHref} className="inline-flex items-center justify-center rounded-xl bg-accent-600 px-6 py-3.5 text-sm font-semibold text-white shadow-cta transition hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black" onClick={() => trackEvent('cta_click', { location: 'hero', type: 'primary', page: page.path })}>
                {page.hero.primaryCtaLabel}
                <ArrowIcon className="ml-2 h-4 w-4" />
              </a>
              <a href={page.hero.secondaryCtaHref} className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/40 hover:bg-white/10" onClick={() => trackEvent('cta_click', { location: 'hero', type: 'secondary', page: page.path })}>{page.hero.secondaryCtaLabel}</a>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {page.hero.bullets.map((item) => (
                <li key={item} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white/80 backdrop-blur">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />
    </header>
  )
}

function ProblemSection() {
  return (
    <SectionBlock id="problema" eyebrow="El problema" title="Tu web puede parecer correcta y aun así fallar para muchos usuarios" intro="Muchas webs tienen errores que no se ven a simple vista. Si una persona no puede navegar, reservar o comprar, tu web no está haciendo bien su trabajo." subdued>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {problemPoints.map((p, i) => (
          <article key={i} className="clean-card rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600" aria-hidden="true">!</span>
              <p className="text-sm leading-relaxed text-brand-600">{p}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}

function WhatWeReviewSection() {
  const icons: Record<string, ReactNode> = {
    contrast: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zm0 2v12a6 6 0 000-12z" /></svg>,
    keyboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h0M10 10h0M14 10h0M18 10h0M6 14h12" strokeLinecap="round" /></svg>,
    forms: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" strokeLinecap="round" /></svg>,
    buttons: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="4" y="8" width="16" height="8" rx="4" /><path d="M8 12h.01M12 12h.01M16 12h.01" strokeLinecap="round" /></svg>,
    images: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    structure: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>,
    mobile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" strokeLinecap="round" /></svg>,
    technical: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
    recommendations: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  }
  return (
    <SectionBlock id="que-revisamos" eyebrow="Qué revisamos" title="Revisamos los puntos que más afectan a usuarios y conversión" intro="No es un escaneo genérico. Analizamos los elementos que impactan directamente en la experiencia de usuarios reales.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviewItems.map((item) => (
          <article key={item.title} className="clean-card clean-card-hover rounded-2xl p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">{icons[item.icon] || icons.recommendations}</span>
            <p className="mt-4 font-heading text-lg font-semibold text-brand-900">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}

function WhatWeDeliverSection() {
  return (
    <SectionBlock id="que-entregamos" eyebrow="Qué entregamos" title="Un informe claro, no un documento técnico imposible de leer" intro="Recibes un PDF con todo lo necesario para entender el estado de tu web y qué hacer para mejorar." subdued>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-brand-200 bg-white p-8 shadow-elevated">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">Incluye</p>
          <ul className="mt-6 space-y-4">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brand-700">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <article className="clean-card rounded-2xl p-6">
            <p className="font-heading text-lg font-semibold text-brand-900">Nivel de riesgo: bajo / medio / alto</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">Te decimos si tu web tiene riesgos leves, moderados o críticos.</p>
          </article>
          <article className="clean-card rounded-2xl p-6">
            <p className="font-heading text-lg font-semibold text-brand-900">Top 10 prioridades</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">Los 10 errores que más impactan en usuarios y conversión, ordenados.</p>
          </article>
          <article className="clean-card rounded-2xl p-6">
            <p className="font-heading text-lg font-semibold text-brand-900">Próximos pasos</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">Checklist accionable para tu equipo o agencia.</p>
          </article>
          <a href="/contacto" className="btn-primary w-full text-center">Quiero mi auditoría express <ArrowIcon className="ml-2 h-4 w-4" /></a>
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
          <article key={plan.name} className={`clean-card rounded-2xl p-8 ${plan.featured ? 'border-accent-300 ring-1 ring-accent-200 shadow-glow' : ''}`}>
            {plan.featured ? <span className="mb-4 inline-flex items-center rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white">Recomendado</span> : null}
            <p className="font-heading text-xl font-semibold text-brand-900">{plan.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-500">{plan.tagline}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-heading text-4xl font-bold text-brand-900">{plan.price}</span>
              <span className="text-sm text-brand-400">{plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-brand-700">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
                  <span>{f}</span>
                </li>
              ))}
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
      <div className="rounded-2xl border border-warn-200 bg-warn-100/50 p-6 lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warn-600">Importante</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-600 md:text-base">La auditoría automatizada no sustituye una auditoría legal completa ni pruebas manuales avanzadas con usuarios reales. Nuestro servicio detecta problemas técnicos frecuentes, prioriza mejoras prácticas y ayuda a mantener una web más accesible de forma continua.</p>
      </div>
    </div></section>
  )
}

function NichesSection() {
  return (
    <SectionBlock id="nichos" eyebrow="Nichos" title="Especialmente útil para" intro="Si tu negocio depende de que los usuarios completen acciones online, la accesibilidad te afecta directamente." subdued>
      <div className="grid gap-3 md:grid-cols-3">
        {niches.map((n) => (
          <article key={n} className="clean-card rounded-xl p-4">
            <p className="text-sm font-medium text-brand-700">{n}</p>
          </article>
        ))}
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
  const ic = 'mt-2 w-full rounded-xl border border-brand-300 bg-white px-3.5 py-2.5 text-sm text-brand-900 outline-none transition placeholder:text-brand-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20'

  return (
    <form className="rounded-2xl border border-brand-200 bg-white p-6 shadow-elevated lg:p-8" onSubmit={handleSubmit} noValidate>
      <h3 className="text-2xl font-semibold text-brand-900">Solicitar auditoría express</h3>
      <p className="mt-2 text-sm text-brand-500">149€ · Informe en 48h · Sin compromiso</p>
      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-700" htmlFor="name">Nombre<input id="name" name="name" type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={ic} autoComplete="name" />{errors.name ? <span className="mt-1 block text-xs text-red-600">{errors.name}</span> : null}</label>
        <label className="text-sm font-medium text-brand-700" htmlFor="company">Empresa<input id="company" name="company" type="text" value={formData.company} onChange={(e) => updateField('company', e.target.value)} className={ic} autoComplete="organization" />{errors.company ? <span className="mt-1 block text-xs text-red-600">{errors.company}</span> : null}</label>
        <label className="text-sm font-medium text-brand-700" htmlFor="website">URL de la web<input id="website" name="website" type="url" placeholder="https://tu-web.com" value={formData.website} onChange={(e) => updateField('website', e.target.value)} className={ic} />{errors.website ? <span className="mt-1 block text-xs text-red-600">{errors.website}</span> : null}</label>
        <label className="text-sm font-medium text-brand-700" htmlFor="email">Email<input id="email" name="email" type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={ic} autoComplete="email" />{errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}</label>
        <label className="text-sm font-medium text-brand-700" htmlFor="phone">Teléfono / WhatsApp<input id="phone" name="phone" type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className={ic} autoComplete="tel" />{errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone}</span> : null}</label>
        <label className="text-sm font-medium text-brand-700" htmlFor="niche">Tipo de negocio<select id="niche" name="niche" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={ic}><option value="clinica-dental">Clínica dental</option><option value="clinica-estetica">Clínica estética</option><option value="academia">Academia</option><option value="restaurante">Restaurante con reservas</option><option value="ecommerce">Ecommerce pequeño</option><option value="inmobiliaria">Inmobiliaria</option><option value="hotel">Hotel pequeño</option><option value="otro">Otro</option></select></label>
        <label className="text-sm font-medium text-brand-700" htmlFor="message">Mensaje (opcional)<textarea id="message" name="message" rows={3} value={formData.message} onChange={(e) => updateField('message', e.target.value)} className={ic} /></label>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Analizar mi web'}</button>
      {feedback ? <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${status === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-accent-200 bg-accent-50 text-accent-700'}`} role="status">{feedback}</p> : null}
    </form>
  )
}

function ContactFormSection() {
  return (
    <section id={contactSectionId} className="border-t border-brand-100 py-16 lg:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <span className="section-kicker">Contacto</span>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-brand-900 md:text-4xl">Analizar mi web</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-600 md:text-lg">Indícanos tu web y tus datos. Te enviamos el informe en 48 horas. Sin compromiso.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="clean-card rounded-2xl p-6">
              <p className="font-heading text-xl font-semibold text-brand-900">48 horas</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-600">Desde que recibimos tu solicitud hasta que tienes el informe.</p>
            </article>
            <article className="clean-card rounded-2xl p-6">
              <p className="font-heading text-xl font-semibold text-brand-900">Sin compromiso</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-600">La auditoría es un informe. Si quieres corregir, lo haces tú o te ayudamos.</p>
            </article>
          </div>
        </div>
        <div className="grid gap-5"><AuditContactForm /></div>
      </div>
    </section>
  )
}

function severityColor(severity: string) {
  switch (severity) {
    case 'critical': return 'text-red-700 border-red-200 bg-red-50'
    case 'serious': return 'text-orange-700 border-orange-200 bg-orange-50'
    case 'moderate': return 'text-warn-600 border-warn-200 bg-warn-100/50'
    default: return 'text-brand-600 border-brand-200 bg-brand-50'
  }
}

function scoreColor(score: number) {
  if (score >= 90) return 'text-accent-600'
  if (score >= 50) return 'text-warn-600'
  return 'text-red-600'
}

function DemoReportPage() {
  const d = demoAudit
  return (
    <>
      <div className="section-shell pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-500">
          <a href="/" className="hover:text-brand-900">Inicio</a><span className="mx-2">/</span><span className="text-brand-700">Ejemplo de informe</span>
        </nav>
      </div>

      <section className="py-12">
        <div className="section-shell">
          <span className="section-kicker">Demo</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-brand-900 md:text-5xl">Así es el informe que recibirás</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-600 md:text-lg">Ejemplo ficticio para "Clínica Demo". No usa datos reales. Te muestra qué recibes al contratar una auditoría express.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="section-shell">
          <div className="clean-card rounded-3xl p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">Auditoría de accesibilidad</p>
                <p className="mt-2 font-heading text-2xl font-semibold text-brand-900">{d.company}</p>
                <p className="text-sm text-brand-400">{d.url}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Score general</p>
                <p className={`font-heading text-6xl font-bold ${scoreColor(d.scores.accessibility)}`}>{d.scores.accessibility}</p>
                <p className="text-sm text-brand-400">Nivel de riesgo: <span className="font-semibold text-warn-600">{d.riskLevel}</span></p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(d.scores).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-brand-200 bg-brand-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">{key === 'bestPractices' ? 'Best Practices' : key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className={`mt-2 font-heading text-3xl font-bold ${scoreColor(value)}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"><p className="text-xs text-brand-400">Críticos</p><p className="text-xl font-bold text-red-600">{d.summary.critical}</p></div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3"><p className="text-xs text-brand-400">Serios</p><p className="text-xl font-bold text-orange-600">{d.summary.serious}</p></div>
              <div className="rounded-lg border border-warn-200 bg-warn-100/50 px-4 py-3"><p className="text-xs text-brand-400">Moderados</p><p className="text-xl font-bold text-warn-600">{d.summary.moderate}</p></div>
              <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3"><p className="text-xs text-brand-400">Menores</p><p className="text-xl font-bold text-brand-500">{d.summary.minor}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-shell">
          <h2 className="text-3xl font-semibold text-brand-900">Problemas detectados</h2>
          <p className="mt-3 text-sm text-brand-600">Ordenados por severidad e impacto en usuarios.</p>
          <div className="mt-8 space-y-4">
            {d.issues.map((issue, i) => (
              <article key={i} className="clean-card rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${severityColor(issue.severity)}`}>{issue.severity}</span>
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">{issue.type}</span>
                  <p className="font-heading text-lg font-semibold text-brand-900">{issue.title}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-600">{issue.description}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Selector</p><code className="mt-1 block text-sm text-electric-600">{issue.selector}</code></div>
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Impacto</p><p className="mt-1 text-sm text-brand-600">{issue.impact}</p></div>
                </div>
                <div className="mt-4 rounded-xl border border-accent-200 bg-accent-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">Recomendación</p>
                  <p className="mt-1 text-sm text-brand-700">{issue.recommendation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-shell">
          <div className="rounded-2xl border border-warn-200 bg-warn-100/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warn-600">Limitaciones del análisis</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-600">Este informe combina análisis automatizado y explicación asistida por IA. No sustituye una auditoría legal completa ni pruebas manuales exhaustivas, pero ayuda a detectar y priorizar problemas frecuentes de accesibilidad web.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-shell text-center">
          <h2 className="text-3xl font-semibold text-brand-900 md:text-4xl">¿Quieres este informe para tu web?</h2>
          <p className="mt-4 text-sm text-brand-600">Auditoría express por 149€. Informe en 48h.</p>
          <a href="/contacto" className="btn-primary mt-6 inline-flex">Solicitar auditoría express <ArrowIcon className="ml-2 h-4 w-4" /></a>
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
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-brand-900 md:text-5xl">Precios claros. Sin sorpresas.</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-600 md:text-lg">Empieza con una auditoría express por 149€. Si quieres mantener tu web controlada mes a mes, añade mantenimiento por 49€/mes.</p>
        </div>
      </section>
      <PricingSection />
      <DisclaimerSection />
      <section className="py-12">
        <div className="section-shell text-center">
          <h2 className="text-2xl font-semibold text-brand-900 md:text-3xl">¿Tienes dudas?</h2>
          <p className="mt-3 text-sm text-brand-600">Escríbenos y te respondemos en 24h.</p>
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
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-brand-900 md:text-5xl">Solicita tu auditoría express</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-600 md:text-lg">Indícanos tu web y tus datos de contacto. Te enviamos el informe en 48 horas con los problemas detectados, prioridades y recomendaciones claras.</p>
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
          <article key={faq.question} className="clean-card rounded-2xl p-6">
            <p className="font-heading text-lg font-semibold text-brand-900">{faq.question}</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    </SectionBlock>
  )
}

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
      <Header currentPage={currentPage} />

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
