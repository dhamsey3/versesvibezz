"use client"

import { useState, useEffect } from "react"

export default function HiddenAdminLink() {
  const [showLink, setShowLink] = useState(false)

  // This will only be triggered by a specific key combination
  useEffect(() => {
    let keys: string[] = []
    const keySequence = ["Control", "Alt", "a"] // Ctrl+Alt+A

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key)

      // Only keep the last N keys in the buffer where N is the length of the sequence
      if (keys.length > keySequence.length) {
        keys = keys.slice(keys.length - keySequence.length)
      }

      // Check if the current keys match the sequence
      const matchesSequence = keys.join(",") === keySequence.join(",")

      if (matchesSequence) {
        setShowLink(true)
        setTimeout(() => setShowLink(false), 5000) // Hide after 5 seconds
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!showLink) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <a
        href="/studio"
        className="text-sm text-gray-600 hover:text-purple-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        Admin Access
      </a>
      <div className="text-xs text-gray-400 mt-1">This link will disappear in 5 seconds</div>
    </div>
  )
}
