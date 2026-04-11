interface ProcessStepProps {
  step: string
  title: string
  description: string
}

export function ProcessStep({ step, title, description }: ProcessStepProps) {
  return (
    <article className="surface-card h-full p-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-white">
        {step}
      </span>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-graphite-700">{description}</p>
    </article>
  )
}
