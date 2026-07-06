import type { PricingPlan } from '../data/content'

interface PricingProps {
  plans: PricingPlan[]
  compact?: boolean
  onCtaClick?: () => void
}

export function Pricing({ plans, compact = false, onCtaClick }: PricingProps) {
  return (
    <div className={`grid gap-6 ${compact ? 'xl:grid-cols-3' : 'lg:grid-cols-3'}`}>
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`rounded-[2rem] border p-7 shadow-soft ${
            plan.featured
              ? 'border-electric-400/30 bg-gradient-to-br from-brand-900 to-brand-950 text-white shadow-glow'
              : 'border-brand-700/50 bg-brand-900/40 backdrop-blur'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                  plan.featured ? 'text-electric-300' : 'text-electric-400'
                }`}
              >
                {plan.tagline}
              </p>
              <h3 className={`mt-3 text-2xl ${plan.featured ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>
            </div>
            {plan.featured ? (
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                Recomendado
              </span>
            ) : null}
          </div>

          <p className={`mt-4 text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-brand-300'}`}>
            {plan.summary}
          </p>

          <div className={`mt-6 rounded-[1.35rem] p-4 ${plan.featured ? 'bg-white/10' : 'bg-brand-950/50'}`}>
            <p className={`text-xs uppercase tracking-[0.12em] ${plan.featured ? 'text-electric-300' : 'text-electric-400'}`}>
              Inversión
            </p>
            <p className={`mt-2 font-heading text-3xl text-white`}>
              {plan.setupPrice}
            </p>
            <p className={`mt-4 text-xs uppercase tracking-[0.12em] ${plan.featured ? 'text-electric-300' : 'text-electric-400'}`}>
              Plazo
            </p>
            <p className={`mt-2 font-heading text-3xl text-white`}>
              {plan.monthlyPrice}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <p className={`text-sm font-semibold ${plan.featured ? 'text-white' : 'text-white'}`}>
              Ideal para
            </p>
            <p className={`text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-brand-300'}`}>
              {plan.idealFor}
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className={`flex gap-3 text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-brand-300'}`}
              >
                <span className={`mt-1.5 h-2 w-2 rounded-full ${plan.featured ? 'bg-accent-400' : 'bg-accent-500'}`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {!compact ? (
            <div className="mt-6 rounded-[1.25rem] border border-brand-700/50 bg-brand-950/30 p-4">
              <p className={`text-xs uppercase tracking-[0.12em] ${plan.featured ? 'text-electric-300' : 'text-electric-400'}`}>
                Lógica
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${plan.featured ? 'text-brand-100' : 'text-brand-300'}`}>
                {plan.pricingLogic}
              </p>
            </div>
          ) : null}

          {onCtaClick ? (
            <button
              type="button"
              onClick={onCtaClick}
              className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} mt-7 w-full`}
            >
              {plan.ctaLabel}
            </button>
          ) : (
            <a href={plan.ctaHref} className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} mt-7 w-full`}>
              {plan.ctaLabel}
            </a>
          )}
        </article>
      ))}
    </div>
  )
}