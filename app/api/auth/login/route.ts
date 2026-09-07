import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { createAdminSession } from "@/lib/auth"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const admin = await db.adminUser.findUnique({ where: { email } })
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  await createAdminSession(admin.email)
  return NextResponse.json({ ok: true })
}