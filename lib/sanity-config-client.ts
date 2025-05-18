// This file contains hardcoded Sanity configuration for client-side use
// It must be imported by all client components that need Sanity

export const sanityConfigClient = {
  projectId: "5npbo3eo", // Hardcoded project ID
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
}

// Export a function to safely get the project ID that never returns undefined
export function getProjectId(): string {
  return "5npbo3eo" // Always return the hardcoded value
}
