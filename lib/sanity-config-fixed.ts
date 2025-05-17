// Hardcoded Sanity configuration to ensure it's always available
export const sanityConfig = {
  projectId: "5npbo3eo", // Your Sanity project ID
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
}

// Function to validate the configuration
export function validateSanityConfig() {
  if (!sanityConfig.projectId) {
    throw new Error("Sanity configuration is missing projectId")
  }
  if (!sanityConfig.dataset) {
    throw new Error("Sanity configuration is missing dataset")
  }
  return true
}
