import Link from "next/link"
import Image from "next/image"
import { staticPoems } from "@/lib/static-data"

export default function StaticPoemsPage() {
  return (
    <div className="container mx-auto py-8 md:py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-center">Poems</h1>
      <p className="text-gray-600 text-center mb-8 md:mb-10 max-w-2xl mx-auto text-sm md:text-base">
        Explore our collection of beautiful poetry from various poets and traditions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {staticPoems.map((poem) => (
          <div
            key={poem.slug}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl h-full"
          >
            <Link href={`/static-poems/${poem.slug}`} className="block">
              <div className="relative h-48 md:h-56 w-full">
                <Image
                  src={poem.coverImage || "/images/poetry-bg-1.jpg"}
                  alt={poem.title}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 md:p-4 text-white">
                  <h2 className="text-base md:text-xl font-serif font-semibold line-clamp-1">{poem.title}</h2>
                  <p className="text-xs md:text-sm text-gray-200 mt-0.5 md:mt-1">By {poem.poet}</p>
                </div>
              </div>
            </Link>
            <div className="p-3 md:p-4">
              {poem.year && <p className="text-xs md:text-sm text-gray-500 mb-2">{poem.year}</p>}
              <Link
                href={`/static-poems/${poem.slug}`}
                className="inline-block mt-1 md:mt-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm hover:bg-purple-200 transition-colors"
              >
                Read poem
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
