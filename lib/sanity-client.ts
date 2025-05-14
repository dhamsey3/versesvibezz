import { createClient } from "next-sanity"

// Your Sanity project ID
const projectId = "5npbo3eo"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-05-03", // Use the latest API version
  useCdn: process.env.NODE_ENV === "production",
})
