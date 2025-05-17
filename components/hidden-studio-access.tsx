"use client"

import { useState, useEffect } from "react"
import { getStudioUrl } from "@/lib/sanity-config"
import { useRouter } from "next/navigation"

export default function HiddenStudioAccess() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Listen for a specific key combination (Ctrl+Alt+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "s") {
        setIsVisible(true)
        // Auto-hide after 30 seconds for security
        setTimeout(() => setIsVisible(false), 30000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleOpenStudio = async () => {
    try {
      // Get the access key from the server
      const response = await fetch("/api/get-studio-key")
      const data = await response.json()

      if (data.key) {
        // Open the studio with the key
        const studioUrl = getStudioUrl()
        window.open(`${studioUrl}?key=${data.key}`, "_blank", "noopener,noreferrer")
      } else {
        // If no key is available, redirect to the admin page
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error accessing studio:", error)
      router.push("/admin")
    }
  }

  // If not visible, don't render anything
  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-80">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Sanity Studio Access</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Open the Sanity Studio to manage your content.</p>
          <button
            onClick={handleOpenStudio}
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Open Studio
          </button>
          <p className="text-xs text-gray-500 mt-2">This panel will auto-hide in 30 seconds.</p>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          aria-label="Open Studio Access"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
            <path d="M16 8L2 22"></path>
            <path d="M17.5 15H9"></path>
          </svg>
        </button>
      )}
    </div>
  )
}
