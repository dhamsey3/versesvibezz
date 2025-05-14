import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

// Hardcode the project ID to ensure it's always available
const projectId = "5npbo3eo"
const dataset = "production"

export default defineConfig({
  name: "default",
  title: "VersesVibez Poetry",

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Add CORS origins to allow Studio to work properly
  cors: {
    allowOrigins: ["https://versesvibez.vercel.app", "http://localhost:3000"],
    allowCredentials: true,
  },
})
