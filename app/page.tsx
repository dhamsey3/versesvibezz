import { getFeaturedPoems } from "@/lib/sanity-utils"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"
import { urlFor } from "@/lib/sanity-client"
import HardcodedHome from "@/components/hardcoded-home"

export default async function Home() {
  try {
    // Try to fetch featured poems from Sanity
    const featuredPoems = await getFeaturedPoems()

    // If we couldn't get any poems, fall back to hardcoded content
    if (!featuredPoems || featuredPoems.length === 0) {
      return <HardcodedHome />
    }

    // Get the first poem as the main featured poem
    const mainFeaturedPoem = featuredPoems[0]
    // Get the rest for the "More Featured Poems" section
    const moreFeaturedPoems = featuredPoems.slice(1, 4)

    return (
      <main>
        {/* Hero Section with Mountain Background */}
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
              <FeatherIcon className="text-purple-300" size={40} />
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

        {/* Featured Poem of the Week */}
        <section className="py-12 md:py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Poem of the Week</h2>
              <div className="h-1 w-16 md:w-24 bg-purple-600 mx-auto mt-3 md:mt-4"></div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={
                        mainFeaturedPoem.coverImage
                          ? urlFor(mainFeaturedPoem.coverImage).url()
                          : "/images/poetry-bg-1.jpg"
                      }
                      alt={mainFeaturedPoem.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">{mainFeaturedPoem.title}</h3>
                    <p className="text-gray-600 mb-4">
                      By{" "}
                      <Link href={`/poets/${mainFeaturedPoem.poetSlug}`} className="hover:text-purple-600">
                        {mainFeaturedPoem.poet}
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500 mb-4 md:mb-6">{mainFeaturedPoem.year}</p>
                    <p className="mb-4 md:mb-6 text-gray-700 italic line-clamp-3 md:line-clamp-none">
                      {mainFeaturedPoem.featuredExcerpt ||
                        (mainFeaturedPoem.content && mainFeaturedPoem.content[0]?.children?.[0]?.text) ||
                        "A beautiful poem awaits your discovery..."}
                    </p>
                    <Link
                      href={`/poems/${mainFeaturedPoem.slug.current}`}
                      className="inline-block px-4 py-2 md:px-6 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors self-start text-sm md:text-base"
                    >
                      Read this poem
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Featured Poems */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 md:mb-0">More Featured Poems</h2>
              <Link href="/poems" className="text-purple-600 font-medium hover:underline text-sm md:text-base">
                View all poems
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {moreFeaturedPoems.map((poem) => (
                <div
                  key={poem._id}
                  className="rounded-lg overflow-hidden bg-white shadow-md transition-all hover:shadow-xl h-full"
                >
                  <Link href={`/poems/${poem.slug.current}`} className="block">
                    <div className="relative h-48 md:h-56">
                      <Image
                        src={poem.coverImage ? urlFor(poem.coverImage).url() : "/images/poetry-bg-2.jpg"}
                        alt={poem.title}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-lg md:text-xl font-serif font-semibold line-clamp-1">{poem.title}</h3>
                        <p className="text-xs md:text-sm text-gray-200">By {poem.poet}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-xs md:text-sm text-gray-500">{poem.year}</p>
                    <Link
                      href={`/poems/${poem.slug.current}`}
                      className="inline-block mt-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm hover:bg-purple-200 transition-colors"
                    >
                      Read poem
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  } catch (error) {
    console.error("Error rendering home page:", error)
    return <HardcodedHome />
  }
}
