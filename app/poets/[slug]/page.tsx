import { getPoet, buildImageUrl } from "@/lib/direct-sanity"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import HardcodedPoetDisplay from "@/components/hardcoded-poet-display"

export default async function PoetPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    notFound()
  }

  try {
    console.log(`Attempting to fetch poet with slug: ${params.slug}`)
    const poet = await getPoet(params.slug)

    // If we couldn't get the poet, use the hardcoded version
    if (!poet) {
      console.log(`No poet found with slug: ${params.slug}, using hardcoded fallback`)
      return <HardcodedPoetDisplay slug={params.slug} />
    }

    console.log(`Successfully fetched poet: ${poet.name}`)

    // Get the image URL
    const imageUrl = poet.image ? buildImageUrl(poet.image) : "/images/poet-default.png"

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image src={imageUrl || "/placeholder.svg"} alt={poet.name} fill className="object-cover" priority />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-serif font-bold mb-2">{poet.name}</h1>
              {poet.birthDate && poet.deathDate && (
                <p className="text-gray-600 mb-4">
                  {poet.birthDate} - {poet.deathDate}
                </p>
              )}
              {poet.styles && poet.styles.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {poet.styles.map((style, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {style}
                    </span>
                  ))}
                </div>
              )}
              <div className="prose max-w-none">
                {poet.biography ? (
                  <div dangerouslySetInnerHTML={{ __html: poet.biography }} />
                ) : (
                  <p className="text-gray-500 italic">No biography available for this poet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Poems by this poet */}
          <div className="p-6 border-t">
            <h2 className="text-2xl font-serif font-bold mb-4">Poems by {poet.name}</h2>
            {poet.poems && poet.poems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {poet.poems.map((poem) => (
                  <Link
                    key={poem._id}
                    href={`/poems/${poem.slug.current}`}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border"
                  >
                    <div className="relative h-32">
                      <Image
                        src={poem.coverImage ? buildImageUrl(poem.coverImage) : "/images/poetry-bg-3.jpg"}
                        alt={poem.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500">{poem.year}</p>
                      <div className="mt-1 inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        Read poem
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No poems available for this poet.</p>
            )}
          </div>

          <div className="p-6 border-t">
            <Link href="/poets" className="text-purple-600 hover:underline">
              ← Back to Poets
            </Link>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error rendering poet page for slug ${params.slug}:`, error)
    return <HardcodedPoetDisplay slug={params.slug} />
  }
}
