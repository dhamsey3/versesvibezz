import Link from "next/link"
import Image from "next/image"

// Hardcoded poet data for the list
const poetsList = [
  {
    slug: "robert-frost",
    name: "Robert Frost",
    styles: ["Nature", "Rural Life", "American"],
    image: "/images/poet-default.png",
  },
  {
    slug: "emily-dickinson",
    name: "Emily Dickinson",
    styles: ["Lyric Poetry", "Romanticism", "American"],
    image: "/images/poet-default.png",
  },
  {
    slug: "william-ernest-henley",
    name: "William Ernest Henley",
    styles: ["Victorian", "Inspirational"],
    image: "/images/poet-default.png",
  },
  {
    slug: "maya-angelou",
    name: "Maya Angelou",
    styles: ["Civil Rights", "Autobiography", "American"],
    image: "/images/poet-default.png",
  },
]

export default function HardcodedPoetsList() {
  return (
    <div className="container mx-auto py-8 md:py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-center">Poets</h1>
      <p className="text-gray-600 text-center mb-8 md:mb-10 max-w-2xl mx-auto text-sm md:text-base">
        Discover the voices behind our collection of poetry.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {poetsList.map((poet) => (
          <Link key={poet.slug} href={`/poets/${poet.slug}`} className="group">
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg h-full">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src={poet.image || "/placeholder.svg"}
                  alt={poet.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 md:p-4 text-white">
                  <h2 className="text-base md:text-xl font-serif font-semibold line-clamp-1">{poet.name}</h2>
                  {poet.styles && poet.styles.length > 0 && (
                    <p className="text-xs md:text-sm text-gray-200 mt-0.5 md:mt-1 line-clamp-1">
                      {poet.styles.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
