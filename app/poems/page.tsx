import Link from "next/link"
import { getPoems } from "@/lib/actions"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PoemCard } from "@/components/poem-card"
import { Button } from "@/components/ui/button"

export default async function PoemsPage() {
  const poems = await getPoems()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Poetry Collection</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore our collection of poems from talented writers around the world.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/poems/new">
                  <Button>Share Your Poem</Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
              {poems.length > 0 ? (
                poems.map((poem) => (
                  <PoemCard
                    key={poem.id}
                    id={poem.id}
                    title={poem.title}
                    excerpt={poem.excerpt}
                    author={poem.author?.username || "Anonymous"}
                    date={new Date(poem.created_at).toLocaleDateString()}
                    likes={poem.likes}
                    comments={0} // We'll implement this later
                  />
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-gray-500 dark:text-gray-400">No poems yet. Be the first to share one!</p>
                  <Link href="/poems/new" className="mt-4 inline-block">
                    <Button>Share Your Poem</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
