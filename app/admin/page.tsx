import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Content Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/poems" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Poem Management</h2>
          <p className="text-gray-600">Create, view, and manage poems</p>
        </Link>

        <Link href="/admin/poets" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Poet Reference</h2>
          <p className="text-gray-600">View poet IDs for reference</p>
        </Link>

        <Link href="/studio" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Sanity Studio</h2>
          <p className="text-gray-600">Full content management interface</p>
        </Link>
      </div>
    </div>
  )
}
