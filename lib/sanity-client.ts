import { createClient } from "next-sanity"

// Hardcode the project ID to ensure it's always available
const projectId = "5npbo3eo"
const dataset = "production"
const apiVersion = "2023-05-03"

// Create a client with error handling
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  // Add token if available (for authenticated requests)
  token: process.env.SANITY_API_TOKEN,
  // Add perspective if needed
  perspective: "published",
})

// Create a function to safely execute Sanity queries with error handling
export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error("Sanity query error:", error)
    // You can customize this error or return a default value
    throw new Error(`Failed to fetch data from Sanity: ${error instanceof Error ? error.message : String(error)}`)
  }
}
