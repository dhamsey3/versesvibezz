import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { sanityConfig } from "./config"

// Create a client with the configuration from config.ts
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
})

// Create image URL builder
const builder = imageUrlBuilder(client)

// Helper function for generating image URLs
export function urlFor(source: any) {
  if (!source || (!source._ref && !source.asset)) {
    console.error("Invalid image source provided to urlFor:", source)
    return {
      url: () => "/placeholder.svg",
    }
  }

  try {
    return builder.image(source).auto("format").fit("max")
  } catch (error) {
    console.error("Error building image URL:", error)
    return {
      url: () => "/placeholder.svg",
    }
  }
}

// Helper function for safe data fetching
export async function fetchSanityData<T>(query: string, params = {}): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error("Error fetching data from Sanity:", error)
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : String(error)}`)
  }
}
