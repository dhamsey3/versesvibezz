import Link from "next/link"
import Image from "next/image"
import { getPoetImageUrl, getPoemImageUrl } from "@/lib/image-utils"

interface SimplePoetDisplayProps {
  poet: any
}

export default function SimplePoetDisplay({ poet }: SimplePoetDisplayProps) {
  if (!poet) {
    return (
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
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

  // Function to render biography content as plain HTML
  function renderBiography(biography: any) {
    if (!biography || !Array.isArray(biography)) {
      return <p className="text-gray-500 italic">No biography available for this poet.</p>
    }

    return biography.map((block, blockIndex) => {
      // Extract text from spans
      const text =
        block.children
          ?.filter((child: any) => child._type === "span")
          .map((span: any) => span.text)
          .join("") || ""

      return (
        <p key={blockIndex} className="mb-4">
          {text}
        </p>
      )
    })
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={getPoetImageUrl(poet.image) || "/placeholder.svg"}
              alt={poet.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-4 space-y-3">
            {poet.birthDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Born</h3>
                <p>{new Date(poet.birthDate).toLocaleDateString()}</p>
              </div>
            )}

            {poet.deathDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Died</h3>
                <p>{new Date(poet.deathDate).toLocaleDateString()}</p>
              </div>
            )}

            {poet.styles && poet.styles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Poetic Styles</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {poet.styles.map((style: string) => (
                    <span key={style} className="px-3 py-1 bg-purple-100 rounded-full text-sm text-purple-700">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-serif font-bold mb-4">{poet.name}</h1>

          <div className="prose max-w-none mb-6">{renderBiography(poet.biography)}</div>

          {poet.poems && poet.poems.length > 0 ? (
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Poems by {poet.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {poet.poems.map((poem: any) => (
                  <Link key={poem._id} href={`/poems/${poem.slug.current}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={getPoemImageUrl(poem.coverImage) || "/placeholder.svg"}
                          alt={poem.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                          {poem.year && <p className="text-sm text-gray-200">{poem.year}</p>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">No poems found for this poet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link href="/poets" className="text-purple-600 hover:underline">
          ← Back to Poets
        </Link>
      </div>
    </div>
  )
}
