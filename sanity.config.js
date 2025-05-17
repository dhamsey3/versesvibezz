import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import { sanityConfig } from "./lib/sanity-config-fixed"

// Use the hardcoded configuration
export default defineConfig({
  name: "versesvibez",
  title: "VersesVibez Poetry",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  // Disable strict mode for more lenient error handling
  strict: false,
})
