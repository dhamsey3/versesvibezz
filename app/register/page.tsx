import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-lg py-12">
          <div className="mb-8">
            <Link href="/" className="text-primary hover:underline">
              &larr; Back to Home
            </Link>
          </div>

          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-gray-500 dark:text-gray-400">Registration functionality is temporarily unavailable.</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
