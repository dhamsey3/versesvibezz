import { getFeaturedPoems, getPoets, getCollections } from "@/lib/sanity-utils"
import { getPoetImageUrl, getCollectionImageUrl } from "@/lib/image-utils"
import Link from "next/link"
import Image from "next/image"
import SanityImage from "@/components/sanity-image"
import FeaturedPoem from "@/components/featured-poem"

export default async function Home() {
  // Fetch data in parallel
  const [poems, poets, collections] = await Promise.all([
    getFeaturedPoems().catch(() => []),
    getPoets().catch(() => []),
    getCollections().catch(() => []),
  ])

  // Get the first featured poem for the spotlight section
  const spotlightPoem = poems.length > 0 ? poems[0] : null

  // Use the rest for the regular featured section (up to 6)
  const featuredPoems = poems.slice(1, 7)

  // For the carousel, we'll use the first 4 featured poems or all if less than 4
  const carouselPoems = poems.slice(0, Math.min(4, poems.length))

  // Limit the number of items to display
  const featuredPoets = poets.slice(0, 4)
  const featuredCollections = collections.slice(0, 3)

  return (
    <main>
      {/* Hero Section with Mountain Background - Fixed for mobile */}
      <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/mountain-mist.png"
              alt="Misty mountain peak rising through clouds"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-300"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
              <path d="M16 8L2 22"></path>
              <path d="M17.5 15H9"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg">
            Welcome to VersesVibez
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100 drop-shadow-md">
            Discover beautiful poetry from around the world, from classic to contemporary voices.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              href="/poems"
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-white transition-colors text-sm md:text-base"
            >
              Explore Poems
            </Link>
            <Link
              href="/poets"
              className="border border-white text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-white/20 transition-colors text-sm md:text-base"
            >
              Meet the Poets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Poem of the Week (Spotlight) */}
      {spotlightPoem && (
        <section className="py-12 md:py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Poem of the Week</h2>
              <div className="h-1 w-16 md:w-24 bg-purple-600 mx-auto mt-3 md:mt-4"></div>
            </div>

            <div className="max-w-5xl mx-auto">
              <FeaturedPoem poem={spotlightPoem} priority variant="large" />
            </div>
          </div>
        </section>
      )}

      {/* More Featured Poems */}
      {featuredPoems.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 md:mb-0">More Featured Poems</h2>
              <Link href="/poems" className="text-purple-600 font-medium hover:underline text-sm md:text-base">
                View all poems
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {featuredPoems.map((poem) => (
                <FeaturedPoem key={poem._id} poem={poem} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Poets */}
      {featuredPoets.length > 0 && (
        <section className="py-12 md:py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 md:mb-0">Featured Poets</h2>
              <Link href="/poets" className="text-purple-600 font-medium hover:underline text-sm md:text-base">
                View all poets
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredPoets.map((poet) => (
                <Link key={poet._id} href={`/poets/${poet.slug.current}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-4 md:p-6">
                    <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mx-auto rounded-full overflow-hidden mb-3 md:mb-4">
                      <SanityImage
                        image={poet.image}
                        alt={poet.name}
                        fill
                        className="object-cover"
                        fallbackImage={getPoetImageUrl(null)}
                        sizes="(max-width: 768px) 112px, 160px"
                      />
                    </div>
                    <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors line-clamp-1">
                      {poet.name}
                    </h3>
                    {poet.styles && poet.styles.length > 0 && (
                      <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 line-clamp-1">
                        {poet.styles.join(", ")}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Horizontal Showcase */}
      {carouselPoems.length > 0 && (
        <section className="py-12 md:py-16 px-4 bg-purple-50">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Discover Featured Poetry</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm md:text-base">
                Explore our handpicked selection of exceptional poems that showcase the beauty and diversity of poetry.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {carouselPoems.map((poem) => (
                <FeaturedPoem key={poem._id} poem={poem} variant="small" />
              ))}
            </div>

            <div className="text-center mt-8 md:mt-10">
              <Link
                href="/poems"
                className="inline-block px-5 py-2.5 md:px-6 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm md:text-base"
              >
                Browse All Poems
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Poetry Collections */}
      {featuredCollections.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 md:mb-0">Poetry Collections</h2>
              <Link href="/collections" className="text-purple-600 font-medium hover:underline text-sm md:text-base">
                View all collections
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {featuredCollections.map((collection) => (
                <div
                  key={collection._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full"
                >
                  <Link href={`/collections/${collection.slug.current}`} className="block">
                    <div className="relative h-48 md:h-56">
                      <SanityImage
                        image={collection.coverImage}
                        alt={collection.title}
                        fill
                        className="object-cover"
                        fallbackImage={getCollectionImageUrl(null)}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-lg md:text-xl font-serif font-semibold line-clamp-1">{collection.title}</h3>
                        <p className="text-xs md:text-sm text-gray-200">
                          {collection.poemCount} {collection.poemCount === 1 ? "poem" : "poems"}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    {collection.publicationYear && (
                      <p className="text-xs md:text-sm text-gray-500">{collection.publicationYear}</p>
                    )}
                    {collection.poet && (
                      <Link
                        href={`/poets/${collection.poetSlug}`}
                        className="text-xs md:text-sm text-purple-600 hover:underline"
                      >
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
