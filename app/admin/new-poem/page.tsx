"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { SiteFooter } from "@/components/site-footer"
import { PostForm } from "@/components/post-form"
import { useAdminAuth } from "@/lib/admin-auth"

export default function NewPoemPage() {
  const { isAdmin, isLoading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/admin")
    }
  }, [isAdmin, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 container py-12 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Create New Poem</h1>
        <PostForm mode="create" />
      </main>
      <SiteFooter />
    </div>
  )
}
