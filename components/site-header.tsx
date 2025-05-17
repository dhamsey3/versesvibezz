"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              {/* Enhanced Feather/Quill Icon */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                <path
                  d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8L2 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 15H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-serif font-bold text-gray-900">VersesVibez</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/poets" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              Poets
            </Link>
            <Link href="/poems" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              Poems
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Collections
            </Link>
            <Link href="/themes" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              Themes
            </Link>
            <Link
              href="/sanity-debug"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/poets"
                className="text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                onClick={toggleMenu}
              >
                Poets
              </Link>
              <Link
                href="/poems"
                className="text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                onClick={toggleMenu}
              >
                Poems
              </Link>
              <Link
                href="/collections"
                className="text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                onClick={toggleMenu}
              >
                Collections
              </Link>
              <Link
                href="/themes"
                className="text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                onClick={toggleMenu}
              >
                Themes
              </Link>
              <Link
                href="/sanity-debug"
                className="text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
