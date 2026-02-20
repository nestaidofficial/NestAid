import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function SensitiveDataSettingsPage() {
  return (
    <div className="min-h-screen bg-[#FEFEDF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-32 md:py-40">
        {/* Page Title */}
        <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12`}>
          Limit the Processing of My Sensitive Data
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
              NestAid, Inc. respects your privacy and provides transparency around how sensitive personal information is handled.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              This page explains your right to limit the processing of sensitive personal data and how to submit a request.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              What Is Sensitive Personal Data?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Sensitive personal data may include information such as:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Health-related information shared by you or your family</li>
              <li className="list-disc">Government-issued identifiers</li>
              <li className="list-disc">Account or login information</li>
              <li className="list-disc">Employment-related details provided by caregiver applicants</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6 font-semibold`}>
              NestAid collects such information only when necessary to provide non-medical home care services, respond to inquiries, or evaluate caregiver applications.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              How NestAid Uses Sensitive Personal Data
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              NestAid uses sensitive personal data solely for legitimate business purposes, including:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Coordinating safe and appropriate non-medical care</li>
              <li className="list-disc">Communicating with families and caregivers</li>
              <li className="list-disc">Supporting care planning and scheduling</li>
              <li className="list-disc">Evaluating caregiver qualifications</li>
              <li className="list-disc">Complying with legal and regulatory requirements</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6 font-semibold`}>
              NestAid does not use sensitive personal data for advertising, profiling, or unrelated purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Your Right to Limit Processing
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              You may request that NestAid limit the processing of your sensitive personal data to what is necessary to:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Provide requested services</li>
              <li className="list-disc">Maintain security and integrity</li>
              <li className="list-disc">Comply with legal obligations</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6`}>
              Where applicable, NestAid will honor verified requests consistent with our services and applicable law.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              How to Submit a Request
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6`}>
              To request limitation of sensitive data processing, please contact us:
            </p>
            <div className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-6`}>
              <p><strong>NestAid, Inc.</strong></p>
              <p>Email: privacy@nestaid.com</p>
              <p>Phone: (412) 953-5320</p>
              <p>Address: Somerville, Massachusetts</p>
            </div>
            <p className={`${inter.className} text-base text-[#3D5A52]/70 leading-relaxed italic`}>
              We may need to verify your identity before processing your request.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              What Happens After You Submit a Request
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              Once your request is verified, NestAid will:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Review how your sensitive personal data is currently used</li>
              <li className="list-disc">Limit processing where feasible and appropriate</li>
              <li className="list-disc">Confirm completion or explain any necessary limitations</li>
            </ul>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mt-6 font-semibold`}>
              Please note: Limiting certain data may affect our ability to provide services or respond to requests.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Additional Information
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4`}>
              For more details about how NestAid collects, uses, and protects personal information, please review our:
            </p>
            <ul className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed space-y-2 ml-6`}>
              <li className="list-disc">Privacy Policy</li>
              <li className="list-disc">Cookie Preferences</li>
              <li className="list-disc">Help Center</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6`}>
              Updates to This Page
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1a1a1a] leading-relaxed`}>
              NestAid may update this page from time to time to reflect changes in legal requirements or data practices. Updates will be posted with a revised effective date.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
