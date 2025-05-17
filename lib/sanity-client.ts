import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Hardcoded configuration to ensure consistent behavior
const config = {
  projectId: "5npbo3eo",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
}

// Create client with error handling
export const client = createClient(config)

// Create image builder
const builder = imageUrlBuilder(client)

// Helper function with better error handling
export function urlFor(source: any) {
  if (!source) return { url: () => "/placeholder.svg" }

  try {
    return builder.image(source)
  } catch (error) {
    console.error("Error building image URL:", error)
    return { url: () => "/placeholder.svg" }
  }
}

// Safe fetch utility
export async function fetchSafely<T>(query: string, params = {}, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error("Sanity fetch error:", error)
    return fallback
  }
}
