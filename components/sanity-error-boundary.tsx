"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function SanityErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Listen for unhandled errors
    const handleError = (event: ErrorEvent) => {
      // Check if it's a Sanity-related error
      if (
        event.error?.message?.includes("Configuration must contain `projectId`") ||
        event.error?.message?.includes("Failed to fetch data from Sanity")
      ) {
        console.log("Caught Sanity error:", event.error.message)
        setErrorMessage(event.error.message)
        setHasError(true)
        // Prevent default error handling
        event.preventDefault()
      }
    }

    // Add event listener
    window.addEventListener("error", handleError)

    // Clean up
    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (!hasError) return <>{children}</>

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
        <p className="mb-4">
          We're having trouble connecting to our content database. This could be due to a temporary issue or network
          problem.
        </p>
        {errorMessage && (
          <div className="bg-gray-100 p-3 rounded-lg mb-4 overflow-auto max-h-32">
            <p className="text-xs font-mono text-gray-700">{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Refresh Page
          </button>
          <Link href="/" className="w-full py-2 text-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
