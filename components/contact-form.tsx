"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { submitContactForm } from "@/lib/actions"

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const result = await submitContactForm(formData)

      if (result.success) {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        toast({
          title: "Message sent!",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium leading-none">
          Name
        </label>
        <Input id="name" name="name" placeholder="Your name" value={formState.name} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium leading-none">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm font-medium leading-none">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="What's this about?"
          value={formState.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium leading-none">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message"
          className="min-h-[150px]"
          value={formState.message}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
