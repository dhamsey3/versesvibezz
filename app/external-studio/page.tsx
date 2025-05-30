"use client"

import { useState, useEffect } from "react"
import { getStudioUrl } from "@/lib/sanity-config"
import Link from "next/link"

export default function ExternalStudioPage() {
  const [redirectAttempted, setRedirectAttempted] = useState(false)
  const [studioUrl, setStudioUrl] = useState("")
  const [isV0Preview, setIsV0Preview] = useState(false)

  useEffect(() => {
    // Get the appropriate studio URL
    const url = getStudioUrl()
    setStudioUrl(url)

    // Check if we're in a v0 preview
    setIsV0Preview(typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net"))

    // Try to redirect after a short delay
    const timer = setTimeout(() => {
      try {
        window.open(url, "_blank")
        setRedirectAttempted(true)
      } catch (error) {
        console.error("Failed to open studio in new window:", error)
        setRedirectAttempted(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Accessing Sanity Studio</h1>

      {!redirectAttempted ? (
        <p className="mb-8">Attempting to open Sanity Studio in a new tab...</p>
      ) : (
        <div className="mb-8">
          <p className="mb-4">If Sanity Studio didn't open automatically, please click the button below:</p>
          <a
            href={studioUrl}
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Sanity Studio
          </a>
        </div>
      )}

      {isV0Preview && (
        <div className="mt-12 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Important Note</h2>
          <div className="text-left bg-yellow-50 p-6 rounded-lg">
            <p className="mb-4">
              You're using a v0 preview URL for the Sanity Studio. This URL is specific to this preview session and may
              not work in other contexts or after the session expires.
            </p>
          </div>
        </div>
      )}

      <div className="mt-12 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <div className="text-left bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">If you're having trouble accessing the studio:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Make sure you're logged in to your Sanity account</li>
            <li>Check that your browser allows pop-ups from this site</li>
            <li>Try using a different browser (Chrome or Firefox recommended)</li>
            <li>Clear your browser cache and cookies</li>
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link href="/studio-access" className="text-purple-600 hover:underline">
              Go to Studio Access Page for more options
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
