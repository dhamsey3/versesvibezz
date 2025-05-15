"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"

interface SanityErrorBoundaryProps {
  children: React.ReactNode
}

export default function SanityErrorBoundary({ children }: SanityErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check for Sanity-related errors in the console
    const originalConsoleError = console.error
    console.error = (...args) => {
      const errorMessage = args.join(" ")
      if (
        errorMessage.includes("Configuration must contain `projectId`") ||
        errorMessage.includes("Failed to fetch data from Sanity")
      ) {
        setHasError(true)
      }
      originalConsoleError(...args)
    }

    // Restore original console.error on cleanup
    return () => {
      console.error = originalConsoleError
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="mb-4">
            We're having trouble connecting to our content database. This could be due to a temporary issue or network
            problem.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700 mb-2">Technical details:</p>
            <p className="text-xs text-gray-600 font-mono">Sanity client configuration error</p>
          </div>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refresh Page
            </button>
            <Link
              href="/"
              className="w-full py-2 text-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
