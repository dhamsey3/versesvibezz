import Link from "next/link"
import { SimpleHeader } from "@/components/simple-header"
import { SiteFooter } from "@/components/site-footer"

export default function PoemsPage() {
  // Sample static poems data
  const samplePoems = [
    {
      id: "1",
      title: "The Road Not Taken",
      excerpt: "Two roads diverged in a yellow wood, And sorry I could not travel both...",
      created_at: new Date().toISOString(),
      category: "Nature",
    },
    {
      id: "2",
      title: "Fire and Ice",
      excerpt: "Some say the world will end in fire, Some say in ice...",
      created_at: new Date().toISOString(),
      category: "Reflective",
    },
    {
      id: "3",
      title: "Dreams",
      excerpt: "Hold fast to dreams, For if dreams die, Life is a broken-winged bird...",
      created_at: new Date().toISOString(),
      category: "Life",
    },
    {
      id: "4",
      title: "Hope is the thing with feathers",
      excerpt: "Hope is the thing with feathers That perches in the soul...",
      created_at: new Date().toISOString(),
      category: "Inspirational",
    },
    {
      id: "5",
      title: "Sonnet 18",
      excerpt: "Shall I compare thee to a summer's day? Thou art more lovely and more temperate...",
      created_at: new Date().toISOString(),
      category: "Love",
    },
    {
      id: "6",
      title: "Invictus",
      excerpt: "Out of the night that covers me, Black as the pit from pole to pole...",
      created_at: new Date().toISOString(),
      category: "Inspirational",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SimpleHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Poetry Collection</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore our collection of poems and creative writing.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
              {samplePoems.map((poem) => (
                <div
                  key={poem.id}
                  className="group relative overflow-hidden rounded-lg border p-6 shadow transition-all hover:shadow-md"
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-2xl font-bold">{poem.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{poem.excerpt}</p>
                    <div className="pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(poem.created_at).toLocaleDateString()} • {poem.category}
                      </p>
                    </div>
                    <Link href={`/poems/${poem.id}`} className="absolute inset-0" aria-label={`Read ${poem.title}`}>
                      <span className="sr-only">Read poem</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
