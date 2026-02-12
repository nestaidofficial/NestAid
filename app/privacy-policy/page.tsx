import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FEFEDF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page Title */}
        <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12`}>
          Privacy Policy
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
              At NestAid, Inc. ("NestAid," "we," "us," or "our"), protecting your privacy is our priority. This Privacy Policy outlines how we collect, use, share, and protect your personal information when you visit our website or use our services throughout Massachusetts.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-4`}>
              By accessing or using our website, you acknowledge and agree to the terms outlined in this Privacy Policy.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Information We Collect
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              We collect information you voluntarily provide to us and information that is collected automatically when you use our website.
            </p>

            <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4 mt-6`}>
              Information You Provide
            </h3>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              You may provide personal information when you:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Request a care consultation</li>
              <li className="list-disc">Contact us through forms, email, or phone</li>
              <li className="list-disc">Apply for a caregiving position</li>
              <li className="list-disc">Subscribe to updates or communications</li>
            </ul>

            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4 mt-6`}>
              This information may include:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Name, email address, phone number</li>
              <li className="list-disc">Zip code or city</li>
              <li className="list-disc">Care needs or preferences</li>
              <li className="list-disc">Employment or application-related information</li>
            </ul>

            <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4 mt-8`}>
              Information Collected Automatically
            </h3>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              When you visit our website, we may automatically collect:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">IP address</li>
              <li className="list-disc">Browser type and device information</li>
              <li className="list-disc">Pages viewed and time spent on the site</li>
              <li className="list-disc">Cookies and similar technologies</li>
            </ul>
            <p className={`${inter.className} text-base text-[#3D5A52]/70 leading-relaxed mt-4 italic`}>
              This information helps us improve website performance and user experience.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              How We Use Your Information
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              We use personal information to:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Respond to inquiries and consultation requests</li>
              <li className="list-disc">Coordinate non-medical home care services</li>
              <li className="list-disc">Communicate with families and caregivers</li>
              <li className="list-disc">Evaluate caregiver applications</li>
              <li className="list-disc">Improve our website and services</li>
              <li className="list-disc">Send relevant updates or communications (with consent)</li>
              <li className="list-disc">Comply with legal and regulatory obligations</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6 font-semibold`}>
              NestAid does not sell personal information to third parties.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Cookies & Website Technologies
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid uses cookies and similar technologies to understand how visitors use our website and to improve functionality. You may disable cookies through your browser settings; however, some features of the site may not function properly.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Information Sharing & Disclosure
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              We may share personal information:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">With trusted service providers who assist in operating our website or services</li>
              <li className="list-disc">When required by law or to protect legal rights and safety</li>
              <li className="list-disc">With your consent</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6`}>
              We do not share personal information with third parties for their own marketing purposes.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Data Security
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid maintains reasonable administrative, technical, and physical safeguards designed to protect personal information. While we take data protection seriously, no system can guarantee complete security.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Children's Privacy
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid's website and services are intended for adults. We do not knowingly collect personal information from children under the age of 13. If such information is identified, it will be promptly deleted.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Your Rights & Choices
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              You may request to:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Access or correct your personal information</li>
              <li className="list-disc">Opt out of marketing communications</li>
              <li className="list-disc">Request deletion of personal data, where applicable</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6`}>
              Requests can be made by contacting us using the information below.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Massachusetts Residents
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid operates in Massachusetts and complies with applicable state privacy and data protection laws. If you have questions regarding your personal information or our privacy practices, please contact us directly.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Updates to This Policy
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Contact Us
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              If you have questions about this Privacy Policy or how we handle your information, please contact us:
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
