"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, FileText, Link2, LogOut, PencilLine, Plus, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type ContentItem = { id: string; title: string; slug: string; type: string; status: string; category: { name: string }; publishedAt: string | null }

const initialForm = { title: "", slug: "", excerpt: "", body: "", category: "Tutorials", type: "BLOG", author: "E Tech Team", readTime: "5 min read", image: "/placeholder.svg", externalUrl: "", tags: "", status: "PUBLISHED" }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [form, setForm] = useState(initialForm)
  const [posts, setPosts] = useState<ContentItem[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadDashboard() {
    const session = await fetch("/api/auth/session", { cache: "no-store" })
    const sessionResult = await session.json()
    setAuthenticated(sessionResult.authenticated)
    if (sessionResult.authenticated) {
      const response = await fetch("/api/content", { cache: "no-store" })
      if (response.ok) setPosts(await response.json())
    }
  }

  useEffect(() => { void loadDashboard() }, [])

  async function login(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) })
    setLoading(false)
    if (response.ok) { setAuthenticated(true); setMessage("Welcome back."); void loadDashboard() }
    else setMessage("Invalid email or password.")
  }

  async function createContent(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const response = await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    const result = await response.json()
    setLoading(false)
    setMessage(response.ok ? `${form.status === "DRAFT" ? "Saved" : "Published"} ${result.title}.` : result.error || "Could not save content.")
    if (response.ok) { setForm(initialForm); void loadDashboard() }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setAuthenticated(false)
    setMessage("You have been signed out.")
  }

  if (authenticated === null) return <main className="min-h-screen bg-background p-8" />
  if (!authenticated) return <main className="min-h-screen bg-[#102a2b] px-4 py-16 text-white"><div className="mx-auto max-w-md"><div className="mb-10 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e2b66d] text-[#102a2b]"><Sparkles className="h-5 w-5" /></div><span className="font-semibold tracking-wide">E TECH / STUDIO</span></div><h1 className="mb-2 text-4xl font-semibold tracking-tight">Your publishing desk.</h1><p className="mb-8 text-white/65">Sign in to create articles, tutorials, and useful learning links.</p><form onSubmit={login} className="space-y-5 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur"><div><Label className="text-white/80" htmlFor="email">Email</Label><Input className="mt-2 border-white/15 bg-white/10 text-white" id="email" type="email" required value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} /></div><div><Label className="text-white/80" htmlFor="password">Password</Label><Input className="mt-2 border-white/15 bg-white/10 text-white" id="password" type="password" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></div><Button disabled={loading} className="w-full bg-[#e2b66d] text-[#102a2b] hover:bg-[#f0ca85]">{loading ? "Signing in..." : "Enter studio"}</Button></form>{message && <p className="mt-4 text-sm text-[#e2b66d]">{message}</p>}</div></main>

  return <main className="min-h-screen bg-[#f5f3ee] text-[#173536]"><header className="border-b border-[#173536]/10 bg-[#102a2b] text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2b66d] text-[#102a2b]"><Sparkles className="h-4 w-4" /></div><div><p className="text-sm font-semibold tracking-[0.18em]">E TECH</p><p className="text-xs text-white/55">Content studio</p></div></div><div className="flex items-center gap-3"><Link href="/" className="hidden text-sm text-white/65 hover:text-white sm:block">View site <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link><Button variant="ghost" size="sm" onClick={logout} className="text-white hover:bg-white/10 hover:text-white"><LogOut className="mr-2 h-4 w-4" />Sign out</Button></div></div></header><div className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div className="mb-10"><p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#bb7d3a]">Workspace</p><h1 className="text-4xl font-semibold tracking-tight">Publish something useful.</h1><p className="mt-2 max-w-xl text-[#173536]/60">Turn your ideas into practical resources for the community.</p></div><div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]"><section className="rounded-2xl border border-[#173536]/10 bg-white p-6 shadow-sm lg:p-8"><div className="mb-7 flex items-center justify-between"><div><h2 className="text-xl font-semibold">New content</h2><p className="mt-1 text-sm text-[#173536]/55">Write an article or share a tutorial resource.</p></div><PencilLine className="h-5 w-5 text-[#bb7d3a]" /></div><form onSubmit={createContent} className="space-y-5"><div><Label htmlFor="title">Title</Label><Input className="mt-2" id="title" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></div><div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="type">Content type</Label><select id="type" className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option value="BLOG">Blog article</option><option value="TUTORIAL">Tutorial</option><option value="NEWS">News</option></select></div><div><Label htmlFor="category">Category</Label><Input className="mt-2" id="category" required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} /></div></div><div><Label htmlFor="excerpt">Short description</Label><Textarea className="mt-2" id="excerpt" required rows={3} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} /></div><div><Label htmlFor="body">Content</Label><Textarea className="mt-2" id="body" required rows={9} value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} /></div><div><Label htmlFor="externalUrl">Tutorial or social media link <span className="font-normal text-muted-foreground">(optional)</span></Label><Input className="mt-2" id="externalUrl" type="url" placeholder="https://..." value={form.externalUrl} onChange={(event) => setForm({ ...form, externalUrl: event.target.value })} /></div><div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="tags">Tags</Label><Input className="mt-2" id="tags" placeholder="design, beginner" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} /></div><div><Label htmlFor="status">Save as</Label><select id="status" className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option></select></div></div><div className="flex items-center justify-between gap-4 pt-2"><p className="text-sm text-[#173536]/55">{message}</p><Button disabled={loading} type="submit" className="bg-[#173536] hover:bg-[#285354]">{form.status === "DRAFT" ? <><FileText className="mr-2 h-4 w-4" />Save draft</> : <><Send className="mr-2 h-4 w-4" />Publish</>}</Button></div></form></section><aside className="space-y-5"><div className="rounded-2xl bg-[#e2b66d] p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-medium text-[#173536]/65">Published library</p><p className="mt-1 text-4xl font-semibold">{posts.length}</p></div><FileText className="h-7 w-7 text-[#173536]/60" /></div><p className="text-sm text-[#173536]/65">Articles and tutorials currently visible on the site.</p></div><div className="rounded-2xl border border-[#173536]/10 bg-white p-6"><div className="mb-5 flex items-center gap-2"><Link2 className="h-4 w-4 text-[#bb7d3a]" /><h2 className="font-semibold">Recent posts</h2></div><div className="space-y-4">{posts.slice(0, 6).map((post) => <div key={post.id} className="border-b border-[#173536]/10 pb-3 last:border-0 last:pb-0"><p className="line-clamp-2 text-sm font-medium">{post.title}</p><p className="mt-1 text-xs text-[#173536]/50">{post.type} · {post.category.name}</p></div>)}{posts.length === 0 && <p className="text-sm text-[#173536]/55">Your published posts will appear here.</p>}</div></div><div className="rounded-2xl border border-dashed border-[#173536]/20 p-5 text-sm text-[#173536]/60"><Plus className="mb-3 h-5 w-5 text-[#bb7d3a]" /><p>Tip: paste a YouTube, LinkedIn, Instagram, or other resource URL above to give learners a direct next step.</p></div></aside></div></div></main>
}
