"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [message, setMessage] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) })
    setMessage(response.ok ? "Thanks. Your message has been sent." : "Please complete all fields and try again.")
    if (response.ok) event.currentTarget.reset()
  }
  return <form onSubmit={submit} className="space-y-6"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="name">Your Name</Label><Input id="name" name="name" required placeholder="John Doe" /></div><div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" name="email" required type="email" placeholder="john@example.com" /></div></div><div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" required placeholder="How can we help?" /></div><div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required placeholder="Write your message here..." rows={6} /></div><Button type="submit">Send Message</Button>{message && <p className="text-sm text-muted-foreground" aria-live="polite">{message}</p>}</form>
}
