"use client"

import { useEffect, useRef } from "react"

/**
 * Hook to handle mobile form keyboard issues
 * - Prevents zoom on iOS when typing
 * - Scrolls focused input into view
 * - Handles keyboard open/close events
 * - Fixes viewport height issues
 */
export function useMobileFormHandler() {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect when keyboard opens (input focused)
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      
      // Only handle input/textarea elements
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Add keyboard-open class to body
        document.body.classList.add('keyboard-open')
        
        // Scroll the input into view smoothly
        setTimeout(() => {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          })
        }, 300) // Delay to allow keyboard animation
      }
    }

    // Detect when keyboard closes (input blurred)
    const handleFocusOut = () => {
      document.body.classList.remove('keyboard-open')
    }

    // Handle viewport resize (keyboard open/close)
    const handleResize = () => {
      // On mobile, when keyboard opens, viewport height changes
      // This helps recalculate positions
      if (window.visualViewport) {
        const viewport = window.visualViewport
        document.documentElement.style.setProperty('--viewport-height', `${viewport.height}px`)
      }
    }

    // Add event listeners
    window.addEventListener('focusin', handleFocusIn)
    window.addEventListener('focusout', handleFocusOut)
    window.addEventListener('resize', handleResize)
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    }

    // Initial viewport height
    handleResize()

    // Cleanup
    return () => {
      window.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('focusout', handleFocusOut)
      window.removeEventListener('resize', handleResize)
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
      
      document.body.classList.remove('keyboard-open')
    }
  }, [])

  return formRef
}

