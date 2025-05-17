"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function StudioAccessPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [studioUrl, setStudioUrl] = useState("https://5npbo3eo.sanity.studio/")

  useEffect(() => {
    // Check if we can access the Sanity API
    const checkSanityAccess = async () => {
      try {
        const response = await fetch("https://5npbo3eo.api.sanity.io/v2023-05-03/projects/5npbo3eo", {
          method: "HEAD",
          cache: "no-store",
        })

        if (response.ok) {
          setLoading(false)
        } else {
          setError(`Sanity API returned status: ${response.status}`)
          setLoading(false)
        }
      } catch (err) {
        setError(`Failed to connect to Sanity: ${err instanceof Error ? err.message : String(err)}`)
        setLoading(false)
      }
    }

    checkSanityAccess()
  }, [])

  const handleOpenStudio = () => {
    window.open(studioUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sanity Studio Access</h1>

      {loading ? (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <p className="text-blue-800">Checking Sanity connection...</p>
        </div>
      ) : error ? (
        <div className="bg-yellow-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Connection Issue Detected</h2>
          <p className="text-yellow-800 mb-4">{error}</p>
          <p className="text-yellow-800">You may still try to access the studio, but it might not work correctly.</p>
        </div>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Connection Successful</h2>
          <p className="text-green-800">Sanity API is accessible. You should be able to use the studio.</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Access Options</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">1. Direct Studio URL</h3>
            <div className="flex items-center">
              <input
                type="text"
                value={studioUrl}
                onChange={(e) => setStudioUrl(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
              />
              <button
                onClick={handleOpenStudio}
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700"
              >
                Open
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">2. Alternative Access Methods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/external-studio" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">
                Use Redirect Page
              </Link>
              <Link href="/studio" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">
                Try Embedded Studio
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <div className="space-y-3">
          <p className="font-medium">If you're seeing a "Studio not found" error:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Make sure you're logged in to your Sanity account in your browser</li>
            <li>Check that your browser allows third-party cookies</li>
            <li>Try using a different browser (Chrome or Firefox recommended)</li>
            <li>Verify that you have the correct permissions for this project</li>
            <li>
              Try accessing the studio directly at{" "}
              <a
                href="https://5npbo3eo.sanity.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                https://5npbo3eo.sanity.studio/
              </a>
            </li>
            <li>
              If all else fails, try using the{" "}
              <a
                href="https://www.sanity.io/manage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Sanity management console
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
