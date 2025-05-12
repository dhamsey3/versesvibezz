"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "./supabase"
import type { Poem, Comment } from "./types"

// Get all poems
export async function getPoems() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("poems")
    .select(`
      *,
      author:author_id(id, username, avatar_url)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching poems:", error)
    return []
  }

  return data as (Poem & { author: { id: string; username: string; avatar_url: string | null } })[]
}

// Get a single poem by ID
export async function getPoemById(id: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("poems")
    .select(`
      *,
      author:author_id(id, username, avatar_url)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching poem with ID ${id}:`, error)
    return null
  }

  return data as Poem & { author: { id: string; username: string; avatar_url: string | null } }
}

// Get comments for a poem
export async function getCommentsByPoemId(poemId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      user:user_id(id, username, avatar_url)
    `)
    .eq("poem_id", poemId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching comments for poem ${poemId}:`, error)
    return []
  }

  return data as (Comment & { user: { id: string; username: string; avatar_url: string | null } })[]
}

// Add a comment to a poem
export async function addComment(poemId: string, userId: string, content: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("comments")
    .insert([{ poem_id: poemId, user_id: userId, content }])
    .select()

  if (error) {
    console.error("Error adding comment:", error)
    return null
  }

  revalidatePath(`/poems/${poemId}`)
  return data[0] as Comment
}

// Like a poem
export async function likePoem(poemId: string, userId: string) {
  const supabase = createServerSupabaseClient()

  // First check if the user has already liked this poem
  const { data: existingLike } = await supabase
    .from("likes")
    .select("*")
    .eq("poem_id", poemId)
    .eq("user_id", userId)
    .maybeSingle()

  if (existingLike) {
    // User already liked this poem, so unlike it
    await supabase.from("likes").delete().eq("poem_id", poemId).eq("user_id", userId)

    // Decrement the likes count in the poems table
    await supabase.rpc("decrement_likes", { poem_id: poemId })

    revalidatePath(`/poems/${poemId}`)
    revalidatePath("/poems")
    revalidatePath("/")

    return { liked: false }
  } else {
    // User hasn't liked this poem yet, so add a like
    await supabase.from("likes").insert([{ poem_id: poemId, user_id: userId }])

    // Increment the likes count in the poems table
    await supabase.rpc("increment_likes", { poem_id: poemId })

    revalidatePath(`/poems/${poemId}`)
    revalidatePath("/poems")
    revalidatePath("/")

    return { liked: true }
  }
}

// Submit contact form
export async function submitContactForm(formData: FormData) {
  // In a real application, you would store this in a database
  // or send an email
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  console.log("Contact form submission:", { name, email, subject, message })

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, message: "Your message has been sent successfully!" }
}

// Subscribe to newsletter
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  // In a real application, you would add this email to your newsletter service
  console.log("Newsletter subscription:", email)

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, message: "You have been subscribed to our newsletter!" }
}

// Create a new poem
export async function createPoem(title: string, content: string, excerpt: string, category: string, authorId: string) {
  const supabase = createServerSupabaseClient()

  // Create excerpt from content if not provided
  if (!excerpt) {
    // Take first 150 characters of content as excerpt
    excerpt = content.substring(0, 150)
    // Add ellipsis if content is longer than 150 characters
    if (content.length > 150) {
      excerpt += "..."
    }
  }

  const { data, error } = await supabase
    .from("poems")
    .insert([
      {
        title,
        content,
        excerpt,
        category,
        author_id: authorId,
        likes: 0,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating poem:", error)
    return null
  }

  revalidatePath("/poems")
  revalidatePath("/")

  return data[0]
}

// Update an existing poem
export async function updatePoem(
  id: string,
  title: string,
  content: string,
  excerpt: string,
  category: string,
  authorId: string,
) {
  const supabase = createServerSupabaseClient()

  // First check if the user is the author of the poem
  const { data: poem } = await supabase.from("poems").select("author_id").eq("id", id).single()

  if (!poem || poem.author_id !== authorId) {
    return { success: false, message: "You are not authorized to edit this poem" }
  }

  // Create excerpt from content if not provided
  if (!excerpt) {
    // Take first 150 characters of content as excerpt
    excerpt = content.substring(0, 150)
    // Add ellipsis if content is longer than 150 characters
    if (content.length > 150) {
      excerpt += "..."
    }
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
    console.error("Error updating poem:", error)
    return { success: false, message: "Failed to update poem" }
  }

  revalidatePath(`/poems/${id}`)
  revalidatePath("/poems")
  revalidatePath("/")

  return { success: true, poem: data[0] }
}

// Delete a poem
export async function deletePoem(id: string, authorId: string) {
  const supabase = createServerSupabaseClient()

  // First check if the user is the author of the poem
  const { data: poem } = await supabase.from("poems").select("author_id").eq("id", id).single()

  if (!poem || poem.author_id !== authorId) {
    return { success: false, message: "You are not authorized to delete this poem" }
  }

  const { error } = await supabase.from("poems").delete().eq("id", id)

  if (error) {
    console.error("Error deleting poem:", error)
    return { success: false, message: "Failed to delete poem" }
  }

  revalidatePath("/poems")
  revalidatePath("/")

  return { success: true, message: "Poem deleted successfully" }
}
