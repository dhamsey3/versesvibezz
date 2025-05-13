"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

export function UserProfile() {
  const { user, signOut, isLoading } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut()
    setIsSigningOut(false)
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    )
  }

  if (!user) {
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

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm mr-2">{user.username}</span>
      <Button variant="outline" size="sm" onClick={() => router.push("/profile")}>
        <UserIcon className="h-4 w-4 mr-2" />
        Profile
      </Button>
      <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isSigningOut}>
        <LogOut className="h-4 w-4 mr-2" />
        {isSigningOut ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  )
}
