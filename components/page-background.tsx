import type React from "react"

interface PageBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function PageBackground({ children, className = "" }: PageBackgroundProps) {
  return (
    <div
      className={`min-h-screen bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url(/images/mountain-mist.png)`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  )
}
