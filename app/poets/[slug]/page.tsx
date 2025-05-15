import { getPoet } from "@/lib/sanity-utils"
import { notFound } from "next/navigation"
import SimplePoetDisplay from "@/components/simple-poet-display"

export default async function PoetPage({ params }: { params: { slug: string } }) {
  try {
    const poet = await getPoet(params.slug)

    if (!poet) {
      notFound()
    }

    return (
      <div className="container mx-auto py-8 px-4">
        <SimplePoetDisplay poet={poet} />
      </div>
    )
  } catch (error) {
    console.error(`Error in PoetPage for slug ${params.slug}:`, error)
    // Return a simple error UI
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Error Loading Poet</h1>
          <p className="text-center mb-6">
            We encountered an error while trying to load this poet. Please try again later.
          </p>
          <div className="text-center">
            <a href="/poets" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Browse All Poets
            </a>
          </div>
        </div>
      </div>
    )
  }
}
