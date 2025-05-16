// This is a completely standalone Sanity client that doesn't rely on any configuration
// It's used as a last resort when all other clients fail

// Function to fetch poem data directly from Sanity API
export async function fetchPoemDirectly(slug) {
  try {
    // Hardcoded Sanity configuration
    const projectId = "5npbo3eo"
    const dataset = "production"
    const apiVersion = "2023-05-03"

    // Construct the GROQ query
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

    // Construct the URL for the Sanity API
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query,
    )}&$slug="${encodeURIComponent(slug)}"`

    // Fetch the data
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Sanity API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return data.result
  } catch (error) {
    console.error("Error fetching poem directly:", error)
    return null
  }
}

// Function to fetch poet data directly from Sanity API
export async function fetchPoetDirectly(slug) {
  try {
    // Hardcoded Sanity configuration
    const projectId = "5npbo3eo"
    const dataset = "production"
    const apiVersion = "2023-05-03"

    // Construct the GROQ query
    const query = `*[_type == "poet" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      biography,
      birthDate,
      deathDate,
      styles
    }`

    // Construct the URL for the Sanity API
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query,
    )}&$slug="${encodeURIComponent(slug)}"`

    // Fetch the data
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Sanity API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return data.result
  } catch (error) {
    console.error("Error fetching poet directly:", error)
    return null
  }
}
