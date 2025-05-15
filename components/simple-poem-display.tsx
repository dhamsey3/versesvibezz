import Link from "next/link"
import Image from "next/image"
import { getPoemImageUrl } from "@/lib/image-utils"
import FeatherIcon from "@/components/feather-icon"

interface SimplePoemDisplayProps {
  poem: any
}

export default function SimplePoemDisplay({ poem }: SimplePoemDisplayProps) {
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

  // Function to render poem content as plain HTML
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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
        <p className="text-gray-600 italic">
          By{" "}
          {poem.poet ? (
            <Link
              href={`/poets/${typeof poem.poet === "string" ? poem.poetSlug : poem.poet.slug.current}`}
              className="hover:underline text-purple-600"
            >
              {typeof poem.poet === "string" ? poem.poet : poem.poet.name}
            </Link>
          ) : (
            <span>Unknown Poet</span>
          )}
          {poem.year && <span> • {poem.year}</span>}
        </p>
      </div>

      <div className="mb-8 relative h-56 w-full rounded-lg overflow-hidden">
        <Image
          src={getPoemImageUrl(poem.coverImage) || "/placeholder.svg"}
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
  )
}
