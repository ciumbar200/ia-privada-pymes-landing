import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow?: string
  title: string
  description?: string
  className?: string
  children: ReactNode
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 lg:py-20 ${className}`}>
      <div className="section-shell">
        <div className="max-w-3xl">
          {eyebrow ? <span className="section-kicker">{eyebrow}</span> : null}
          <h2 className="text-3xl leading-tight md:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-graphite-700 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
