import Link from "next/link"
import Image from "next/image"

// Hardcoded poet data
const hardcodedPoets = {
  "robert-frost": {
    name: "Robert Frost",
    birthDate: "1874",
    deathDate: "1963",
    styles: ["Nature", "Rural Life", "American"],
    biography:
      "<p>Robert Frost was an American poet known for his realistic depictions of rural life and his command of American colloquial speech. His work frequently employed settings from rural life in New England in the early twentieth century, using them to examine complex social and philosophical themes.</p><p>Frost was honored frequently during his lifetime and is the only poet to receive four Pulitzer Prizes for Poetry.</p>",
    poems: [
      {
        _id: "frost-poem-1",
        title: "The Road Not Taken",
        slug: { current: "the-road-not-taken" },
        year: 1916,
      },
      {
        _id: "frost-poem-2",
        title: "Stopping by Woods on a Snowy Evening",
        slug: { current: "stopping-by-woods" },
        year: 1923,
      },
    ],
  },
  "emily-dickinson": {
    name: "Emily Dickinson",
    birthDate: "1830",
    deathDate: "1886",
    styles: ["Lyric Poetry", "Romanticism", "American"],
    biography:
      "<p>Emily Dickinson was an American poet. Little known during her life, she has since been regarded as one of the most important figures in American poetry.</p><p>Dickinson was born in Amherst, Massachusetts, into a prominent family with strong ties to its community. After studying at the Amherst Academy for seven years in her youth, she briefly attended the Mount Holyoke Female Seminary before returning to her family's house in Amherst.</p>",
    poems: [
      {
        _id: "dickinson-poem-1",
        title: "Hope is the thing with feathers",
        slug: { current: "hope-is-the-thing-with-feathers" },
        year: 1891,
      },
      {
        _id: "dickinson-poem-2",
        title: "Because I could not stop for Death",
        slug: { current: "because-i-could-not-stop-for-death" },
        year: 1890,
      },
    ],
  },
  "william-ernest-henley": {
    name: "William Ernest Henley",
    birthDate: "1849",
    deathDate: "1903",
    styles: ["Victorian", "British"],
    biography:
      '<p>William Ernest Henley was an influential English poet, critic, and editor of the late Victorian era in England. Though he wrote several books of poetry, Henley is remembered most often for his 1875 poem "Invictus".</p><p>A fixture in London literary circles, Henley was one of the most influential critics of his time and edited several literary journals.</p>',
    poems: [
      {
        _id: "henley-poem-1",
        title: "Invictus",
        slug: { current: "invictus" },
        year: 1888,
      },
    ],
  },
  "maya-angelou": {
    name: "Maya Angelou",
    birthDate: "1928",
    deathDate: "2014",
    styles: ["Autobiography", "Poetry", "Civil Rights"],
    biography:
      "<p>Maya Angelou was an American poet, memoirist, and civil rights activist. She published seven autobiographies, three books of essays, several books of poetry, and is credited with a list of plays, movies, and television shows spanning over 50 years.</p><p>She received dozens of awards and more than 50 honorary degrees. Angelou is best known for her series of seven autobiographies, which focus on her childhood and early adult experiences.</p>",
    poems: [
      {
        _id: "angelou-poem-1",
        title: "Still I Rise",
        slug: { current: "still-i-rise" },
        year: 1978,
      },
      {
        _id: "angelou-poem-2",
        title: "Phenomenal Woman",
        slug: { current: "phenomenal-woman" },
        year: 1978,
      },
    ],
  },
  anonymous: {
    name: "Anonymous",
    birthDate: "",
    deathDate: "",
    styles: ["Various"],
    biography:
      "<p>This represents works of poetry whose authors are unknown or have been lost to history. Anonymous poetry has been a part of literary traditions across cultures and throughout time.</p>",
    poems: [
      {
        _id: "anon-poem-1",
        title: "The Battle of Time",
        slug: { current: "the-battle-of-time" },
        year: 2023,
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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
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
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image src="/images/poet-default.png" alt={poet.name} fill className="object-cover" priority />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-serif font-bold mb-2">{poet.name}</h1>
            {poet.birthDate && poet.deathDate && (
              <p className="text-gray-600 mb-4">
                {poet.birthDate} - {poet.deathDate}
              </p>
            )}
            {poet.styles && poet.styles.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {poet.styles.map((style, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {style}
                  </span>
                ))}
              </div>
            )}
            <div className="prose max-w-none">
              {poet.biography ? (
                <div dangerouslySetInnerHTML={{ __html: poet.biography }} />
              ) : (
                <p className="text-gray-500 italic">No biography available for this poet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Poems by this poet */}
        <div className="p-6 border-t">
          <h2 className="text-2xl font-serif font-bold mb-4">Poems by {poet.name}</h2>
          {poet.poems && poet.poems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {poet.poems.map((poem) => (
                <Link
                  key={poem._id}
                  href={`/poems/${poem.slug.current}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border"
                >
                  <div className="relative h-32">
                    <Image src="/images/poetry-bg-3.jpg" alt={poem.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500">{poem.year}</p>
                    <div className="mt-1 inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      Read poem
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No poems available for this poet.</p>
          )}
        </div>

        <div className="p-6 border-t">
          <Link href="/poets" className="text-purple-600 hover:underline">
            ← Back to Poets
          </Link>
        </div>
      </div>
    </div>
  )
}
