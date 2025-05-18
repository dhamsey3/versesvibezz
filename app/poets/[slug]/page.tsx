import { getPoet, getPoemsByPoet } from "@/lib/static-content"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function PoetPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    notFound()
  }

  // Get the poet from static data
  const poet = getPoet(params.slug)

  // If the poet doesn't exist, show a not found message
  if (!poet) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Poet Not Found</h1>
        <p className="text-center mb-6">Sorry, we couldn't find the poet you're looking for.</p>
        <div className="text-center">
          <Link
            href="/poets"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Browse All Poets
          </Link>
        </div>
      </div>
    )
  }

  // Get poems by this poet
  const poetPoems = getPoemsByPoet(poet.slug)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image src={poet.image || "/placeholder.svg"} alt={poet.name} fill className="object-cover" priority />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-serif font-bold mb-2">{poet.name}</h1>
            {poet.birthDate && poet.deathDate && (
              <p className="text-gray-600 mb-4">
                {poet.birthDate} - {poet.deathDate}
              </p>
            )}
            {poet.styles && poet.styles.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {poet.styles.map((style, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {style}
                  </span>
                ))}
              </div>
            )}
            <div className="prose max-w-none">
              {poet.biography ? (
                poet.biography.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 italic">No biography available for this poet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Poems by this poet */}
        <div className="p-6 border-t">
          <h2 className="text-2xl font-serif font-bold mb-4">Poems by {poet.name}</h2>
          {poetPoems && poetPoems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {poetPoems.map((poem) => (
                <Link
                  key={poem.id}
                  href={`/poems/${poem.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border"
                >
                  <div className="relative h-32">
                    <Image src={poem.coverImage || "/placeholder.svg"} alt={poem.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500">{poem.year}</p>
                    <div className="mt-1 inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      Read poem
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No poems available for this poet.</p>
          )}
        </div>

        <div className="p-6 border-t">
          <Link href="/poets" className="text-purple-600 hover:underline">
            ← Back to Poets
          </Link>
        </div>
      </div>
    </div>
  )
}
