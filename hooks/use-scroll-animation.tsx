'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with animation classes
    const animatedElements = element.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}
