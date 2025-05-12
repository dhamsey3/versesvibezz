import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PoemForm } from "@/components/poem-form"

export default function NewPoemPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-3xl py-12">
          <div className="mb-8">
            <Link href="/poems">
              <Button variant="ghost" size="sm" className="gap-1 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Poems
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Create New Poem</h1>
            <p className="mt-2 text-muted-foreground">Share your poetic creations with the VersesVibez community.</p>
          </div>

          <PoemForm mode="create" />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
