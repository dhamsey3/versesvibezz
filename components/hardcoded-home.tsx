import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

export default function HardcodedHome() {
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
                    src="/images/poetry-bg-1.jpg"
                    alt="The Road Not Taken"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">The Road Not Taken</h3>
                  <p className="text-gray-600 mb-4">
                    By{" "}
                    <Link href="/poets/robert-frost" className="hover:text-purple-600">
                      Robert Frost
                    </Link>
                  </p>
                  <p className="text-sm text-gray-500 mb-4 md:mb-6">1916</p>
                  <p className="mb-4 md:mb-6 text-gray-700 italic line-clamp-3 md:line-clamp-none">
                    "Two roads diverged in a yellow wood, And sorry I could not travel both..."
                  </p>
                  <Link
                    href="/poems/the-road-not-taken"
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
            {/* Poem 1 */}
            <div className="rounded-lg overflow-hidden bg-white shadow-md transition-all hover:shadow-xl h-full">
              <Link href="/poems/hope-is-the-thing-with-feathers" className="block">
                <div className="relative h-48 md:h-56">
                  <Image
                    src="/images/poetry-bg-2.jpg"
                    alt="Hope is the thing with feathers"
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg md:text-xl font-serif font-semibold line-clamp-1">
                      Hope is the thing with feathers
                    </h3>
                    <p className="text-xs md:text-sm text-gray-200">By Emily Dickinson</p>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <p className="text-xs md:text-sm text-gray-500">1891</p>
                <Link
                  href="/poems/hope-is-the-thing-with-feathers"
                  className="inline-block mt-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>

            {/* Poem 2 */}
            <div className="rounded-lg overflow-hidden bg-white shadow-md transition-all hover:shadow-xl h-full">
              <Link href="/poems/invictus" className="block">
                <div className="relative h-48 md:h-56">
                  <Image
                    src="/images/poetry-bg-3.jpg"
                    alt="Invictus"
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg md:text-xl font-serif font-semibold line-clamp-1">Invictus</h3>
                    <p className="text-xs md:text-sm text-gray-200">By William Ernest Henley</p>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <p className="text-xs md:text-sm text-gray-500">1888</p>
                <Link
                  href="/poems/invictus"
                  className="inline-block mt-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>

            {/* Poem 3 */}
            <div className="rounded-lg overflow-hidden bg-white shadow-md transition-all hover:shadow-xl h-full">
              <Link href="/poems/still-i-rise" className="block">
                <div className="relative h-48 md:h-56">
                  <Image
                    src="/images/poetry-bg-4.jpg"
                    alt="Still I Rise"
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg md:text-xl font-serif font-semibold line-clamp-1">Still I Rise</h3>
                    <p className="text-xs md:text-sm text-gray-200">By Maya Angelou</p>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <p className="text-xs md:text-sm text-gray-500">1978</p>
                <Link
                  href="/poems/still-i-rise"
                  className="inline-block mt-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm hover:bg-purple-200 transition-colors"
                >
                  Read poem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poets */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 md:mb-0">Featured Poets</h2>
            <Link href="/poets" className="text-purple-600 font-medium hover:underline text-sm md:text-base">
              View all poets
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Poet 1 */}
            <Link href="/poets/robert-frost" className="group">
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
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors line-clamp-1">
                  Robert Frost
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 line-clamp-1">
                  Nature, Rural Life, American
                </p>
              </div>
            </Link>

            {/* Poet 2 */}
            <Link href="/poets/emily-dickinson" className="group">
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
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors line-clamp-1">
                  Emily Dickinson
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 line-clamp-1">
                  Lyric Poetry, Romanticism, American
                </p>
              </div>
            </Link>

            {/* Poet 3 */}
            <Link href="/poets/william-ernest-henley" className="group">
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
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors line-clamp-1">
                  William Ernest Henley
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 line-clamp-1">Victorian, Inspirational</p>
              </div>
            </Link>

            {/* Poet 4 */}
            <Link href="/poets/maya-angelou" className="group">
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
                <h3 className="text-base md:text-xl font-serif font-semibold group-hover:text-purple-600 transition-colors line-clamp-1">
                  Maya Angelou
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 line-clamp-1">
                  Civil Rights, Autobiography, American
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
