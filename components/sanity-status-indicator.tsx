"use client"

import { useState, useEffect } from "react"

export default function SanityStatusIndicator() {
  const [status, setStatus] = useState<"loading" | "connected" | "disconnected">("loading")
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check Sanity connection
    async function checkConnection() {
      try {
        const response = await fetch("/api/sanity-status")
        const data = await response.json()

        setStatus(data.connected ? "connected" : "disconnected")

        // Hide the indicator after 5 seconds if connected
        if (data.connected) {
          setTimeout(() => setIsVisible(false), 5000)
        }
      } catch (error) {
        console.error("Error checking Sanity status:", error)
        setStatus("disconnected")
      }
    }

    checkConnection()
  }, [])

  // Hide if not visible or still loading
  if (!isVisible || status === "loading") return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-medium shadow-md ${
        status === "connected" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status === "connected" ? <span>Connected to Sanity CMS</span> : <span>Using offline content</span>}
      <button onClick={() => setIsVisible(false)} className="ml-2 text-gray-500 hover:text-gray-700" aria-label="Close">
        ×
      </button>
    </div>
  )
}
