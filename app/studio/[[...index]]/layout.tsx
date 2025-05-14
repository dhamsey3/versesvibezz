import type React from "react"

export const metadata = {
  title: "Sanity Studio | VersesVibez",
  description: "Content management for VersesVibez",
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Allow Sanity Studio to run in an iframe */}
        <meta name="referrer" content="same-origin" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Prevent search engines from indexing */}
        <meta name="robots" content="noindex, nofollow" />
        {/* Add Content-Security-Policy to allow Sanity Studio to work properly */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' https: http: ws:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http:; connect-src 'self' https: http: ws:; img-src 'self' https: http: data: blob:; style-src 'self' 'unsafe-inline' https: http:; font-src 'self' https: http: data:;"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
