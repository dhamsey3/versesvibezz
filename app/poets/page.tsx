import { getPoets } from "@/lib/sanity-utils"
import { getPoetImageUrl } from "@/lib/image-utils"
import Link from "next/link"
import SanityImage from "@/components/sanity-image"

export default async function PoetsPage() {
  const poets = await getPoets()

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url(/images/mountain-mist.png)`,
      }}
    >
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center">Poets</h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Discover the voices behind our collection of poetry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {poets.map((poet) => (
            <Link key={poet._id} href={`/poets/${poet.slug.current}`} className="group">
              <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="relative h-64 w-full">
                  <SanityImage
                    image={poet.image}
                    alt={poet.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    fallbackImage={getPoetImageUrl(null)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-xl font-serif font-semibold">{poet.name}</h2>
                    {poet.styles && poet.styles.length > 0 && (
                      <p className="text-sm text-gray-200 mt-1">{poet.styles.join(", ")}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
