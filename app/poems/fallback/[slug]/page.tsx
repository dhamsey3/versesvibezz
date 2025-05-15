import { notFound } from "next/navigation"
import { fallbackPoems } from "@/lib/fallback-data"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

export default function FallbackPoemPage({ params }: { params: { slug: string } }) {
  // Find the fallback poem by slug
  const poem = fallbackPoems.find((p) => p.slug.current === params.slug)

  if (!poem) {
    notFound()
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
          <Image src="/images/poetry-bg-1.jpg" alt={poem.title} fill className="object-cover" priority />
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
          {poem.content.map((block, index) => {
            if (block._type === "block" && block.style === "verse") {
              return (
                <p key={index} className="whitespace-pre-wrap my-3 italic">
                  {block.children[0].text}
                </p>
              )
            }
            return null
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-purple-200 w-1/3"></div>
          <div className="mx-3">
            <FeatherIcon className="text-purple-500" />
          </div>
          <div className="h-px bg-purple-200 w-1/3"></div>
        </div>

        <div className="mt-6">
          <Link href="/poems" className="text-purple-600 hover:underline">
            ← Back to Poems
          </Link>
        </div>
      </div>
    </div>
  )
}
