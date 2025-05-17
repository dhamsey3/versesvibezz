import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

// More resilient configuration
export default defineConfig({
  name: "versesvibez",
  title: "VersesVibez Poetry",
  projectId: "5npbo3eo",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  // Add better error handling and logging
  studio: {
    components: {
      // Add custom error handling components if needed
    },
  },
  // Disable strict mode for more lenient error handling
  strict: false,
  // Add development mode for better debugging
  development: process.env.NODE_ENV !== "production",
  // Add more detailed logging
  logging: {
    level: "debug",
    enabled: true,
  },
})
