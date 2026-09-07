import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, DollarSign, Link, Shield } from "lucide-react"

export default function DisclosurePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Affiliate Disclosure</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Transparency about how we earn money and maintain our site.
          </p>

          {/* Important Notice */}
          <Card className="mb-8 border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h2 className="font-semibold text-foreground mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    E Tech Digital (ኢ ቴክ ዲጅታል) is a participant in various affiliate marketing programs.
                    This means we may earn commissions on purchases made through links on our website at no additional
                    cost to you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Affiliate Links?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Affiliate links are special tracking links that allow us to earn a small commission when you make a
                purchase through them. When you click on an affiliate link and make a purchase, the company pays us a
                referral fee. This does not affect the price you pay—you pay the same amount whether you use our link or
                go directly to the vendor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Monetization Methods</h2>
              <div className="grid sm:grid-cols-2 gap-4 not-prose my-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Display Advertising</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We use Google AdSense to display advertisements. We earn revenue from ad impressions and clicks.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Link className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Affiliate Marketing</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We recommend products and services and earn commissions on qualifying purchases.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Promise to You</h2>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted not-prose mb-4">
                <Shield className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="text-foreground font-medium mb-2">Honest Recommendations</p>
                  <p className="text-muted-foreground">
                    We only recommend products and services that we genuinely believe will benefit our readers. Our
                    primary goal is to provide valuable, honest content—not to make sales. If we do not believe in a
                    product, we will not recommend it, regardless of the commission.
                  </p>
                </div>
              </div>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>We personally research products before recommending them</li>
                <li>We disclose affiliate relationships in relevant articles</li>
                <li>We never let affiliate partnerships influence our content negatively</li>
                <li>We prioritize your interests over earning commissions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Affiliate Programs We Participate In</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may participate in various affiliate programs including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Web hosting and domain services</li>
                <li>Software and online tools</li>
                <li>Educational courses and e-books</li>
                <li>Digital products and services</li>
                <li>Technology and gadget retailers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Sponsored Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Occasionally, we may publish sponsored content or reviews. All sponsored posts will be clearly labeled
                as such. Sponsored content does not affect the independence of our editorial opinions—we maintain full
                control over what we write and recommend.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why We Use These Methods</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Running a website involves costs including hosting, domain registration, content creation, and research
                time. These monetization methods help us:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Keep our content free for all readers</li>
                <li>Continue creating high-quality educational content</li>
                <li>Maintain and improve the website</li>
                <li>Invest in better tools and resources for our readers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our affiliate relationships or monetization practices, please contact us
                at{" "}
                <a href="mailto:contact@etechdigital.com" className="text-primary hover:underline">
                  contact@etechdigital.com
                </a>
                . We are committed to transparency and are happy to address any concerns.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
