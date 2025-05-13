"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/lib/admin-auth"
import { getPosts, deletePost } from "@/lib/blog-actions"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2 } from "lucide-react"

export default function AdminDashboardPage() {
  const { isAdmin, isLoading } = useAdminAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/admin")
    }
  }, [isAdmin, isLoading, router])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts()
      setPosts(data)
    }

    if (isAdmin) {
      fetchPosts()
    }
  }, [isAdmin])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(id)

      try {
        const result = await deletePost(id)

        if (result.success) {
          toast({
            title: "Success",
            description: "Post deleted successfully",
          })
          // Remove the deleted post from the state
          setPosts(posts.filter((post) => post.id !== id))
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete post",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(null)
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/new-poem">
            <Button>New Poem</Button>
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="border-t">
                    <td className="px-4 py-2">
                      <Link href={`/poems/${post.id}`} className="text-blue-600 hover:underline">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{post.category}</td>
                    <td className="px-4 py-2">{new Date(post.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/edit-poem/${post.id}`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={isDeleting === post.id}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    No poems found. Create your first poem!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
