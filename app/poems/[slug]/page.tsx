import { getPoem } from "@/lib/sanity-utils"
import { getPoemImageUrl } from "@/lib/image-utils"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"
import { notFound } from "next/navigation"
import PageBackground from "@/components/page-background"
import FeatherIcon from "@/components/feather-icon"
import PoemContent from "@/components/poem-content"

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
      <div className="container mx-auto py-6 md:py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-5 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 md:mb-3">{poem.title}</h1>
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

          <div className="mb-6 md:mb-8 relative h-48 sm:h-56 md:h-72 w-full rounded-lg overflow-hidden shadow-lg">
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
          <div className="flex items-center justify-center my-5 md:my-6">
            <div className="h-px bg-purple-200 w-1/3"></div>
            <div className="mx-3">
              <FeatherIcon className="text-purple-500 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="h-px bg-purple-200 w-1/3"></div>
          </div>

          {/* Poem content with improved mobile readability */}
          <PoemContent content={poem.content} />

          {/* Enhanced Feather Divider */}
          <div className="flex items-center justify-center my-5 md:my-6">
            <div className="h-px bg-purple-200 w-1/3"></div>
            <div className="mx-3">
              <FeatherIcon className="text-purple-500 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="h-px bg-purple-200 w-1/3"></div>
          </div>

          {/* About the poet section */}
          {poem.poet && (
            <div className="mt-5 md:mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="text-base md:text-lg font-semibold mb-2">About the Poet</h3>
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
            <div className="mt-4 md:mt-6">
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
