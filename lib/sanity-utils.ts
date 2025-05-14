import { client } from "./sanity"

// Fetch all poets with better error handling
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
        styles
      }`,
    )
    console.log(`Successfully fetched ${poets.length} poets`)
    return poets
  } catch (error) {
    console.error("Error fetching poets:", error)
    throw new Error(`Failed to fetch poets: ${error instanceof Error ? error.message : String(error)}`)
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
      return null
    }

    console.log("Fetched poet data:", JSON.stringify(poet, null, 2))
    return poet
  } catch (error) {
    console.error(`Error fetching poet with slug ${slug}:`, error)
    throw new Error(`Failed to fetch poet: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Fetch all poems
export async function getPoems() {
  return client.fetch(
    `*[_type == "poem"] {
      _id,
      title,
      slug,
      "poet": poet->name,
      "poetSlug": poet->slug.current,
      "collection": collection->title,
      "coverImage": coverImage.asset->url,
      year,
      featured
    }`,
  )
}

// Fetch featured poems
export async function getFeaturedPoems() {
  return client.fetch(
    `*[_type == "poem" && featured == true] | order(featuredOrder asc) {
      _id,
      title,
      slug,
      "poet": poet->name,
      "poetSlug": poet->slug.current,
      "collection": collection->title,
      "coverImage": coverImage.asset->url,
      featuredExcerpt,
      year,
      featured
    }`,
  )
}

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
      return null
    }

    console.log("Fetched poem data:", JSON.stringify(poem, null, 2))
    return poem
  } catch (error) {
    console.error(`Error fetching poem with slug ${slug}:`, error)
    throw new Error(`Failed to fetch poem: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Fetch all collections
export async function getCollections() {
  return client.fetch(
    `*[_type == "collection"] {
      _id,
      title,
      slug,
      "poet": poet->name,
      "poetSlug": poet->slug.current,
      "coverImage": coverImage.asset->url,
      description,
      publicationYear,
      publisher,
      "poemCount": count(*[_type == "poem" && references(^._id)])
    }`,
  )
}

// Fetch a single collection by slug
export async function getCollection(slug: string) {
  return client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "poet": poet->{
        name,
        slug
      },
      "coverImage": coverImage.asset->url,
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
}

// Fetch all themes
export async function getThemes() {
  return client.fetch(
    `*[_type == "theme"] {
      _id,
      name,
      slug,
      description
    }`,
  )
}

// Fetch a single theme by slug
export async function getTheme(slug: string) {
  return client.fetch(
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
}

// Fetch all artists
export async function getArtists() {
  return client.fetch(
    `*[_type == "artist"] {
      _id,
      name,
      slug,
      "image": image.asset->url,
      bio,
      genres
    }`,
  )
}

// Fetch a single artist by slug
export async function getArtist(slug: string) {
  return client.fetch(
    `*[_type == "artist" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      "image": image.asset->url,
      bio,
      genres,
      "songs": *[_type == "song" && references(^._id)] {
        _id,
        title,
        slug,
        "coverArt": coverArt.asset->url,
        duration
      }
    }`,
    { slug },
  )
}

// Fetch all songs
export async function getSongs() {
  return client.fetch(
    `*[_type == "song"] {
      _id,
      title,
      slug,
      "artist": artist->name,
      "artistSlug": artist->slug.current,
      "album": album->title,
      "coverArt": coverArt.asset->url,
      duration
    }`,
  )
}
