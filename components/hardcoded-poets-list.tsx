import Link from "next/link"
import Image from "next/image"

// Hardcoded poets data
const hardcodedPoets = [
  {
    _id: "poet-1",
    name: "Robert Frost",
    slug: { current: "robert-frost" },
    birthDate: "1874",
    deathDate: "1963",
    styles: ["Nature", "Rural Life"],
    poemCount: 2,
  },
  {
    _id: "poet-2",
    name: "Emily Dickinson",
    slug: { current: "emily-dickinson" },
    birthDate: "1830",
    deathDate: "1886",
    styles: ["Lyric Poetry", "Romanticism"],
    poemCount: 2,
  },
  {
    _id: "poet-3",
    name: "William Ernest Henley",
    slug: { current: "william-ernest-henley" },
    birthDate: "1849",
    deathDate: "1903",
    styles: ["Victorian"],
    poemCount: 1,
  },
  {
    _id: "poet-4",
    name: "Maya Angelou",
    slug: { current: "maya-angelou" },
    birthDate: "1928",
    deathDate: "2014",
    styles: ["Civil Rights", "Autobiography"],
    poemCount: 2,
  },
  {
    _id: "poet-5",
    name: "Anonymous",
    slug: { current: "anonymous" },
    styles: ["Various"],
    poemCount: 1,
  },
]

export default function HardcodedPoetsList() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">Meet the Poets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hardcodedPoets.map((poet) => (
          <Link
            key={poet._id}
            href={`/poets/${poet.slug.current}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-48">
              <Image src="/images/poet-default.png" alt={poet.name} fill className="object-cover" />
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
              <p className="text-sm text-gray-500">{poet.poemCount || 0} poems</p>
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
