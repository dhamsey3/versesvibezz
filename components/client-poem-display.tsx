"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"
import { clientSafe } from "@/lib/sanity-client-safe"

export default function ClientPoemDisplay({ slug }: { slug: string }) {
  const [poem, setPoemData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPoem() {
      try {
        // Use the client-safe Sanity client
        const data = await clientSafe.fetch(
          `*[_type == "poem" && slug.current == $slug][0]{
            title,
            content,
            coverImage,
            "poet": poet->name,
            "poetSlug": poet->slug.current,
            year
          }`,
          { slug },
        )
        setPoemData(data)
      } catch (err) {
        console.error("Error fetching poem:", err)
        setError(err instanceof Error ? err.message : "Failed to load poem")
      } finally {
        setLoading(false)
      }
    }

    fetchPoem()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-56 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Error Loading Poem</h1>
        <p className="text-center text-red-500 mb-4">{error}</p>
        <div className="text-center">
          <Link href="/poems" className="text-purple-600 hover:underline">
            ← Back to Poems
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
          <Link href="/poems" className="text-purple-600 hover:underline">
            ← Back to Poems
          </Link>
        </div>
      </div>
    )
  }

  // Function to render poem content
  function renderPoemContent(content: any) {
    if (!content || !Array.isArray(content)) {
      return <p className="text-gray-500 italic">No content available for this poem.</p>
    }

    return content.map((block, blockIndex) => {
      // Handle different block types
      if (block._type === "block") {
        const style = block.style || "normal"

        // Extract text from spans
        const text =
          block.children
            ?.filter((child: any) => child._type === "span")
            .map((span: any) => span.text)
            .join("") || ""

        // Render based on style
        if (style === "verse") {
          return (
            <p key={blockIndex} className="whitespace-pre-wrap my-3 italic">
              {text}
            </p>
          )
        } else if (style === "h2") {
          return (
            <h2 key={blockIndex} className="text-xl font-semibold mt-6 mb-3">
              {text}
            </h2>
          )
        } else if (style === "h3") {
          return (
            <h3 key={blockIndex} className="text-lg font-semibold mt-5 mb-2">
              {text}
            </h3>
          )
        } else {
          return (
            <p key={blockIndex} className="my-3">
              {text}
            </p>
          )
        }
      }

      // Fallback for unknown block types
      return null
    })
  }

  // Build image URL
  function buildImageUrl(source: any) {
    if (!source) return "/images/poetry-bg-1.jpg"

    // Simple image URL builder
    return `https://cdn.sanity.io/images/${clientSafe.config().projectId}/production/${source.asset._ref
      .replace("image-", "")
      .replace("-jpg", ".jpg")
      .replace("-png", ".png")
      .replace("-webp", ".webp")
      .replace("-gif", ".gif")}`
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
          <p className="text-gray-600 italic">
            By{" "}
            {poem.poet ? (
              <Link href={`/poets/${poem.poetSlug || "#"}`} className="hover:underline text-purple-600">
                {poem.poet}
              </Link>
            ) : (
              <span>Unknown Poet</span>
            )}
            {poem.year && <span> • {poem.year}</span>}
          </p>
        </div>

        <div className="mb-8 relative h-56 w-full rounded-lg overflow-hidden">
          <Image
            src={poem.coverImage ? buildImageUrl(poem.coverImage) : "/images/poetry-bg-1.jpg"}
            alt={poem.title}
            fill
            className="object-cover"
            priority
          />
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
        <div className="prose max-w-none font-serif">{renderPoemContent(poem.content)}</div>

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
    </div>
  )
}
