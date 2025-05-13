import Link from "next/link"
import { BookOpen } from "lucide-react"

export function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <BookOpen className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">VersesVibez</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/poems" className="font-medium transition-colors hover:text-primary">
            Poems
          </Link>
          <Link href="/about" className="font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
