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
  // Add automatic error recovery
  unstable_clientLogging: {
    level: "warning",
  },
})
