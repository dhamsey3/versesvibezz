import Link from "next/link"

export default function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-700">
                <path d="M7 20h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M10 20v-4a2 2 0 1 1 4 0v4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M8 15h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-2xl font-serif font-bold text-gray-900">VersesVibez</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/poets" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">
              Poets
            </Link>
            <Link href="/poems" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">
              Poems
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
            >
              Collections
            </Link>
            <Link href="/themes" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">
              Themes
            </Link>
            {/* Studio link removed */}
          </nav>
        </div>
      </div>
    </header>
  )
}
