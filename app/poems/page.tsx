import { getPoems } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default async function PoemsPage() {
  const poems = await getPoems()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Poems</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem) => (
          <div key={poem._id} className="overflow-hidden rounded-lg bg-gray-100 transition-all hover:shadow-md h-full">
            <Link href={`/poems/${poem.slug.current}`} className="block">
              <div className="relative h-48 w-full">
                {poem.coverImage ? (
                  <Image
                    src={urlFor(poem.coverImage).url() || "/placeholder.svg?height=300&width=500&query=poem"}
                    alt={poem.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{poem.title}</h2>
                {/* Don't wrap this in a Link since we're already inside a Link */}
                <p className="text-sm text-gray-600 mt-1">By: {poem.poet}</p>
                {poem.year && <p className="text-sm text-gray-500 mt-1">{poem.year}</p>}
              </div>
            </Link>
            {/* Add a separate section for the poet link outside the main Link */}
            <div className="px-4 pb-4">
              <Link href={`/poets/${poem.poetSlug}`} className="text-sm text-blue-600 hover:underline">
                View poet profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
