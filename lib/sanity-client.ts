import { createClient } from "next-sanity"

// Hardcode the project ID to ensure it's always available
// This is your public project ID, so it's safe to include in client-side code
const projectId = "5npbo3eo"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = "2023-05-03"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
})
