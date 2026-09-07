import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 9, 2024</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using E Tech Digital (ኢ ቴክ ዲጅታል), you agree to be bound by these Terms and
                Conditions. If you disagree with any part of these terms, please do not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, and articles,
                is the property of E Tech Digital and is protected by copyright laws. You may not reproduce,
                distribute, or republish any content without our written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">When using our website, you agree to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the website only for lawful purposes</li>
                <li>Not post spam, offensive, or harmful content in comments</li>
                <li>Not attempt to hack, disrupt, or damage our website</li>
                <li>Respect other users and maintain civil discourse</li>
                <li>Not use automated tools to scrape our content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Content Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The information provided on this website is for general educational purposes only. While we strive to
                keep information accurate and up-to-date, we make no representations or warranties about the
                completeness, accuracy, or reliability of any content.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any reliance you place on such information is strictly at your own risk. We are not responsible for any
                loss or damage resulting from your use of our content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Earnings Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any income examples or earning potential mentioned on this website are estimates only. Individual
                results will vary, and we cannot guarantee that you will earn any money using the techniques and ideas
                presented. Success depends on many factors including your background, effort, and market conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">External Links</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website may contain links to external websites. We are not responsible for the content, privacy
                policies, or practices of any third-party sites. We encourage you to review the terms of any website you
                visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Comments and User Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By posting comments or user content on our website, you grant us a non-exclusive, royalty-free license
                to use, modify, and display such content. We reserve the right to remove any comments that violate these
                terms or are inappropriate.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                E Tech Digital and its team members shall not be liable for any indirect, incidental, special, or
                consequential damages arising from your use of the website or inability to use the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to the website. Your continued use of the website after changes constitutes acceptance of the
                new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions about these Terms & Conditions, please contact us at{" "}
                <a href="mailto:contact@etechdigital.com" className="text-primary hover:underline">
                  contact@etechdigital.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
