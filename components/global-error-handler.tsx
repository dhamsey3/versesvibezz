"use client"

import { useEffect, useState } from "react"

export default function GlobalErrorHandler() {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Listen for unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.log("Global error caught:", event.error)

      // Check if it's a Sanity-related error
      if (
        event.error?.message?.includes("Configuration must contain `projectId`") ||
        event.error?.message?.includes("Failed to fetch data from Sanity")
      ) {
        setErrorMessage(event.error.message)
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
  }, [])

  if (!hasError) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
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
          <button
            onClick={() => setHasError(false)}
            className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
