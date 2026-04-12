import { Reveal } from './Reveal'

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '299',
      period: '/mes',
      features: [
        '1 servicio de automatización',
        'Chatbot básico 24/7',
        'Configuración inicial',
        'Soporte por email',
        'Dashboard básico'
      ],
      cta: 'Empezar Ahora',
      featured: false
    },
    {
      name: 'Growth',
      price: '599',
      period: '/mes',
      features: [
        '3 servicios de automatización',
        'Chatbot avanzado 24/7',
        'Leads cualificados automáticos',
        'Integración CRM incluida',
        'Soporte prioritario 24/7',
        'Dashboard avanzado + analytics'
      ],
      cta: 'Empezar Ahora',
      featured: true
    },
    {
      name: 'Enterprise',
      price: '999+',
      period: '/mes',
      features: [
        'Servicios ilimitados',
        'Chatbot personalizado 24/7',
        'Integraciones custom',
        'Account manager dedicado',
        'SLA garantizado 99.9%',
        'Soporte 24/7 multicanal'
      ],
      cta: 'Contactar Ventas',
      featured: false
    }
  ]

  return (
    <section id="precios" className="py-16 lg:py-20 bg-white">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <span className="section-kicker">Planes transparentes</span>
          <h2 className="mt-2 text-3xl leading-tight md:text-4xl">
            Elige el plan que mejor se adapte a tu negocio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-graphite-700">
            Sin contratos a largo plazo. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 80}>
              <div className={`${plan.featured ? 'relative scale-105 shadow-elevated' : 'surface-card'} rounded-3xl p-8 ${plan.featured ? 'bg-gradient-to-br from-brand-900 to-brand-800 text-white' : ''}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-300 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-950">
                    Más Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold ${plan.featured ? 'text-white' : 'text-brand-950'}`}>
                  {plan.name}
                </h3>
                <div className={`mt-4 flex items-baseline gap-1 ${plan.featured ? 'text-white' : 'text-brand-900'}`}>
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-sm font-medium">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-sm ${plan.featured ? 'text-brand-100' : 'text-graphite-700'}`}>
                      <span className="mt-0.5 flex-shrink-0 text-brand-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-2xl py-3 font-semibold transition-all ${plan.featured ? 'bg-brand-200 text-brand-950 hover:bg-brand-100' : 'btn-primary'}`}
                >
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-graphite-600">
          ✓ Sin contrato a largo plazo &nbsp;&nbsp;&nbsp; ✓ Cancela cuando quieras &nbsp;&nbsp;&nbsp; ✓ Garantía de satisfacción 30 días
        </div>
      </div>
    </section>
  )
}
