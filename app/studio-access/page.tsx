"use client"

import { useState, useEffect } from "react"

export default function StudioAccessPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Use the v0 preview URL provided by the user
  const [studioUrl, setStudioUrl] = useState(
    "https://kzmjpasfvg9lbi5uesm1.lite.vusercontent.net/studio/structure/poem;2035ffaa-afc4-4356-822c-ae0e76bf86aa",
  )

  useEffect(() => {
    // Since we're using a v0 preview URL, we'll skip the API check
    setLoading(false)
  }, [])

  const handleOpenStudio = () => {
    window.open(studioUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sanity Studio Access</h1>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">v0 Preview Studio</h2>
        <p className="text-blue-800 mb-4">
          You're using a v0 preview URL for the Sanity Studio. This URL is specific to this preview session.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Access Studio</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Current Studio URL</h3>
            <div className="flex items-center">
              <input
                type="text"
                value={studioUrl}
                onChange={(e) => setStudioUrl(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md text-sm"
              />
              <button
                onClick={handleOpenStudio}
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700"
              >
                Open
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              This is a v0 preview URL and will only work in this preview session.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Direct Access</h3>
            <a
              href={studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-4 bg-purple-600 text-white text-center rounded-md hover:bg-purple-700"
            >
              Open Studio in New Tab
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <div className="space-y-3">
          <p className="font-medium">If you're seeing a "Studio not found" error:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Make sure you're using the correct v0 preview URL</li>
            <li>Try refreshing the page and getting a new URL if needed</li>
            <li>Check that your browser allows third-party cookies</li>
            <li>Try using a different browser (Chrome or Firefox recommended)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
