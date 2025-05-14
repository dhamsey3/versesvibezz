import Link from "next/link"

export function NavLinks() {
  return (
    <nav className="flex items-center space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Home
      </Link>
      <Link href="/artists" className="text-sm font-medium transition-colors hover:text-primary">
        Artists
      </Link>
      <Link href="/songs" className="text-sm font-medium transition-colors hover:text-primary">
        Songs
      </Link>
      <Link href="/playlists" className="text-sm font-medium transition-colors hover:text-primary">
        Playlists
      </Link>
      <Link href="/studio" className="text-sm font-medium transition-colors hover:text-primary">
        Studio
      </Link>
    </nav>
  )
}
