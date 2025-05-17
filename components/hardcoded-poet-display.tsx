import Link from "next/link"
import Image from "next/image"

// Hardcoded poet data
const hardcodedPoets = {
  "robert-frost": {
    name: "Robert Frost",
    birthDate: "March 26, 1874",
    deathDate: "January 29, 1963",
    styles: ["Nature", "Rural Life", "American"],
    biography: [
      "Robert Frost was an American poet known for his realistic depictions of rural life and his command of American colloquial speech.",
      "One of the most popular and critically respected American poets of the twentieth century, Frost was honored frequently during his lifetime, receiving four Pulitzer Prizes for Poetry.",
      "His work frequently employed settings from rural life in New England in the early twentieth century, using them to examine complex social and philosophical themes.",
    ],
    poems: [
      {
        title: "The Road Not Taken",
        slug: "the-road-not-taken",
        year: 1916,
      },
    ],
  },
  "emily-dickinson": {
    name: "Emily Dickinson",
    birthDate: "December 10, 1830",
    deathDate: "May 15, 1886",
    styles: ["Lyric Poetry", "Romanticism", "American"],
    biography: [
      "Emily Dickinson was an American poet who lived a largely introverted and reclusive life. She is known for her unconventional use of form and syntax.",
      "Though Dickinson was a prolific private poet, fewer than a dozen of her nearly 1,800 poems were published during her lifetime. The work that was published during her lifetime was usually altered significantly by the publishers to fit the conventional poetic rules of the time.",
      "Her poems are unique for the era in which she wrote; they contain short lines, typically lack titles, and often use slant rhyme as well as unconventional capitalization and punctuation.",
    ],
    poems: [
      {
        title: "Hope is the thing with feathers",
        slug: "hope-is-the-thing-with-feathers",
        year: 1891,
      },
    ],
  },
  "william-ernest-henley": {
    name: "William Ernest Henley",
    birthDate: "August 23, 1849",
    deathDate: "July 11, 1903",
    styles: ["Victorian", "Inspirational"],
    biography: [
      "William Ernest Henley was an English poet, critic, and editor. He is best known for his poem 'Invictus', which he wrote while recovering from tuberculosis.",
      "At the age of 12, Henley was diagnosed with tubercular arthritis that necessitated the amputation of one of his legs just below the knee. The poem 'Invictus' is said to have developed from his experiences in hospital.",
      "Despite his disability, Henley led an active life and remained resilient. His friendship with Robert Louis Stevenson was among his most significant relationships.",
    ],
    poems: [
      {
        title: "Invictus",
        slug: "invictus",
        year: 1888,
      },
    ],
  },
  "maya-angelou": {
    name: "Maya Angelou",
    birthDate: "April 4, 1928",
    deathDate: "May 28, 2014",
    styles: ["Civil Rights", "Autobiography", "American"],
    biography: [
      "Maya Angelou was an American poet, memoirist, and civil rights activist. She published seven autobiographies, three books of essays, several books of poetry, and is credited with a list of plays, movies, and television shows spanning over 50 years.",
      "She received dozens of awards and more than 50 honorary degrees. Angelou is best known for her series of seven autobiographies, which focus on her childhood and early adult experiences.",
      "Her first autobiography, 'I Know Why the Caged Bird Sings' (1969), tells of her life up to the age of 17 and brought her international recognition and acclaim.",
    ],
    poems: [
      {
        title: "Still I Rise",
        slug: "still-i-rise",
        year: 1978,
      },
    ],
  },
}

interface HardcodedPoetDisplayProps {
  slug: string
}

export default function HardcodedPoetDisplay({ slug }: HardcodedPoetDisplayProps) {
  // Get the poet data from the hardcoded data
  const poet = hardcodedPoets[slug]

  // If the poet doesn't exist in our hardcoded data, show a not found message
  if (!poet) {
    return (
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Poet Not Found</h1>
        <p className="text-center mb-6">Sorry, we couldn't find the poet you're looking for.</p>
        <div className="text-center">
          <Link
            href="/poets"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Browse All Poets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image src="/images/poet-default.png" alt={poet.name} fill className="object-cover" />
          </div>

          <div className="mt-4 space-y-3">
            {poet.birthDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Born</h3>
                <p>{poet.birthDate}</p>
              </div>
            )}

            {poet.deathDate && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Died</h3>
                <p>{poet.deathDate}</p>
              </div>
            )}

            {poet.styles && poet.styles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Poetic Styles</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {poet.styles.map((style) => (
                    <span key={style} className="px-3 py-1 bg-purple-100 rounded-full text-sm text-purple-700">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-serif font-bold mb-4">{poet.name}</h1>

          <div className="prose max-w-none mb-6">
            {poet.biography.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {poet.poems && poet.poems.length > 0 ? (
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Poems by {poet.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {poet.poems.map((poem) => (
                  <Link key={poem.slug} href={`/poems/${poem.slug}`} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src="/images/poetry-bg-1.jpg"
                          alt={poem.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                          {poem.year && <p className="text-sm text-gray-200">{poem.year}</p>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">No poems found for this poet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link href="/poets" className="text-purple-600 hover:underline">
          ← Back to Poets
        </Link>
      </div>
    </div>
  )
}
