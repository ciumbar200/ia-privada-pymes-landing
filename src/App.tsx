import { useEffect, useState, useRef, type ReactNode } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
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

// ─── Helpers ────────────────────────────────────────────────────────────────

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

// ─── Animated Counter ───────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.floor(eased * value)
      setDisplay(start)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

// ─── Icons ──────────────────────────────────────────────────────────────────

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

function SparkIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
    </svg>
  )
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  )
}

function ChartIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M3 3v18h18" strokeLinecap="round" />
      <path d="M7 14l3-3 3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Motion Variants ────────────────────────────────────────────────────────

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const sideVariants: any = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

// ─── Header ─────────────────────────────────────────────────────────────────

function Header({ currentPage }: { currentPage: PageData }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 50], ['rgba(2, 6, 23, 0.4)', 'rgba(2, 6, 23, 0.95)'])

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 8))
  }, [scrollY])

  function resolveNavHref(href: string) { return href.startsWith('/#') ? (currentPage.path === '/' ? href.slice(1) : href) : href }

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-all ${scrolled ? 'border-brand-800 backdrop-blur-xl' : 'border-transparent backdrop-blur-md'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a href="/" className="inline-flex min-w-0 items-center gap-2 font-heading text-base font-semibold tracking-tight text-white" aria-label={`${brandName} - Inicio`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-bold text-white shadow-cta">N</span>
          <span>{brandName}</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {primaryNav.map((item) => (
            <a key={item.href} href={resolveNavHref(item.href)} aria-current={currentPage.path === item.href ? 'page' : undefined}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${currentPage.path === item.href ? 'bg-accent-500/10 text-accent-400' : 'text-brand-400 hover:bg-brand-800/50 hover:text-white'}`}>{item.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="/contacto" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:from-accent-400 hover:to-accent-500 hover:shadow-glow" onClick={() => trackEvent('cta_click', { location: 'nav' })}>
            Solicitar auditoría
            <ArrowIcon className="ml-1.5 h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="/contacto" className="inline-flex items-center rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-2 text-xs font-semibold text-white shadow-cta" onClick={() => trackEvent('cta_click', { location: 'mobile_top' })}>Auditoría</a>
          <button type="button" className="inline-flex items-center rounded-lg border border-brand-700 bg-brand-900/50 text-brand-300 px-3 py-2 text-sm font-semibold" onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Abrir menú">Menú</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="border-t border-brand-800 bg-brand-950/95 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="section-shell flex flex-col gap-2 py-4" aria-label="Navegación móvil">
              {primaryNav.map((item) => (
                <a key={item.href} href={resolveNavHref(item.href)} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2.5 text-sm font-medium ${currentPage.path === item.href ? 'bg-accent-500/10 text-accent-400' : 'text-brand-400 hover:bg-brand-800/50'}`}>{item.label}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-brand-800 bg-brand-950 py-16">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-bold text-white">N</span>
            <p className="font-heading text-xl text-white">{brandName}</p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-500">Auditorías de accesibilidad web para empresas que venden, reservan o captan clientes online. Informe claro, priorizado y accionable en 48h.</p>
          <div className="mt-6 flex gap-3">
            <span className="stat-badge"><ShieldIcon className="h-4 w-4 text-accent-500" /> WCAG 2.1</span>
            <span className="stat-badge"><BoltIcon className="h-4 w-4 text-electric-400" /> axe-core</span>
          </div>
          <p className="mt-6 text-sm text-brand-600">© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-400">{group.title}</p>
              <div className="mt-4 space-y-3">{group.links.map((link) => (<a key={link.href} href={link.href} className="block text-sm text-brand-500 transition hover:text-white">{link.label}</a>))}</div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Mobile Sticky CTA ──────────────────────────────────────────────────────

function MobileStickyCta() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-800 bg-brand-950/95 p-3 shadow-elevated backdrop-blur lg:hidden"
    >
      <a href="/contacto" className="btn-primary w-full text-center">Solicitar auditoría express</a>
    </motion.div>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero({ page }: { page: PageData }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-brand-950 bg-mesh-heavy pt-28 pb-20 lg:pt-40 lg:pb-32">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-faint-bright opacity-50" />
      {/* Glow orbs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-electric-500/8 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants}>
            <span className="section-kicker">
              <SparkIcon className="h-3 w-3" />
              {page.hero.eyebrow}
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[3.75rem]"
          >
            <span className="text-gradient">{page.h1.split(' ').slice(0, -3).join(' ')}</span>{' '}
            <span className="text-gradient-accent">{page.h1.split(' ').slice(-3).join(' ')}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-base leading-relaxed text-brand-400 md:text-lg">
            {page.hero.intro}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={page.hero.primaryCtaHref} className="btn-primary group" onClick={() => trackEvent('cta_click', { location: 'hero', type: 'primary', page: page.path })}>
              {page.hero.primaryCtaLabel}
              <ArrowIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={page.hero.secondaryCtaHref} className="btn-secondary" onClick={() => trackEvent('cta_click', { location: 'hero', type: 'secondary', page: page.path })}>{page.hero.secondaryCtaLabel}</a>
          </motion.div>
          <motion.ul variants={itemVariants} className="mt-10 grid gap-3 sm:grid-cols-3">
            {page.hero.bullets.map((item, i) => (
              <li key={item} className="flex items-center gap-2.5 rounded-xl border border-brand-800 bg-brand-900/60 px-4 py-3.5 text-sm font-medium text-brand-300 backdrop-blur" style={{ animationDelay: `${i * 0.1}s` }}>
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-500" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 lg:mt-24"
        >
          <div className="glass-card grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4">
            {[
              { value: 3000, suffix: '+', label: 'Checks automatizados' },
              { value: 48, suffix: 'h', label: 'Entrega garantizada' },
              { value: 149, prefix: '€', suffix: '', label: 'Desde' },
              { value: 100, suffix: '%', label: 'Sin humo' },
            ].map((stat, i) => (
              <div key={i} className="border-r border-brand-800 p-6 text-center last:border-r-0 lg:p-8">
                <p className="stat-number text-gradient-accent">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Logos / Trust Bar ──────────────────────────────────────────────────────

function TrustBar() {
  const tools = ['axe-core', 'Lighthouse', 'Pa11y', 'Playwright', 'WCAG 2.1', 'Section 508']
  return (
    <section className="border-y border-brand-800 bg-brand-900/30 py-8">
      <div className="section-shell">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Tecnologías y estándares que usamos</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {tools.map((t) => (
            <span key={t} className="font-heading text-sm font-semibold text-brand-500 transition hover:text-brand-300">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Problem Section ────────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section id="problema" className="relative overflow-hidden bg-brand-950 py-16 lg:py-24">
      <div className="absolute inset-0 grid-faint opacity-30" />
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={itemVariants} className="section-kicker">El problema</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold leading-tight md:text-4xl">
            Tu web puede parecer correcta y{' '}
            <span className="text-gradient-accent">estar fallando</span> para muchos usuarios
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-base text-brand-400 md:text-lg">
            Muchas webs tienen errores que no se ven a simple vista. Si una persona no puede navegar, reservar o comprar, tu web no está haciendo bien su trabajo.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {problemPoints.map((p, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }} className="grid-item">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400 ring-1 ring-red-500/20" aria-hidden="true">!</span>
                <p className="text-sm leading-relaxed text-brand-400">{p}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── What We Review ─────────────────────────────────────────────────────────

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
    <section id="que-revisamos" className="relative overflow-hidden bg-gradient-to-b from-brand-950 to-brand-900/50 py-16 lg:py-24">
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={itemVariants} className="section-kicker">Qué revisamos</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold leading-tight md:text-4xl">
            Revisamos los puntos que{' '}
            <span className="text-gradient-accent">más afectan</span> a usuarios y conversión
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-base text-brand-400 md:text-lg">
            No es un escaneo genérico. Analizamos los elementos que impactan directamente en la experiencia de usuarios reales.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {reviewItems.map((item) => (
            <motion.div key={item.title} variants={itemVariants} whileHover={{ y: -6 }} className="grid-item group">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/20 to-electric-500/10 text-accent-400 ring-1 ring-accent-500/20 transition group-hover:from-accent-500/30 group-hover:to-electric-500/20">{icons[item.icon] || icons.recommendations}</span>
              <p className="mt-4 font-heading text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── What We Deliver ────────────────────────────────────────────────────────

function WhatWeDeliverSection() {
  return (
    <section id="que-entregamos" className="relative overflow-hidden bg-brand-900/50 py-16 lg:py-24">
      <div className="absolute inset-0 grid-faint opacity-30" />
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={itemVariants} className="section-kicker">Qué entregamos</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold leading-tight md:text-4xl">
            Un informe <span className="text-gradient-accent">claro y accionable</span>, no un documento técnico
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-base text-brand-400 md:text-lg">
            Recibes un PDF con todo lo necesario para entender el estado de tu web y qué hacer para mejorar.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <motion.div variants={sideVariants} className="gradient-border rounded-3xl p-8 shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">Incluye</p>
            <ul className="mt-6 space-y-4">
              {deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-brand-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {[
              { title: 'Nivel de riesgo: bajo / medio / alto', desc: 'Te decimos si tu web tiene riesgos leves, moderados o críticos.', icon: <ShieldIcon className="h-5 w-5" /> },
              { title: 'Top 10 prioridades', desc: 'Los 10 errores que más impactan en usuarios y conversión, ordenados.', icon: <ChartIcon className="h-5 w-5" /> },
              { title: 'Próximos pasos', desc: 'Checklist accionable para tu equipo o agencia.', icon: <BoltIcon className="h-5 w-5" /> },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="grid-item flex items-start gap-4"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                  {card.icon}
                </span>
                <div>
                  <p className="font-heading text-base font-semibold text-white">{card.title}</p>
                  <p className="mt-1 text-sm text-brand-400">{card.desc}</p>
                </div>
              </motion.div>
            ))}
            <a href="/contacto" className="btn-primary w-full text-center group">
              Quiero mi auditoría express
              <ArrowIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── How It Works ───────────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Indícanos tu web', desc: 'Comparte la URL y recibe confirmación inmediata. Sin formularios eternos.' },
    { num: '02', title: 'Analizamos 3000+ puntos', desc: 'Escaneo automatizado con axe-core, Lighthouse y Pa11y. Cobertura completa.' },
    { num: '03', title: 'Recibe el informe en 48h', desc: 'PDF con capturas, prioridades y recomendaciones claras. Listo para actuar.' },
  ]
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 lg:py-24">
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <motion.span variants={itemVariants} className="section-kicker mx-auto">Cómo funciona</motion.span>
          <motion.h2 variants={itemVariants} className="mt-4 text-3xl font-semibold md:text-4xl">
            De URL a informe en <span className="text-gradient-accent">3 pasos</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -6 }} className="relative">
              <div className="glass-card p-8">
                <span className="font-heading text-5xl font-bold text-gradient-accent opacity-50">{step.num}</span>
                <p className="mt-4 font-heading text-xl font-semibold text-white">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-400">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-accent-500/50 to-transparent md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Pricing ────────────────────────────────────────────────────────────────

function PricingSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="precios" className="relative overflow-hidden bg-brand-950 py-16 lg:py-24">
      <div className="absolute inset-0 grid-faint-bright opacity-30" />
      <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-500/8 blur-3xl" />
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={itemVariants} className="section-kicker">Precios</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold leading-tight md:text-4xl">
            {compact ? 'Dos opciones claras' : <>Dos opciones claras. <span className="text-gradient-accent">Empieza hoy.</span></>}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-base text-brand-400 md:text-lg">
            Auditoría express por 149€ con informe en 48h. Mantenimiento mensual por 49€/mes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-8 ${plan.featured ? 'gradient-border shadow-glow' : 'border border-brand-800 bg-brand-900/60 backdrop-blur'}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-1 text-xs font-semibold text-white shadow-cta">
                  Recomendado
                </span>
              )}
              <p className="font-heading text-xl font-semibold text-white">{plan.name}</p>
              <p className="mt-2 text-sm text-brand-500">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-gradient-accent">{plan.price}</span>
                <span className="text-sm text-brand-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-brand-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={plan.ctaHref} className={`mt-8 w-full text-center ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}>{plan.ctaLabel}</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Disclaimer ─────────────────────────────────────────────────────────────

function DisclaimerSection() {
  return (
    <section className="bg-brand-950 py-12 lg:py-16">
      <div className="section-shell">
        <div className="rounded-2xl border border-warn-500/20 bg-warn-100/5 p-6 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warn-600">Importante</p>
          <p className="mt-3 text-sm leading-relaxed text-brand-400 md:text-base">La auditoría automatizada no sustituye una auditoría legal completa ni pruebas manuales avanzadas con usuarios reales. Nuestro servicio detecta problemas técnicos frecuentes, prioriza mejoras prácticas y ayuda a mantener una web más accesible de forma continua.</p>
        </div>
      </div>
    </section>
  )
}

// ─── Niches ─────────────────────────────────────────────────────────────────

function NichesSection() {
  return (
    <section id="nichos" className="relative overflow-hidden bg-brand-900/50 py-16 lg:py-24">
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={itemVariants} className="section-kicker">Nichos</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold leading-tight md:text-4xl">
            Especialmente <span className="text-gradient-accent">útil para</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-base text-brand-400 md:text-lg">
            Si tu negocio depende de que los usuarios completen acciones online, la accesibilidad te afecta directamente.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {niches.map((n) => (
            <motion.span
              key={n}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-700 bg-brand-800/50 px-5 py-3 text-sm font-medium text-brand-300 transition hover:border-accent-500/30 hover:text-accent-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              {n}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Testimonials ───────────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    { quote: 'Detectamos 4 errores críticos en el formulario de reservas que nos estaban costando clientes. Arreglados en una semana.', author: 'Clínica Dental Gavà', role: 'Barcelona', initials: 'GD' },
    { quote: 'El informe fue claro y accionable. Nuestro equipo técnico lo entendió sin problemas y priorizó las correcciones.', author: 'Academia Plus', role: 'Madrid', initials: 'AP' },
    { quote: 'El mantenimiento mensual nos da tranquilidad. Cada vez que añadimos contenido, sabemos si introduce nuevos errores.', author: 'Restaurante Grupo 46', role: 'Castelldefels', initials: 'R4' },
  ]
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 lg:py-24">
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <motion.span variants={itemVariants} className="section-kicker mx-auto">Testimonios</motion.span>
          <motion.h2 variants={itemVariants} className="mt-4 text-3xl font-semibold md:text-4xl">
            Lo que dicen quienes <span className="text-gradient-accent">ya auditaron su web</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }} className="glass-card p-6">
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <SparkIcon key={j} className="h-4 w-4 text-accent-500" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-brand-300">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-electric-500/10 text-xs font-bold text-accent-400 ring-1 ring-accent-500/20">{t.initials}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-brand-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact Form ───────────────────────────────────────────────────────────

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
  const ic = 'mt-2 w-full rounded-xl border border-brand-700 bg-brand-900/50 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-brand-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20'

  return (
    <form className="glass-card rounded-2xl p-6 lg:p-8" onSubmit={handleSubmit} noValidate>
      <h3 className="text-2xl font-semibold text-white">Solicitar auditoría express</h3>
      <p className="mt-2 text-sm text-brand-500">149€ · Informe en 48h · Sin compromiso</p>
      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium text-brand-300" htmlFor="name">Nombre<input id="name" name="name" type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className={ic} autoComplete="name" />{errors.name ? <span className="mt-1 block text-xs text-red-400">{errors.name}</span> : null}</label>
        <label className="text-sm font-medium text-brand-300" htmlFor="company">Empresa<input id="company" name="company" type="text" value={formData.company} onChange={(e) => updateField('company', e.target.value)} className={ic} autoComplete="organization" />{errors.company ? <span className="mt-1 block text-xs text-red-400">{errors.company}</span> : null}</label>
        <label className="text-sm font-medium text-brand-300" htmlFor="website">URL de la web<input id="website" name="website" type="url" placeholder="https://tu-web.com" value={formData.website} onChange={(e) => updateField('website', e.target.value)} className={ic} />{errors.website ? <span className="mt-1 block text-xs text-red-400">{errors.website}</span> : null}</label>
        <label className="text-sm font-medium text-brand-300" htmlFor="email">Email<input id="email" name="email" type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className={ic} autoComplete="email" />{errors.email ? <span className="mt-1 block text-xs text-red-400">{errors.email}</span> : null}</label>
        <label className="text-sm font-medium text-brand-300" htmlFor="phone">Teléfono / WhatsApp<input id="phone" name="phone" type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className={ic} autoComplete="tel" />{errors.phone ? <span className="mt-1 block text-xs text-red-400">{errors.phone}</span> : null}</label>
        <label className="text-sm font-medium text-brand-300" htmlFor="niche">Tipo de negocio<select id="niche" name="niche" value={formData.niche} onChange={(e) => updateField('niche', e.target.value)} className={ic}><option value="clinica-dental">Clínica dental</option><option value="clinica-estetica">Clínica estética</option><option value="academia">Academia</option><option value="restaurante">Restaurante con reservas</option><option value="ecommerce">Ecommerce pequeño</option><option value="inmobiliaria">Inmobiliaria</option><option value="hotel">Hotel pequeño</option><option value="otro">Otro</option></select></label>
        <label className="text-sm font-medium text-brand-300" htmlFor="message">Mensaje (opcional)<textarea id="message" name="message" rows={3} value={formData.message} onChange={(e) => updateField('message', e.target.value)} className={ic} /></label>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Analizar mi web'}</button>
      {feedback ? <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${status === 'error' ? 'border-red-500/20 bg-red-500/10 text-red-400' : 'border-accent-500/20 bg-accent-500/10 text-accent-400'}`} role="status">{feedback}</p> : null}
    </form>
  )
}

function ContactFormSection() {
  return (
    <section id={contactSectionId} className="relative overflow-hidden border-t border-brand-800 bg-brand-950 py-16 lg:py-24">
      <div className="absolute inset-0 bg-mesh-heavy opacity-50" />
      <div className="section-shell relative grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span variants={itemVariants} className="section-kicker">Contacto</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold leading-tight md:text-4xl">
            Analizar <span className="text-gradient-accent">mi web</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-base text-brand-400 md:text-lg">
            Indícanos tu web y tus datos. Te enviamos el informe en 48 horas. Sin compromiso.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="glass-card rounded-2xl p-6">
              <p className="font-heading text-xl font-semibold text-gradient-accent">48 horas</p>
              <p className="mt-2 text-sm text-brand-400">Desde que recibimos tu solicitud hasta que tienes el informe.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <p className="font-heading text-xl font-semibold text-gradient-accent">Sin compromiso</p>
              <p className="mt-2 text-sm text-brand-400">La auditoría es un informe. Si quieres corregir, lo haces tú o te ayudamos.</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5"
        >
          <AuditContactForm />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Demo Report ────────────────────────────────────────────────────────────

function severityColor(severity: string) {
  switch (severity) {
    case 'critical': return 'text-red-400 border-red-500/20 bg-red-500/10'
    case 'serious': return 'text-orange-400 border-orange-500/20 bg-orange-500/10'
    case 'moderate': return 'text-warn-600 border-warn-500/20 bg-warn-500/10'
    default: return 'text-brand-400 border-brand-700 bg-brand-800/50'
  }
}

function scoreColor(score: number) {
  if (score >= 90) return 'text-accent-400'
  if (score >= 50) return 'text-warn-500'
  return 'text-red-400'
}

function DemoReportPage() {
  const d = demoAudit
  return (
    <>
      <div className="section-shell pt-24">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-500">
          <a href="/" className="hover:text-white">Inicio</a><span className="mx-2">/</span><span className="text-brand-300">Ejemplo de informe</span>
        </nav>
      </div>

      <section className="py-12">
        <div className="section-shell">
          <span className="section-kicker">Demo</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Así es el <span className="text-gradient-accent">informe que recibirás</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-brand-400 md:text-lg">Ejemplo ficticio para "Clínica Demo". No usa datos reales. Te muestra qué recibes al contratar una auditoría express.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="section-shell">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">Auditoría de accesibilidad</p>
                <p className="mt-2 font-heading text-2xl font-semibold text-white">{d.company}</p>
                <p className="text-sm text-brand-500">{d.url}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-500">Score general</p>
                <p className={`font-heading text-6xl font-bold ${scoreColor(d.scores.accessibility)}`}>{d.scores.accessibility}</p>
                <p className="text-sm text-brand-500">Nivel de riesgo: <span className="font-semibold text-warn-500">{d.riskLevel}</span></p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(d.scores).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-brand-800 bg-brand-900/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-500">{key === 'bestPractices' ? 'Best Practices' : key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className={`mt-2 font-heading text-3xl font-bold ${scoreColor(value)}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3"><p className="text-xs text-brand-500">Críticos</p><p className="text-xl font-bold text-red-400">{d.summary.critical}</p></div>
              <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-3"><p className="text-xs text-brand-500">Serios</p><p className="text-xl font-bold text-orange-400">{d.summary.serious}</p></div>
              <div className="rounded-lg border border-warn-500/20 bg-warn-500/10 px-4 py-3"><p className="text-xs text-brand-500">Moderados</p><p className="text-xl font-bold text-warn-500">{d.summary.moderate}</p></div>
              <div className="rounded-lg border border-brand-700 bg-brand-800/50 px-4 py-3"><p className="text-xs text-brand-500">Menores</p><p className="text-xl font-bold text-brand-400">{d.summary.minor}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-shell">
          <h2 className="text-3xl font-semibold text-white">Problemas detectados</h2>
          <p className="mt-3 text-sm text-brand-400">Ordenados por severidad e impacto en usuarios.</p>
          <div className="mt-8 space-y-4">
            {d.issues.map((issue, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${severityColor(issue.severity)}`}>{issue.severity}</span>
                  <span className="rounded-full border border-brand-700 bg-brand-800/50 px-3 py-1 text-xs font-medium text-brand-400">{issue.type}</span>
                  <p className="font-heading text-lg font-semibold text-white">{issue.title}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-400">{issue.description}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Selector</p><code className="mt-1 block text-sm text-electric-400">{issue.selector}</code></div>
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Impacto</p><p className="mt-1 text-sm text-brand-400">{issue.impact}</p></div>
                </div>
                <div className="mt-4 rounded-xl border border-accent-500/20 bg-accent-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-400">Recomendación</p>
                  <p className="mt-1 text-sm text-brand-300">{issue.recommendation}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-shell">
          <div className="rounded-2xl border border-warn-500/20 bg-warn-100/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warn-600">Limitaciones del análisis</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-400">Este informe combina análisis automatizado y explicación asistida por IA. No sustituye una auditoría legal completa ni pruebas manuales exhaustivas, pero ayuda a detectar y priorizar problemas frecuentes de accesibilidad web.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-shell text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">¿Quieres este informe para tu web?</h2>
          <p className="mt-4 text-sm text-brand-400">Auditoría express por 149€. Informe en 48h.</p>
          <a href="/contacto" className="btn-primary mt-6 inline-flex group">
            Solicitar auditoría express
            <ArrowIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </>
  )
}

// ─── Pricing Page ───────────────────────────────────────────────────────────

function PricingPage() {
  return (
    <>
      <section className="bg-brand-950 bg-mesh pt-32 pb-12">
        <div className="section-shell">
          <span className="section-kicker">Precios</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Precios claros. <span className="text-gradient-accent">Sin sorpresas.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-brand-400 md:text-lg">Empieza con una auditoría express por 149€. Si quieres mantener tu web controlada mes a mes, añade mantenimiento por 49€/mes.</p>
        </div>
      </section>
      <PricingSection />
      <DisclaimerSection />
      <section className="bg-brand-950 py-12">
        <div className="section-shell text-center">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">¿Tienes dudas?</h2>
          <p className="mt-3 text-sm text-brand-400">Escríbenos y te respondemos en 24h.</p>
          <a href="/contacto" className="btn-primary mt-6 inline-flex">Contactar</a>
        </div>
      </section>
    </>
  )
}

// ─── Contact Page ───────────────────────────────────────────────────────────

function ContactPage() {
  return (
    <>
      <section className="bg-brand-950 bg-mesh pt-32 pb-12">
        <div className="section-shell">
          <span className="section-kicker">Contacto</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Solicita tu <span className="text-gradient-accent">auditoría express</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-brand-400 md:text-lg">Indícanos tu web y tus datos de contacto. Te enviamos el informe en 48 horas con los problemas detectados, prioridades y recomendaciones claras.</p>
        </div>
      </section>
      <ContactFormSection />
    </>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  if (!faqs.length) return null
  return (
    <section id="faq" className="relative overflow-hidden bg-brand-900/50 py-16 lg:py-24">
      <div className="section-shell relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span variants={itemVariants} className="section-kicker">FAQ</motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl font-semibold md:text-4xl">Preguntas frecuentes</motion.h2>
        </motion.div>
        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <p className="font-heading text-base font-semibold text-white">{faq.question}</p>
                <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-400 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-brand-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────

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
    <div className="relative isolate min-h-screen overflow-x-hidden bg-brand-950 pb-20 md:pb-0">
      <Header currentPage={currentPage} />

      <main>
        {currentPage.path === '/' && (
          <>
            <Hero page={currentPage} />
            <TrustBar />
            <ProblemSection />
            <WhatWeReviewSection />
            <HowItWorksSection />
            <WhatWeDeliverSection />
            <PricingSection />
            <TestimonialsSection />
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
