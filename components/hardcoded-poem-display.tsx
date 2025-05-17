import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

// Hardcoded poem data
const hardcodedPoems = {
  "the-road-not-taken": {
    title: "The Road Not Taken",
    poet: "Robert Frost",
    poetSlug: "robert-frost",
    year: 1916,
    content: [
      "Two roads diverged in a yellow wood,",
      "And sorry I could not travel both",
      "And be one traveler, long I stood",
      "And looked down one as far as I could",
      "To where it bent in the undergrowth;",
      "",
      "Then took the other, as just as fair,",
      "And having perhaps the better claim,",
      "Because it was grassy and wanted wear;",
      "Though as for that the passing there",
      "Had worn them really about the same,",
      "",
      "And both that morning equally lay",
      "In leaves no step had trodden black.",
      "Oh, I kept the first for another day!",
      "Yet knowing how way leads on to way,",
      "I doubted if I should ever come back.",
      "",
      "I shall be telling this with a sigh",
      "Somewhere ages and ages hence:",
      "Two roads diverged in a wood, and I—",
      "I took the one less traveled by,",
      "And that has made all the difference.",
    ],
  },
  "hope-is-the-thing-with-feathers": {
    title: "Hope is the thing with feathers",
    poet: "Emily Dickinson",
    poetSlug: "emily-dickinson",
    year: 1891,
    content: [
      "Hope is the thing with feathers",
      "That perches in the soul,",
      "And sings the tune without the words,",
      "And never stops at all,",
      "",
      "And sweetest in the gale is heard;",
      "And sore must be the storm",
      "That could abash the little bird",
      "That kept so many warm.",
      "",
      "I've heard it in the chillest land,",
      "And on the strangest sea;",
      "Yet, never, in extremity,",
      "It asked a crumb of me.",
    ],
  },
  "the-battle-of-time": {
    title: "The Battle of Time",
    poet: "Anonymous",
    poetSlug: "anonymous",
    year: 2023,
    content: [
      "Time marches on with steady beat,",
      "No pause, no rest, no sweet retreat.",
      "Each moment passes, never to return,",
      "A lesson we all eventually learn.",
      "",
      "We fight against its ceaseless flow,",
      "Trying to capture moments before they go.",
      "But time remains the victor in this war,",
      "Taking all we have and still wanting more.",
      "",
      "Yet in this battle we cannot win,",
      "There lies a truth hidden deep within.",
      "It's not about stopping time's advance,",
      "But making each moment a sacred dance.",
      "",
      "So embrace the hours as they pass by,",
      "Under the vast and endless sky.",
      "For in acceptance of time's swift flight,",
      "We find the path to living right.",
    ],
  },
  invictus: {
    title: "Invictus",
    poet: "William Ernest Henley",
    poetSlug: "william-ernest-henley",
    year: 1888,
    content: [
      "Out of the night that covers me,",
      "Black as the pit from pole to pole,",
      "I thank whatever gods may be",
      "For my unconquerable soul.",
      "",
      "In the fell clutch of circumstance",
      "I have not winced nor cried aloud.",
      "Under the bludgeonings of chance",
      "My head is bloody, but unbowed.",
      "",
      "Beyond this place of wrath and tears",
      "Looms but the Horror of the shade,",
      "And yet the menace of the years",
      "Finds and shall find me unafraid.",
      "",
      "It matters not how strait the gate,",
      "How charged with punishments the scroll,",
      "I am the master of my fate,",
      "I am the captain of my soul.",
    ],
  },
  "still-i-rise": {
    title: "Still I Rise",
    poet: "Maya Angelou",
    poetSlug: "maya-angelou",
    year: 1978,
    content: [
      "You may write me down in history",
      "With your bitter, twisted lies,",
      "You may trod me in the very dirt",
      "But still, like dust, I'll rise.",
      "",
      "Does my sassiness upset you?",
      "Why are you beset with gloom?",
      "'Cause I walk like I've got oil wells",
      "Pumping in my living room.",
      "",
      "Just like moons and like suns,",
      "With the certainty of tides,",
      "Just like hopes springing high,",
      "Still I'll rise.",
    ],
  },
}

interface HardcodedPoemDisplayProps {
  slug: string
}

export default function HardcodedPoemDisplay({ slug }: HardcodedPoemDisplayProps) {
  // Get the poem data from the hardcoded data
  const poem = hardcodedPoems[slug]

  // If the poem doesn't exist in our hardcoded data, show a not found message
  if (!poem) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Poem Not Found</h1>
        <p className="text-center mb-6">Sorry, we couldn't find the poem you're looking for.</p>
        <div className="text-center">
          <Link
            href="/poems"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Browse All Poems
          </Link>
        </div>
      </div>
    )
  }

  return (
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
        {poem.content.map((line, index) => (
          <p key={index} className={`whitespace-pre-wrap my-3 ${line ? "italic" : "h-4"}`}>
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
        <Link href="/poems" className="text-purple-600 hover:underline">
          ← Back to Poems
        </Link>
      </div>
    </div>
  )
}
