import { client } from "./sanity-client"
import { fallbackPoems, fallbackPoets } from "./fallback-data"

// Fetch all poets with better error handling and fallbacks
export async function getPoets() {
  try {
    console.log("Fetching all poets")
    const poets = await client.fetch(
      `*[_type == "poet"] {
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
      }`,
    )
    console.log(`Successfully fetched ${poets.length} poets`)
    return poets
  } catch (error) {
    console.error("Error fetching poets, using fallback data:", error)
    return fallbackPoets
  }
}

// Fetch a single poet by slug with better error handling
export async function getPoet(slug: string) {
  if (!slug) {
    console.error("No slug provided to getPoet function")
    return null
  }

  try {
    console.log(`Fetching poet with slug: ${slug}`)
    const poet = await client.fetch(
      `*[_type == "poet" && slug.current == $slug][0] {
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
      }`,
      { slug },
    )

    if (!poet) {
      console.log(`No poet found with slug: ${slug}`)
      // Try to find a fallback poet
      const fallbackPoet = fallbackPoets.find((p) => p.slug.current === slug)
      return fallbackPoet || null
    }

    return poet
  } catch (error) {
    console.error(`Error fetching poet with slug ${slug}, checking fallbacks:`, error)
    // Try to find a fallback poet
    const fallbackPoet = fallbackPoets.find((p) => p.slug.current === slug)
    return fallbackPoet || null
  }
}

// Fetch all poems with fallbacks
export async function getPoems() {
  try {
    const poems = await client.fetch(
      `*[_type == "poem"] {
        _id,
        title,
        slug,
        "poet": poet->name,
        "poetSlug": poet->slug.current,
        "collection": collection->title,
        coverImage,
        content,
        year,
        featured
      }`,
    )
    return poems
  } catch (error) {
    console.error("Error fetching poems, using fallback data:", error)
    return fallbackPoems
  }
}

// Fetch featured poems with fallbacks
export async function getFeaturedPoems() {
  try {
    const poems = await client.fetch(
      `*[_type == "poem" && featured == true] | order(featuredOrder asc) {
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
      }`,
    )
    return poems.length > 0 ? poems : fallbackPoems
  } catch (error) {
    console.error("Error fetching featured poems, using fallback data:", error)
    return fallbackPoems
  }
}

// Fetch a single poem by slug with fallbacks
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

// Add these functions at the end of the file

// Fetch all artists with fallbacks
export async function getArtists() {
  try {
    const artists = await client.fetch(
      `*[_type == "artist"] {
        _id,
        name,
        slug,
        image,
        bio,
        genres
      }`,
    )
    return artists
  } catch (error) {
    console.error("Error fetching artists:", error)
    return []
  }
}

// Fetch all songs with fallbacks
export async function getSongs() {
  try {
    const songs = await client.fetch(
      `*[_type == "song"] {
        _id,
        title,
        slug,
        "artist": artist->name,
        "artistSlug": artist->slug.current,
        "album": album->title,
        coverArt,
        duration,
        releaseDate
      }`,
    )
    return songs
  } catch (error) {
    console.error("Error fetching songs:", error)
    return []
  }
}

// Fetch a single artist by slug with fallbacks
export async function getArtist(slug: string) {
  if (!slug) {
    console.error("No slug provided to getArtist function")
    return null
  }

  try {
    const artist = await client.fetch(
      `*[_type == "artist" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        image,
        bio,
        genres,
        "songs": *[_type == "song" && references(^._id)] {
          _id,
          title,
          slug,
          coverArt,
          duration
        }
      }`,
      { slug },
    )

    if (!artist) {
      console.log(`No artist found with slug: ${slug}`)
      return null
    }

    return artist
  } catch (error) {
    console.error(`Error fetching artist with slug ${slug}:`, error)
    return null
  }
}
