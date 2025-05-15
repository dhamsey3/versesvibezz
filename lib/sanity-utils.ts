import { fetchSanityData } from "./sanity-client"
import { fallbackPoems, fallbackPoets } from "./fallback-data"

// Fetch all artists
export async function getArtists() {
  try {
    const artists = await fetchSanityData(
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

// Fetch a single artist by slug
export async function getArtist(slug: string) {
  if (!slug) {
    console.error("No slug provided to getArtist function")
    return null
  }

  try {
    const artist = await fetchSanityData(
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

    return artist
  } catch (error) {
    console.error(`Error fetching artist with slug ${slug}:`, error)
    return null
  }
}

// Fetch all songs
export async function getSongs() {
  try {
    const songs = await fetchSanityData(
      `*[_type == "song"] {
        _id,
        title,
        slug,
        "artist": artist->name,
        "artistSlug": artist->slug.current,
        "album": album->title,
        coverArt,
        duration
      }`,
    )
    return songs
  } catch (error) {
    console.error("Error fetching songs:", error)
    return []
  }
}

// Fetch all poets with better error handling and fallbacks
export async function getPoets() {
  try {
    console.log("Fetching all poets")
    const poets = await fetchSanityData(
      `*[_type == "poet"] {
        _id,
        name,
        slug,
        image,
        biography,
        birthDate,
        deathDate,
        styles
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
    const poet = await fetchSanityData(
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
    const poems = await fetchSanityData(
      `*[_type == "poem"] {
        _id,
        title,
        slug,
        "poet": poet->name,
        "poetSlug": poet->slug.current,
        "collection": collection->title,
        coverImage,
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
    const poems = await fetchSanityData(
      `*[_type == "poem" && featured == true] | order(featuredOrder asc) {
        _id,
        title,
        slug,
        "poet": poet->name,
        "poetSlug": poet->slug.current,
        "collection": collection->title,
        coverImage,
        featuredExcerpt,
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
    const poem = await fetchSanityData(
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

// Other functions with similar fallback patterns...
export async function getCollections() {
  try {
    return await fetchSanityData(
      `*[_type == "collection"] {
        _id,
        title,
        slug,
        "poet": poet->name,
        "poetSlug": poet->slug.current,
        coverImage,
        description,
        publicationYear,
        publisher,
        "poemCount": count(*[_type == "poem" && references(^._id)])
      }`,
    )
  } catch (error) {
    console.error("Error fetching collections:", error)
    return []
  }
}

export async function getCollection(slug: string) {
  try {
    return await fetchSanityData(
      `*[_type == "collection" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        "poet": poet->{
          name,
          slug
        },
        coverImage,
        description,
        publicationYear,
        publisher,
        "poems": *[_type == "poem" && references(^._id)] {
          _id,
          title,
          slug,
          year
        }
      }`,
      { slug },
    )
  } catch (error) {
    console.error(`Error fetching collection with slug ${slug}:`, error)
    return null
  }
}

export async function getThemes() {
  try {
    return await fetchSanityData(
      `*[_type == "theme"] {
        _id,
        name,
        slug,
        description
      }`,
    )
  } catch (error) {
    console.error("Error fetching themes:", error)
    return []
  }
}

export async function getTheme(slug: string) {
  try {
    return await fetchSanityData(
      `*[_type == "theme" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        description,
        "poems": *[_type == "poem" && references(^._id)] {
          _id,
          title,
          slug,
          "poet": poet->name,
          "poetSlug": poet->slug.current,
          year
        }
      }`,
      { slug },
    )
  } catch (error) {
    console.error(`Error fetching theme with slug ${slug}:`, error)
    return null
  }
}
