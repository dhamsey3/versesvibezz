"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function SanityErrorHandler() {
  const router = useRouter()
  const pathname = usePathname()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Skip if we're already on a static page
    if (pathname?.startsWith("/static-")) {
      return
    }

    // Listen for unhandled errors
    const handleError = (event: ErrorEvent) => {
      // Check if it's a Sanity-related error
      if (
        event.error?.message?.includes("Configuration must contain `projectId`") ||
        event.error?.message?.includes("Failed to fetch data from Sanity")
      ) {
        console.log("Caught Sanity error:", event.error.message)
        setHasError(true)
        event.preventDefault() // Prevent default error handling
      }
    }

    // Add event listener
    window.addEventListener("error", handleError)

    // Clean up
    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [pathname])

  useEffect(() => {
    if (hasError) {
      // Redirect to static fallback based on current path
      if (pathname === "/") {
        router.push("/static")
      } else if (pathname?.startsWith("/poems")) {
        router.push("/static-poems")
      } else if (pathname?.startsWith("/poets")) {
        router.push("/static-poets")
      } else {
        router.push("/static")
      }
    }
  }, [hasError, pathname, router])

  return null
}
