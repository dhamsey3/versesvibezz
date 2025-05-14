import { getPoem } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

export default async function PoemPage({ params }: { params: { slug: string } }) {
  const poem = await getPoem(params.slug)

  // Add debugging to see what's being returned
  console.log("Poem data:", JSON.stringify(poem, null, 2))

  if (!poem) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">Poem Not Found</h1>
        <p>Sorry, we couldn't find the poem you're looking for.</p>
        <Link href="/poems" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to all poems
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{poem.title}</h1>
          <p className="text-gray-600">
            By{" "}
            {poem.poet ? (
              <Link href={`/poets/${poem.poet.slug.current}`} className="hover:underline">
                {poem.poet.name}
              </Link>
            ) : (
              <span>Unknown Poet</span>
            )}
            {poem.year && <span> • {poem.year}</span>}
          </p>
          {poem.collection && (
            <p className="text-sm text-gray-500 mt-1">
              From the collection:{" "}
              <Link href={`/collections/${poem.collection.slug.current}`} className="hover:underline">
                {poem.collection.title}
              </Link>
            </p>
          )}
        </div>

        {poem.coverImage && (
          <div className="mb-8 relative h-64 w-full md:h-96">
            <Image
              src={urlFor(poem.coverImage).url() || "/placeholder.svg?height=400&width=800&query=poem"}
              alt={poem.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Check if content exists and handle empty content */}
        {poem.content ? (
          <div className="prose max-w-none">
            <PortableText
              value={poem.content}
              components={{
                // Add custom components for the PortableText renderer
                block: {
                  // Special handling for verse style
                  verse: ({ children }) => <p className="whitespace-pre-wrap font-serif">{children}</p>,
                },
              }}
            />
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="text-gray-500 italic">No content available for this poem.</p>
          </div>
        )}

        {poem.themes && poem.themes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Themes</h3>
            <div className="flex flex-wrap gap-2">
              {poem.themes.map((theme) => (
                <Link key={theme._id} href={`/themes/${theme.slug.current}`}>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">{theme.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
