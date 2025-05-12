import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getPoemById } from "@/lib/actions"

export default async function EditPoemPage({
  params,
}: {
  params: { id: string }
}) {
  const poem = await getPoemById(params.id)

  if (!poem) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-3xl py-12">
          <div className="mb-8">
            <Link href={`/poems/${params.id}`}>
              <Button variant="ghost" size="sm" className="gap-1 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Poem
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Edit Poem</h1>
            <p className="mt-2 text-muted-foreground">Make changes to your poem and update it.</p>
          </div>

          <div className="space-y-6">
            <p>Please sign in to edit this poem.</p>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
