interface MetricCardProps {
  value: string
  label: string
  note: string
}

export function MetricCard({ value, label, note }: MetricCardProps) {
  return (
    <article className="surface-card h-full p-6">
      <p className="text-3xl font-bold text-brand-900">{value}</p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-700">{label}</p>
      <p className="mt-3 text-sm leading-relaxed text-graphite-700">{note}</p>
    </article>
  )
}
