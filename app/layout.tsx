import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import HiddenAdminLink from "@/components/hidden-admin-link"
import { ThemeProvider } from "@/components/theme-provider"
import SanityErrorBoundary from "@/components/sanity-error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "VersesVibez - Poetry Platform",
  description: "Discover and explore poetry from around the world",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-grow">
              <SanityErrorBoundary>{children}</SanityErrorBoundary>
            </main>
            <SiteFooter />
            <HiddenAdminLink />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
