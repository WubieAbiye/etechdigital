import { NextResponse } from "next/server"
import { createContactMessage } from "@/lib/db"

export async function POST(request: Request) {
  const input = await request.json()
  if (!input.name || !input.email || !input.subject || !input.message) return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  const message = createContactMessage({ name: input.name, email: input.email, subject: input.subject, message: input.message })
  return NextResponse.json({ id: message.id }, { status: 201 })
}