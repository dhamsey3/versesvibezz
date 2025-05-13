"use client"

import type React from "react"

import { createClient } from "@supabase/supabase-js"
import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"

// Admin credentials - in a real app, these would be environment variables
const ADMIN_EMAIL = "admin@versesvibez.com"

// Create a singleton for client-side usage to prevent multiple instances
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

const createClientSupabaseClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  // These environment variables are available in the project
  const supabaseUrl = "https://igqagttxvzwodkybogpm.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlncWFndHR4dnp3b2RreWJvZ3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjg2NDIsImV4cCI6MjA2MjY0NDY0Mn0.x27SXysRTcn22T-adfnU0sfh48gWbRFgSvsqe6btZsE"

  clientSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

  return clientSupabaseClient
}

type AdminAuthContextType = {
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (data.session) {
          // Check if the logged in user is the admin
          const { user } = data.session
          setIsAdmin(user.email === ADMIN_EMAIL)
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        console.error("Error checking session:", error)
        setIsAdmin(false)
      }

      setIsLoading(false)
    }

    checkSession()

    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          setIsAdmin(session.user.email === ADMIN_EMAIL)
        } else {
          setIsAdmin(false)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up auth state change:", error)
      return () => {}
    }
  }, [supabase, router])

  const login = async (email: string, password: string) => {
    if (email !== ADMIN_EMAIL) {
      return { success: false, error: "Invalid admin credentials" }
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        return { success: false, error: error.message }
      }

      router.refresh()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Login failed" }
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AdminAuthContext.Provider value={{ isAdmin, isLoading, login, logout }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
