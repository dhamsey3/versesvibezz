import Link from "next/link"
import { ArrowLeft, PlusCircle } from "lucide-react"

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
                <div className="flex justify-center gap-4">
                  <Link href="/">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Button>
                  </Link>
                  <Link href="/poems/new">
                    <Button size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" /> Create Poem
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
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        <span>{poem.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>0</span>
                      </div>
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
