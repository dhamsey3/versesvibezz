import { urlFor } from "./sanity-client"
import { imageConfig } from "./config"

/**
 * Get an image URL for a poem, with fallback to a random poetry image
 */
export function getPoemImageUrl(coverImage: any): string {
  if (coverImage) {
    try {
      // Try to generate a URL from the Sanity image with transformations
      const imageUrl = urlFor(coverImage).auto("format").fit("max").url()
      return imageUrl
    } catch (error) {
      console.error("Error generating poem image URL:", error)
      // If there's an error, fall back to default
    }
  }

  // Return the default poem image
  return imageConfig.defaultPoemImage
}

/**
 * Get an image URL for a poet, with fallback to default poet image
 */
export function getPoetImageUrl(image: any): string {
  if (image) {
    try {
      // Handle both direct URLs and Sanity image references
      if (typeof image === "string") {
        return image
      }

      const imageUrl = urlFor(image).auto("format").fit("max").url()
      return imageUrl
    } catch (error) {
      console.error("Error generating poet image URL:", error)
    }
  }

  return imageConfig.defaultPoetImage
}

/**
 * Get an image URL for a collection, with fallback to default collection image
 */
export function getCollectionImageUrl(image: any): string {
  if (image) {
    try {
      const imageUrl = urlFor(image).auto("format").fit("max").url()
      return imageUrl
    } catch (error) {
      console.error("Error generating collection image URL:", error)
    }
  }

  return imageConfig.defaultCollectionImage
}
