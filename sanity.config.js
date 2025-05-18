import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { schemas } from "./schemas"

export default defineConfig({
  name: "default",
  title: "VersesVibez",

  // Hardcode the projectId to ensure it's always available
  projectId: "5npbo3eo",
  dataset: "production",

  plugins: [deskTool()],
  schema: {
    types: schemas,
  },
})
