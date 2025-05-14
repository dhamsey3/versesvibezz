import { client } from "./sanity"

// Fetch all poets
export async function getPoets() {
  return client.fetch(
    `*[_type == "poet"] {
      _id,
      name,
      slug,
      "image": image.asset->url,
      biography,
      birthDate,
      deathDate,
      styles
    }`,
  )
}

// Fetch a single poet by slug
export async function getPoet(slug: string) {
  return client.fetch(
    `*[_type == "poet" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      "image": image.asset->url,
      biography,
      birthDate,
      deathDate,
      styles,
      "poems": *[_type == "poem" && references(^._id)] {
        _id,
        title,
        slug,
        "coverImage": coverImage.asset->url,
        year,
        featured
      }
    }`,
    { slug },
  )
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
    `*[_type == "poem" && featured == true] {
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

// Fetch a single poem by slug
export async function getPoem(slug: string) {
  try {
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
        "coverImage": coverImage.asset->url,
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

    console.log("Fetched poem data:", JSON.stringify(poem, null, 2))
    return poem
  } catch (error) {
    console.error("Error fetching poem:", error)
    return null
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
