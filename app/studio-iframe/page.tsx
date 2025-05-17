"use client"

import { useState, useEffect } from "react"
import { getStudioUrl } from "@/lib/sanity-config"
import Link from "next/link"

export default function StudioIframePage() {
  const [studioUrl, setStudioUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const url = getStudioUrl()
      setStudioUrl(url)
      setLoading(false)
    } catch (err) {
      setError("Failed to get studio URL")
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p>Loading studio...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Studio</h1>
        <p className="mb-4">{error}</p>
        <Link href="/" className="text-purple-600 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sanity Studio (Embedded)</h1>
        <div className="flex space-x-4">
          <a
            href={studioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Open in New Tab
          </a>
          <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Back to Site
          </Link>
        </div>
      </div>
      <iframe src={studioUrl} className="flex-grow w-full border-0" title="Sanity Studio" />
    </div>
  )
}
