import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current || isVisible) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [isVisible])

  return { ref, isVisible }
}
