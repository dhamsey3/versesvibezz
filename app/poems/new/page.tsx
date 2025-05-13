"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PoemForm } from "@/components/poem-form"
import { Button } from "@/components/ui/button"

export default function NewPoemPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-12">
          <p>Loading...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!user) {
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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12 max-w-2xl">
        <div className="mb-4">
          <Link href="/poems" className="text-primary hover:underline">
            &larr; Back to Poems
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Create New Poem</h1>
        <PoemForm mode="create" userId={user.id} />
      </main>
      <SiteFooter />
    </div>
  )
}
