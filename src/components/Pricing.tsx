import type { PricingPlan } from '../data/content'

interface PricingProps {
  plans: PricingPlan[]
  compact?: boolean
}

export function Pricing({ plans, compact = false }: PricingProps) {
  return (
    <div className={`grid gap-6 ${compact ? 'xl:grid-cols-3' : 'lg:grid-cols-3'}`}>
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`rounded-[2rem] border p-7 shadow-soft ${
            plan.featured
              ? 'border-brand-300 bg-brand-950 text-white shadow-elevated'
              : 'border-white/80 bg-white/92'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                  plan.featured ? 'text-brand-200' : 'text-brand-700'
                }`}
              >
                {plan.tagline}
              </p>
              <h3 className={`mt-3 text-2xl ${plan.featured ? 'text-white' : 'text-brand-950'}`}>
                {plan.name}
              </h3>
            </div>
            {plan.featured ? (
              <span className="rounded-full bg-action-400 px-3 py-1 text-xs font-semibold text-brand-950">
                Recomendado
              </span>
            ) : null}
          </div>

          <p className={`mt-4 text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-graphite-700'}`}>
            {plan.summary}
          </p>

          <div className={`mt-6 rounded-[1.35rem] p-4 ${plan.featured ? 'bg-white/10' : 'bg-brand-50'}`}>
            <p className={`text-xs uppercase tracking-[0.12em] ${plan.featured ? 'text-brand-200' : 'text-brand-700'}`}>
              Setup inicial
            </p>
            <p className={`mt-2 font-heading text-3xl ${plan.featured ? 'text-white' : 'text-brand-950'}`}>
              {plan.setupPrice}
            </p>
            <p className={`mt-4 text-xs uppercase tracking-[0.12em] ${plan.featured ? 'text-brand-200' : 'text-brand-700'}`}>
              Cuota mensual
            </p>
            <p className={`mt-2 font-heading text-3xl ${plan.featured ? 'text-white' : 'text-brand-950'}`}>
              {plan.monthlyPrice}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <p className={`text-sm font-semibold ${plan.featured ? 'text-white' : 'text-brand-950'}`}>
              Ideal para
            </p>
            <p className={`text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-graphite-700'}`}>
              {plan.idealFor}
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className={`flex gap-3 text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-graphite-700'}`}
              >
                <span className={`mt-1.5 h-2 w-2 rounded-full ${plan.featured ? 'bg-action-300' : 'bg-action-500'}`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {!compact ? (
            <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
              <p className={`text-xs uppercase tracking-[0.12em] ${plan.featured ? 'text-brand-200' : 'text-brand-700'}`}>
                Lógica comercial
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-graphite-700'}`}>
                {plan.pricingLogic}
              </p>
            </div>
          ) : null}

          <a href={plan.ctaHref} className={`${plan.featured ? 'btn-secondary bg-white text-brand-950 hover:bg-brand-50' : 'btn-primary'} mt-7 w-full`}>
            {plan.ctaLabel}
          </a>
        </article>
      ))}
    </div>
  )
}
