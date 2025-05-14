import { getPoet } from "@/lib/sanity-utils"
import { getPoetImageUrl, getPoemImageUrl } from "@/lib/image-utils"
import { PortableText } from "@portabletext/react"
import SanityImage from "@/components/sanity-image"
import Link from "next/link"
import { notFound } from "next/navigation"

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
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url(/images/mountain-mist.png)`,
      }}
    >
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="relative h-80 w-full rounded-lg overflow-hidden">
                <SanityImage
                  image={poet.image}
                  alt={poet.name}
                  fill
                  className="object-cover"
                  fallbackImage={getPoetImageUrl(null)}
                />
              </div>

              <div className="mt-6 space-y-4">
                {poet.birthDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Born</h3>
                    <p>{new Date(poet.birthDate).toLocaleDateString()}</p>
                  </div>
                )}

                {poet.deathDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Died</h3>
                    <p>{new Date(poet.deathDate).toLocaleDateString()}</p>
                  </div>
                )}

                {poet.styles && poet.styles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Poetic Styles</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {poet.styles.map((style) => (
                        <span key={style} className="px-3 py-1 bg-purple-100 rounded-full text-sm text-purple-800">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl font-serif font-bold mb-6">{poet.name}</h1>

              {poet.biography ? (
                <div className="prose max-w-none mb-8">
                  <PortableText value={poet.biography} />
                </div>
              ) : (
                <p className="text-gray-600 italic mb-8">No biography available for this poet.</p>
              )}

              {poet.poems && poet.poems.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-serif font-semibold mb-6">Poems by {poet.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {poet.poems.map((poem) => (
                      <Link key={poem._id} href={`/poems/${poem.slug.current}`} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative h-48">
                            <SanityImage
                              image={poem.coverImage}
                              alt={poem.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105 duration-500"
                              fallbackImage={getPoemImageUrl(null)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                              <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                              {poem.year && <p className="text-sm text-gray-200">{poem.year}</p>}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">No poems found for this poet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
