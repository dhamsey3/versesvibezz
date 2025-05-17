"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function ExternalStudioPage() {
  const [redirecting, setRedirecting] = useState(true)
  const studioUrl = "https://5npbo3eo.sanity.studio/"

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = studioUrl
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Sanity Studio...</h1>
      <p className="mb-8">If you are not redirected automatically, click the button below:</p>

      <div className="flex flex-col items-center space-y-4">
        <a
          href={studioUrl}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Sanity Studio
        </a>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-2">Troubleshooting Tips</h2>
          <ul className="text-left text-sm space-y-2">
            <li>• Make sure you're logged in to your Sanity account</li>
            <li>• Check that your browser allows third-party cookies</li>
            <li>• Try using a different browser if issues persist</li>
            <li>• Ensure you have the correct permissions for this project</li>
          </ul>
        </div>

        <Link href="/" className="text-purple-600 hover:underline mt-4">
          ← Return to website
        </Link>
      </div>
    </div>
  )
}
