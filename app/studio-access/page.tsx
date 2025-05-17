"use client"

import { useState, useEffect } from "react"
import { getStudioUrl } from "@/lib/sanity-config"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function StudioAccessPage() {
  const [studioUrl, setStudioUrl] = useState("")
  const [isV0Preview, setIsV0Preview] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Check if the key parameter is present in the URL
    const params = new URLSearchParams(window.location.search)
    const key = params.get("key")

    // If no key is provided, redirect to the admin page
    if (!key) {
      router.push("/admin")
    }
  }, [router])

  useEffect(() => {
    // Get the appropriate studio URL
    const url = getStudioUrl()
    setStudioUrl(url)

    // Check if we're in a v0 preview
    setIsV0Preview(typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net"))
  }, [])

  const handleOpenStudio = () => {
    window.open(studioUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sanity Studio Access</h1>

      {isV0Preview && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">v0 Preview Studio</h2>
          <p className="text-blue-800 mb-4">
            You're using a v0 preview URL for the Sanity Studio. This URL is specific to this preview session.
          </p>
        </div>
      )}

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
            {isV0Preview && (
              <p className="text-sm text-gray-500 mt-2">
                This is a v0 preview URL and will only work in this preview session.
              </p>
            )}
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
          <p className="font-medium">If you're having trouble accessing the studio:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Make sure you're logged in to your Sanity account</li>
            <li>Check that your browser allows third-party cookies</li>
            <li>Try using a different browser (Chrome or Firefox recommended)</li>
            <li>Clear your browser cache and cookies</li>
          </ol>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link href="/" className="text-purple-600 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
