import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Mobile-optimized animation configurations
export function useMobileAnimationConfig() {
  const isMobile = useIsMobile()
  
  return React.useMemo(() => ({
    // Reduced duration for mobile
    duration: isMobile ? 0.1 : 0.15,
    ease: "easeOut",
    // Disable complex transforms on mobile
    variants: {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 }
    }
  }), [isMobile])
}
