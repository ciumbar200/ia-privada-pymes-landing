interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="glass-card group p-5">
      <summary className="cursor-pointer list-none text-left text-base font-semibold text-white marker:content-none">
        <span className="flex items-center justify-between gap-4">
          {question}
          <span className="rounded-full border border-brand-700 bg-brand-800/50 px-2 py-0.5 text-xs text-electric-300 transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <p className="mt-4 text-sm leading-relaxed text-brand-300">{answer}</p>
    </details>
  )
}