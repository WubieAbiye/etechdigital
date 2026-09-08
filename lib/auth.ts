import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const cookieName = "etech-admin-session"
const configuredSecret = process.env.AUTH_SECRET
if (process.env.NODE_ENV === "production" && !configuredSecret) {
  throw new Error("AUTH_SECRET must be configured in production")
}
const secret = new TextEncoder().encode(configuredSecret || "development-only-secret")

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)

  const store = await cookies()
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.role === "admin"
  } catch {
    return false
  }
}

export async function clearAdminSession() {
  ;(await cookies()).delete(cookieName)
}
