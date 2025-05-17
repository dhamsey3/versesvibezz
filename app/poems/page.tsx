import { getAllPoems, buildImageUrl } from "@/lib/direct-sanity"
import Link from "next/link"
import Image from "next/image"
import HardcodedPoemsList from "@/components/hardcoded-poems-list"

export default async function PoemsPage() {
  try {
    console.log("Attempting to fetch all poems")
    const poems = await getAllPoems()

    // If we couldn't get any poems, use the hardcoded list
    if (!poems || poems.length === 0) {
      console.log("No poems found, using hardcoded fallback")
      return <HardcodedPoemsList />
    }

    console.log(`Successfully fetched ${poems.length} poems`)

    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center">Explore Poems</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <Link
              key={poem._id}
              href={`/poems/${poem.slug.current}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={poem.coverImage ? buildImageUrl(poem.coverImage) : "/images/poetry-bg-2.jpg"}
                  alt={poem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-xl font-serif font-semibold">{poem.title}</h2>
                  <p className="text-sm text-gray-200">By {poem.poet}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">{poem.year}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  Read poem
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error rendering poems page:", error)
    return <HardcodedPoemsList />
  }
}
