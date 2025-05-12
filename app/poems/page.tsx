import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getPoems } from "@/lib/actions"

export default async function PoemsPage() {
  // Fetch all poems from the database
  const poems = await getPoems()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Poetry Collection</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore our diverse collection of poems that capture the essence of human experience.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-center">
                  <Link href="/">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {poems.map((poem) => (
                <div
                  key={poem.id}
                  className="group relative overflow-hidden rounded-lg border p-6 shadow transition-all hover:shadow-md"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="space-y-1">
                      <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs">{poem.category}</span>
                      <h3 className="text-2xl font-bold">{poem.title}</h3>
                    </div>
                    <p className="whitespace-pre-line text-gray-500 dark:text-gray-400 line-clamp-4">{poem.excerpt}</p>
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
