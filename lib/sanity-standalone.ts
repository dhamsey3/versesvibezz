import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Hardcoded Sanity configuration - no environment variables needed
const config = {
  projectId: "5npbo3eo",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
}

// Create a standalone client with hardcoded values
export const sanityClient = createClient(config)

// Create an image builder using the standalone client
const imageBuilder = imageUrlBuilder(sanityClient)

// Helper function for generating image URLs
export function urlFor(source: any) {
  if (!source) return { url: () => "/placeholder.svg" }

  try {
    return imageBuilder.image(source)
  } catch (error) {
    console.error("Error building image URL:", error)
    return { url: () => "/placeholder.svg" }
  }
}

// Helper function for fetching data with error handling
export async function fetchData<T>(query: string, params = {}): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params)
  } catch (error) {
    console.error("Error fetching data from Sanity:", error)
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : String(error)}`)
  }
}
