interface UseCaseCardProps {
  title: string
  problem: string
  solution: string
  result: string
}

export function UseCaseCard({ title, problem, solution, result }: UseCaseCardProps) {
  return (
    <article className="surface-card h-full p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold uppercase tracking-wide text-brand-700">Problema</dt>
          <dd className="mt-1 text-graphite-700">{problem}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-brand-700">Solución</dt>
          <dd className="mt-1 text-graphite-700">{solution}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-brand-700">Resultado esperado</dt>
          <dd className="mt-1 text-graphite-700">{result}</dd>
        </div>
      </dl>
    </article>
  )
}
