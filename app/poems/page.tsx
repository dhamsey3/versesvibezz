import { getPoems } from "@/lib/sanity-utils"
import { getPoemImageUrl } from "@/lib/image-utils"
import Link from "next/link"
import SanityImage from "@/components/sanity-image"

export default async function PoemsPage() {
  const poems = await getPoems()

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url(/images/mountain-mist.png)`,
      }}
    >
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center">Poems</h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Explore our collection of beautiful poetry from various poets and traditions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poems.map((poem) => (
            <div
              key={poem._id}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl h-full"
            >
              <Link href={`/poems/${poem.slug.current}`} className="block">
                <div className="relative h-56 w-full">
                  <SanityImage
                    image={poem.coverImage}
                    alt={poem.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                    fallbackImage={getPoemImageUrl(null)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-xl font-serif font-semibold">{poem.title}</h2>
                    <p className="text-sm text-gray-200 mt-1">By {poem.poet}</p>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                {poem.year && <p className="text-sm text-gray-500 mb-2">{poem.year}</p>}
                <Link
                  href={`/poems/${poem.slug.current}`}
                  className="inline-block mt-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
