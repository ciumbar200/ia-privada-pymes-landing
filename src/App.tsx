import { useEffect, useState, type ReactNode } from 'react'
import { ApolloInboundLoader } from './components/ApolloInboundLoader'
import { Footer } from './components/Footer'
import { DigitalTeamDiagram } from './components/DigitalTeamDiagram'
import { DiagramFormModal } from './components/DiagramFormModal'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { MeetingBar } from './components/MeetingBar'
import { FaqItem } from './components/FaqItem'
import { LeadForm } from './components/LeadForm'
import { MobileStickyCta } from './components/MobileStickyCta'
import { Pricing } from './components/Pricing'
import { SeoStructuredData } from './components/SeoStructuredData'
import { WhatsAppQuickContact } from './components/WhatsAppQuickContact'
import {
  allPages,
  brandName,
  contactSectionId,
  featuredResources,
  footerLinkGroups,
  homePage,
  nicheLinks,
  pagesByPath,
  primaryNav,
  resourceCategories,
  siteUrl,
  whatsappShortMessage,
  type LinkEntry,
  type PageData,
} from './data/content'
import { useLanguage } from './i18n/LanguageContext'
import {
  allPagesEn,
  featuredResourcesEn,
  footerLinkGroupsEn,
  homePageEn,
  nicheLinkEn,
  pagesByPathEn,
  primaryNavEn,
  resourceCategoriesEn,
  whatsappShortMessageEn,
} from './i18n/content-en'
import { ui } from './i18n/ui'
import { trackEvent } from './lib/analytics'

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function upsertMetaAttribute(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function SectionBlock({
  id,
  eyebrow,
  title,
  intro,
  children,
  subdued = false,
}: {
  id?: string
  eyebrow?: string
  title: string
  intro: string
  children: ReactNode
  subdued?: boolean
}) {
  return (
    <section id={id} className={`py-16 lg:py-20 ${subdued ? 'bg-white/70' : ''}`}>
      <div className="section-shell">
        <div className="max-w-3xl">
          {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
          <h2 className="max-w-4xl text-3xl leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">{intro}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function LinkCard({ link }: { link: LinkEntry }) {
  const { lang } = useLanguage()
  const t = ui[lang]
  return (
    <a
      href={link.href}
      className="group block rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-elevated"
    >
      <p className="font-heading text-xl text-brand-950">{link.label}</p>
      {link.description ? <p className="mt-3 text-sm leading-relaxed text-graphite-700">{link.description}</p> : null}
      <span className="mt-5 inline-flex text-sm font-semibold text-action-700">{t.navEnter}</span>
    </a>
  )
}

function Header({
  currentPage,
  nav,
  onOpenDiagnosisModal,
}: {
  currentPage: PageData
  nav: typeof primaryNav
  onOpenDiagnosisModal: () => void
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang } = useLanguage()
  const t = ui[lang]

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function resolveNavHref(href: string) {
    if (href.startsWith('/#')) {
      return currentPage.path === '/' ? href.slice(1) : href
    }

    return href
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b border-white/70 bg-white/92 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a
          href="/"
          className="inline-flex min-w-0 items-center font-heading text-base font-semibold tracking-tight text-brand-950"
          aria-label={`${brandName} - ${t.navAriaLogo}`}
        >
          {brandName}
        </a>

        <nav className="hidden items-center gap-2 lg:flex" aria-label={t.navAriaMain}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={resolveNavHref(item.href)}
              aria-current={currentPage.path === item.href ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition hover:text-brand-950 ${
                currentPage.path === item.href ? 'bg-brand-100 text-brand-950' : 'text-graphite-700 hover:bg-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href="/precios"
            className="btn-secondary"
            onClick={() => trackEvent('cta_click', { location: 'nav', type: 'secondary' })}
          >
            {t.navPricing}
          </a>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              trackEvent('cta_click', { location: 'nav', type: 'primary' })
              onOpenDiagnosisModal()
            }}
          >
            {t.navDiagnosis}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-action-500 px-3 py-2 text-xs font-semibold text-white shadow-cta"
            onClick={() => {
              trackEvent('cta_click', { location: 'mobile_top', type: 'primary' })
              onOpenDiagnosisModal()
            }}
          >
            {t.navDiagnosisShort}
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-900 shadow-soft"
            onClick={() => setOpen((state) => !state)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {t.navMenu}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-brand-100 bg-white/95 shadow-soft lg:hidden">
          <nav className="section-shell flex flex-col gap-3 py-4" aria-label={t.navAriaMobile}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={resolveNavHref(item.href)}
                className={`rounded-xl px-3 py-2 text-sm font-medium ${
                  currentPage.path === item.href ? 'bg-brand-100 text-brand-950' : 'text-graphite-700'
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/precios"
              className="btn-secondary"
              onClick={() => {
                trackEvent('cta_click', { location: 'mobile_nav', type: 'secondary' })
                setOpen(false)
              }}
            >
              {t.navPricing}
            </a>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                trackEvent('cta_click', { location: 'mobile_nav', type: 'primary' })
                setOpen(false)
                onOpenDiagnosisModal()
              }}
            >
              {t.navDiagnosis}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function MetricsStrip({ stats }: { stats: NonNullable<PageData['stats']> }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={`${stat.label}-${stat.value}`}
          className="rounded-[1.5rem] border border-white/80 bg-white/92 p-5 shadow-soft"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{stat.label}</p>
          <p className="mt-3 font-heading text-2xl text-brand-950">{stat.value}</p>
        </article>
      ))}
    </div>
  )
}

function HomePage({ page, niches, resources }: { page: PageData; niches: typeof nicheLinks; resources: typeof featuredResources }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { lang } = useLanguage()
  const t = ui[lang]
  const stats = page.stats || []
  const examples = page.examples || []
  const problemPoints = page.problemPoints || []
  const deliverables = page.deliverables || []
  const outcomes = page.outcomes || []
  const process = page.process || []
  const pricingNotes = page.pricingNotes || []

  return (
    <>
      {stats.length > 0 ? (
        <section className="py-8">
          <div className="section-shell">
            <MetricsStrip stats={stats} />
          </div>
        </section>
      ) : null}

      {page.teamDiagram ? (
        <section className="py-10 lg:py-14">
          <div className="section-shell">
            <DiagramFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
            <DigitalTeamDiagram
              diagram={page.teamDiagram}
              pagePath="/"
              onCtaClick={() => setModalOpen(true)}
            />
          </div>
        </section>
      ) : null}

      <SectionBlock
        eyebrow={t.eyebrowWhatIs}
        title={page.solutionTitle || ''}
        intro={page.solutionIntro || ''}
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">{t.darkCardDigitalTeam}</p>
            <ul className="mt-6 space-y-4">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-50">
                  <span className="mt-2 h-2 w-2 rounded-full bg-action-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {outcomes.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="problema"
        eyebrow={t.eyebrowProblem}
        title={page.problemTitle || ''}
        intro={page.problemIntro || ''}
        subdued
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {problemPoints.map((point) => (
            <article key={point} className="rounded-[1.6rem] border border-white/70 bg-white/88 p-5 shadow-soft">
              <p className="text-sm leading-relaxed text-graphite-700">{point}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="como-funciona"
        eyebrow={t.eyebrowHowItWorks}
        title={page.processTitle || ''}
        intro={t.introHomeHowItWorks}
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {process.map((step, index) => (
            <article key={step} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-action-700">{t.stepPrefix} {index + 1}</p>
              <p className="mt-4 text-sm leading-relaxed text-graphite-700">{step}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow={t.eyebrowWhatCovers}
        title={page.examplesTitle || ''}
        intro={page.examplesIntro || ''}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {examples.map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
              <p className="font-heading text-xl text-brand-950">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="sectores"
        eyebrow={t.eyebrowSectors}
        title={t.titleSectors}
        intro={t.introSectors}
        subdued
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {niches.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="precios"
        eyebrow={t.eyebrowPricing}
        title={page.pricingTitle || ''}
        intro={page.pricingIntro || ''}
      >
        <Pricing plans={page.pricingPlans || []} compact onCtaClick={() => setModalOpen(true)} />
        {pricingNotes.length > 0 ? (
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {pricingNotes.map((note) => (
              <article key={note} className="rounded-[1.35rem] border border-white/80 bg-white/92 p-4 text-sm leading-relaxed text-graphite-700 shadow-soft">
                {note}
              </article>
            ))}
          </div>
        ) : null}
      </SectionBlock>

      <SectionBlock
        eyebrow={t.eyebrowResources}
        title={t.introHomeResources}
        intro={t.introHomeResourcesSub}
        subdued
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {resources.map((post) => (
            <LinkCard key={post.path} link={{ href: post.path, label: post.title, description: post.excerpt }} />
          ))}
        </div>
      </SectionBlock>
    </>
  )
}

function ServicePage({ page }: { page: PageData }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { lang } = useLanguage()
  const t = ui[lang]

  return (
    <>
      <div className="section-shell pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-graphite-600">
          <a href="/" className="hover:text-brand-900">{t.breadcrumbHome}</a>
          <span className="mx-2">/</span>
          <span>{page.label}</span>
        </nav>
      </div>

      {page.stats ? (
        <section className="py-8">
          <div className="section-shell">
            <MetricsStrip stats={page.stats} />
          </div>
        </section>
      ) : null}

      <SectionBlock eyebrow={t.eyebrowProblem} title={page.problemTitle || ''} intro={page.problemIntro || ''}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(page.problemPoints || []).map((point) => (
            <article key={point} className="rounded-[1.6rem] border border-white/70 bg-white/88 p-6 shadow-soft">
              <p className="text-sm leading-relaxed text-graphite-700">{point}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow={t.eyebrowWhatIncludes} title={page.solutionTitle || ''} intro={page.solutionIntro || ''} subdued>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">{t.darkCardIncludes}</p>
            <ul className="mt-6 space-y-4">
              {(page.deliverables || []).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-50">
                  <span className="mt-2 h-2 w-2 rounded-full bg-action-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {(page.outcomes || []).map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionBlock>

      {page.teamDiagram ? (
        <section className="py-16 lg:py-20">
          <div className="section-shell">
            <DiagramFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
            <DigitalTeamDiagram
              diagram={page.teamDiagram}
              pagePath={page.path}
              onCtaClick={() => setModalOpen(true)}
            />
          </div>
        </section>
      ) : null}

      {page.processTitle ? (
        <SectionBlock eyebrow={t.eyebrowImplementation} title={page.processTitle} intro={t.introImplementation}>
          <div className="grid gap-4 lg:grid-cols-4">
            {(page.process || []).map((step, index) => (
              <article key={step} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-action-700">{t.stepPrefix} {index + 1}</p>
                <p className="mt-4 text-sm leading-relaxed text-graphite-700">{step}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {page.examplesTitle ? (
        <SectionBlock eyebrow={t.eyebrowConcreteCases} title={page.examplesTitle} intro={page.examplesIntro || ''} subdued>
          <div className="grid gap-4 lg:grid-cols-3">
            {(page.examples || []).map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {page.objections && page.objections.length > 0 ? (
        <SectionBlock eyebrow={t.eyebrowObjections} title={page.objectionsTitle || t.eyebrowObjections} intro={t.introObjections}>
          <div className="grid gap-4 md:grid-cols-3">
            {page.objections.map((item) => (
              <article key={item} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="text-sm leading-relaxed text-graphite-700">{item}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {page.relatedLinks.length > 0 ? (
        <SectionBlock title={t.titleRelatedPages} intro={t.introRelatedService} subdued>
          <div className="grid gap-5 lg:grid-cols-3">
            {page.relatedLinks.map((link) => (
              <LinkCard key={`${page.path}-${link.href}`} link={link} />
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </>
  )
}

function NichePage({ page }: { page: PageData }) {
  const { lang } = useLanguage()
  const t = ui[lang]

  return (
    <>
      <div className="section-shell pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-graphite-600">
          <a href="/" className="hover:text-brand-900">{t.breadcrumbHome}</a>
          <span className="mx-2">/</span>
          <span>{page.label}</span>
        </nav>
      </div>

      {page.stats ? (
        <section className="py-8">
          <div className="section-shell">
            <MetricsStrip stats={page.stats} />
          </div>
        </section>
      ) : null}

      <SectionBlock eyebrow={t.eyebrowSectorPain} title={page.problemTitle || ''} intro={page.problemIntro || ''}>
        <div className="grid gap-4 md:grid-cols-2">
          {(page.problemPoints || []).map((point) => (
            <article key={point} className="rounded-[1.6rem] border border-white/70 bg-white/88 p-6 shadow-soft">
              <p className="text-sm leading-relaxed text-graphite-700">{point}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      {page.teamDiagram ? (
        <section className="pb-16 lg:pb-20">
          <div className="section-shell">
            <DigitalTeamDiagram diagram={page.teamDiagram} pagePath={page.path} />
          </div>
        </section>
      ) : null}

      {page.examplesTitle ? (
        <SectionBlock eyebrow={t.eyebrowVerticalExamples} title={page.examplesTitle} intro={page.examplesIntro || ''} subdued>
          <div className="grid gap-4 lg:grid-cols-3">
            {(page.examples || []).map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      <SectionBlock eyebrow={t.eyebrowWhatDigitalTeam} title={page.solutionTitle || ''} intro={page.solutionIntro || ''}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">{t.darkCardDigitalTeam}</p>
            <ul className="mt-6 space-y-4">
              {(page.deliverables || []).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-50">
                  <span className="mt-2 h-2 w-2 rounded-full bg-action-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {(page.outcomes || []).map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionBlock>

      {page.fitTitle ? (
        <SectionBlock eyebrow={t.eyebrowFit} title={page.fitTitle} intro={t.introNicheFit} subdued>
          <div className="grid gap-4 md:grid-cols-3">
            {(page.fitPoints || []).map((point) => (
              <article key={point} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="text-sm leading-relaxed text-graphite-700">{point}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {page.relatedLinks.length > 0 ? (
        <SectionBlock title={t.titleNextStep} intro={t.introNicheRelated}>
          <div className="grid gap-5 lg:grid-cols-3">
            {page.relatedLinks.map((link) => (
              <LinkCard key={`${page.path}-${link.href}`} link={link} />
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </>
  )
}

function PricingPage({ page }: { page: PageData }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { lang } = useLanguage()
  const t = ui[lang]

  return (
    <>
      <DiagramFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <SectionBlock eyebrow={t.eyebrowPlans} title={page.pricingTitle || ''} intro={page.pricingIntro || ''}>
        <Pricing plans={page.pricingPlans || []} onCtaClick={() => setModalOpen(true)} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(page.pricingNotes || []).map((note) => (
            <article key={note} className="rounded-[1.35rem] border border-white/80 bg-white/92 p-4 text-sm leading-relaxed text-graphite-700 shadow-soft">
              {note}
            </article>
          ))}
        </div>
      </SectionBlock>

      {page.examplesTitle ? (
        <SectionBlock eyebrow={t.eyebrowHowToChoose} title={page.examplesTitle} intro={page.examplesIntro || ''} subdued>
          <div className="grid gap-4 md:grid-cols-3">
            {(page.examples || []).map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {page.relatedLinks.length > 0 ? (
        <SectionBlock title={t.titleRelatedPages} intro={t.introPricingRelated}>
          <div className="grid gap-5 lg:grid-cols-3">
            {page.relatedLinks.map((link) => (
              <LinkCard key={`${page.path}-${link.href}`} link={link} />
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </>
  )
}

function ResourcesPage({ page, categories }: { page: PageData; categories: typeof resourceCategories }) {
  const { lang } = useLanguage()
  const t = ui[lang]

  return (
    <>
      <SectionBlock eyebrow={t.eyebrowCategories} title={t.titleResourcesHub} intro={t.introResourcesHub}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(page.resourceCategories || categories).map((category) => (
            <article key={category.name} className="rounded-[1.6rem] border border-white/80 bg-white/92 p-6 shadow-soft">
              <p className="font-heading text-xl text-brand-950">{category.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-graphite-700">{category.description}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow={t.eyebrowFeaturedArticles} title={t.titleResourcesArticles} intro={t.introResourcesArticles} subdued>
        <div className="grid gap-5 lg:grid-cols-3">
          {(page.resourcePosts || []).map((post) => (
            <a key={post.path} href={post.path} className="group block rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-elevated">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{post.category}</p>
              <p className="mt-3 font-heading text-2xl text-brand-950">{post.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-graphite-700">{post.excerpt}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-action-700">{post.intent}</p>
            </a>
          ))}
        </div>
      </SectionBlock>

      {page.examplesTitle ? (
        <SectionBlock eyebrow={t.eyebrowInternalLinks} title={page.examplesTitle} intro={page.examplesIntro || ''}>
          <div className="grid gap-4 lg:grid-cols-3">
            {(page.examples || []).map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">{item.description}</p>
              </article>
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </>
  )
}

function ArticlePage({ page }: { page: PageData }) {
  const { lang } = useLanguage()
  const t = ui[lang]

  return (
    <>
      <div className="section-shell pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-graphite-600">
          <a href="/" className="hover:text-brand-900">{t.breadcrumbHome}</a>
          <span className="mx-2">/</span>
          <a href="/recursos" className="hover:text-brand-900">{t.breadcrumbResources}</a>
          <span className="mx-2">/</span>
          <span>{page.label}</span>
        </nav>
      </div>

      <section className="py-16 lg:py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[1fr_18rem]">
          <article className="space-y-10">
            {(page.articleSections || []).map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl leading-tight md:text-4xl">{section.title}</h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-graphite-700 md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="space-y-4">
            <article className="rounded-[1.6rem] border border-white/80 bg-white/92 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{t.articleAsideCategory}</p>
              <p className="mt-3 font-heading text-xl text-brand-950">{page.articleCategory}</p>
            </article>
            <article className="rounded-[1.6rem] border border-white/80 bg-white/92 p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{t.articleAsideCta}</p>
              <p className="mt-3 text-sm leading-relaxed text-graphite-700">{t.articleAsideCtaText}</p>
              <a href="/como-funciona" className="btn-primary mt-5 w-full">{t.articleAsideCtaButton}</a>
            </article>
          </aside>
        </div>
      </section>

      {page.relatedLinks.length > 0 ? (
        <SectionBlock title={t.titleKeepReading} intro={t.introArticleRelated}>
          <div className="grid gap-5 lg:grid-cols-3">
            {page.relatedLinks.map((link) => (
              <LinkCard key={`${page.path}-${link.href}`} link={link} />
            ))}
          </div>
        </SectionBlock>
      ) : null}
    </>
  )
}

function App() {
  const { lang } = useLanguage()
  const t = ui[lang]
  const isEn = lang === 'en'
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false)

  const activePagesByPath = isEn ? pagesByPathEn : pagesByPath
  const activeHome = isEn ? homePageEn : homePage
  const activeAllPages = isEn ? allPagesEn : allPages
  const activeNav = isEn ? primaryNavEn : primaryNav
  const activeNiches = isEn ? nicheLinkEn : nicheLinks
  const activeResources = isEn ? featuredResourcesEn : featuredResources
  const activeCategories = isEn ? resourceCategoriesEn : resourceCategories
  const activeFooterLinks = isEn ? footerLinkGroupsEn : footerLinkGroups
  const activeWhatsappMessage = isEn ? whatsappShortMessageEn : whatsappShortMessage

  const currentPath = normalizePath(window.location.pathname)
  const currentPage = activePagesByPath[currentPath] ?? activeHome

  function openDiagnosisModal() {
    setDiagnosticModalOpen(true)
  }

  function isContactHref(href: string) {
    return href === '#contacto' || href === '/#contacto'
  }

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${currentPage.path === '/' ? '' : currentPage.path}`

    document.title = currentPage.title
    upsertMetaAttribute('name', 'description', currentPage.metaDescription)
    upsertMetaAttribute('name', 'robots', 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1')
    upsertMetaAttribute('name', 'author', brandName)
    upsertMetaAttribute('property', 'og:type', 'website')
    upsertMetaAttribute('property', 'og:locale', isEn ? 'en_US' : 'es_ES')
    upsertMetaAttribute('property', 'og:site_name', brandName)
    upsertMetaAttribute('property', 'og:title', currentPage.title)
    upsertMetaAttribute('property', 'og:description', currentPage.metaDescription)
    upsertMetaAttribute('property', 'og:url', canonicalUrl)
    upsertMetaAttribute('name', 'twitter:card', 'summary_large_image')
    upsertMetaAttribute('name', 'twitter:title', currentPage.title)
    upsertMetaAttribute('name', 'twitter:description', currentPage.metaDescription)
    upsertLink('canonical', canonicalUrl)
  }, [currentPage, isEn])

  return (
    <div className="relative isolate overflow-x-hidden pb-24 md:pb-0">
      <ApolloInboundLoader />
      <SeoStructuredData currentPage={currentPage} allPages={activeAllPages} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-brand-200/35 via-brand-100/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-action-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
        aria-hidden="true"
      />

      <Header currentPage={currentPage} nav={activeNav} onOpenDiagnosisModal={openDiagnosisModal} />
      <div aria-hidden="true" className="h-16" />

      <div className="border-b border-action-100 bg-gradient-to-r from-action-50 to-brand-50">
        <div className="section-shell flex flex-col gap-2 py-3 text-center text-sm font-medium text-graphite-700 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <span className="pill-urgent">{t.pillLeads}</span>
          <span className="pill-trust">{t.pillPricing}</span>
        </div>
      </div>

      <header id="hero" className="relative overflow-hidden border-b border-white/70 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-faint opacity-40" aria-hidden="true" />
        <div className="section-shell grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <span className="section-kicker">{currentPage.hero.eyebrow}</span>
            <h1 className="max-w-4xl text-4xl leading-tight md:text-5xl lg:text-6xl">{currentPage.h1}</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">
              {currentPage.hero.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isContactHref(currentPage.hero.primaryCtaHref) ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    trackEvent('cta_click', { location: 'hero', type: 'primary', page: currentPage.path })
                    openDiagnosisModal()
                  }}
                >
                  {currentPage.hero.primaryCtaLabel}
                </button>
              ) : (
                <a
                  href={currentPage.hero.primaryCtaHref}
                  className="btn-primary"
                  onClick={() => trackEvent('cta_click', { location: 'hero', type: 'primary', page: currentPage.path })}
                >
                  {currentPage.hero.primaryCtaLabel}
                </a>
              )}
              {isContactHref(currentPage.hero.secondaryCtaHref) ? (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    trackEvent('cta_click', { location: 'hero', type: 'secondary', page: currentPage.path })
                    openDiagnosisModal()
                  }}
                >
                  {currentPage.hero.secondaryCtaLabel}
                </button>
              ) : (
                <a
                  href={currentPage.hero.secondaryCtaHref}
                  className="btn-secondary"
                  onClick={() => trackEvent('cta_click', { location: 'hero', type: 'secondary', page: currentPage.path })}
                >
                  {currentPage.hero.secondaryCtaLabel}
                </a>
              )}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {currentPage.hero.bullets.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.35rem] border border-white/80 bg-white/90 px-4 py-4 text-sm font-semibold text-brand-900 shadow-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">{currentPage.heroPanel.label}</p>
            <h2 className="mt-4 text-3xl text-white">{currentPage.heroPanel.title}</h2>
            <div className="mt-7 space-y-5">
              {currentPage.heroPanel.items.map((item, index) => (
                <div key={item.title} className={index < currentPage.heroPanel.items.length - 1 ? 'border-b border-white/10 pb-5' : ''}>
                  <p className="text-sm font-semibold text-action-300">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-100">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentPage.kind === 'home' ? <HomePage page={currentPage} niches={activeNiches} resources={activeResources} /> : null}
        {currentPage.kind === 'service' ? <ServicePage page={currentPage} /> : null}
        {currentPage.kind === 'niche' ? <NichePage page={currentPage} /> : null}
        {currentPage.kind === 'pricing' ? <PricingPage page={currentPage} /> : null}
        {currentPage.kind === 'resources' ? <ResourcesPage page={currentPage} categories={activeCategories} /> : null}
        {currentPage.kind === 'article' ? <ArticlePage page={currentPage} /> : null}
      </main>

      <SectionBlock
        id="faq"
        eyebrow={t.eyebrowFaq}
        title={t.titleFaq}
        intro={t.introFaq}
        subdued
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {currentPage.faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </SectionBlock>

      <section id={contactSectionId} className="border-t border-white/70 py-16 lg:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="section-kicker">{t.eyebrowDiagnosis}</span>
            <h2 className="max-w-3xl text-3xl leading-tight md:text-4xl">
              {t.titleDiagnosis}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite-700 md:text-lg">
              {t.diagnosisDesc}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.6rem] border border-white/80 bg-white/90 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{t.diagnosisCard1Title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">
                  {t.diagnosisCard1Desc}
                </p>
              </article>
              <article className="rounded-[1.6rem] border border-white/80 bg-white/90 p-6 shadow-soft">
                <p className="font-heading text-xl text-brand-950">{t.diagnosisCard2Title}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-700">
                  {t.diagnosisCard2Desc}
                </p>
              </article>
            </div>
          </div>

          <div className="grid gap-5">
            <LeadForm />
            <WhatsAppQuickContact shortMessage={activeWhatsappMessage} />
          </div>
        </div>
      </section>

      <Footer brand={brandName} linkGroups={activeFooterLinks} />
      <MobileStickyCta onOpenDiagnosisModal={openDiagnosisModal} />
      <MeetingBar />
      <DiagramFormModal open={diagnosticModalOpen} onClose={() => setDiagnosticModalOpen(false)} />
    </div>
  )
}

export default App
