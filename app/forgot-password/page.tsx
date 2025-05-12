import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-lg py-12">
          <div className="mb-8">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-1 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Button>
            </Link>
          </div>

          <ForgotPasswordForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
