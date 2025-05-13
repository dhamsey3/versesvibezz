import Link from "next/link"
import { SimpleHeader } from "@/components/simple-header"
import { SiteFooter } from "@/components/site-footer"

// Define sample poem content for a few IDs
const samplePoemContent = {
  "1": {
    title: "The Road Not Taken",
    content: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`,
    category: "Nature",
    created_at: "2023-04-15T10:30:00Z",
  },
  "2": {
    title: "Fire and Ice",
    content: `Some say the world will end in fire,
Some say in ice.
From what I've tasted of desire
I hold with those who favor fire.
But if it had to perish twice,
I think I know enough of hate
To say that for destruction ice
Is also great
And would suffice.`,
    category: "Reflective",
    created_at: "2023-05-20T14:45:00Z",
  },
  "3": {
    title: "Dreams",
    content: `Hold fast to dreams
For if dreams die
Life is a broken-winged bird
That cannot fly.

Hold fast to dreams
For when dreams go
Life is a barren field
Frozen with snow.`,
    category: "Life",
    created_at: "2023-06-10T09:15:00Z",
  },
}

export default function PoemPage({ params }: { params: { id: string } }) {
  // Get poem based on ID or show a default message
  const poem = samplePoemContent[params.id as keyof typeof samplePoemContent] || {
    title: "Poem Not Found",
    content: "The poem you're looking for doesn't exist or has been removed.",
    category: "",
    created_at: new Date().toISOString(),
  }

  const formattedDate = new Date(poem.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SimpleHeader />
      <main className="flex-1 container py-12 max-w-3xl">
        <div className="mb-4">
          <Link href="/poems" className="text-primary hover:underline">
            &larr; Back to Poems
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-2">{poem.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {poem.category}
            </p>
          </div>
          <div className="whitespace-pre-line">{poem.content}</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
