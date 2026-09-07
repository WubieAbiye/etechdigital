import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

function ServiceWorkerRegistration() {
  return <script dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));` }} />
}

const _inter = Inter({ subsets: ["latin"] })
const _merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E Tech Digital - ኢ ቴክ ዲጅታል",
  description:
    "Learn digital skills, technology tutorials, online income methods, and business strategies. Your trusted source for educational content.",
  keywords: ["digital skills", "technology", "tutorials", "online income", "business", "education", "Ethiopia"],
  authors: [{ name: "E Tech Digital" }],
  openGraph: {
    title: "E Tech Digital",
    description: "Learn digital skills and grow your online presence",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  generator: "Wubie A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
