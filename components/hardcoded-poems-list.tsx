import Link from "next/link"
import Image from "next/image"

// Hardcoded poems data
const hardcodedPoems = [
  {
    _id: "poem-1",
    title: "The Road Not Taken",
    slug: { current: "the-road-not-taken" },
    poet: "Robert Frost",
    poetSlug: "robert-frost",
    year: 1916,
  },
  {
    _id: "poem-2",
    title: "Hope is the thing with feathers",
    slug: { current: "hope-is-the-thing-with-feathers" },
    poet: "Emily Dickinson",
    poetSlug: "emily-dickinson",
    year: 1891,
  },
  {
    _id: "poem-3",
    title: "Invictus",
    slug: { current: "invictus" },
    poet: "William Ernest Henley",
    poetSlug: "william-ernest-henley",
    year: 1888,
  },
  {
    _id: "poem-4",
    title: "Still I Rise",
    slug: { current: "still-i-rise" },
    poet: "Maya Angelou",
    poetSlug: "maya-angelou",
    year: 1978,
  },
  {
    _id: "poem-5",
    title: "The Battle of Time",
    slug: { current: "the-battle-of-time" },
    poet: "Anonymous",
    poetSlug: "anonymous",
    year: 2023,
  },
]

export default function HardcodedPoemsList() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">Explore Poems</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hardcodedPoems.map((poem) => (
          <Link
            key={poem._id}
            href={`/poems/${poem.slug.current}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={`/images/poetry-bg-${(Number.parseInt(poem._id.split("-")[1]) % 5) + 1}.jpg`}
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
}
