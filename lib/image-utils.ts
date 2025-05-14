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
    return urlFor(coverImage).url()
  }

  // Return a random default poem image
  return DEFAULT_POEM_IMAGES[Math.floor(Math.random() * DEFAULT_POEM_IMAGES.length)]
}

/**
 * Get an image URL for a poet, with fallback to default poet image
 */
export function getPoetImageUrl(image: any): string {
  if (image) {
    return urlFor(image).url()
  }

  return DEFAULT_POET_IMAGE
}

/**
 * Get an image URL for a collection, with fallback to default collection image
 */
export function getCollectionImageUrl(image: any): string {
  if (image) {
    return urlFor(image).url()
  }

  return DEFAULT_COLLECTION_IMAGE
}

/**
 * Get a themed background image based on poem themes or content
 */
export function getThemedBackgroundImage(themes: any[] = []): string {
  // If no themes, return a random default
  if (!themes || themes.length === 0) {
    return DEFAULT_POEM_IMAGES[Math.floor(Math.random() * DEFAULT_POEM_IMAGES.length)]
  }

  // In a real implementation, you could match themes to specific images
  // For now, we'll just use the first theme to select an image deterministically
  const themeIndex = themes[0].name.charCodeAt(0) % DEFAULT_POEM_IMAGES.length
  return DEFAULT_POEM_IMAGES[themeIndex]
}
