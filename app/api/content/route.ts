import { NextResponse } from "next/server"
import { createContent, getAllContent, getPublishedContent } from "@/lib/db"
import { isAdmin } from "@/lib/auth"

const allowedTypes = ["BLOG", "NEWS", "TUTORIAL", "ANNOUNCEMENT", "LINK", "INFO", "TIP", "DV_LOTTERY"] as const

export async function GET(request: Request) {
  const url = new URL(request.url)
  const rawType = url.searchParams.get("type")
  const type = rawType && allowedTypes.includes(rawType as (typeof allowedTypes)[number]) ? (rawType as (typeof allowedTypes)[number]) : undefined
  const adminRequest = url.searchParams.get("admin") === "true"
  const admin = adminRequest && (await isAdmin())

  const posts = admin ? getAllContent() : getPublishedContent(type)

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const input = await request.json()
  const type = allowedTypes.includes(input.type) ? input.type : "BLOG"
  const status = input.status === "DRAFT" ? "DRAFT" : "PUBLISHED"

  if (typeof input.title !== "string" || !input.title.trim() || typeof input.category !== "string" || !input.category.trim()) {
    return NextResponse.json({ error: "Title and category are required" }, { status: 400 })
  }

  const excerpt = input.excerpt || input.body || ""
  const body = input.body || ""

  const post = createContent({ ...input, type, status, excerpt, body })

  return NextResponse.json(post, { status: 201 })
}