// Import the direct client that doesn't rely on environment variables
import { client as directClient, urlFor as directUrlFor } from "./sanity-direct"

// Export the direct client and urlFor function
export const client = directClient
export const urlFor = directUrlFor

// Export a function to check if Sanity is configured correctly
export function isSanityConfigured() {
  try {
    // Try to access the projectId to see if it's configured
    const projectId = client.config().projectId
    return !!projectId
  } catch (error) {
    console.error("Sanity configuration error:", error)
    return false
  }
}
