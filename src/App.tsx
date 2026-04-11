import { Footer } from './components/Footer'
import { FaqItem } from './components/FaqItem'
import { FeatureCard } from './components/FeatureCard'
import { LeadForm } from './components/LeadForm'
import { MetricCard } from './components/MetricCard'
import { OptionCard } from './components/OptionCard'
import { ProcessStep } from './components/ProcessStep'
import { Reveal } from './components/Reveal'
import { SeoStructuredData } from './components/SeoStructuredData'
import { Section } from './components/Section'
import { StickyNav } from './components/StickyNav'
import { UseCaseCard } from './components/UseCaseCard'
import { MobileStickyCta } from './components/MobileStickyCta'
import { WhatsAppQuickContact } from './components/WhatsAppQuickContact'
import {
  brandName,
  confidenceNotes,
  deploymentOptions,
  differentiators,
  faqs,
  heroMicroBenefits,
  metrics,
  navItems,
  problemPoints,
  processSteps,
  sectors,
  services,
  trustPillars,
  useCases,
  whatsappShortMessage,
} from './data/content'
import { trackEvent } from './lib/analytics'

function App() {
  return (
    <div className="relative isolate overflow-hidden pb-24 md:pb-0">
      <SeoStructuredData brandName={brandName} faqs={faqs} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] animate-pulse-slow bg-gradient-to-b from-brand-200/30 via-brand-100/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-24 -z-10 h-64 w-64 rounded-full bg-brand-300/30 blur-3xl"
        aria-hidden="true"
      />

      <StickyNav brand={brandName} items={navItems} />
      <div className="border-b border-action-100 bg-gradient-to-r from-action-50 to-brand-50">
        <div className="section-shell flex flex-col gap-2 py-3 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <span className="pill-urgent">Crea un equipo digital de apoyo con coste operativo bajo</span>
          <span className="pill-trust">Diagnóstico inicial con enfoque en privacidad</span>
        </div>
      </div>

      <header id="hero" className="relative overflow-hidden border-b border-white/70 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-faint opacity-40" aria-hidden="true" />
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="section-kicker">IA para micropymes y pymes</span>
            <h1 className="text-4xl leading-tight md:text-5xl lg:text-6xl">
              Deja de perder horas en tareas repetitivas y gana tiempo para hacer crecer tu negocio
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-graphite-700 md:text-lg">
              Ayudamos a pequeñas empresas a crear un equipo digital de apoyo que se encarga de tareas
              repetitivas, con acompañamiento real y privacidad bajo control.
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold text-brand-900">
              No va de sustituir personas: va de liberar tiempo. Si hoy 2 o 3 personas están atrapadas
              en trabajo manual, mañana pueden estar enfocadas en cliente, ventas y crecimiento.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#diagnostico"
                className="btn-primary"
                onClick={() => trackEvent('cta_click', { location: 'hero', type: 'primary' })}
              >
                Solicitar diagnóstico ahora
              </a>
              <a
                href="#casos"
                className="btn-secondary"
                onClick={() => trackEvent('cta_click', { location: 'hero', type: 'secondary' })}
              >
                Ver casos de uso
              </a>
            </div>

            <ul className="mt-8 grid gap-3 text-sm font-semibold text-brand-900 sm:grid-cols-3">
              {heroMicroBenefits.map((item) => (
                <li key={item} className="surface-card px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 p-8 text-brand-50 shadow-elevated">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                Enfoque trust-first
              </p>
              <h2 className="mt-3 text-3xl text-white">Resultados rápidos, sin perder el control</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-brand-100">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-300" />
                  Diagnóstico claro para priorizar lo que más tiempo te devuelve.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-300" />
                  Equipo digital adaptado a tu empresa, no una plantilla genérica.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-300" />
                  Coste operativo controlado, privacidad y seguridad desde el inicio.
                </li>
              </ul>
              <a
                href="#diagnostico"
                className="btn-primary mt-7 w-full"
                onClick={() => trackEvent('cta_click', { location: 'hero_panel', type: 'primary' })}
              >
                Solicitar diagnóstico ahora
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      <main>
        <Section
          id="problema"
          eyebrow="El problema"
          title="Tu empresa no necesita más apps: necesita quitar trabajo manual que hoy te está frenando"
          description="Si el equipo va con prisas todo el día, no es falta de esfuerzo. Es falta de procesos bien automatizados."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {problemPoints.map((point, index) => (
              <Reveal key={point} delay={index * 80}>
                <article className="surface-card p-6">
                  <p className="text-sm leading-relaxed text-graphite-700">{point}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="servicios"
          eyebrow="Qué hacemos"
          title="Te acompañamos de principio a fin para que la automatización funcione de verdad"
          description="Sin jerga, sin humo y con foco en impacto visible para tu negocio."
          className="bg-white/50"
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 70}>
                <FeatureCard title={service.title} description={service.description} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="casos"
          eyebrow="Casos de uso reales"
          title="Ejemplos sencillos de entender y rápidos de aplicar"
          description="Casos pensados para el día a día de una pyme: menos carga, menos retrasos y más control."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((useCase, index) => (
              <Reveal key={useCase.title} delay={index * 70}>
                <UseCaseCard
                  title={useCase.title}
                  problem={useCase.problem}
                  solution={useCase.solution}
                  result={useCase.result}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="arquitectura"
          eyebrow="Local, híbrido o API"
          title="Elige cómo automatizar sin complicarte: local, híbrido o API"
          description="Te explicamos cada opción en lenguaje de negocio para que decidas con seguridad."
          className="bg-white/50"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {deploymentOptions.map((option, index) => (
              <Reveal key={option.title} delay={index * 100}>
                <OptionCard
                  title={option.title}
                  subtitle={option.subtitle}
                  bullets={option.bullets}
                  emphasis={option.title === 'Híbrido'}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="diferenciales"
          eyebrow="Por qué con nosotros"
          title="Pensado para pequeñas empresas que quieren avanzar sin asumir riesgos innecesarios"
          description="Priorizamos lo que te da beneficio ahora y construimos sobre resultados reales."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {differentiators.map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <article className="surface-card p-6">
                  <p className="text-sm leading-relaxed text-graphite-700">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="proceso"
          eyebrow="Cómo trabajamos"
          title="Un plan claro en 4 pasos para empezar ya y crecer con orden"
          description="Ejecución práctica, decisiones simples y seguimiento continuo."
          className="bg-white/50"
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 90}>
                <ProcessStep step={step.step} title={step.title} description={step.description} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="resultados"
          eyebrow="Resultados y ROI"
          title="Impacto que tu equipo nota en el día a día"
          description="Objetivos realistas y medibles para que sepas si está funcionando desde el inicio."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 80}>
                <MetricCard value={metric.value} label={metric.label} note={metric.note} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="diagnostico"
          eyebrow="Diagnóstico inicial"
          title="Descubre qué puedes automatizar ya sin perder el control de tus datos"
          description="En una primera conversación te ayudamos a identificar prioridades de impacto inmediato."
          className="bg-white/50"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <LeadForm />
            </Reveal>
            <Reveal delay={120}>
              <WhatsAppQuickContact shortMessage={whatsappShortMessage} />
            </Reveal>
          </div>
        </Section>

        <Section
          id="prueba-social"
          eyebrow="Confianza operativa"
          title="Cómo trabajamos para que tengas seguridad y control desde el primer día"
          description="Sin testimonios inventados: aquí tienes nuestras prácticas y los sectores donde más implementamos."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trustPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 80}>
                <article className="surface-card h-full p-6">
                  <h3 className="text-xl font-semibold text-brand-950">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite-700">{pillar.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, index) => (
              <Reveal key={sector} delay={index * 60}>
                <div className="rounded-xl border border-brand-200 bg-white px-4 py-3 text-center text-sm font-semibold text-brand-800 shadow-soft">
                  {sector}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-3">
            {confidenceNotes.map((note, index) => (
              <Reveal key={note} delay={index * 70}>
                <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-graphite-700">
                  {note}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="faq"
          eyebrow="FAQ"
          title="Preguntas frecuentes antes de implantar"
          description="Respuestas directas para decidir rápido y con tranquilidad."
          className="bg-white/50"
        >
          <div className="grid gap-4">
            {faqs.map((item, index) => (
              <Reveal key={item.question} delay={index * 70}>
                <FaqItem question={item.question} answer={item.answer} />
              </Reveal>
            ))}
          </div>
        </Section>

        <section className="py-20">
          <div className="section-shell">
            <Reveal>
              <div className="rounded-3xl border border-brand-300 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 px-6 py-12 text-center shadow-elevated md:px-10">
                <h2 className="text-3xl text-white md:text-4xl">
                  Empieza ahora: recupera tiempo sin perder el control de tus datos
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-brand-100">
                  Cuanto antes empieces, antes verás menos carga operativa y más foco en lo que hace
                  crecer tu empresa.
                </p>
                <a
                  href="#diagnostico"
                  className="btn-primary mt-8"
                  onClick={() => trackEvent('cta_click', { location: 'final_cta', type: 'primary' })}
                >
                  Solicitar diagnóstico ahora
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer brand={brandName} />
      <MobileStickyCta />
    </div>
  )
}

export default App
