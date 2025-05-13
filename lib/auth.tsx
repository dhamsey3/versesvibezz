"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export type User = {
  id: string
  email: string
  username: string
  avatar_url?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (email: string, password: string, username: string) => Promise<{ error: any | null; data: any | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        const { data } = await supabase
          .from("users")
          .select("id, email, username, avatar_url")
          .eq("id", session.user.id)
          .single()

        setUser(data || null)
      }

      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Fetch user data from the users table
        supabase
          .from("users")
          .select("id, email, username, avatar_url")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setUser(data || null)
          })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      router.refresh()
    }
    return { error }
  }

  const signUp = async (email: string, password: string, username: string) => {
    // First check if username is already taken
    const { data: existingUser } = await supabase.from("users").select("username").eq("username", username).single()

    if (existingUser) {
      return { error: { message: "Username is already taken" }, data: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })

    if (!error && data.user) {
      // Create a record in the users table
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("Error creating user profile:", insertError)
        return { error: insertError, data: null }
      }

      router.refresh()
    }

    return { error, data }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
