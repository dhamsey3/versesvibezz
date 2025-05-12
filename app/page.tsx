import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedPoem } from "@/components/featured-poem"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PoemCard } from "@/components/poem-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { getPoems } from "@/lib/actions"

export default async function Home() {
  // Fetch poems from the database
  const poems = await getPoems()

  // Get the featured poem (first one)
  const featuredPoem = poems[0]

  // Get recent poems (excluding the featured one)
  const recentPoems = poems.slice(1, 5)

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

        {featuredPoem && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Poem</h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Immerse yourself in our featured work of the week.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1">
                <FeaturedPoem
                  id={featuredPoem.id}
                  title={featuredPoem.title}
                  excerpt={featuredPoem.excerpt}
                  author={featuredPoem.author?.username || "Unknown"}
                  date={new Date(featuredPoem.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  likes={featuredPoem.likes}
                  comments={0} // We'll implement comment counting later
                />
              </div>
            </div>
          </section>
        )}

        {recentPoems.length > 0 && (
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
                {recentPoems.map((poem) => (
                  <PoemCard
                    key={poem.id}
                    id={poem.id}
                    title={poem.title}
                    excerpt={poem.excerpt}
                    author={poem.author?.username || "Unknown"}
                    date={new Date(poem.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    likes={poem.likes}
                    comments={0} // We'll implement comment counting later
                  />
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
        )}

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Poetic Community</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Subscribe to our newsletter to receive the latest poems, updates, and exclusive content directly to
                  your inbox.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
