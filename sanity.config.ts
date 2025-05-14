import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

// Hardcode the project ID to ensure it's always available
const projectId = "5npbo3eo"
const dataset = "production"

// Use a secret key that only you know
const secretKey = "your-secret-key-123" // Change this to something unique and non-guessable

export default defineConfig({
  name: "default",
  title: "VersesVibez Poetry",
  projectId,
  dataset,

  // Support both the standard /studio and the hidden path
  basePath: process.env.NODE_ENV === "development" ? "/studio" : `/admin-cms-${secretKey}`,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
