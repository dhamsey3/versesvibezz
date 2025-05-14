import { getPoem } from "@/lib/sanity-utils"
import { getPoemImageUrl } from "@/lib/image-utils"
import { PortableText } from "@portabletext/react"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PoemPage({ params }: { params: { slug: string } }) {
  // Add error handling for the data fetching
  let poem
  try {
    poem = await getPoem(params.slug)

    // Log the poem data for debugging
    console.log("Fetched poem data:", JSON.stringify(poem, null, 2))

    if (!poem) {
      console.error(`Poem not found for slug: ${params.slug}`)
      notFound()
    }
  } catch (error) {
    console.error(`Error fetching poem with slug ${params.slug}:`, error)
    throw new Error(`Failed to load poem: ${error instanceof Error ? error.message : String(error)}`)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url(/images/mountain-mist.png)`,
      }}
    >
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-3">{poem.title}</h1>
            <p className="text-gray-600 italic">
              By{" "}
              {poem.poet ? (
                <Link href={`/poets/${poem.poet.slug.current}`} className="hover:underline">
                  {poem.poet.name}
                </Link>
              ) : (
                <span>Unknown Poet</span>
              )}
              {poem.year && <span> • {poem.year}</span>}
            </p>
            {poem.collection && (
              <p className="text-sm text-gray-500 mt-1">
                From the collection:{" "}
                <Link href={`/collections/${poem.collection.slug.current}`} className="hover:underline">
                  {poem.collection.title}
                </Link>
              </p>
            )}
          </div>

          <div className="mb-10 relative h-64 w-full md:h-96 rounded-lg overflow-hidden shadow-lg">
            <SanityImage
              image={poem.coverImage}
              alt={poem.title}
              fill
              className="object-cover"
              priority
              fallbackImage={getPoemImageUrl(null)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center my-8">
            <div className="h-px bg-gray-300 w-1/3"></div>
            <div className="mx-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M7 20h10"></path>
                <path d="M10 20v-4a2 2 0 1 1 4 0v4"></path>
                <path d="M8 15h8"></path>
                <path d="M12 12V4"></path>
              </svg>
            </div>
            <div className="h-px bg-gray-300 w-1/3"></div>
          </div>

          {/* Poem content with better error handling */}
          {poem.content ? (
            <div className="prose max-w-none font-serif">
              <PortableText
                value={poem.content}
                components={{
                  block: {
                    normal: ({ children }) => <p className="my-4">{children}</p>,
                    verse: ({ children }) => <p className="whitespace-pre-wrap my-4 italic">{children}</p>,
                    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
                  },
                }}
              />
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-500 italic">No content available for this poem.</p>
            </div>
          )}

          {/* Decorative divider */}
          <div className="flex items-center justify-center my-8">
            <div className="h-px bg-gray-300 w-1/3"></div>
            <div className="mx-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M7 20h10"></path>
                <path d="M10 20v-4a2 2 0 1 1 4 0v4"></path>
                <path d="M8 15h8"></path>
                <path d="M12 12V4"></path>
              </svg>
            </div>
            <div className="h-px bg-gray-300 w-1/3"></div>
          </div>

          {/* Themes */}
          {poem.themes && poem.themes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {poem.themes.map((theme) => (
                  <Link key={theme._id} href={`/themes/${theme.slug.current}`}>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors">
                      {theme.name}
                    </span>
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
