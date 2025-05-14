import { createClient } from "next-sanity"

// Hardcode the project ID to ensure it's always available
const projectId = "5npbo3eo"
const dataset = "production"
const apiVersion = "2023-05-03"

// This client should ONLY be used in Server Components or API routes
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We want fresh data when using the token
  token: process.env.SANITY_API_TOKEN,
})

// Helper function for fetching draft content
export async function fetchDraft<T>(query: string, params = {}): Promise<T> {
  return serverClient.fetch<T>(query, params, {
    // Use the preview dataset if available
    perspective: "previewDrafts",
  })
}

// Helper function for creating or updating content
export async function createOrUpdateDocument(doc: any) {
  if (!serverClient) {
    throw new Error("Server client not initialized")
  }

  return serverClient.createOrReplace(doc)
}

// Helper function for deleting content
export async function deleteDocument(id: string) {
  if (!serverClient) {
    throw new Error("Server client not initialized")
  }

  return serverClient.delete(id)
}
