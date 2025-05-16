import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import FeatherIcon from "@/components/feather-icon"

// Static poem data
const staticPoems = {
  "the-road-not-taken": {
    title: "The Road Not Taken",
    poet: "Robert Frost",
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
  // Add more static poems as needed
}

export default function StaticPoemPage({ params }: { params: { slug: string } }) {
  const poem = staticPoems[params.slug]

  if (!poem) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold mb-2">{poem.title}</h1>
          <p className="text-gray-600 italic">
            By {poem.poet}
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

        <div className="mt-6 flex justify-between">
          <Link href="/poems" className="text-purple-600 hover:underline">
            ← Back to Poems
          </Link>
          <Link href={`/poems/diagnostic/${params.slug}`} className="text-blue-600 hover:underline">
            View Diagnostic
          </Link>
        </div>
      </div>
    </div>
  )
}
