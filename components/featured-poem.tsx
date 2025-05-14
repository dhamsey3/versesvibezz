import Link from "next/link"
import SanityImage from "@/components/sanity-image"
import { getPoemImageUrl } from "@/lib/image-utils"

interface FeaturedPoemProps {
  poem: {
    _id: string
    title: string
    slug: { current: string }
    poet: string
    poetSlug?: string
    coverImage: any
    featuredExcerpt?: string
    year?: number
  }
  priority?: boolean
  variant?: "large" | "medium" | "small"
}

export default function FeaturedPoem({ poem, priority = false, variant = "medium" }: FeaturedPoemProps) {
  // Choose different layouts based on variant
  if (variant === "large") {
    return (
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <SanityImage
              image={poem.coverImage}
              alt={poem.title}
              fill
              className="object-cover"
              priority={priority}
              fallbackImage={getPoemImageUrl(null)}
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-serif font-bold mb-2">{poem.title}</h3>
            <p className="text-gray-600 mb-4">
              By{" "}
              {poem.poetSlug ? (
                <Link href={`/poets/${poem.poetSlug}`} className="hover:text-purple-700">
                  {poem.poet}
                </Link>
              ) : (
                poem.poet
              )}
            </p>
            {poem.year && <p className="text-sm text-gray-500 mb-6">{poem.year}</p>}
            {poem.featuredExcerpt ? (
              <p className="mb-6 text-gray-700 italic">"{poem.featuredExcerpt}"</p>
            ) : (
              <p className="mb-6 text-gray-700 italic">"A poem is when you hear the heartbeat of a stone..."</p>
            )}
            <Link
              href={`/poems/${poem.slug.current}`}
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors self-start"
            >
              Read this poem
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "small") {
    return (
      <div className="group">
        <Link href={`/poems/${poem.slug.current}`} className="block">
          <div className="relative h-44 rounded-lg overflow-hidden mb-3">
            <SanityImage
              image={poem.coverImage}
              alt={poem.title}
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-500"
              fallbackImage={getPoemImageUrl(null)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <h3 className="font-serif font-medium group-hover:text-purple-700 transition-colors">{poem.title}</h3>
          <p className="text-sm text-gray-600">By {poem.poet}</p>
        </Link>
      </div>
    )
  }

  // Default medium variant
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow h-full">
      <Link href={`/poems/${poem.slug.current}`} className="block">
        <div className="relative h-56">
          <SanityImage
            image={poem.coverImage}
            alt={poem.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
            fallbackImage={getPoemImageUrl(null)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-serif font-semibold">{poem.title}</h3>
            <p className="text-sm text-gray-200">By {poem.poet}</p>
          </div>
        </div>
      </Link>
      <div className="p-4">
        {poem.year && <p className="text-sm text-gray-500">{poem.year}</p>}
        <Link
          href={`/poems/${poem.slug.current}`}
          className="inline-block mt-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
        >
          Read poem
        </Link>
      </div>
    </div>
  )
}
