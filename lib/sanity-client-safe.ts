"use client"

import { createClient } from "next-sanity"

// Hardcode the project ID to ensure it's always available
const projectId = "5npbo3eo"
const dataset = "production"
const apiVersion = "2023-05-03"

// Create a client with credentials that can be used in client components
export const clientSafe = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Don't include tokens in client-side code
})
