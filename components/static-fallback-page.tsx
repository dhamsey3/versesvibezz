import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

export default function StaticFallbackPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/mountain-mist.png"
              alt="Misty mountain peak"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <FeatherIcon className="text-purple-300" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white drop-shadow-lg">
            Welcome to VersesVibez
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100 drop-shadow-md">
            Discover beautiful poetry from around the world
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              href="/static-poems"
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-white transition-colors text-sm md:text-base"
            >
              Explore Poems
            </Link>
            <Link
              href="/static-poets"
              className="border border-white text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-white/20 transition-colors text-sm md:text-base"
            >
              Meet the Poets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Poems Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Poems</h2>
            <div className="h-1 w-16 md:w-24 bg-purple-600 mx-auto mt-3 md:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Poem Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/poetry-bg-1.jpg"
                  alt="Poem cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-lg md:text-xl font-serif font-semibold">The Road Not Taken</h3>
                  <p className="text-sm text-gray-200">By Robert Frost</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">1916</p>
                <Link
                  href="/static-poems/the-road-not-taken"
                  className="inline-block mt-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>

            {/* Poem Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/poetry-bg-2.jpg"
                  alt="Poem cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-lg md:text-xl font-serif font-semibold">Hope is the thing with feathers</h3>
                  <p className="text-sm text-gray-200">By Emily Dickinson</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">1891</p>
                <Link
                  href="/static-poems/hope-is-the-thing-with-feathers"
                  className="inline-block mt-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>

            {/* Poem Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/poetry-bg-3.jpg"
                  alt="Poem cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-lg md:text-xl font-serif font-semibold">Invictus</h3>
                  <p className="text-sm text-gray-200">By William Ernest Henley</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">1888</p>
                <Link
                  href="/static-poems/invictus"
                  className="inline-block mt-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poets Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Poets</h2>
            <div className="h-1 w-16 md:w-24 bg-purple-600 mx-auto mt-3 md:mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Poet Card 1 */}
            <Link href="/static-poets/robert-frost" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-4 md:p-6">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mx-auto rounded-full overflow-hidden mb-3 md:mb-4">
                  <Image
                    src="/images/poet-default.png"
                    alt="Robert Frost"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 160px"
                  />
                </div>
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors">
                  Robert Frost
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">Nature, Rural Life, American</p>
              </div>
            </Link>

            {/* Poet Card 2 */}
            <Link href="/static-poets/emily-dickinson" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-4 md:p-6">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mx-auto rounded-full overflow-hidden mb-3 md:mb-4">
                  <Image
                    src="/images/poet-default.png"
                    alt="Emily Dickinson"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 160px"
                  />
                </div>
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors">
                  Emily Dickinson
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">Lyric Poetry, Romanticism, American</p>
              </div>
            </Link>

            {/* Poet Card 3 */}
            <Link href="/static-poets/william-ernest-henley" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-4 md:p-6">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mx-auto rounded-full overflow-hidden mb-3 md:mb-4">
                  <Image
                    src="/images/poet-default.png"
                    alt="William Ernest Henley"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 160px"
                  />
                </div>
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors">
                  William Ernest Henley
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">Victorian, Inspirational</p>
              </div>
            </Link>

            {/* Poet Card 4 */}
            <Link href="/static-poets/maya-angelou" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-4 md:p-6">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mx-auto rounded-full overflow-hidden mb-3 md:mb-4">
                  <Image
                    src="/images/poet-default.png"
                    alt="Maya Angelou"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 160px"
                  />
                </div>
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors">
                  Maya Angelou
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">Civil Rights, Autobiography</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
