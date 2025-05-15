// Central configuration file for the application

// Sanity configuration
export const sanityConfig = {
  projectId: "5npbo3eo", // Hardcoded project ID
  dataset: "production", // Default dataset
  apiVersion: "2023-05-03", // API version
  useCdn: true, // Use CDN for faster responses
}

// Image configuration
export const imageConfig = {
  defaultPoetImage: "/images/poet-default.png",
  defaultPoemImage: "/images/poetry-bg-1.jpg",
  defaultCollectionImage: "/images/collection-default.png",
  placeholderImage: "/abstract-geometric-placeholder.png",
}

// Site configuration
export const siteConfig = {
  title: "VersesVibez - Poetry Platform",
  description: "Discover and explore poetry from around the world",
  url: "https://versesvibez.vercel.app",
}
