import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RegisterForm } from "@/components/auth/register-form"

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

          <RegisterForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
