"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, Upload } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (user) {
      setUsername(user.username || "")
      setAvatarUrl(user.avatar_url || null)

      // Fetch additional profile info
      const fetchProfile = async () => {
        const { data, error } = await supabase.from("profiles").select("bio, website").eq("user_id", user.id).single()

        if (data) {
          setBio(data.bio || "")
          setWebsite(data.website || "")
        }
      }

      fetchProfile()
    }
  }, [user, supabase])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatar(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    try {
      // Update username in users table
      if (username !== user.username) {
        // Check if username is already taken
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("username", username)
          .neq("id", user.id)
          .single()

        if (existingUser) {
          toast({
            title: "Error",
            description: "Username is already taken",
            variant: "destructive",
          })
          return
        }

        const { error: usernameError } = await supabase
          .from("users")
          .update({
            username,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

        if (usernameError) throw usernameError
      }

      // Upsert profile data
      const { error: profileError } = await supabase.from("profiles").upsert({
        user_id: user.id,
        bio,
        website,
        updated_at: new Date().toISOString(),
      })

      if (profileError) throw profileError

      // Upload avatar if changed
      if (avatar) {
        const fileExt = avatar.name.split(".").pop()
        const filePath = `avatars/${user.id}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("user-content")
          .upload(filePath, avatar, { upsert: true })

        if (uploadError) throw uploadError

        // Get public URL for the avatar
        const { data: publicUrlData } = supabase.storage.from("user-content").getPublicUrl(filePath)

        if (publicUrlData) {
          const { error: avatarUpdateError } = await supabase
            .from("users")
            .update({
              avatar_url: publicUrlData.publicUrl,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id)

          if (avatarUpdateError) throw avatarUpdateError
        }
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="mb-6 text-muted-foreground">You need to be signed in to view your profile.</p>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-3xl py-12">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your Profile</h1>
            <p className="mt-2 text-muted-foreground">Manage your account settings and preferences.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                    alt={user.username}
                  />
                  <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="avatar" className="text-sm font-medium">
                    Profile Image
                  </Label>
                  <div className="relative">
                    <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("avatar")?.click()}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload New Image</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended: Square JPG or PNG, 1MB max.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">To change your email, please contact support.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
