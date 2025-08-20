"use client"

import { useEffect } from "react"

export function ExtensionErrorSuppressor() {
  useEffect(() => {
    // Suppress console errors from browser extensions
    const originalError = console.error
    console.error = (...args) => {
      // Don't log extension-related errors
      const message = args.join(" ")
      if (
        message.includes("message channel closed") ||
        message.includes("Extension context invalidated") ||
        message.includes("cz-shortcut-listen") ||
        message.includes("listener indicated an asynchronous response") ||
        message.includes("chrome-extension") ||
        message.includes("moz-extension")
      ) {
        return // Silently ignore extension errors
      }
      originalError(...args)
    }

    // Suppress unhandled promise rejections from extensions
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || event.reason?.toString() || ""
      if (
        message.includes("message channel closed") ||
        message.includes("Extension context invalidated") ||
        message.includes("chrome-extension") ||
        message.includes("moz-extension")
      ) {
        event.preventDefault()
        return false
      }
    }

    // Suppress general errors from extensions
    const handleError = (event: ErrorEvent) => {
      const message = event.message || ""
      if (
        message.includes("message channel closed") ||
        message.includes("Extension context invalidated") ||
        message.includes("chrome-extension") ||
        message.includes("moz-extension")
      ) {
        event.preventDefault()
        return false
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Cleanup
    return () => {
      console.error = originalError
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])

  return null // This component renders nothing
} 