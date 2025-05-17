import type React from "react"

export const metadata = {
  title: "Simple Studio | VersesVibez",
  description: "Simplified Sanity Studio for troubleshooting",
}

export default function SimpleStudioLayout({
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
      </head>
      <body>{children}</body>
    </html>
  )
}
