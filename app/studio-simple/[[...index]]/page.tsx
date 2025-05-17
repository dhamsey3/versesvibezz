"use client"

import { NextStudio } from "next-sanity/studio"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "@/schemas"

// Create a minimal config for troubleshooting
const minimalConfig = defineConfig({
  name: "versesvibez-minimal",
  title: "VersesVibez (Minimal)",
  projectId: "5npbo3eo",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  // Disable features that might cause issues
  studio: {
    components: {},
  },
  // Disable strict mode
  strict: false,
})

export default function SimpleStudioPage() {
  return (
    <div style={{ height: "100vh" }}>
      <NextStudio config={minimalConfig} />
    </div>
  )
}
