declare module 'aos' {
  interface AosOptions {
    duration?: number
    easing?: string
    once?: boolean
    offset?: number
  }

  interface AOS {
    init(options?: AosOptions): void
    refresh(): void
    refreshHard(): void
  }

  const AOS: AOS
  export default AOS
}

declare module 'aos/dist/aos.css'
