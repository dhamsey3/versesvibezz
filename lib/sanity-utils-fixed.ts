import { client } from "./sanity-client-fixed"
import { fallbackPoems } from "./fallback-data"

// Fetch a single poem by slug with better error handling
export async function getPoem(slug: string) {
  if (!slug) {
    console.error("No slug provided to getPoem function")
    return null
  }

  try {
    console.log(`Fetching poem with slug: ${slug}`)
    const poem = await client.fetch(
      `*[_type == "poem" && slug.current == $slug][0] {
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
      }`,
      { slug },
    )

    if (!poem) {
      console.log(`No poem found with slug: ${slug}`)
      // Try to find a fallback poem
      const fallbackPoem = fallbackPoems.find((p) => p.slug.current === slug)
      return fallbackPoem || null
    }

    return poem
  } catch (error) {
    console.error(`Error fetching poem with slug ${slug}, checking fallbacks:`, error)
    // Try to find a fallback poem
    const fallbackPoem = fallbackPoems.find((p) => p.slug.current === slug)
    return fallbackPoem || null
  }
}

// Add other necessary functions from sanity-utils.ts here...
