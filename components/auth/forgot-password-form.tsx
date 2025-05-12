"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MailIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await resetPassword(email)
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      setIsSubmitted(true)
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email.",
      })
    } catch (error) {
      console.error("Reset password error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your email to receive a password reset link</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            Check your email for the reset link.
          </div>
          <Button className="w-full" onClick={() => setIsSubmitted(false)}>
            Send Again
          </Button>
        </div>
      )}

      <div className="text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
