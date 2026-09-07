import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const input = await request.json()
  if (!input.name || !input.email || !input.subject || !input.message) return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  const message = await db.contactMessage.create({ data: { name: input.name, email: input.email, subject: input.subject, message: input.message } })
  return NextResponse.json({ id: message.id }, { status: 201 })
}