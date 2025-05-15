import { getPoet } from "@/lib/sanity-utils"
import { getPoetImageUrl, getPoemImageUrl } from "@/lib/image-utils"
import { PortableText } from "@portabletext/react"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"
import { notFound } from "next/navigation"
import PageBackground from "@/components/page-background"

export default async function PoetPage({ params }: { params: { slug: string } }) {
  // Add error handling for the data fetching
  let poet
  try {
    poet = await getPoet(params.slug)

    // Log the poet data for debugging
    console.log("Fetched poet data:", JSON.stringify(poet, null, 2))

    if (!poet) {
      console.error(`Poet not found for slug: ${params.slug}`)
      notFound()
    }
  } catch (error) {
    console.error(`Error fetching poet with slug ${params.slug}:`, error)
    throw new Error(`Failed to load poet: ${error instanceof Error ? error.message : String(error)}`)
  }

  return (
    <PageBackground>
      <div className="container mx-auto py-8 md:py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-1">
              <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
                <SanityImage
                  image={poet.image}
                  alt={poet.name}
                  fill
                  className="object-cover"
                  fallbackImage={getPoetImageUrl(null)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                {poet.birthDate && (
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase">Born</h3>
                    <p className="text-sm md:text-base">{new Date(poet.birthDate).toLocaleDateString()}</p>
                  </div>
                )}

                {poet.deathDate && (
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase">Died</h3>
                    <p className="text-sm md:text-base">{new Date(poet.deathDate).toLocaleDateString()}</p>
                  </div>
                )}

                {poet.styles && poet.styles.length > 0 && (
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase">Poetic Styles</h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                      {poet.styles.map((style) => (
                        <span
                          key={style}
                          className="px-2 md:px-3 py-1 bg-purple-100 rounded-full text-xs md:text-sm text-purple-700"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-6">{poet.name}</h1>

              {poet.biography ? (
                <div className="prose prose-sm md:prose max-w-none mb-6 md:mb-8">
                  <PortableText value={poet.biography} />
                </div>
              ) : (
                <p className="text-gray-600 italic mb-6 md:mb-8 text-sm md:text-base">
                  No biography available for this poet.
                </p>
              )}

              {poet.poems && poet.poems.length > 0 ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-semibold mb-4 md:mb-6">Poems by {poet.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {poet.poems.map((poem) => (
                      <Link key={poem._id} href={`/poems/${poem.slug.current}`} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative h-40 md:h-48">
                            <SanityImage
                              image={poem.coverImage}
                              alt={poem.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105 duration-500"
                              fallbackImage={getPoemImageUrl(null)}
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-3 md:p-4 text-white">
                              <h3 className="text-base md:text-lg font-serif font-semibold line-clamp-1">
                                {poem.title}
                              </h3>
                              {poem.year && <p className="text-xs md:text-sm text-gray-200">{poem.year}</p>}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <p className="text-gray-600 text-sm md:text-base">No poems found for this poet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  )
}
