interface FeatureCardProps {
  title: string
  description: string
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="surface-card h-full p-6">
      <div className="mb-4 h-1 w-12 rounded-full bg-brand-500" aria-hidden="true" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-graphite-700">{description}</p>
    </article>
  )
}
