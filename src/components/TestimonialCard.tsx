interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  company: string
}

export function TestimonialCard({ quote, name, role, company }: TestimonialCardProps) {
  return (
    <article className="surface-card h-full p-6">
      <p className="text-sm leading-relaxed text-graphite-800">“{quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-200 font-semibold text-brand-900">
          {name
            .replace('[', '')
            .replace(']', '')
            .split(' ')
            .slice(0, 2)
            .map((chunk) => chunk.charAt(0))
            .join('')
            .slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-900">{name}</p>
          <p className="text-xs text-graphite-700">{role}</p>
          <p className="text-xs text-graphite-600">{company}</p>
        </div>
      </div>
    </article>
  )
}
