import type React from "react"

export const metadata = {
  title: "Admin",
  description: "Admin Area",
  robots: "noindex, nofollow",
}

export default function HiddenStudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="same-origin" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Prevent search engines from indexing this page */}
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>{children}</body>
    </html>
  )
}
