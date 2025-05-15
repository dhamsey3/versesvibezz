import type React from "react"
import "./poem-page.css"

export default function PoemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
