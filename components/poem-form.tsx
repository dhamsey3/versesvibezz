"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createPoem, updatePoem } from "@/lib/actions"
import type { Poem } from "@/lib/types"

interface PoemFormProps {
  mode: "create" | "edit"
  poem?: Poem
}

const CATEGORIES = [
  "Nature",
  "Love",
  "Life",
  "Death",
  "Seasons",
  "Urban",
  "Reflective",
  "Celestial",
  "Weather",
  "Other",
]

export function PoemForm({ mode, poem }: PoemFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: poem?.title || "",
    content: poem?.content || "",
    excerpt: poem?.excerpt || "",
    category: poem?.category || "Nature",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // For now, we'll use a dummy user ID since we haven't implemented authentication yet
      const dummyUserId = "d9a1fc2e-d7a9-4c41-9f1a-318c6a8a292a" // Aria Nightshade

      if (mode === "create") {
        const result = await createPoem(
          formData.title,
          formData.content,
          formData.excerpt,
          formData.category,
          dummyUserId,
        )

        if (result) {
          toast({
            title: "Success!",
            description: "Your poem has been published.",
          })
          router.push(`/poems/${result.id}`)
        } else {
          toast({
            title: "Error",
            description: "Failed to publish your poem. Please try again.",
            variant: "destructive",
          })
        }
      } else if (mode === "edit" && poem) {
        const result = await updatePoem(
          poem.id,
          formData.title,
          formData.content,
          formData.excerpt,
          formData.category,
          dummyUserId,
        )

        if (result.success) {
          toast({
            title: "Success!",
            description: "Your poem has been updated.",
          })
          router.push(`/poems/${poem.id}`)
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to update your poem. Please try again.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error submitting poem:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the title of your poem"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your poem here..."
          className="min-h-[300px]"
          required
        />
        <p className="text-sm text-muted-foreground">
          Use line breaks to format your poem. The content will be displayed exactly as entered.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (Optional)</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="A short excerpt or preview of your poem (if left empty, the first few lines will be used)"
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          This will be displayed in poem listings. If left empty, the first few lines of your poem will be used.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Publishing..."
              : "Updating..."
            : mode === "create"
              ? "Publish Poem"
              : "Update Poem"}
        </Button>
      </div>
    </form>
  )
}
