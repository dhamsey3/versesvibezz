import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getPoemById } from "@/lib/actions"

export default async function PoemPage({ params }: { params: { id: string } }) {
  // Fetch the poem from the database
  const poem = await getPoemById(params.id)

  // If the poem doesn't exist, show a 404 page
  if (!poem) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-3xl py-12 md:py-20">
          <div className="mb-8">
            <Link href="/poems">
              <Button variant="ghost" size="sm" className="gap-1 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Poems
              </Button>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{poem.title}</h1>
            <div className="mt-4 text-sm text-muted-foreground">
              By {poem.author?.username || "Unknown"} • {new Date(poem.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div className="whitespace-pre-line text-lg leading-relaxed">{poem.content}</div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-b py-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{poem.category}</span>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
