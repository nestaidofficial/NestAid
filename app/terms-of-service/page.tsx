import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FEFEDF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page Title */}
        <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12`}>
          Terms of Service
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
              These Terms of Use ("Terms") govern your access to and use of the NestAid website (the "Site"), operated by NestAid, Inc. ("NestAid," "we," "us," or "our"). By accessing or using this Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Use of the Website
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              The NestAid website is provided for informational purposes only, including learning about our non-medical home care services, requesting consultations, and exploring caregiving opportunities.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              You agree to use the Site only for lawful purposes and in a manner consistent with these Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              No Medical or Professional Advice
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4 font-semibold`}>
              NestAid provides non-medical home care services only.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Content on this Site is not intended to provide medical, clinical, or legal advice and should not be relied upon as such.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              You should always seek advice from qualified healthcare or legal professionals regarding medical or health-related decisions.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Eligibility
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              This Site is intended for use by individuals who are 18 years of age or older. By using the Site, you represent that you meet this requirement.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Care Requests & Employment Inquiries
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Submitting a care request or caregiver application through the Site:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Does not guarantee services or employment</li>
              <li className="list-disc">Does not create a contractual relationship</li>
              <li className="list-disc">Is subject to additional agreements, screening, and approval</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6`}>
              NestAid reserves the right to accept or decline service requests or applications at its discretion.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Health Information & HIPAA
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              NestAid provides non-medical, private-pay home care services and is not a "covered entity" under the Health Insurance Portability and Accountability Act (HIPAA). However, in the course of providing care, we may receive health-related information directly from clients or their families to help ensure safe and appropriate support.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              NestAid safeguards this information using administrative, technical, and physical protections designed to maintain confidentiality and security.
            </p>
            <p className={`${inter.className} text-base text-[#3D5A52]/70 leading-relaxed italic`}>
              In the event NestAid acts as a business associate to a covered entity under HIPAA, we will comply with applicable HIPAA requirements for that information.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Intellectual Property
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              All content on this Site—including text, graphics, logos, images, and design—is the property of NestAid, Inc. or its licensors and is protected by applicable intellectual property laws.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              You may not copy, reproduce, distribute, or use any content without prior written permission.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Third-Party Links
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              The Site may contain links to third-party websites for convenience. NestAid does not control or endorse these websites and is not responsible for their content, privacy practices, or availability.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              Accessing third-party sites is at your own risk.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Disclaimer of Warranties
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              The Site is provided on an "as is" and "as available" basis. NestAid makes no warranties, express or implied, regarding the accuracy, completeness, or reliability of Site content.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Limitation of Liability
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              To the fullest extent permitted by law, NestAid, Inc. shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of—or inability to use—the Site.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Indemnification
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              You agree to indemnify and hold harmless NestAid, Inc., its officers, employees, and affiliates from any claims arising out of your misuse of the Site or violation of these Terms.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Changes to These Terms
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              NestAid may update these Terms from time to time. Changes will be posted on this page with an updated effective date.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              Continued use of the Site constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Governing Law
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              These Terms are governed by the laws of the Commonwealth of Massachusetts, without regard to conflict-of-law principles.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Contact Us
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              If you have questions about these Terms, please contact us:
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
