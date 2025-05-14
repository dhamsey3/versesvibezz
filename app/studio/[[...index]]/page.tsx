"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import { useState } from "react"

export default function StudioPage() {
  const [error, setError] = useState<Error | null>(null)

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
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
          <a href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: "100vh" }}>
      <NextStudio
        config={config}
        unstable_globalStyles={true}
        onError={(error) => {
          console.error("Sanity Studio error:", error)
          setError(error)
        }}
      />
    </div>
  )
}
