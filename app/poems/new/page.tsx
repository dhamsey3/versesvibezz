import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export default function NewPoemPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <h1 className="text-2xl font-bold mb-6">Create New Poem</h1>
        <p className="mb-4">You need to be signed in to create a poem.</p>
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </main>
      <SiteFooter />
    </div>
  )
}
