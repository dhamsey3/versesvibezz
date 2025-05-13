"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { SiteFooter } from "@/components/site-footer"
import { PostForm } from "@/components/post-form"
import { useAdminAuth } from "@/lib/admin-auth"
import { getPostById } from "@/lib/blog-actions"
import { useToast } from "@/components/ui/use-toast"

export default function EditPoemPage({ params }: { params: { id: string } }) {
  const { isAdmin, isLoading } = useAdminAuth()
  const [post, setPost] = useState<any>(null)
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/admin")
    }
  }, [isAdmin, isLoading, router])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(params.id)
        setPost(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load poem",
          variant: "destructive",
        })
      } finally {
        setIsLoadingPost(false)
      }
    }

    if (isAdmin) {
      fetchPost()
    }
  }, [isAdmin, params.id, toast])

  if (isLoading || isLoadingPost) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <main className="flex-1 container py-12">
          <h1 className="text-2xl font-bold mb-6">Error</h1>
          <p>Poem not found</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-12 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Poem</h1>
        <PostForm
          mode="edit"
          post={{
            id: post.id,
            title: post.title,
            content: post.content,
            category: post.category,
          }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
