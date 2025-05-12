import Link from "next/link"
import { BookOpen } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">VersesVibez</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} VersesVibez. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Explore</h3>
            <nav className="grid gap-2 text-sm text-muted-foreground">
              <Link href="/poems" className="hover:underline">
                Poems
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Follow</h3>
            <nav className="grid gap-2 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">
                Twitter
              </Link>
              <Link href="#" className="hover:underline">
                Instagram
              </Link>
              <Link href="#" className="hover:underline">
                Facebook
              </Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="grid gap-2 text-sm text-muted-foreground">
              <Link href="#" className="hover:underline">
                Privacy
              </Link>
              <Link href="#" className="hover:underline">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
