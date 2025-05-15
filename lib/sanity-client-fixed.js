import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Hardcoded configuration - no environment variables
const config = {
  projectId: "5npbo3eo",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
}

// Create a client with hardcoded values
export const client = createClient(config)

// Create an image builder
const builder = imageUrlBuilder(client)

// Helper function for generating image URLs
export function urlFor(source) {
  if (!source) return { url: () => "/placeholder.svg" }

  try {
    return builder.image(source)
  } catch (error) {
    console.error("Error building image URL:", error)
    return { url: () => "/placeholder.svg" }
  }
}
