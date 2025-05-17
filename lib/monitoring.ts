export async function checkSanityStatus() {
  const start = Date.now()
  try {
    const response = await fetch(
      `https://5npbo3eo.api.sanity.io/v2023-05-03/data/query/production?query=*%5B_type%20%3D%3D%20%22poet%22%5D%5B0...1%5D`,
      { method: "GET", cache: "no-cache" },
    )
    const responseTime = Date.now() - start

    if (response.ok) {
      // Log successful connection (could send to monitoring service)
      console.log(`Sanity connected in ${responseTime}ms`)
      return { ok: true, responseTime }
    } else {
      console.error(`Sanity error: ${response.status}`)
      return { ok: false, error: `Status ${response.status}` }
    }
  } catch (error) {
    console.error("Sanity connection failed:", error)
    return { ok: false, error: String(error) }
  }
}
