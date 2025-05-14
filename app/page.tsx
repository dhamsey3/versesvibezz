import { getFeaturedPoems, getPoets, getCollections } from "@/lib/sanity-utils"
import { getPoemImageUrl, getPoetImageUrl, getCollectionImageUrl } from "@/lib/image-utils"
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
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/poetry-bg-2.jpg" alt="Poetry background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-white">Welcome to VersesVibez</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-100">
            Discover beautiful poetry from around the world, from classic to contemporary voices.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/poems"
              className="bg-white text-purple-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Explore Poems
            </Link>
            <Link
              href="/poets"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
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
              <h2 className="text-3xl font-serif font-bold">Featured Poems</h2>
              <Link href="/poems" className="text-purple-700 font-medium hover:underline">
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
                    <div className="relative h-56">
                      <Image
                        src={getPoemImageUrl(poem.coverImage) || "/placeholder.svg"}
                        alt={poem.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-serif font-semibold">{poem.title}</h3>
                        <p className="text-sm text-gray-200">By {poem.poet}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    {poem.year && <p className="text-sm text-gray-500">{poem.year}</p>}
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
        </section>
      )}

      {/* Featured Poets */}
      {featuredPoets.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold">Featured Poets</h2>
              <Link href="/poets" className="text-purple-700 font-medium hover:underline">
                View all poets
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredPoets.map((poet) => (
                <Link key={poet._id} href={`/poets/${poet.slug.current}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-6">
                    <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4">
                      <Image
                        src={getPoetImageUrl(poet.image) || "/placeholder.svg"}
                        alt={poet.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-serif font-semibold group-hover:text-purple-700 transition-colors">
                      {poet.name}
                    </h3>
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
              <h2 className="text-3xl font-serif font-bold">Poetry Collections</h2>
              <Link href="/collections" className="text-purple-700 font-medium hover:underline">
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
                      <Image
                        src={getCollectionImageUrl(collection.coverImage) || "/placeholder.svg"}
                        alt={collection.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-serif font-semibold">{collection.title}</h3>
                        <p className="text-sm text-gray-200">
                          {collection.poemCount} {collection.poemCount === 1 ? "poem" : "poems"}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    {collection.publicationYear && (
                      <p className="text-sm text-gray-500">{collection.publicationYear}</p>
                    )}
                    {collection.poet && (
                      <Link href={`/poets/${collection.poetSlug}`} className="text-sm text-purple-700 hover:underline">
                        By {collection.poet}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
