import { getPoets } from "@/lib/sanity-utils"
import { getPoetImageUrl } from "@/lib/image-utils"
import Link from "next/link"
import SanityImage from "@/components/sanity-image"
import PageBackground from "@/components/page-background"

export default async function PoetsPage() {
  let poets = []
  let error = null

  try {
    poets = await getPoets()
    console.log(`Rendering ${poets.length} poets`)
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    console.error("Error fetching poets:", error)
  }

  return (
    <PageBackground>
      <div className="container mx-auto py-8 md:py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-center">Poets</h1>
        <p className="text-gray-600 text-center mb-8 md:mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Discover the voices behind our collection of poetry.
        </p>

        {error ? (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 max-w-3xl mx-auto">
            <h2 className="font-bold mb-2">Error loading poets</h2>
            <p>{error}</p>
          </div>
        ) : poets.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No poets found. Please add poets in Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {poets.map((poet) => (
              <Link key={poet._id} href={`/poets/${poet.slug.current}`} className="group">
                <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg h-full">
                  <div className="relative h-48 md:h-64 w-full">
                    <SanityImage
                      image={poet.image}
                      alt={poet.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      fallbackImage={getPoetImageUrl(null)}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 md:p-4 text-white">
                      <h2 className="text-base md:text-xl font-serif font-semibold line-clamp-1">{poet.name}</h2>
                      {poet.styles && poet.styles.length > 0 && (
                        <p className="text-xs md:text-sm text-gray-200 mt-0.5 md:mt-1 line-clamp-1">
                          {poet.styles.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageBackground>
  )
}
