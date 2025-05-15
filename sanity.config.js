import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

// Hardcode the project ID directly in the config
export default defineConfig({
  name: "versesvibez",
  title: "VersesVibez Poetry",

  // Hardcoded values - no environment variables needed
  projectId: "5npbo3eo",
  dataset: "production",

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
