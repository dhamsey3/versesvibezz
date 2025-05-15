import { getPoem } from "@/lib/sanity-utils"
import { getPoemImageUrl } from "@/lib/image-utils"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"
import { notFound } from "next/navigation"
import FeatherIcon from "@/components/feather-icon"

export default async function PoemPage({ params }: { params: { slug: string } }) {
  // Add error handling for the data fetching
  let poem
  try {
    poem = await getPoem(params.slug)

    if (!poem) {
      console.error(`Poem not found for slug: ${params.slug}`)
      notFound()
    }
  } catch (error) {
    console.error(`Error fetching poem with slug ${params.slug}:`, error)
    throw new Error(`Failed to load poem: ${error instanceof Error ? error.message : String(error)}`)
  }

  // Function to render poem content as plain HTML for maximum compatibility
  function renderPoemContent(content: any) {
    if (!content || !Array.isArray(content)) {
      return <p className="text-gray-500 italic">No content available for this poem.</p>
    }

    return content.map((block, blockIndex) => {
      // Handle different block types
      if (block._type === "block") {
        const style = block.style || "normal"

        // Extract text from spans
        const text = block.children
          .filter((child: any) => child._type === "span")
          .map((span: any) => span.text)
          .join("")

        // Render based on style
        if (style === "verse") {
          return (
            <p key={blockIndex} className="poem-verse">
              {text}
            </p>
          )
        } else if (style === "h2") {
          return (
            <h2 key={blockIndex} className="poem-heading-2">
              {text}
            </h2>
          )
        } else if (style === "h3") {
          return (
            <h3 key={blockIndex} className="poem-heading-3">
              {text}
            </h3>
          )
        } else {
          return (
            <p key={blockIndex} className="poem-paragraph">
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
    <div className="poem-page">
      <div className="container mx-auto py-6 px-4">
        <div className="poem-container">
          <div className="poem-header">
            <h1 className="poem-title">{poem.title}</h1>
            <p className="poem-byline">
              By{" "}
              {poem.poet ? (
                <Link href={`/poets/${poem.poet.slug.current}`} className="poet-link">
                  {poem.poet.name}
                </Link>
              ) : (
                <span>Unknown Poet</span>
              )}
              {poem.year && <span> • {poem.year}</span>}
            </p>
            {poem.collection && (
              <p className="poem-collection">
                From the collection:{" "}
                <Link href={`/collections/${poem.collection.slug.current}`} className="collection-link">
                  {poem.collection.title}
                </Link>
              </p>
            )}
          </div>

          <div className="poem-image-container">
            <SanityImage
              image={poem.coverImage}
              alt={poem.title}
              fill
              className="poem-image"
              priority
              fallbackImage={getPoemImageUrl(null)}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Divider */}
          <div className="poem-divider">
            <div className="divider-line"></div>
            <FeatherIcon className="divider-icon" />
            <div className="divider-line"></div>
          </div>

          {/* Poem content with simplified rendering for maximum compatibility */}
          <div className="poem-content">{renderPoemContent(poem.content)}</div>

          {/* Divider */}
          <div className="poem-divider">
            <div className="divider-line"></div>
            <FeatherIcon className="divider-icon" />
            <div className="divider-line"></div>
          </div>

          {/* About the poet section */}
          {poem.poet && (
            <div className="poet-section">
              <h3 className="poet-section-title">About the Poet</h3>
              <Link href={`/poets/${poem.poet.slug.current}`} className="poet-link-button">
                <span>{poem.poet.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="poet-link-icon"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          )}

          {/* Themes */}
          {poem.themes && poem.themes.length > 0 && (
            <div className="themes-section">
              <h3 className="themes-title">Themes</h3>
              <div className="themes-container">
                {poem.themes.map((theme) => (
                  <Link key={theme._id} href={`/themes/${theme.slug.current}`}>
                    <span className="theme-tag">{theme.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
