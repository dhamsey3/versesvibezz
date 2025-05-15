"use client"

import { useEffect } from "react"

export default function ExternalStudioFixedPage() {
  useEffect(() => {
    // Redirect to the external Sanity Studio with hardcoded project ID
    window.location.href = "https://5npbo3eo.sanity.studio/"
  }, [])

  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Sanity Studio...</h1>
      <p className="mb-8">If you are not redirected automatically, click the button below:</p>
      <a
        href="https://5npbo3eo.sanity.studio/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Sanity Studio
      </a>
    </div>
  )
}
