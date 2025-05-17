import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { sanityConfig } from "./sanity-config-fixed"

// Create client with hardcoded configuration
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
})

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
