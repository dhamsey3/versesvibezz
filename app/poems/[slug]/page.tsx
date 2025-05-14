import { getPoem } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

export default async function PoemPage({ params }: { params: { slug: string } }) {
  const poem = await getPoem(params.slug)

  if (!poem) {
    return <div>Poem not found</div>
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{poem.title}</h1>
          <p className="text-gray-600">
            By{" "}
            <Link href={`/poets/${poem.poet.slug.current}`} className="hover:underline">
              {poem.poet.name}
            </Link>
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

        <div className="prose max-w-none">
          <PortableText value={poem.content} />
        </div>

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
