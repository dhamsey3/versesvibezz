"use client"

import { createClient } from "next-sanity"
import { sanityConfigClient } from "./sanity-config-client"

// Create a client for browser use with hardcoded config
export const browserClient = createClient({
  projectId: sanityConfigClient.projectId,
  dataset: sanityConfigClient.dataset,
  apiVersion: sanityConfigClient.apiVersion,
  useCdn: true,
})

// Helper function for safe data fetching in the browser
export async function fetchSanityDataBrowser<T>(query: string, params = {}): Promise<T> {
  try {
    return await browserClient.fetch<T>(query, params)
  } catch (error) {
    console.error("Error fetching data from Sanity in browser:", error)
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : String(error)}`)
  }
}
