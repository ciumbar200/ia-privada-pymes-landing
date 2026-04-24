import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import * as ts from 'typescript'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const contentPath = path.join(rootDir, 'src/data/content.ts')
const templatePath = path.join(distDir, 'index.html')

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttr(value = '') {
  return escapeHtml(value)
}

async function readContent() {
  const source = await fs.readFile(contentPath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: contentPath,
  }).outputText

  const exportsObject = {}
  const require = createRequire(import.meta.url)
  const sandbox = {
    exports: exportsObject,
    module: { exports: exportsObject },
    require,
    console,
    process,
    __filename: contentPath,
    __dirname: path.dirname(contentPath),
  }

  vm.runInNewContext(transpiled, sandbox, { filename: contentPath })
  return sandbox.module.exports
}

function canonicalUrl(siteUrl, pagePath) {
  return `${siteUrl}${pagePath === '/' ? '/' : pagePath}`
}

function renderLinkList(links) {
  if (!links?.length) return ''

  return `
    <div class="grid gap-4 lg:grid-cols-3">
      ${links
        .map(
          (link) => `
            <a href="${escapeAttr(link.href)}" class="group block rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-elevated">
              <p class="font-heading text-xl text-brand-950">${escapeHtml(link.label)}</p>
              ${link.description ? `<p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(link.description)}</p>` : ''}
              <span class="mt-5 inline-flex text-sm font-semibold text-action-700">Entrar</span>
            </a>
          `,
        )
        .join('')}
    </div>
  `
}

