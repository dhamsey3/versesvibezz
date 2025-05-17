"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function HiddenAdminLink() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Listen for a specific key combination (Ctrl+Alt+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "a") {
        setIsVisible(true)
        // Auto-hide after 10 seconds
        setTimeout(() => setIsVisible(false), 10000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <Link href="/admin" className="text-sm text-gray-600 hover:text-purple-700">
        Admin Access
      </Link>
      <div className="text-xs text-gray-400 mt-1">This link will disappear in 10 seconds</div>
    </div>
  )
}
