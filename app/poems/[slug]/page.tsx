import { getPoem } from "@/lib/sanity-utils"
import { getPoemImageUrl } from "@/lib/image-utils"
import { PortableText } from "@portabletext/react"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"
import { notFound } from "next/navigation"
import PageBackground from "@/components/page-background"

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
    <PageBackground>
      <div className="container mx-auto py-8 md:py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 md:mb-3">{poem.title}</h1>
            <p className="text-gray-600 italic text-sm md:text-base">
              By{" "}
              {poem.poet ? (
                <Link href={`/poets/${poem.poet.slug.current}`} className="hover:underline text-purple-600">
                  {poem.poet.name}
                </Link>
              ) : (
                <span>Unknown Poet</span>
              )}
              {poem.year && <span> • {poem.year}</span>}
            </p>
            {poem.collection && (
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                From the collection:{" "}
                <Link href={`/collections/${poem.collection.slug.current}`} className="hover:underline">
                  {poem.collection.title}
                </Link>
              </p>
            )}
          </div>

          <div className="mb-8 md:mb-10 relative h-56 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <SanityImage
              image={poem.coverImage}
              alt={poem.title}
              fill
              className="object-cover"
              priority
              fallbackImage={getPoemImageUrl(null)}
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Enhanced Feather Divider */}
          <div className="flex items-center justify-center my-6 md:my-8">
            <div className="h-px bg-purple-200 w-1/3"></div>
            <div className="mx-3 md:mx-4">
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
                className="text-purple-500 md:w-7 md:h-7"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
                <path d="M16 8L2 22"></path>
                <path d="M17.5 15H9"></path>
              </svg>
            </div>
            <div className="h-px bg-purple-200 w-1/3"></div>
          </div>

          {/* Poem content with better error handling */}
          {poem.content ? (
            <div className="prose prose-sm md:prose max-w-none font-serif">
              <PortableText
                value={poem.content}
                components={{
                  block: {
                    normal: ({ children }) => <p className="my-3 md:my-4">{children}</p>,
                    verse: ({ children }) => <p className="whitespace-pre-wrap my-3 md:my-4 italic">{children}</p>,
                    h2: ({ children }) => (
                      <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg md:text-xl font-semibold mt-5 md:mt-6 mb-2 md:mb-3">{children}</h3>
                    ),
                  },
                }}
              />
            </div>
          ) : (
            <div className="prose prose-sm md:prose max-w-none">
              <p className="text-gray-500 italic">No content available for this poem.</p>
            </div>
          )}

          {/* Enhanced Feather Divider */}
          <div className="flex items-center justify-center my-6 md:my-8">
            <div className="h-px bg-purple-200 w-1/3"></div>
            <div className="mx-3 md:mx-4">
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
                className="text-purple-500 md:w-7 md:h-7"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
                <path d="M16 8L2 22"></path>
                <path d="M17.5 15H9"></path>
              </svg>
            </div>
            <div className="h-px bg-purple-200 w-1/3"></div>
          </div>

          {/* About the poet section */}
          {poem.poet && (
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-purple-50 rounded-lg">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">About the Poet</h3>
              <div className="flex items-center">
                <Link href={`/poets/${poem.poet.slug.current}`} className="flex items-center group">
                  <span className="font-medium group-hover:text-purple-600 transition-colors text-sm md:text-base">
                    {poem.poet.name}
                  </span>
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
                    className="ml-1 text-purple-600"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Themes */}
          {poem.themes && poem.themes.length > 0 && (
            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-lg font-semibold mb-2">Themes</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {poem.themes.map((theme) => (
                  <Link key={theme._id} href={`/themes/${theme.slug.current}`}>
                    <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm hover:bg-purple-200 transition-colors">
                      {theme.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageBackground>
  )
}
