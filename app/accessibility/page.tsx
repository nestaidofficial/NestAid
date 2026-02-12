import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#FEFEDF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page Title */}
        <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12`}>
          Accessibility Statement
        </h1>

        {/* Last Updated */}
        <p className={`${inter.className} text-sm text-[#3D5A52]/70 mb-12`}>
          Last Updated: February 12, 2026
        </p>

        {/* Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid, Inc. ("NestAid," "we," "us," or "our") is committed to ensuring digital accessibility for all individuals, including people with disabilities. We strive to make our website accessible, user-friendly, and inclusive for everyone who visits or uses our online services.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Our Commitment to Accessibility
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid is actively working to improve the accessibility and usability of our website in accordance with generally recognized accessibility standards. Our goal is to provide an experience that supports equal access to information about our non-medical home care services and caregiving opportunities.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Accessibility Standards
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              NestAid aims to align our website with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, where reasonably feasible. These guidelines help make web content more accessible to individuals with various disabilities:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Visual disabilities - Support for screen readers and visual aids</li>
              <li className="list-disc">Auditory disabilities - Alternative text and captions</li>
              <li className="list-disc">Motor disabilities - Keyboard navigation support</li>
              <li className="list-disc">Cognitive disabilities - Clear content structure and language</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Ongoing Efforts
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Accessibility is an ongoing effort. We regularly review our website and work to identify and address potential accessibility barriers as part of our commitment to continuous improvement.
            </p>

            <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4 mt-6`}>
              Third-Party Content
            </h3>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              Some content or features on our website may be provided by third-party platforms or tools. While we encourage accessibility best practices from our partners, we may not have full control over the accessibility of third-party content.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Need Assistance or Have Feedback?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6`}>
              If you experience difficulty accessing any part of our website or have suggestions for improving accessibility, we want to hear from you. We are happy to provide information in alternative formats or assist you directly.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Please contact us at:
            </p>
            <div className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              <p><strong>NestAid, Inc.</strong></p>
              <p>Email: accessibility@nestaid.com</p>
              <p>Phone: (412) 953-0622</p>
              <p>Address: Somerville, Massachusetts</p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Policy Updates
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid may update this Accessibility Statement from time to time to reflect improvements or changes to our accessibility practices. Updates will be posted on this page with a revised effective date.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
