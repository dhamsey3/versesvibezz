import { sanityClient, urlFor as urlForStandalone } from "./sanity-standalone"

// Re-export the standalone client and urlFor function
export const client = sanityClient
export const urlFor = urlForStandalone

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
