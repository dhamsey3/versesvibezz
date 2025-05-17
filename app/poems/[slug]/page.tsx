import { getPoem } from "@/lib/sanity-utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"
import { urlFor } from "@/lib/sanity-client"
import HardcodedPoemDisplay from "@/components/hardcoded-poem-display"

export default async function PoemPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    notFound()
  }

  try {
    // First attempt: Try to get the poem using the regular Sanity client
    let poem = await getPoem(params.slug)

    // If that fails, try the direct API approach
    if (!poem) {
      console.log("Regular Sanity client failed, trying direct API fetch")
      try {
        // Use fetch with cache: 'no-store' to ensure fresh data
        const response = await fetch(`/api/poem/${params.slug}`, { cache: "no-store" })
        if (response.ok) {
          const data = await response.json()
          poem = data.poem
        }
      } catch (apiError) {
        console.error("API fetch also failed:", apiError)
      }
    }

    // If both methods fail, fall back to hardcoded content
    if (!poem) {
      console.log("All Sanity fetch methods failed, using hardcoded fallback")
      return <HardcodedPoemDisplay slug={params.slug} />
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

    // Safe access to nested properties
    const poetName = typeof poem.poet === "object" ? poem.poet?.name : poem.poet
    const poetSlug = typeof poem.poet === "object" ? poem.poet?.slug?.current : poem.poetSlug

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
            <p className="text-gray-600 italic">
              By{" "}
              {poetName ? (
                <Link href={`/poets/${poetSlug || "#"}`} className="hover:underline text-purple-600">
                  {poetName}
                </Link>
              ) : (
                <span>Unknown Poet</span>
              )}
              {poem.year && <span> • {poem.year}</span>}
            </p>
          </div>

          <div className="mb-8 relative h-56 w-full rounded-lg overflow-hidden">
            <Image
              src={poem.coverImage ? urlFor(poem.coverImage).url() : "/images/poetry-bg-1.jpg"}
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
  } catch (error) {
    console.error(`Error rendering poem page for slug ${params.slug}:`, error)
    return <HardcodedPoemDisplay slug={params.slug} />
  }
}
