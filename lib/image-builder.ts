import imageUrlBuilder from "@sanity/image-url"
import { client } from "./sanity-client"

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Helper function for generating image URLs with the Sanity Image Pipeline
export function urlFor(source: any) {
  return builder.image(source)
}
