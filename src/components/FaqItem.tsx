interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="surface-card group p-5">
      <summary className="cursor-pointer list-none text-left text-base font-semibold text-brand-900 marker:content-none">
        <span className="flex items-center justify-between gap-4">
          {question}
          <span className="rounded-full border border-brand-200 bg-brand-100 px-2 py-0.5 text-xs text-brand-700 transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <p className="mt-4 text-sm leading-relaxed text-graphite-700">{answer}</p>
    </details>
  )
}
