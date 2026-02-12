import { Playfair_Display, Inter } from "next/font/google"
import Link from "next/link"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function CookieSettingsPage() {
  return (
    <div className="min-h-screen bg-[#FEFEDF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-32 md:py-40">
        {/* Page Title */}
        <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12`}>
          Cookie Preferences
        </h1>

        {/* Last Updated */}
        <p className={`${inter.className} text-sm text-[#3D5A52]/70 mb-12`}>
          Last Updated: February 12, 2026
        </p>

        {/* Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              NestAid, Inc. uses cookies and similar technologies on our website to improve functionality, understand how visitors use our site, and enhance overall user experience.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              This Cookie Preferences page explains what cookies are, how we use them, and the choices available to you.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              What Are Cookies?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, and provide insights into how the site is used.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed font-semibold`}>
              Cookies do not give us access to your device or personal files.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              How NestAid Uses Cookies
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6`}>
              NestAid uses cookies for the following purposes:
            </p>

            <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4`}>
              Essential Cookies
            </h3>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6`}>
              These cookies are necessary for the website to function properly and cannot be disabled. They enable core features such as page navigation and form submissions.
            </p>

            <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4`}>
              Performance & Analytics Cookies
            </h3>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              These cookies help us understand how visitors interact with our website by collecting aggregated and anonymized information. This allows us to improve site performance and usability.
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6 mb-6`}>
              <li className="list-disc">Page views and traffic patterns</li>
              <li className="list-disc">User journey analysis</li>
              <li className="list-disc">Site performance metrics</li>
              <li className="list-disc">Error tracking and debugging</li>
            </ul>

            <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4`}>
              Functional Cookies
            </h3>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Functional cookies remember choices you make—such as preferences or settings—to provide a more personalized experience.
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6 mb-6`}>
              <li className="list-disc">Language preferences</li>
              <li className="list-disc">Location settings</li>
              <li className="list-disc">User interface customization</li>
              <li className="list-disc">Accessibility options</li>
            </ul>

            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed font-semibold`}>
              NestAid does not use cookies to sell personal information or engage in targeted advertising unrelated to our services.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Third-Party Cookies
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              Some cookies may be placed by third-party services that appear on our website (such as analytics or embedded tools). We do not control these cookies directly, but we require partners to follow responsible data practices.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Your Cookie Choices
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              You have the ability to manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of our website.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              Depending on your location and browser, you may also see a cookie banner allowing you to manage preferences when visiting our site.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Do Cookies Collect Personal Information?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Cookies may collect technical information such as browser type, device information, or pages visited. This information is used only to support website performance and user experience.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              For more information about how we handle personal data, please review our{' '}
              <Link href="/privacy-policy" className="underline hover:text-[#27645E]">
                Privacy Policy
              </Link>.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Updates to Cookie Preferences
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid may update this Cookie Preferences page from time to time to reflect changes in technology or legal requirements. Updates will be posted on this page with a revised effective date.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Contact Us
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              If you have questions about our cookie practices, please contact us:
            </p>
            <div className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              <p><strong>NestAid, Inc.</strong></p>
              <p>Email: information@nestaid.com</p>
              <p>Phone: (412) 953-0622</p>
              <p>Address: Somerville, Massachusetts</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
