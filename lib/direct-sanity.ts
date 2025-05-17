// This file provides direct API access to Sanity without using any client libraries
// It's designed to be reliable across all environments

// Hardcoded Sanity configuration
const SANITY_PROJECT_ID = "5npbo3eo"
const SANITY_DATASET = "production"
const SANITY_API_VERSION = "2023-05-03"

// Base URL for Sanity API
const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`

// Helper function to log errors with context
function logError(context: string, error: any) {
  console.error(`[DirectSanity] ${context}:`, error)
  // You could add more sophisticated logging here
}

// Function to execute any GROQ query directly
export async function executeQuery(query: string, params: Record<string, any> = {}) {
  try {
    // Build the query URL with parameters
    let url = `${SANITY_API_URL}?query=${encodeURIComponent(query)}`

    // Add parameters to the URL
    Object.entries(params).forEach(([key, value]) => {
      url += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`
    })

    // Execute the query
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Sanity API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    logError(`Failed to execute query: ${query}`, error)
    return null
  }
}

// Function to get a poem by slug
export async function getPoem(slug: string) {
  const query = `*[_type == "poem" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "poet": poet->{
      _id,
      name,
      slug
    },
    "collection": collection->{
      _id,
      title,
      slug
    },
    coverImage,
    content,
    year,
    "themes": themes[]-> {
      _id,
      name,
      slug
    }
  }`

  return executeQuery(query, { slug })
}

// Function to get all poems
export async function getAllPoems() {
  const query = `*[_type == "poem"] | order(title asc) {
    _id,
    title,
    slug,
    "poet": poet->name,
    "poetSlug": poet->slug.current,
    "collection": collection->title,
    coverImage,
    year,
    featured
  }`

  return executeQuery(query) || []
}

// Function to get featured poems
export async function getFeaturedPoems() {
  const query = `*[_type == "poem" && featured == true] | order(featuredOrder asc) {
    _id,
    title,
    slug,
    "poet": poet->name,
    "poetSlug": poet->slug.current,
    "collection": collection->title,
    coverImage,
    featuredExcerpt,
    content,
    year,
    featured
  }`

  return executeQuery(query) || []
}

// Function to get a poet by slug
export async function getPoet(slug: string) {
  const query = `*[_type == "poet" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    biography,
    birthDate,
    deathDate,
    styles,
    "poems": *[_type == "poem" && references(^._id)] {
      _id,
      title,
      slug,
      coverImage,
      year,
      featured
    }
  }`

  return executeQuery(query, { slug })
}

// Function to get all poets
export async function getAllPoets() {
  const query = `*[_type == "poet"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    biography,
    birthDate,
    deathDate,
    styles,
    "poemCount": count(*[_type == "poem" && references(^._id)])
  }`

  return executeQuery(query) || []
}

// Helper function to build image URLs
export function buildImageUrl(source: any) {
  if (!source || !source.asset || !source.asset._ref) {
    return "/images/poetry-bg-1.jpg" // Default image
  }

  try {
    // Extract image ID from the asset reference
    // Format is typically "image-{id}-{dimensions}-{format}"
    const ref = source.asset._ref
    const [, id, dimensions, format] = ref.split("-")

    // Build the URL
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`
  } catch (error) {
    logError("Failed to build image URL", error)
    return "/images/poetry-bg-1.jpg" // Default image on error
  }
}
