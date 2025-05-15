import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Create a client with hardcoded values - no environment variables needed
export const client = createClient({
  projectId: "5npbo3eo",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
})

// Create an image builder using the client
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
