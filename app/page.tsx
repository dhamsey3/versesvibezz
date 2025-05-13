import Link from "next/link"
import { getPoems } from "@/lib/actions"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PoemCard } from "@/components/poem-card"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const poems = await getPoems()
  const recentPoems = poems.slice(0, 6)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to VersesVibez
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A community for poets and poetry lovers to share and discover beautiful verses.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/poems">
                  <Button>Explore Poems</Button>
                </Link>
                <Link href="/poems/new">
                  <Button variant="outline">Share Your Poem</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recent Poems</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover the latest poetic creations from our community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
              {recentPoems.length > 0 ? (
                recentPoems.map((poem) => (
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
            {recentPoems.length > 0 && (
              <div className="flex justify-center">
                <Link href="/poems">
                  <Button variant="outline">View All Poems</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