function renderMetrics(stats) {
  if (!stats?.length) return ''

  return `
    <div class="grid gap-3 md:grid-cols-3">
      ${stats
        .map(
          (stat) => `
            <article class="rounded-[1.5rem] border border-white/80 bg-white/92 p-5 shadow-soft">
              <p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">${escapeHtml(stat.label)}</p>
              <p class="mt-3 font-heading text-2xl text-brand-950">${escapeHtml(stat.value)}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `
}

function renderFaqs(faqs) {
  if (!faqs?.length) return ''

  return `
    <section class="py-16 lg:py-20">
      <div class="section-shell">
        <div class="max-w-3xl">
          <span class="section-kicker">FAQ</span>
          <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">Preguntas frecuentes</h2>
          <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">
            Respuestas cortas para resolver objeciones reales y reforzar la decisión comercial.
          </p>
        </div>
        <div class="mt-10 grid gap-4 lg:grid-cols-2">
          ${faqs
            .map(
              (faq) => `
                <article class="surface-card p-6">
                  <p class="font-heading text-xl text-brand-950">${escapeHtml(faq.question)}</p>
                  <p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(faq.answer)}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `
}

function renderTeamDiagram(diagram) {
  if (!diagram) return ''

  return `
    <section class="py-16 lg:py-20">
      <div class="section-shell">
        <div class="max-w-3xl">
          <span class="section-kicker">Mira cómo trabaja el equipo</span>
          <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(diagram.title)}</h2>
          <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(diagram.subtitle)}</p>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="space-y-6">
            <article class="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">Rol central</p>
              <p class="mt-3 font-heading text-2xl text-white">${escapeHtml(diagram.centralRole.title)}</p>
              <p class="mt-3 text-sm leading-relaxed text-brand-50">${escapeHtml(diagram.centralRole.summary)}</p>
              <p class="mt-4 text-sm leading-relaxed text-brand-100">${escapeHtml(diagram.centralRole.example)}</p>
              <p class="mt-4 text-sm font-semibold text-action-300">${escapeHtml(diagram.centralRole.benefit)}</p>
            </article>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              ${diagram.roles
                .map(
                  (role) => `
                    <article class="surface-card p-5">
                      <span class="inline-flex rounded-full bg-brand-100 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-700">${escapeHtml(role.tag)}</span>
                      <p class="mt-4 font-heading text-xl text-brand-950">${escapeHtml(role.title)}</p>
                      <p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(role.summary)}</p>
                      <p class="mt-4 text-sm leading-relaxed text-graphite-700">${escapeHtml(role.example)}</p>
                      <p class="mt-4 text-sm font-semibold text-action-700">${escapeHtml(role.benefit)}</p>
                    </article>
                  `,
                )
                .join('')}
            </div>
          </div>

          <aside class="surface-card overflow-hidden">
            <div class="border-b border-brand-100 bg-brand-950 px-6 py-5 text-white">
              <p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand-200">Qué aporta</p>
              <p class="mt-3 font-heading text-2xl text-white">Un equipo digital que trabaja cada lead</p>
            </div>
            <div class="space-y-5 px-6 py-6">
              <p class="text-sm leading-relaxed text-graphite-700">${escapeHtml(diagram.supportText)}</p>
              <a href="${escapeAttr(diagram.ctaHref)}" class="btn-primary w-full">${escapeHtml(diagram.ctaLabel)}</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `
}

function renderPricingCards(plans) {
  if (!plans?.length) return ''

  return `
    <div class="grid gap-5 lg:grid-cols-3">
      ${plans
        .map(
          (plan) => `
            <article class="rounded-[1.9rem] border ${plan.featured ? 'border-action-300 bg-action-50/60' : 'border-white/80 bg-white/92'} p-6 shadow-soft">
              <p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">${escapeHtml(plan.tagline)}</p>
              <h3 class="mt-3 font-heading text-2xl text-brand-950">${escapeHtml(plan.name)}</h3>
              <p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(plan.summary)}</p>
              <div class="mt-5 flex items-end gap-3">
                <p class="font-heading text-2xl text-brand-950">${escapeHtml(plan.setupPrice)}</p>
                <p class="text-sm font-semibold text-action-700">${escapeHtml(plan.monthlyPrice)}</p>
              </div>
              <p class="mt-4 text-sm leading-relaxed text-graphite-700">${escapeHtml(plan.idealFor)}</p>
              <ul class="mt-5 space-y-3">
                ${plan.features.map((feature) => `<li class="flex gap-3 text-sm leading-relaxed text-graphite-700"><span class="mt-2 h-2 w-2 rounded-full bg-action-400"></span><span>${escapeHtml(feature)}</span></li>`).join('')}
              </ul>
              <p class="mt-5 text-sm leading-relaxed text-graphite-700">${escapeHtml(plan.pricingLogic)}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `
}

function renderStaticHeader(primaryNav, page) {
  return `
    <header class="border-b border-white/70 bg-white/92 backdrop-blur">
      <div class="section-shell flex h-16 items-center justify-between gap-4">
        <a href="/" class="inline-flex min-w-0 items-center font-heading text-base font-semibold tracking-tight text-brand-950" aria-label="Noxo AI Empresas - Inicio">
          Noxo AI Empresas
        </a>
        <nav class="hidden items-center gap-2 lg:flex" aria-label="Navegación principal">
          ${primaryNav
            .map(
              (item) => `
                <a href="${escapeAttr(item.href)}" class="rounded-full px-4 py-2 text-sm font-medium text-graphite-700 hover:bg-white hover:text-brand-950">${escapeHtml(item.label)}</a>
              `,
            )
            .join('')}
        </nav>
        <div class="hidden items-center gap-3 lg:flex">
          <a href="/precios" class="btn-secondary">Ver precios</a>
          <a href="${page.path === '/' ? '#contacto' : '/#contacto'}" class="btn-primary">Solicitar diagnóstico</a>
        </div>
      </div>
    </header>
  `
}

function renderStaticFooter(footerLinkGroups, brandName) {
  return `
    <footer class="border-t border-white/70 bg-white/80 py-10">
      <div class="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p class="font-heading text-xl text-brand-950">${escapeHtml(brandName)}</p>
          <p class="mt-3 max-w-xl text-sm leading-relaxed text-graphite-600">Sistema de captación, seguimiento y cierre de leads para coliving, alquiler flexible y property managers.</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          ${footerLinkGroups
            .map(
              (group) => `
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">${escapeHtml(group.title)}</p>
                  <div class="mt-4 space-y-3">
                    ${group.links
                      .map(
                        (link) => `
                          <a href="${escapeAttr(link.href)}" class="block text-sm text-graphite-700 hover:text-brand-950">${escapeHtml(link.label)}</a>
                        `,
                      )
                      .join('')}
                  </div>
                </div>
              `,
            )
            .join('')}
        </div>
      </div>
    </footer>
  `
}

function renderPageBody(page, content) {
  const canonical = canonicalUrl(content.siteUrl, page.path)
  const primaryNav = content.primaryNav
  const footerLinkGroups = content.footerLinkGroups

  const hero = `
    <section id="hero" class="relative overflow-hidden border-b border-white/70 py-16 lg:py-24">
      <div class="pointer-events-none absolute inset-0 -z-10 grid-faint opacity-40" aria-hidden="true"></div>
      <div class="section-shell grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span class="section-kicker">${escapeHtml(page.hero.eyebrow)}</span>
          <h1 class="max-w-4xl text-4xl leading-tight md:text-5xl lg:text-6xl">${escapeHtml(page.h1)}</h1>
          <p class="mt-6 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.hero.intro)}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="${escapeAttr(page.hero.primaryCtaHref)}" class="btn-primary">${escapeHtml(page.hero.primaryCtaLabel)}</a>
            <a href="${escapeAttr(page.hero.secondaryCtaHref)}" class="btn-secondary">${escapeHtml(page.hero.secondaryCtaLabel)}</a>
          </div>
          <ul class="mt-8 grid gap-3 sm:grid-cols-3">
            ${page.hero.bullets
              .map((bullet) => `<li class="rounded-[1.35rem] border border-white/80 bg-white/90 px-4 py-4 text-sm font-semibold text-brand-900 shadow-soft">${escapeHtml(bullet)}</li>`)
              .join('')}
          </ul>
        </div>
        <div class="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">${escapeHtml(page.heroPanel.label)}</p>
          <h2 class="mt-4 text-3xl text-white">${escapeHtml(page.heroPanel.title)}</h2>
          <div class="mt-7 space-y-5">
            ${page.heroPanel.items
              .map(
                (item, index) => `
                  <div class="${index < page.heroPanel.items.length - 1 ? 'border-b border-white/10 pb-5' : ''}">
                    <p class="text-sm font-semibold text-action-300">${escapeHtml(item.title)}</p>
                    <p class="mt-2 text-sm leading-relaxed text-brand-100">${escapeHtml(item.description)}</p>
                  </div>
                `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  `

  const contentSections = []

  if (page.stats?.length) {
    contentSections.push(`
      <section class="py-8">
        <div class="section-shell">
          ${renderMetrics(page.stats)}
        </div>
      </section>
    `)
  }

  if (page.kind === 'home') {
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Qué es</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.solutionTitle || 'Qué es un equipo digital')}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.solutionIntro || '')}</p>
          </div>
          <div class="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div class="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">Trabajo del equipo digital</p>
              <ul class="mt-6 space-y-4">
                ${(page.deliverables || []).map((item) => `<li class="flex gap-3 text-sm leading-relaxed text-brand-50"><span class="mt-2 h-2 w-2 rounded-full bg-action-400"></span><span>${escapeHtml(item)}</span></li>`).join('')}
              </ul>
            </div>
            <div class="space-y-4">
              ${(page.outcomes || []).map((item) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="font-heading text-xl text-brand-950">${escapeHtml(item.title)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(item.description)}</p></article>`).join('')}
            </div>
          </div>
        </div>
      </section>
    `)
    contentSections.push(`
      <section class="py-16 lg:py-20 bg-white/70">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Problema</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.problemTitle || '')}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.problemIntro || '')}</p>
          </div>
          <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            ${(page.problemPoints || []).map((point) => `<article class="rounded-[1.6rem] border border-white/70 bg-white/88 p-5 shadow-soft"><p class="text-sm leading-relaxed text-graphite-700">${escapeHtml(point)}</p></article>`).join('')}
          </div>
        </div>
      </section>
    `)
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Cómo funciona</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.processTitle || '')}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">El objetivo no es añadir otra herramienta. Es implantar un sistema simple que el equipo entienda y use.</p>
          </div>
          <div class="mt-10 grid gap-4 lg:grid-cols-4">
            ${(page.process || []).map((step, index) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="text-sm font-semibold uppercase tracking-[0.12em] text-action-700">Paso ${index + 1}</p><p class="mt-4 text-sm leading-relaxed text-graphite-700">${escapeHtml(step)}</p></article>`).join('')}
          </div>
        </div>
      </section>
    `)
    contentSections.push(`
      <section class="py-16 lg:py-20 bg-white/70">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Sectores</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">Elegimos cuatro sectores donde este sistema encaja especialmente bien</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">Aplicamos la misma lógica de orden y seguimiento, adaptada a cómo trabajan y venden estos negocios.</p>
          </div>
          <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            ${(content.nicheLinks || []).map((link) => `<a href="${escapeAttr(link.href)}" class="group block rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-elevated"><p class="font-heading text-xl text-brand-950">${escapeHtml(link.label)}</p>${link.description ? `<p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(link.description)}</p>` : ''}<span class="mt-5 inline-flex text-sm font-semibold text-action-700">Entrar</span></a>`).join('')}
          </div>
        </div>
      </section>
    `)
    if (page.teamDiagram) contentSections.push(renderTeamDiagram(page.teamDiagram))
    contentSections.push(`
      <section class="py-16 lg:py-20 bg-white/70">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Precios</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.pricingTitle || '')}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.pricingIntro || '')}</p>
          </div>
          <div class="mt-10">
            ${renderPricingCards(page.pricingPlans)}
          </div>
        </div>
      </section>
    `)
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Recursos</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">Guías útiles para responder antes, seguir mejor y no perder oportunidades</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">Contenido práctico para entender el problema, ordenar el proceso y tomar una mejor decisión.</p>
          </div>
          <div class="mt-10 grid gap-5 lg:grid-cols-3">
            ${(content.featuredResources || []).map((post) => `<a href="${escapeAttr(post.path)}" class="group block rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-elevated"><p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">${escapeHtml(post.category)}</p><p class="mt-3 font-heading text-2xl text-brand-950">${escapeHtml(post.title)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(post.excerpt)}</p><p class="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-action-700">${escapeHtml(post.intent)}</p></a>`).join('')}
          </div>
        </div>
      </section>
    `)
  } else if (page.kind === 'service' || page.kind === 'niche') {
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Problema</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.problemTitle || '')}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.problemIntro || '')}</p>
          </div>
          <div class="mt-10 grid gap-4 ${page.kind === 'service' ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2'}">
            ${(page.problemPoints || []).map((point) => `<article class="rounded-[1.6rem] border border-white/70 bg-white/88 p-6 shadow-soft"><p class="text-sm leading-relaxed text-graphite-700">${escapeHtml(point)}</p></article>`).join('')}
          </div>
        </div>
      </section>
    `)
    if (page.teamDiagram) contentSections.push(renderTeamDiagram(page.teamDiagram))
    if (page.solutionTitle) {
      contentSections.push(`
        <section class="py-16 lg:py-20 bg-white/70">
          <div class="section-shell">
            <div class="max-w-3xl">
              <span class="section-kicker">Qué incluye</span>
              <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.solutionTitle)}</h2>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.solutionIntro || '')}</p>
            </div>
            <div class="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div class="rounded-[2rem] border border-brand-200 bg-brand-950 p-8 text-white shadow-elevated">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">Incluye</p>
                <ul class="mt-6 space-y-4">
                  ${(page.deliverables || []).map((item) => `<li class="flex gap-3 text-sm leading-relaxed text-brand-50"><span class="mt-2 h-2 w-2 rounded-full bg-action-400"></span><span>${escapeHtml(item)}</span></li>`).join('')}
                </ul>
              </div>
              <div class="space-y-4">
                ${(page.outcomes || []).map((item) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="font-heading text-xl text-brand-950">${escapeHtml(item.title)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(item.description)}</p></article>`).join('')}
              </div>
            </div>
          </div>
        </section>
      `)
    }
    if (page.process?.length) {
      contentSections.push(`
        <section class="py-16 lg:py-20">
          <div class="section-shell">
            <div class="max-w-3xl">
              <span class="section-kicker">Cómo se implementa</span>
              <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.processTitle || 'Cómo se implementa')}</h2>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">La implantación busca claridad y uso real, no complejidad técnica.</p>
            </div>
            <div class="mt-10 grid gap-4 lg:grid-cols-4">
              ${(page.process || []).map((step, index) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="text-sm font-semibold uppercase tracking-[0.12em] text-action-700">Paso ${index + 1}</p><p class="mt-4 text-sm leading-relaxed text-graphite-700">${escapeHtml(step)}</p></article>`).join('')}
            </div>
          </div>
        </section>
      `)
    }
    if (page.examplesTitle) {
      contentSections.push(`
        <section class="py-16 lg:py-20 bg-white/70">
          <div class="section-shell">
            <div class="max-w-3xl">
              <span class="section-kicker">Casos concretos</span>
              <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.examplesTitle)}</h2>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.examplesIntro || '')}</p>
            </div>
            <div class="mt-10 grid gap-4 lg:grid-cols-3">
              ${(page.examples || []).map((item) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="font-heading text-xl text-brand-950">${escapeHtml(item.title)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(item.description)}</p></article>`).join('')}
            </div>
          </div>
        </section>
      `)
    }
    if (page.fitTitle) {
      contentSections.push(`
        <section class="py-16 lg:py-20">
          <div class="section-shell">
            <div class="max-w-3xl">
              <span class="section-kicker">Encaje</span>
              <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.fitTitle)}</h2>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">La lógica es la misma: responder antes, ordenar mejor y seguir cada oportunidad con más constancia.</p>
            </div>
            <div class="mt-10 grid gap-4 md:grid-cols-3">
              ${(page.fitPoints || []).map((point) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="text-sm leading-relaxed text-graphite-700">${escapeHtml(point)}</p></article>`).join('')}
            </div>
          </div>
        </section>
      `)
    }
  } else if (page.kind === 'pricing') {
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Planes</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.pricingTitle || '')}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.pricingIntro || '')}</p>
          </div>
          <div class="mt-10">${renderPricingCards(page.pricingPlans)}</div>
        </div>
      </section>
    `)
    if (page.examplesTitle) {
      contentSections.push(`
        <section class="py-16 lg:py-20 bg-white/70">
          <div class="section-shell">
            <div class="max-w-3xl">
              <span class="section-kicker">Cómo elegir</span>
              <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.examplesTitle)}</h2>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.examplesIntro || '')}</p>
            </div>
            <div class="mt-10 grid gap-4 md:grid-cols-3">
              ${(page.examples || []).map((item) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="font-heading text-xl text-brand-950">${escapeHtml(item.title)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(item.description)}</p></article>`).join('')}
            </div>
          </div>
        </section>
      `)
    }
  } else if (page.kind === 'resources') {
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Categorías</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">Qué vas a encontrar aquí</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">Guías prácticas para ordenar leads, responder mejor y entender qué sistema te conviene.</p>
          </div>
          <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            ${(page.resourceCategories || content.resourceCategories).map((category) => `<article class="rounded-[1.6rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="font-heading text-xl text-brand-950">${escapeHtml(category.name)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(category.description)}</p></article>`).join('')}
          </div>
        </div>
      </section>
    `)
    contentSections.push(`
      <section class="py-16 lg:py-20 bg-white/70">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">Artículos destacados</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">Contenido útil, pensado para problemas reales</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">Cada artículo responde una duda concreta y te ayuda a avanzar hacia una solución clara.</p>
          </div>
          <div class="mt-10 grid gap-5 lg:grid-cols-3">
            ${renderLinkList((page.resourcePosts || content.featuredResources).map((post) => ({ href: post.path, label: post.title, description: `${post.category} · ${post.excerpt}` })))}
          </div>
        </div>
      </section>
    `)
    if (page.examplesTitle) {
      contentSections.push(`
        <section class="py-16 lg:py-20">
          <div class="section-shell">
            <div class="max-w-3xl">
              <span class="section-kicker">Enlazado interno</span>
              <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${escapeHtml(page.examplesTitle)}</h2>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(page.examplesIntro || '')}</p>
            </div>
            <div class="mt-10 grid gap-4 lg:grid-cols-3">
              ${(page.examples || []).map((item) => `<article class="rounded-[1.75rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="font-heading text-xl text-brand-950">${escapeHtml(item.title)}</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">${escapeHtml(item.description)}</p></article>`).join('')}
            </div>
          </div>
        </section>
      `)
    }
  } else if (page.kind === 'article') {
    contentSections.push(`
      <section class="py-16 lg:py-20">
        <div class="section-shell grid gap-12 lg:grid-cols-[1fr_18rem]">
          <article class="space-y-10">
            ${(page.articleSections || []).map((section) => `<section><h2 class="text-3xl leading-tight md:text-4xl">${escapeHtml(section.title)}</h2><div class="mt-5 space-y-4">${section.paragraphs.map((paragraph) => `<p class="text-base leading-relaxed text-graphite-700 md:text-lg">${escapeHtml(paragraph)}</p>`).join('')}</div></section>`).join('')}
          </article>
          <aside class="space-y-4">
            <article class="rounded-[1.6rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">Categoría</p><p class="mt-3 font-heading text-xl text-brand-950">${escapeHtml(page.articleCategory || '')}</p></article>
            <article class="rounded-[1.6rem] border border-white/80 bg-white/92 p-6 shadow-soft"><p class="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">CTA</p><p class="mt-3 text-sm leading-relaxed text-graphite-700">Si el problema te suena, el siguiente paso no es leer más teoría. Es ver cómo se implementa el sistema.</p><a href="/como-funciona" class="btn-primary mt-5 w-full">Ver cómo funciona</a></article>
          </aside>
        </div>
      </section>
    `)
  }

  const relatedLinks = page.relatedLinks?.length
    ? `
      <section class="py-16 lg:py-20 ${page.kind === 'home' ? 'bg-white/70' : ''}">
        <div class="section-shell">
          <div class="max-w-3xl">
            <span class="section-kicker">${page.kind === 'article' ? 'Más recursos' : 'Siguiente paso'}</span>
            <h2 class="max-w-4xl text-3xl leading-tight md:text-4xl">${page.kind === 'article' ? 'Contenido relacionado' : 'Páginas relacionadas'}</h2>
            <p class="mt-4 max-w-3xl text-base leading-relaxed text-graphite-700 md:text-lg">${page.kind === 'article' ? 'Si quieres seguir, aquí tienes la siguiente lectura útil y la página comercial que resuelve el problema.' : 'Desde aquí puedes ir a otras páginas útiles según el punto en el que estés de la decisión.'}</p>
          </div>
          <div class="mt-10">
            ${renderLinkList(page.relatedLinks)}
          </div>
        </div>
      </section>
    `
    : ''

  const body = `
    <div class="relative isolate overflow-x-hidden pb-24 md:pb-0">
      <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-brand-200/35 via-brand-100/10 to-transparent" aria-hidden="true"></div>
      <div class="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-action-200/40 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" aria-hidden="true"></div>
      ${renderStaticHeader(primaryNav, page)}
      <div aria-hidden="true" class="h-16"></div>
      <div class="border-b border-action-100 bg-gradient-to-r from-action-50 to-brand-50">
        <div class="section-shell flex flex-col gap-2 py-3 text-center text-sm font-medium text-graphite-700 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <span class="pill-urgent">Equipos digitales para captar, responder, organizar y seguir leads</span>
          <span class="pill-trust">Precios visibles y soluciones adaptadas a tu sector</span>
        </div>
      </div>
      ${hero}
      <main>
        ${contentSections.join('')}
      </main>
      ${renderFaqs(page.faqs)}
      <section id="contacto" class="border-t border-white/70 py-16 lg:py-20">
        <div class="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span class="section-kicker">Diagnóstico</span>
            <h2 class="max-w-3xl text-3xl leading-tight md:text-4xl">Si tus leads se están perdiendo entre retrasos, desorden y tareas manuales, aquí se arregla.</h2>
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-graphite-700 md:text-lg">Revisamos cómo entran hoy tus leads, cómo se responden, cómo se siguen y dónde se está rompiendo el proceso. El objetivo es decirte qué equipo digital necesitas y con qué plan conviene empezar.</p>
            <div class="mt-8 grid gap-4 md:grid-cols-2">
              <article class="rounded-[1.6rem] border border-white/80 bg-white/90 p-6 shadow-soft">
                <p class="font-heading text-xl text-brand-950">Qué revisamos</p>
                <p class="mt-3 text-sm leading-relaxed text-graphite-700">Entrada de leads, velocidad de respuesta, seguimiento, organización de información y puntos donde hoy se están perdiendo oportunidades.</p>
              </article>
              <article class="rounded-[1.6rem] border border-white/80 bg-white/90 p-6 shadow-soft">
                <p class="font-heading text-xl text-brand-950">Qué te llevas</p>
                <p class="mt-3 text-sm leading-relaxed text-graphite-700">Un diagnóstico claro, el plan que encaja mejor y una propuesta concreta para implantar el equipo digital sin rodeos.</p>
              </article>
            </div>
          </div>
          <div class="grid gap-5">
            <div class="surface-card p-6">
              <h3 class="text-2xl font-semibold">Solicitar diagnóstico comercial</h3>
              <p class="mt-2 text-sm text-graphite-700">Déjanos tus datos y te contactamos para revisar captación, seguimiento y cierre de leads.</p>
              <div class="mt-6 rounded-xl border border-brand-200 bg-brand-100/60 px-4 py-3 text-sm text-brand-800">El formulario interactivo se mantiene en la SPA. Este HTML prerenderizado refuerza el SEO inicial.</div>
            </div>
          </div>
        </div>
      </section>
      ${relatedLinks}
      ${renderStaticFooter(footerLinkGroups, content.brandName)}
    </div>
  `

  return body
}

function renderSchema(page, content) {
  const canonical = canonicalUrl(content.siteUrl, page.path)
  const organizationId = `${content.siteUrl}/#organization`
  const websiteId = `${content.siteUrl}/#website`
  const webpageId = `${canonical}#webpage`

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: content.brandName,
      url: content.siteUrl,
      areaServed: 'ES',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: content.brandName,
      url: content.siteUrl,
      inLanguage: 'es',
    },
  ]

  if (page.kind === 'home') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': webpageId,
      url: canonical,
      name: page.title,
      description: page.metaDescription,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'es',
    })
  }

  if (page.kind === 'service' || page.kind === 'niche') {
    const serviceId = `${canonical}#service`
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonical,
        name: page.title,
        description: page.metaDescription,
        isPartOf: { '@id': websiteId },
        about: { '@id': serviceId },
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': serviceId,
        serviceType: page.label,
        name: page.h1,
        provider: { '@id': organizationId },
        areaServed: 'ES',
        description: page.metaDescription,
      },
    )
  }

  if (page.kind === 'pricing') {
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonical,
        name: page.title,
        description: page.metaDescription,
        isPartOf: { '@id': websiteId },
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Planes de equipos digitales',
        itemListElement: (page.pricingPlans || []).map((plan, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: plan.name,
          description: plan.summary,
          priceCurrency: 'EUR',
        })),
      },
    )
  }

  if (page.kind === 'resources') {
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': webpageId,
        url: canonical,
        name: page.title,
        description: page.metaDescription,
        isPartOf: { '@id': websiteId },
        inLanguage: 'es',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Recursos Noxo AI Empresas',
        url: canonical,
      },
    )
  }

  if (page.kind === 'article') {
    schema.push(
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: page.title,
        description: page.metaDescription,
        inLanguage: 'es',
        mainEntityOfPage: canonical,
        author: {
          '@type': 'Organization',
          name: content.brandName,
        },
        publisher: {
          '@type': 'Organization',
          name: content.brandName,
        },
        articleSection: page.articleCategory,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonical,
        name: page.title,
        description: page.metaDescription,
        isPartOf: { '@id': websiteId },
        inLanguage: 'es',
      },
    )
  }

  if (page.faqs?.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
}

