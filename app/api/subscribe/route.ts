import { NextResponse } from "next/server"
import { saveSubscriber } from "@/lib/db"

export async function POST(request: Request) {
  const input = await request.json()
  if (!input.email) return NextResponse.json({ error: "Email is required" }, { status: 400 })
  saveSubscriber({ email: input.email, name: input.name || null })
  return NextResponse.json({ ok: true }, { status: 201 })
}