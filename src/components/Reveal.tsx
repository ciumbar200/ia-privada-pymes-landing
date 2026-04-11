import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  const styles: CSSProperties = {
    transitionDelay: `${delay}ms`,
  }

  return (
    <div
      ref={ref}
      style={styles}
      className={`transform-gpu transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