function buildHead(page, content) {
  const canonical = canonicalUrl(content.siteUrl, page.path)
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.metaDescription)
  const url = escapeAttr(canonical)
  const pagesScriptData = Object.fromEntries(
    (content.allPages || []).map((item) => [
      item.path,
      {
        title: item.title,
        description: item.metaDescription,
      },
    ]),
  )
  const metaUpdaterScript = `
    <script>
      (function () {
        var path = window.location.pathname.replace(/\\/$/, '') || '/';
        var pages = ${JSON.stringify(pagesScriptData, null, 2)};

        var current = pages[path];
        if (!current) return;

        document.title = current.title;

        var description = document.querySelector('meta[name="description"]');
        var ogTitle = document.querySelector('meta[property="og:title"]');
        var ogDescription = document.querySelector('meta[property="og:description"]');
        var ogUrl = document.querySelector('meta[property="og:url"]');
        var twitterTitle = document.querySelector('meta[name="twitter:title"]');
        var twitterDescription = document.querySelector('meta[name="twitter:description"]');
        var canonical = document.querySelector('link[rel="canonical"]');
        var url = 'https://www.noxoiaempresas.com' + (path === '/' ? '/' : path);

        if (description) description.setAttribute('content', current.description);
        if (ogTitle) ogTitle.setAttribute('content', current.title);
        if (ogDescription) ogDescription.setAttribute('content', current.description);
        if (ogUrl) ogUrl.setAttribute('content', url);
        if (twitterTitle) twitterTitle.setAttribute('content', current.title);
        if (twitterDescription) twitterDescription.setAttribute('content', current.description);
        if (canonical) canonical.setAttribute('href', url);
      })();
    </script>`;

  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="theme-color" content="#111f31" />
    <meta name="description" content="${description}" />
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
    <meta name="author" content="${escapeAttr(content.brandName)}" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="${escapeAttr(content.brandName)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>${title}</title>
    ${metaUpdaterScript.trim()}
  `
}

function stripManagedHeadTags(headHtml) {
  return headHtml
    .replace(/<meta charset="UTF-8"\s*\/?>/gi, '')
    .replace(/<meta name="viewport"[^>]*\/>/gi, '')
    .replace(/<meta http-equiv="X-UA-Compatible"[^>]*\/>/gi, '')
    .replace(/<meta name="theme-color"[^>]*\/>/gi, '')
    .replace(/<meta name="description"[^>]*\/>/gi, '')
    .replace(/<meta name="robots"[^>]*\/>/gi, '')
    .replace(/<meta name="author"[^>]*\/>/gi, '')
    .replace(/<link rel="canonical"[^>]*\/>/gi, '')
    .replace(/<link rel="icon"[^>]*\/>/gi, '')
    .replace(/<link rel="apple-touch-icon"[^>]*\/>/gi, '')
    .replace(/<meta property="og:type"[^>]*\/>/gi, '')
    .replace(/<meta property="og:locale"[^>]*\/>/gi, '')
    .replace(/<meta property="og:site_name"[^>]*\/>/gi, '')
    .replace(/<meta property="og:title"[^>]*\/>/gi, '')
    .replace(/<meta property="og:description"[^>]*\/>/gi, '')
    .replace(/<meta property="og:url"[^>]*\/>/gi, '')
    .replace(/<meta name="twitter:card"[^>]*\/>/gi, '')
    .replace(/<meta name="twitter:title"[^>]*\/>/gi, '')
    .replace(/<meta name="twitter:description"[^>]*\/>/gi, '')
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"[^>]*\/>/gi, '')
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin[^>]*\/>/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
    .replace(/<script>\s*\(function \(\) \{[\s\S]*?\}\)\(\);\s*<\/script>/gi, '')
    .trim()
}

function replaceRootContent(html, body) {
  const rootStart = html.indexOf('<div id="root">')

  if (rootStart === -1) {
    return html
  }

  let index = rootStart + '<div id="root">'.length
  let depth = 1

  while (index < html.length) {
    const nextOpen = html.indexOf('<div', index)
    const nextClose = html.indexOf('</div>', index)

    if (nextClose === -1) {
      break
    }

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1
      index = nextOpen + 4
      continue
    }

    depth -= 1
    index = nextClose + '</div>'.length

    if (depth === 0) {
      return `${html.slice(0, rootStart)}<div id="root">${body}</div>${html.slice(index)}`
    }
  }

  return html
}

async function writePage(filePath, html) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, html, 'utf8')
}

async function main() {
  const content = await readContent()
  const template = await fs.readFile(templatePath, 'utf8')
  const headMatch = template.match(/<head>([\s\S]*?)<\/head>/i)
  const baseHead = headMatch?.[1] ?? ''

  const pages = content.allPages || []

  for (const page of pages) {
    const body = renderPageBody(page, content)
    const schema = renderSchema(page, content)
    const headHtml = buildHead(page, content)
    const preservedHead = stripManagedHeadTags(baseHead)
    const mergedHead = [headHtml.trim(), preservedHead].filter(Boolean).join('\n    ')
    const finalHtml = replaceRootContent(
      template.replace(/<head>[\s\S]*?<\/head>/, `<head>${mergedHead}\n    ${schema}</head>`),
      body,
    )

    if (page.path === '/') {
      await writePage(path.join(distDir, 'index.html'), finalHtml)
      continue
    }

    const pageDir = path.join(distDir, page.path.slice(1))
    await writePage(path.join(pageDir, 'index.html'), finalHtml)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
