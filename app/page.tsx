import { getFeaturedPoems, getPoets, getCollections } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  // Fetch data in parallel
  const [poems, poets, collections] = await Promise.all([
    getFeaturedPoems().catch(() => []),
    getPoets().catch(() => []),
    getCollections().catch(() => []),
  ])

  // Limit the number of items to display
  const featuredPoems = poems.slice(0, 6)
  const featuredPoets = poets.slice(0, 4)
  const featuredCollections = collections.slice(0, 3)

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to VersesVibez</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Discover beautiful poetry from around the world, from classic to contemporary voices.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/poems" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              Explore Poems
            </Link>
            <Link
              href="/poets"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10"
            >
              Meet the Poets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Poems */}
      {featuredPoems.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Poems</h2>
              <Link href="/poems" className="text-indigo-600 font-medium hover:underline">
                View all poems
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPoems.map((poem) => (
                <div
                  key={poem._id}
                  className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow h-full"
                >
                  <Link href={`/poems/${poem.slug.current}`} className="block">
                    <div className="relative h-48">
                      {poem.coverImage ? (
                        <Image
                          src={urlFor(poem.coverImage).url() || "/placeholder.svg?height=300&width=500&query=poem"}
                          alt={poem.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">
                        {poem.title}
                      </h3>
                      <p className="text-gray-600 mt-1">By: {poem.poet}</p>
                      {poem.year && <p className="text-sm text-gray-500 mt-1">{poem.year}</p>}
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <Link href={`/poets/${poem.poetSlug}`} className="text-sm text-blue-600 hover:underline">
                      View poet profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Poets */}
      {featuredPoets.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Poets</h2>
              <Link href="/poets" className="text-indigo-600 font-medium hover:underline">
                View all poets
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredPoets.map((poet) => (
                <Link key={poet._id} href={`/poets/${poet.slug.current}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-6">
                    <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4">
                      {poet.image ? (
                        <Image
                          src={
                            urlFor(poet.image).url() || "/placeholder.svg?height=200&width=200&query=poet%20portrait"
                          }
                          alt={poet.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">{poet.name}</h3>
                    {poet.styles && poet.styles.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">{poet.styles.join(", ")}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Poetry Collections */}
      {featuredCollections.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Poetry Collections</h2>
              <Link href="/collections" className="text-indigo-600 font-medium hover:underline">
                View all collections
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections.map((collection) => (
                <div
                  key={collection._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full"
                >
                  <Link href={`/collections/${collection.slug.current}`} className="block">
                    <div className="relative h-56">
                      {collection.coverImage ? (
                        <Image
                          src={
                            urlFor(collection.coverImage).url() ||
                            "/placeholder.svg?height=350&width=500&query=poetry%20collection" ||
                            "/placeholder.svg"
                          }
                          alt={collection.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {collection.poemCount} {collection.poemCount === 1 ? "poem" : "poems"}
                        {collection.publicationYear && ` • ${collection.publicationYear}`}
                      </p>
                    </div>
                  </Link>
                  {collection.poet && (
                    <div className="px-4 pb-4">
                      <Link href={`/poets/${collection.poetSlug}`} className="text-sm text-blue-600 hover:underline">
                        By: {collection.poet}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
