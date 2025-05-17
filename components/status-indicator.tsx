"use client"

import { useContent } from "@/context/content-provider"

export default function StatusIndicator() {
  const { source, refreshContent } = useContent()

  if (source === "static") {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
        <span>Viewing offline content</span>
        <button onClick={() => refreshContent()} className="ml-2 text-blue-600 hover:underline">
          Try reconnecting
        </button>
      </div>
    )
  }

  return null
}
