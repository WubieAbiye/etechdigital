"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Bell, BookOpen, FileText, Info, Lightbulb, Link2, LogOut, PencilLine, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ContentType = "BLOG" | "ANNOUNCEMENT" | "LINK" | "INFO" | "TIP" | "DV_LOTTERY"
type ContentStatus = "DRAFT" | "PUBLISHED"
type ContentItem = { id: string; title: string; type: ContentType; status: ContentStatus; category: { name: string }; publishedAt: string | null; createdAt: string }
type ContentForm = { title: string; slug: string; excerpt: string; body: string; category: string; type: ContentType; author: string; readTime: string; image: string; externalUrl: string; tags: string; status: ContentStatus }

const contentTypes: { value: ContentType; label: string; description: string; icon: typeof BookOpen }[] = [
  { value: "BLOG", label: "Blog post", description: "Long-form article or tutorial.", icon: BookOpen },
  { value: "ANNOUNCEMENT", label: "Announcement", description: "News, updates, and notices.", icon: Bell },
  { value: "LINK", label: "Useful link", description: "An app, tool, or social profile.", icon: Link2 },
  { value: "INFO", label: "General info", description: "Helpful educational information.", icon: Info },
  { value: "TIP", label: "Tech tip", description: "A short, actionable technology tip.", icon: Lightbulb },
  { value: "DV_LOTTERY", label: "DV lottery", description: "Lottery updates and guidance.", icon: Star },
]

