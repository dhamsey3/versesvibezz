"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PoemForm } from "@/components/poem-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function EditPoemPage({ params }: { params: { id: string } }) {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [poem, setPoem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await fetch(`/api/poems/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to load poem")
        }
        const data = await response.json()
        setPoem(data)
      } catch (err) {
        setError("Failed to load poem")
        toast({
          title: "Error",
          description: "Failed to load poem",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPoem()
  }, [params.id, toast])

  if (isAuthLoading || isLoading) {
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
          <h1 className="text-2xl font-bold mb-6">Edit Poem</h1>
          <p className="mb-4">You need to be signed in to edit a poem.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (error || !poem) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-12">
          <h1 className="text-2xl font-bold mb-6">Error</h1>
          <p>{error || "Poem not found"}</p>
          <Link href="/poems" className="mt-4 text-primary hover:underline block">
            Back to Poems
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Check if user is the author
  if (poem.author_id !== user.id) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-12">
          <h1 className="text-2xl font-bold mb-6">Unauthorized</h1>
          <p>You are not authorized to edit this poem.</p>
          <Link href={`/poems/${params.id}`} className="mt-4 text-primary hover:underline block">
            Back to Poem
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
          <Link href={`/poems/${params.id}`} className="text-primary hover:underline">
            &larr; Back to Poem
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Edit Poem</h1>
        <PoemForm
          mode="edit"
          userId={user.id}
          poem={{
            id: poem.id,
            title: poem.title,
            content: poem.content,
            category: poem.category,
          }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
