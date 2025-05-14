import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Your Sanity project ID
const projectId = "5npbo3eo"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-05-03", // Use the latest API version
  useCdn: process.env.NODE_ENV === "production",
})

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  // Add validation to prevent errors with invalid sources
  if (!source || !source._ref) {
    console.error("Invalid image source provided to urlFor:", source)
    return {
      url: () => "/placeholder.svg?key=1wzoz",
    }
  }

  try {
    return builder.image(source)
  } catch (error) {
    console.error("Error building image URL:", error)
    return {
      url: () => "/placeholder.svg?key=37dso",
    }
  }
}
