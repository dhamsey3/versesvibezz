import { poets } from "@/lib/static-content"
import Link from "next/link"
import Image from "next/image"

export default function PoetsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">Meet the Poets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {poets.map((poet) => (
          <Link
            key={poet.id}
            href={`/poets/${poet.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-48">
              <Image src={poet.image || "/placeholder.svg"} alt={poet.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-xl font-serif font-semibold">{poet.name}</h2>
                {poet.birthDate && poet.deathDate && (
                  <p className="text-sm text-gray-200">
                    {poet.birthDate} - {poet.deathDate}
                  </p>
                )}
              </div>
            </div>
            <div className="p-4 flex-grow">
              {poet.styles && poet.styles.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {poet.styles.map((style, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {style}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-2 inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                View profile
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
