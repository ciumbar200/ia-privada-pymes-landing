import { Reveal } from './Reveal'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Carlos Martínez',
      company: 'Restaurante La Cocina de Mamá, Madrid',
      text: 'En 30 días pasamos de 50 a 120 leads mensuales. El chatbot ahora responde al 95% de preguntas automáticamente.',
      metrics: '+200% leads | 95% preguntas automatizadas',
      initials: 'CM'
    },
    {
      name: 'Ana García',
      company: 'Consultoría Estratégica SL, Barcelona',
      text: 'Los leads cualificados automáticos nos ahorraron 20 horas semanales en prospección. Ahora cerramos un 40% más de ventas.',
      metrics: '40% más cierres | 20h ahorradas/semana',
      initials: 'AG'
    },
    {
      name: 'Dra. Rosa López',
      company: 'DentalCare Clínica, Valencia',
      text: 'Reducimos los no-shows al 80% con los recordatorios automáticos. Los pacientes ahora reservan online 24/7.',
      metrics: '-80% no-shows | Reservas 24/7',
      initials: 'RL'
    },
    {
      name: 'Miguel Sánchez',
      company: 'Hotel Boutique La Casa, Sevilla',
      text: 'El check-in virtual y concierge IA han transformado la experiencia de nuestros huéspedes. Las reviews positivas aumentaron un 40%.',
      metrics: '+40% reviews positivas | Check-in automático',
      initials: 'MS'
    },
    {
      name: 'Laura Pérez',
      company: 'Moda Centro E-commerce, Barcelona',
      text: 'Recuperamos el 25% de carritos abandonados con emails automáticos personalizados. La conversión aumentó sin inversión extra.',
      metrics: '+25% conversión carritos | Emails automáticos',
      initials: 'LP'
    }
  ]

  const stats = [
    { value: '+100', label: 'Pymes automatizadas' },
    { value: '4.9/5', label: 'Valoración media' },
    { value: '92%', label: 'Clientes renovados' },
    { value: '+30d', label: 'Promedio resultados' }
  ]

  return (
    <section id="testimonios" className="py-16 lg:py-20 bg-brand-50">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <span className="section-kicker">Lo que dicen nuestros clientes</span>
          <h2 className="mt-2 text-3xl leading-tight md:text-4xl">
            Resultados reales de pymes que ya están automatizando
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-graphite-700">
            Casos de éxito con métricas específicas y resultados medibles
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 60}>
              <div className="surface-card rounded-2xl bg-white p-6 text-center shadow-soft">
                <div className="text-3xl font-bold text-brand-900">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-graphite-600">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 70}>
              <div className="surface-card rounded-3xl bg-white p-6 shadow-soft">
                <div className="mb-4 flex gap-0.5 text-brand-300">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-base leading-relaxed text-graphite-700">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 rounded-xl bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
                  💰 {testimonial.metrics}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-sm font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-950">{testimonial.name}</div>
                    <div className="text-xs text-graphite-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#diagnostico" className="btn-primary inline-flex items-center gap-2">
            Únete a +100 pymes que ya están automatizando
          </a>
        </div>
      </div>
    </section>
  )
}
