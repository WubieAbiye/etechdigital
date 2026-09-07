import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Lightbulb, BookOpen, TrendingUp, Shield, Award } from "lucide-react"

const values = [
  {
    icon: BookOpen,
    title: "Quality Education",
    description: "We create well-researched, practical content that delivers real value to our readers.",
  },
  {
    icon: Shield,
    title: "Ethical Practices",
    description: "We maintain transparency in our monetization methods and only recommend products we trust.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "We build a supportive community of learners helping each other grow and succeed.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "We stay updated with the latest trends to provide you with current and relevant information.",
  },
]

const stats = [
  { value: "50+", label: "Articles Published" },
  { value: "10K+", label: "Monthly Readers" },
  { value: "5+", label: "Categories Covered" },
  { value: "100%", label: "Free Content" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                About E Tech Digital
              </h1>
              <p className="text-lg text-muted-foreground mb-4">ስለ ኢ ቴክ ዲጅታል</p>
              <p className="text-xl text-muted-foreground">
                Empowering individuals with digital skills, practical knowledge, and proven strategies for success in
                the modern digital world.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To educate and empower individuals—especially students, professionals, and aspiring
                    entrepreneurs—with practical digital skills and knowledge. We believe everyone deserves access to
                    quality educational content that can transform their lives and open new opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the leading educational resource for digital skills and online income strategies in
                    Ethiopia and beyond. We envision a community of empowered individuals who leverage technology to
                    create better futures for themselves and their families.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">What We Cover</h2>
              <p className="text-muted-foreground">
                Our content spans multiple topics designed to help you thrive in the digital age.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Tutorials & How-To Guides</h3>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step instructions on various digital tools, platforms, and techniques.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Technology Reviews & Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Honest reviews of software, apps, and gadgets to help you make informed decisions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Digital Skills & Online Income</h3>
                  <p className="text-sm text-muted-foreground">
                    Proven methods and strategies for earning money online ethically and sustainably.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Business & Entrepreneurship</h3>
                  <p className="text-sm text-muted-foreground">
                    Insights and advice for starting and growing your own business ventures.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Lifestyle & Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Content on personal development, productivity, and continuous learning.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Productivity Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Tools and techniques to help you work smarter and achieve more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do at E Tech Digital.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Who We Serve</h2>
              <p className="text-muted-foreground">Our content is designed for a diverse audience of learners.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Students",
                "Professionals",
                "Tech Learners",
                "Digital Entrepreneurs",
                "Online Income Seekers",
                "General Readers",
              ].map((audience) => (
                <div key={audience} className="px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
                  {audience}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Award className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and be the first to receive our latest tutorials, tips, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background"
              />
              <button className="px-6 py-3 rounded-lg font-medium bg-background text-foreground hover:bg-background/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
