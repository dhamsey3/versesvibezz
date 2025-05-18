"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

// Static data for fallback
const fallbackPoems = {
  "the-battle-of-time": {
    title: "The Battle of Time",
    poet: "Anonymous",
    poetSlug: "anonymous",
    year: 2023,
    coverImage: "/images/poetry-bg-5.jpg",
    content: [
      "Time marches on with steady beat,",
      "No pause, no rest, no sweet retreat.",
      "Each moment passes, never to return,",
      "A lesson we all eventually learn.",
      "",
      "We fight against its ceaseless flow,",
      "Trying to capture moments before they go.",
      "But time remains the victor in this war,",
      "Taking all we have and still wanting more.",
      "",
      "Yet in this battle we cannot win,",
      "There lies a truth hidden deep within.",
      "It's not about stopping time's advance,",
      "But making each moment a sacred dance.",
      "",
      "So embrace the hours as they pass by,",
      "Under the vast and endless sky.",
      "For in acceptance of time's swift flight,",
      "We find the path to living right.",
    ],
  },
  // Add more poems as needed
}

export default function ClientSidePoem({ slug }: { slug: string }) {
  const [poem, setPoem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPoem() {
      try {
        // First try to load from static data
        const staticPoem = fallbackPoems[slug]
        if (staticPoem) {
          setPoem(staticPoem)
          return
        }

        // If not in static data, try to fetch from API
        const response = await fetch(`/api/poem/${slug}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch poem: ${response.statusText}`)
        }
        const data = await response.json()
        setPoem(data.poem)
      } catch (err) {
        console.error("Error loading poem:", err)
        setError("Failed to load poem. Please try again later.")

        // Use fallback if available
        if (fallbackPoems[slug]) {
          setPoem(fallbackPoems[slug])
        }
      } finally {
        setLoading(false)
      }
    }

    loadPoem()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-56 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !poem) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Error Loading Poem</h1>
        <p className="text-center text-red-500 mb-6">{error}</p>
        <div className="text-center">
          <Link
            href="/poems"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Browse All Poems
          </Link>
        </div>
      </div>
    )
  }

  if (!poem) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Poem Not Found</h1>
        <p className="text-center mb-6">Sorry, we couldn't find the poem you're looking for.</p>
        <div className="text-center">
          <Link
            href="/poems"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Browse All Poems
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
        <p className="text-gray-600 italic">
          By{" "}
          <Link href={`/poets/${poem.poetSlug}`} className="hover:underline text-purple-600">
            {poem.poet}
          </Link>
          {poem.year && <span> • {poem.year}</span>}
        </p>
      </div>

      <div className="mb-8 relative h-56 w-full rounded-lg overflow-hidden">
        <Image src={poem.coverImage || "/placeholder.svg"} alt={poem.title} fill className="object-cover" priority />
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center my-6">
        <div className="h-px bg-purple-200 w-1/3"></div>
        <div className="mx-3">
          <FeatherIcon className="text-purple-500" />
        </div>
        <div className="h-px bg-purple-200 w-1/3"></div>
      </div>

      {/* Poem content */}
      <div className="prose max-w-none font-serif">
        {poem.content.map((line, index) => (
          <p key={index} className={`whitespace-pre-wrap my-3 ${line ? "italic" : "h-4"}`}>
            {line}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center my-6">
        <div className="h-px bg-purple-200 w-1/3"></div>
        <div className="mx-3">
          <FeatherIcon className="text-purple-500" />
        </div>
        <div className="h-px bg-purple-200 w-1/3"></div>
      </div>

      <div className="mt-6">
        <Link href="/poems" className="text-purple-600 hover:underline">
          ← Back to Poems
        </Link>
      </div>
    </div>
  )
}
