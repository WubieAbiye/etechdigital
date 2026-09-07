import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Mail, Bell, Gift, Zap } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"

const benefits = [
  {
    icon: Bell,
    title: "Latest Updates",
    description: "Be the first to know about new tutorials, tips, and guides.",
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Access subscriber-only resources and bonus materials.",
  },
  {
    icon: Zap,
    title: "Weekly Digest",
    description: "Curated content delivered straight to your inbox.",
  },
]

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Newsletter</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
                Stay Updated with E Tech Digital
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join our community of learners and receive the latest tutorials, tips, and resources directly in your
                inbox. No spam, unsubscribe anytime.
              </p>

              <Card>
                <CardContent className="p-6">
                  <NewsletterForm />
                  <p className="mt-4 text-xs text-center text-muted-foreground">By subscribing, you agree to our Privacy Policy. We respect your inbox.</p>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">What You Will Get</h2>

              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Topics We Cover</h3>
                  <ul className="space-y-2">
                    {[
                      "Web Development & Programming",
                      "Digital Marketing & SEO",
                      "Freelancing & Remote Work",
                      "Online Income Strategies",
                      "Productivity & Tools",
                    ].map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
