import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { findAdminByEmail } from "@/lib/db"
import { createAdminSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const input = await request.json()
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : ""
    const password = typeof input.password === "string" ? input.password : ""
    if (!email || !password) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

    const admin = findAdminByEmail(email)
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    await createAdminSession(admin.email)
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}