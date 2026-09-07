"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const [message, setMessage] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) })
    setMessage(response.ok ? "You are subscribed." : "Enter a valid email address.")
    if (response.ok) event.currentTarget.reset()
  }
  return <form onSubmit={submit} className="space-y-3"><Input name="name" placeholder="Your name" /><Input name="email" required type="email" placeholder="Your email" /><Button type="submit" className="w-full">Subscribe</Button>{message && <p className="text-sm opacity-90" aria-live="polite">{message}</p>}</form>
}
