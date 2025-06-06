"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config.js"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function StudioPage() {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add a timeout to detect if Studio is taking too long to load
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Studio is taking a long time to load, might be an issue")
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [loading])

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg max-w-3xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4">Sanity Studio Error</h2>
        <p className="mb-4">An error occurred while loading Sanity Studio:</p>
        <div className="bg-white p-4 rounded overflow-auto mb-4">
          <pre className="text-sm">{error.message}</pre>
          {error.stack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-gray-600">Stack trace</summary>
              <pre className="text-xs mt-2 text-gray-700">{error.stack}</pre>
            </details>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-sm">This error might be caused by:</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Incorrect Sanity project configuration</li>
            <li>Network connectivity issues</li>
            <li>CORS or authentication problems</li>
            <li>Schema validation errors</li>
          </ul>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
            <Link href="/external-studio" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Try External Studio
            </Link>
            <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: "100vh" }}>
      <NextStudio
        config={config}
        unstable_globalStyles={true}
        onError={(err) => {
          console.error("Sanity Studio error:", err)
          setError(err)
        }}
        onLoading={(isLoading) => {
          setLoading(isLoading)
        }}
      />
    </div>
  )
}
