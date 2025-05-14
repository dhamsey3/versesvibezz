import { getPoets } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default async function PoetsPage() {
  const poets = await getPoets()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Poets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {poets.map((poet) => (
          <Link key={poet._id} href={`/poets/${poet.slug.current}`} className="group">
            <div className="overflow-hidden rounded-lg bg-gray-100 transition-all hover:shadow-md">
              <div className="relative h-64 w-full">
                {poet.image ? (
                  <Image
                    src={urlFor(poet.image).url() || "/placeholder.svg?height=400&width=400&query=poet"}
                    alt={poet.name}
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
                <h2 className="text-xl font-semibold">{poet.name}</h2>
                {poet.styles && poet.styles.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">{poet.styles.join(", ")}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
