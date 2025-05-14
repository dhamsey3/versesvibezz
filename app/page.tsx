import Link from "next/link"

export default async function Home() {
  // Fetch data in parallel
  // const [poems, poets, collections] = await Promise.all([getFeaturedPoems(), getPoets(), getCollections()])

  // Limit the number of items to display
  // const featuredPoems = poems.slice(0, 6)
  // const featuredPoets = poets.slice(0, 4)
  // const featuredCollections = collections.slice(0, 3)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Welcome to VersesVibez</h1>
      <p className="text-xl mb-8">Your poetry platform is being set up.</p>

      <div className="flex gap-4">
        <Link href="/studio" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Sanity Studio
        </Link>

        <Link href="/test" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Test Page
        </Link>
      </div>
    </main>
  )
}
