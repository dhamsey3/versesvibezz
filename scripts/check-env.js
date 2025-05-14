console.log("Checking environment variables...")

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

console.log("NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId || "Not set")
console.log("NEXT_PUBLIC_SANITY_DATASET:", dataset)

if (!projectId) {
  console.error("ERROR: Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable")
  process.exit(1)
} else {
  console.log("Environment variables look good!")
}
