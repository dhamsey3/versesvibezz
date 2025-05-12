import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getPoems } from "@/lib/actions"

export default async function Home() {
  // Fetch poems from the database
  const poems = await getPoems()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  VersesVibez
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Where words dance and emotions flow. A sanctuary for poetry lovers and creative souls.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/poems">
                  <Button className="gap-1">
                    Explore Poems <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">About</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recent Poems</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore our latest poetic creations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              {poems.slice(0, 4).map((poem) => (
                <div
                  key={poem.id}
                  className="group relative overflow-hidden rounded-lg border p-6 shadow transition-all hover:shadow-md"
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-2xl font-bold">{poem.title}</h3>
                    <p className="whitespace-pre-line text-gray-500 dark:text-gray-400">{poem.excerpt}</p>
                    <div className="pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        By {poem.author?.username || "Unknown"} • {new Date(poem.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Link href={`/poems/${poem.id}`} className="absolute inset-0" aria-label={`Read ${poem.title}`}>
                      <span className="sr-only">Read poem</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/poems">
                <Button variant="outline" className="gap-1">
                  View All Poems <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
