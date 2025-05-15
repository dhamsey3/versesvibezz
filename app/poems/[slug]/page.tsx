import { getPoem } from "@/lib/sanity-utils-fixed"
import { notFound } from "next/navigation"
import SimplePoemDisplay from "@/components/simple-poem-display"

export default async function PoemPage({ params }: { params: { slug: string } }) {
  try {
    const poem = await getPoem(params.slug)

    if (!poem) {
      notFound()
    }

    return (
      <div className="container mx-auto py-8 px-4">
        <SimplePoemDisplay poem={poem} />
      </div>
    )
  } catch (error) {
    console.error(`Error in PoemPage for slug ${params.slug}:`, error)
    // Return a simple error UI
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Error Loading Poem</h1>
          <p className="text-center mb-6">
            We encountered an error while trying to load this poem. Please try again later.
          </p>
          <div className="text-center">
            <a href="/poems" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Browse All Poems
            </a>
          </div>
        </div>
      </div>
    )
  }
}
