// Simple script to verify Sanity configuration
console.log("Verifying Sanity configuration...")

// Hardcoded configuration
const config = {
  projectId: "5npbo3eo",
  dataset: "production",
  apiVersion: "2023-05-03",
}

console.log("Using configuration:", config)
console.log("Project ID:", config.projectId)
console.log("Dataset:", config.dataset)

if (!config.projectId) {
  console.error("ERROR: Missing project ID")
  process.exit(1)
} else {
  console.log("Configuration looks good!")
}
