import Link from "next/link"
import FeatherIcon from "./feather-icon"

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <FeatherIcon className="text-purple-400" size={20} />
              <h3 className="text-lg md:text-xl font-serif font-semibold">VersesVibez</h3>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              A platform dedicated to celebrating the beauty and power of poetry from around the world.
            </p>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Explore</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/poems" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Poems
                </Link>
              </li>
              <li>
                <Link href="/poets" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Poets
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/themes" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Themes
                </Link>
              </li>
              <li>
                <Link
                  href="/image-guide"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                >
                  Image Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-6 md:h-6"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-6 md:h-6"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-6 md:h-6"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm">
          <div className="flex justify-center items-center mb-2">
            <FeatherIcon className="text-purple-400 mx-2" size={16} />
          </div>
          <p>&copy; {new Date().getFullYear()} VersesVibez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
