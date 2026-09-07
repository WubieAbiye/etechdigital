import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 9, 2024</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Welcome to E Tech Digital (ኢ ቴክ ዲጅታል). We respect your privacy and are committed to protecting your
                personal data. This privacy policy explains how we collect, use, and safeguard your information when you
                visit our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Personal Information:</strong> Name and email address when you
                  subscribe to our newsletter or contact us.
                </li>
                <li>
                  <strong className="text-foreground">Usage Data:</strong> Information about how you use our website,
                  including pages visited, time spent, and browser type.
                </li>
                <li>
                  <strong className="text-foreground">Cookies:</strong> Small data files stored on your device to
                  improve your browsing experience.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Send you newsletters and updates (if subscribed)</li>
                <li>Improve our website content and user experience</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Respond to your inquiries and comments</li>
                <li>Serve relevant advertisements through Google AdSense</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the following third-party services:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Google AdSense:</strong> To display advertisements. Google may use
                  cookies to serve ads based on your prior visits.
                </li>
                <li>
                  <strong className="text-foreground">Google Analytics:</strong> To analyze website traffic and user
                  behavior.
                </li>
                <li>
                  <strong className="text-foreground">Affiliate Programs:</strong> We participate in affiliate programs
                  and may earn commissions on purchases made through our links.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website uses cookies to enhance your experience. You can control cookie settings through your
                browser. By continuing to use our site, you consent to our use of cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Opt-out of personalized advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the date at the top.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
