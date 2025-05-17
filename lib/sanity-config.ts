// Central configuration for Sanity
// This file ensures the project ID is always available

export const sanityConfig = {
  projectId: "5npbo3eo", // Hardcoded project ID
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

// Function to get the studio URL
export function getStudioUrl() {
  // For v0 preview
  if (typeof window !== "undefined" && window.location.hostname.includes("vusercontent.net")) {
    return "https://kzmjpasfvg9lbi5uesm1.lite.vusercontent.net/studio/structure/poem;2035ffaa-afc4-4356-822c-ae0e76bf86aa"
  }

  // For production
  return `https://${sanityConfig.projectId}.sanity.studio/`
}
