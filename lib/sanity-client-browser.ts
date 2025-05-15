"use client"

import { createClient } from "next-sanity"
import { sanityConfig } from "./config"

// Create a client for browser use
export const browserClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
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
