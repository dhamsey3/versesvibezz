import poet from "./poet"
import poem from "./poem"
import collection from "./collection"
import theme from "./theme"

// Export the schema types array
export const schemaTypes = [poet, poem, collection, theme]

// Add the missing named export 'schemas'
export const schemas = schemaTypes
