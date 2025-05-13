"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPost, updatePost } from "@/lib/blog-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

type PostFormProps = {
  mode: "create" | "edit"
  post?: {
    id: string
    title: string
    content: string
    category: string
  }
}

const CATEGORIES = ["Nature", "Love", "Life", "Reflective", "Other"]

export function PostForm({ mode, post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [category, setCategory] = useState(post?.category || "Nature")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("category", category)

    try {
      if (mode === "create") {
        const result = await createPost(formData)
        if (result.success) {
          toast({
            title: "Success",
            description: "Poem created successfully",
          })
          router.push(`/admin/dashboard`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to create poem",
            variant: "destructive",
          })
        }
      } else if (mode === "edit" && post) {
        formData.append("id", post.id)
        const result = await updatePost(formData)
        if (result.success) {
          toast({
            title: "Success",
            description: "Poem updated successfully",
          })
          router.push(`/admin/dashboard`)
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update poem",
            variant: "destructive",
          })
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px]"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Poem"
              : "Update Poem"}
        </Button>
      </div>
    </form>
  )
}
