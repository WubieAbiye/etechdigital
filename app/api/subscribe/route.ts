import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const input = await request.json()
  if (!input.email) return NextResponse.json({ error: "Email is required" }, { status: 400 })
  await db.subscriber.upsert({ where: { email: input.email }, update: { name: input.name || undefined }, create: { email: input.email, name: input.name || null } })
  return NextResponse.json({ ok: true }, { status: 201 })
}