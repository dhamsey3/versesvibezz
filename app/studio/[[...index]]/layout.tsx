import type React from "react"

export const metadata = {
  title: "Sanity Studio",
  description: "Content management for VersesVibez",
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
      </head>
      <body>{children}</body>
    </html>
  )
}