const emptyForm: ContentForm = { title: "", slug: "", excerpt: "", body: "", category: "", type: "BLOG", author: "", readTime: "", image: "", externalUrl: "", tags: "", status: "PUBLISHED" }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [form, setForm] = useState<ContentForm>(emptyForm)
  const [items, setItems] = useState<ContentItem[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadDashboard() {
    const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" })
    const session = await sessionResponse.json()
    setAuthenticated(session.authenticated)
    if (!session.authenticated) return
    const contentResponse = await fetch("/api/content?admin=true", { cache: "no-store" })
    if (contentResponse.ok) setItems(await contentResponse.json())
  }

  useEffect(() => { void loadDashboard() }, [])

  async function login(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) })
    setLoading(false)
    if (!response.ok) { setMessage("Invalid email or password."); return }
    setMessage("Welcome back.")
    await loadDashboard()
  }

  async function createContent(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const response = await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    const result = await response.json()
    setLoading(false)
    setMessage(response.ok ? `${form.status === "DRAFT" ? "Saved" : "Published"} ${result.title}.` : result.error || "Could not save content.")
    if (response.ok) { setForm(emptyForm); await loadDashboard() }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setAuthenticated(false)
    setItems([])
    setMessage("You have been signed out.")
  }

  const updateField = <K extends keyof ContentForm>(field: K, value: ContentForm[K]) => setForm((current) => ({ ...current, [field]: value }))

  if (authenticated === null) return <main className="min-h-screen bg-background" />

  if (!authenticated) {
    return <main className="min-h-screen bg-[#102a2b] px-4 py-16 text-white"><div className="mx-auto max-w-md"><div className="mb-10 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e2b66d] text-[#102a2b]"><Sparkles className="h-5 w-5" /></div><span className="font-semibold tracking-wide">E TECH / STUDIO</span></div><h1 className="mb-2 text-4xl font-semibold tracking-tight">Your publishing desk.</h1><p className="mb-8 text-white/65">Sign in to manage blogs, announcements, links, DV updates, and technology tips.</p><form onSubmit={login} className="space-y-5 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur"><div><Label className="text-white/80" htmlFor="email">Email</Label><Input className="mt-2 border-white/15 bg-white/10 text-white" id="email" type="email" required value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} /></div><div><Label className="text-white/80" htmlFor="password">Password</Label><Input className="mt-2 border-white/15 bg-white/10 text-white" id="password" type="password" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></div><Button disabled={loading} className="w-full bg-[#e2b66d] text-[#102a2b] hover:bg-[#f0ca85]">{loading ? "Signing in..." : "Enter studio"}</Button></form>{message && <p className="mt-4 text-sm text-[#e2b66d]">{message}</p>}</div></main>
  }

  const selectedType = contentTypes.find((item) => item.value === form.type) ?? contentTypes[0]
  const publishedCount = items.filter((item) => item.status === "PUBLISHED").length
  const draftCount = items.filter((item) => item.status === "DRAFT").length

  return <main className="min-h-screen bg-[#f5f3ee] text-[#173536]"><header className="border-b border-[#173536]/10 bg-[#102a2b] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2b66d] text-[#102a2b]"><Sparkles className="h-4 w-4" /></div><div><p className="text-sm font-semibold tracking-[0.18em]">E TECH</p><p className="text-xs text-white/55">Content studio</p></div></div><div className="flex items-center gap-3"><Link href="/" className="hidden text-sm text-white/65 hover:text-white sm:block">View site <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link><Button variant="ghost" size="sm" onClick={logout} className="text-white hover:bg-white/10 hover:text-white"><LogOut className="mr-2 h-4 w-4" />Sign out</Button></div></div></header><div className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div className="mb-8"><p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#bb7d3a]">Dashboard</p><h1 className="text-4xl font-semibold tracking-tight">Manage your content.</h1><p className="mt-2 text-[#173536]/60">Create, save, and publish resources for your community.</p></div><div className="mb-8 grid gap-4 md:grid-cols-3">{[{ label: "Total entries", value: items.length }, { label: "Published", value: publishedCount }, { label: "Drafts", value: draftCount }].map((stat) => <div key={stat.label} className="rounded-2xl border border-[#173536]/10 bg-white p-5 shadow-sm"><p className="text-sm text-[#173536]/60">{stat.label}</p><p className="mt-3 text-3xl font-bold">{stat.value}</p></div>)}</div><div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr]"><section className="rounded-2xl border border-[#173536]/10 bg-white p-6 shadow-sm lg:p-8"><div className="mb-7 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Create new content</h2><p className="mt-1 text-sm text-[#173536]/55">Choose a format, then add the content you want stored in the database.</p></div><PencilLine className="h-5 w-5 text-[#bb7d3a]" /></div><div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{contentTypes.map((type) => { const Icon = type.icon; return <button key={type.value} type="button" onClick={() => updateField("type", type.value)} className={`rounded-xl border p-3 text-left transition ${form.type === type.value ? "border-[#bb7d3a] bg-[#bb7d3a]/5" : "border-[#173536]/10"}`}><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[#bb7d3a]" /><span className="text-sm font-medium">{type.label}</span></div><p className="mt-2 text-xs text-[#173536]/55">{type.description}</p></button> })}</div><form onSubmit={createContent} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><Label htmlFor="title">Title</Label><Input className="mt-2" id="title" required value={form.title} onChange={(event) => updateField("title", event.target.value)} /></div><div><Label htmlFor="category">Category</Label><Input className="mt-2" id="category" required value={form.category} onChange={(event) => updateField("category", event.target.value)} placeholder="Technology, News, Resources" /></div><div><Label htmlFor="slug">Slug</Label><Input className="mt-2" id="slug" value={form.slug} onChange={(event) => updateField("slug", event.target.value)} placeholder="Optional URL slug" /></div><div><Label htmlFor="author">Author</Label><Input className="mt-2" id="author" value={form.author} onChange={(event) => updateField("author", event.target.value)} /></div><div><Label htmlFor="readTime">Read time</Label><Input className="mt-2" id="readTime" value={form.readTime} onChange={(event) => updateField("readTime", event.target.value)} placeholder="5 min read" /></div><div><Label htmlFor="status">Status</Label><select id="status" value={form.status} onChange={(event) => updateField("status", event.target.value as ContentStatus)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option></select></div><div><Label htmlFor="tags">Tags</Label><Input className="mt-2" id="tags" value={form.tags} onChange={(event) => updateField("tags", event.target.value)} placeholder="technology, careers" /></div><div className="sm:col-span-2"><Label htmlFor="excerpt">Short summary</Label><Textarea className="mt-2" id="excerpt" rows={3} value={form.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} /></div><div className="sm:col-span-2"><Label htmlFor="body">Main content</Label><Textarea className="mt-2" id="body" rows={7} required={form.type !== "LINK"} value={form.body} onChange={(event) => updateField("body", event.target.value)} /></div>{form.type === "LINK" && <div className="sm:col-span-2"><Label htmlFor="externalUrl">External URL</Label><Input className="mt-2" id="externalUrl" type="url" required value={form.externalUrl} onChange={(event) => updateField("externalUrl", event.target.value)} placeholder="https://example.com" /></div>}</div><div className="rounded-xl bg-[#173536]/5 p-4"><p className="text-sm font-medium">{selectedType.label}</p><p className="mt-1 text-sm text-[#173536]/60">{selectedType.description}</p></div><div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => setForm(emptyForm)}>Clear</Button><Button type="submit" disabled={loading} className="bg-[#173536] text-white hover:bg-[#173536]/90">{loading ? "Saving..." : form.status === "DRAFT" ? "Save draft" : "Publish content"}</Button></div></form>{message && <p className="mt-4 text-sm text-[#bb7d3a]">{message}</p>}</section><aside className="rounded-2xl border border-[#173536]/10 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-semibold">Recent entries</h2><FileText className="h-5 w-5 text-[#bb7d3a]" /></div>{items.length === 0 ? <p className="rounded-xl border border-dashed border-[#173536]/20 p-6 text-center text-sm text-[#173536]/60">No content entries yet.</p> : <div className="space-y-3">{items.slice(0, 8).map((item) => <div key={item.id} className="rounded-xl border border-[#173536]/10 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm text-[#173536]/60">{item.category.name}</p></div><span className="text-xs uppercase tracking-wide text-[#bb7d3a]">{item.status}</span></div><p className="mt-3 text-xs text-[#173536]/55">{item.type.replace("_", " ")} · {new Date(item.createdAt).toLocaleDateString()}</p></div>)}</div>}</aside></div></div></main>
}
