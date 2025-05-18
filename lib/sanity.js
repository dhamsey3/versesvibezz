import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Always use hardcoded values
const projectId = "5npbo3eo"
const dataset = "production"
const apiVersion = "2023-05-03"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Create an image URL builder
const builder = imageUrlBuilder(client)

// Add the missing named export 'urlFor'
export const urlFor = (source) => {
  return builder.image(source)
}
