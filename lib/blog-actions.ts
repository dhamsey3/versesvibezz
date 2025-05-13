"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "./supabase-client"

export type Post = {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  created_at: string
  updated_at: string
}

// Get all posts
export async function getPosts() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("poems").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data as Post[]
}

// Get a single post by ID
export async function getPostById(id: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("poems").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching post with ID ${id}:`, error)
    return null
  }

  return data as Post
}

// Create a new post
export async function createPost(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string

  // Create excerpt from content
  let excerpt = content.substring(0, 150)
  if (content.length > 150) {
    excerpt += "..."
  }

  const { data, error } = await supabase
    .from("poems")
    .insert([
      {
        title,
        content,
        excerpt,
        category,
        author_id: "admin", // Fixed author ID for admin
        likes: 0,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/poems")
  revalidatePath("/")

  return { success: true, post: data[0] }
}

// Update an existing post
export async function updatePost(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string

  // Create excerpt from content
  let excerpt = content.substring(0, 150)
  if (content.length > 150) {
    excerpt += "..."
  }

  const { data, error } = await supabase
    .from("poems")
    .update({
      title,
      content,
      excerpt,
      category,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/poems/${id}`)
  revalidatePath("/poems")
  revalidatePath("/")

  return { success: true, post: data[0] }
}

// Delete a post
export async function deletePost(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("poems").delete().eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/poems")
  revalidatePath("/")

  return { success: true }
}
