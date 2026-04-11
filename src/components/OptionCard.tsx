interface OptionCardProps {
  title: string
  subtitle: string
  bullets: string[]
  emphasis?: boolean
}

export function OptionCard({ title, subtitle, bullets, emphasis = false }: OptionCardProps) {
  return (
    <article
      className={`h-full rounded-2xl border p-6 shadow-soft ${
        emphasis
          ? 'border-brand-300 bg-brand-900 text-white'
          : 'border-white/70 bg-white/90 text-brand-950'
      }`}
    >
      <h3 className={`text-xl font-semibold ${emphasis ? 'text-white' : 'text-brand-950'}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${emphasis ? 'text-brand-100' : 'text-graphite-700'}`}>
        {subtitle}
      </p>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className={`mt-1 h-2 w-2 rounded-full ${emphasis ? 'bg-brand-200' : 'bg-brand-500'}`} />
            <span className={emphasis ? 'text-brand-100' : 'text-graphite-700'}>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
