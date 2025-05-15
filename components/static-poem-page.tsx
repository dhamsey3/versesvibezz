import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

interface StaticPoemPageProps {
  poem: {
    title: string
    poet: string
    poetSlug: string
    year?: number
    content: string[]
  }
}

export default function StaticPoemPage({ poem }: StaticPoemPageProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
          <p className="text-gray-600 italic">
            By{" "}
            <Link href={`/static-poets/${poem.poetSlug}`} className="hover:underline text-purple-600">
              {poem.poet}
            </Link>
            {poem.year && <span> • {poem.year}</span>}
          </p>
        </div>

        <div className="mb-8 relative h-56 w-full rounded-lg overflow-hidden">
          <Image
            src="/images/poetry-bg-1.jpg"
            alt={poem.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
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
            <p key={index} className="whitespace-pre-wrap my-3 italic">
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

        <div className="mt-6">
          <Link href="/static-poems" className="text-purple-600 hover:underline">
            ← Back to Poems
          </Link>
        </div>
      </div>
    </div>
  )
}
