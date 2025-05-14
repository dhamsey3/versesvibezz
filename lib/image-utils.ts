import { urlFor } from "./sanity"

// Poetry-themed default images
const DEFAULT_POEM_IMAGES = [
  "/images/poetry-bg-1.jpg",
  "/images/poetry-bg-2.jpg",
  "/images/poetry-bg-3.jpg",
  "/images/poetry-bg-4.jpg",
  "/images/poetry-bg-5.jpg",
]

const DEFAULT_POET_IMAGE = "/images/poet-default.png"
const DEFAULT_COLLECTION_IMAGE = "/images/collection-default.png"

/**
 * Get an image URL for a poem, with fallback to a random poetry image
 */
export function getPoemImageUrl(coverImage: any): string {
  if (coverImage) {
    try {
      // Try to generate a URL from the Sanity image
      const imageUrl = urlFor(coverImage).url()
      console.log("Generated poem image URL:", imageUrl)
      return imageUrl
    } catch (error) {
      console.error("Error generating poem image URL:", error)
      // If there's an error, fall back to default
    }
  }

  // Return a random default poem image
  const defaultImage = DEFAULT_POEM_IMAGES[Math.floor(Math.random() * DEFAULT_POEM_IMAGES.length)]
  console.log("Using default poem image:", defaultImage)
  return defaultImage
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

      const imageUrl = urlFor(image).url()
      console.log("Generated poet image URL:", imageUrl)
      return imageUrl
    } catch (error) {
      console.error("Error generating poet image URL:", error)
    }
  }

  console.log("Using default poet image:", DEFAULT_POET_IMAGE)
  return DEFAULT_POET_IMAGE
}

/**
 * Get an image URL for a collection, with fallback to default collection image
 */
export function getCollectionImageUrl(image: any): string {
  if (image) {
    try {
      const imageUrl = urlFor(image).url()
      console.log("Generated collection image URL:", imageUrl)
      return imageUrl
    } catch (error) {
      console.error("Error generating collection image URL:", error)
    }
  }

  console.log("Using default collection image:", DEFAULT_COLLECTION_IMAGE)
  return DEFAULT_COLLECTION_IMAGE
}

/**
 * Get a themed background image based on poem themes or content
 */
export function getThemedBackgroundImage(themes: any[] = []): string {
  // If no themes, return a random default
  if (!themes || themes.length === 0) {
    const defaultImage = DEFAULT_POEM_IMAGES[Math.floor(Math.random() * DEFAULT_POEM_IMAGES.length)]
    console.log("Using random themed background image:", defaultImage)
    return defaultImage
  }

  // In a real implementation, you could match themes to specific images
  // For now, we'll just use the first theme to select an image deterministically
  const themeIndex = themes[0].name.charCodeAt(0) % DEFAULT_POEM_IMAGES.length
  const selectedImage = DEFAULT_POEM_IMAGES[themeIndex]
  console.log("Using themed background image based on theme:", selectedImage)
  return selectedImage
}
