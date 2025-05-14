import Link from "next/link"

export default function SiteHeader() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            VersesVibez
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/poets" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Poets
            </Link>
            <Link href="/poems" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Poems
            </Link>
            <Link href="/collections" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Collections
            </Link>
            <Link href="/themes" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Themes
            </Link>
            <Link href="/studio" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Studio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
