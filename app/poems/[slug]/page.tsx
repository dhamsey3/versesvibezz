import { getPoem } from "@/lib/static-content"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

export default function PoemPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    notFound()
  }

  // Get the poem from static data
  const poem = getPoem(params.slug)

  // If the poem doesn't exist, show a not found message
  if (!poem) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Poem Not Found</h1>
        <p className="text-center mb-6">Sorry, we couldn't find the poem you're looking for.</p>
        <div className="text-center">
          <Link
            href="/poems"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mr-2"
          >
            Browse All Poems
          </Link>
          <Link
            href={`/poems/client/${params.slug}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Client-Side Version
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
          <p className="text-gray-600 italic">
            By{" "}
            <Link href={`/poets/${poem.poetSlug}`} className="hover:underline text-purple-600">
              {poem.poet}
            </Link>
            {poem.year && <span> • {poem.year}</span>}
          </p>
        </div>

        <div className="mb-8 relative h-56 w-full rounded-lg overflow-hidden">
          <Image src={poem.coverImage || "/placeholder.svg"} alt={poem.title} fill className="object-cover" priority />
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-purple-200 w-1/3"></div>
          <div className="mx-3">
            <FeatherIcon className="text-purple-500" />
          </div>
          <div className="h-px bg-purple-200 w-1/3"></div>
        </div>

        {/* Poem content */}
        <div className="prose max-w-none font-serif">
          {poem.content.map((line, index) => (
            <p key={index} className={`whitespace-pre-wrap my-3 ${line ? "italic" : "h-4"}`}>
              {line}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-purple-200 w-1/3"></div>
          <div className="mx-3">
            <FeatherIcon className="text-purple-500" />
          </div>
          <div className="h-px bg-purple-200 w-1/3"></div>
        </div>

        <div className="mt-6 flex justify-between">
          <Link href="/poems" className="text-purple-600 hover:underline">
            ← Back to Poems
          </Link>
          <Link href={`/poems/client/${params.slug}`} className="text-blue-600 hover:underline">
            View Client-Side Version
          </Link>
        </div>
      </div>
    </div>
  )
}
