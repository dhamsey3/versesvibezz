"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

// Temporarily remove auth dependency
export function UserProfile() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  // Simplified version without auth
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" onClick={() => router.push("/login")}>
        Sign in
      </Button>
      <Button variant="outline" size="sm" onClick={() => router.push("/register")}>
        Sign up
      </Button>
    </div>
  )
}
