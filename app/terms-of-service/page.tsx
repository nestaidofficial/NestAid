import { Playfair_Display, Inter } from "next/font/google"
import Link from "next/link"
import { Shield, FileText, Users, AlertCircle, Scale, Globe, Lock, UserCheck, FileCheck, Briefcase, Building2, Gavel } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-b from-[#FCF5EB] to-[#F5F5EC]">
      {/* Header Section with Pattern */}
      <div className="relative bg-[#27645E] py-20 md:py-32 overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-5 md:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Scale className="w-4 h-4 text-[#D9FB74]" />
            <span className={`${inter.className} text-white/90 text-sm font-medium`}>
              Legal Terms & Conditions
            </span>
          </div>
          
          <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight`}>
            Terms of Service
          </h1>
          <p className={`${inter.className} text-white/80 text-lg md:text-xl max-w-2xl`}>
            Please read these terms carefully before using our website and services.
          </p>
          <p className={`${inter.className} text-[#D9FB74] text-sm md:text-base mt-4 font-medium`}>
            Last Updated: February 12, 2026
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#3D5A52]/10">
          <p className={`${inter.className} text-[#3D5A52]/70 text-sm mb-3 font-medium`}>
            Quick Navigation
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Website Use", icon: Globe, section: 1 },
              { label: "Care Requests", icon: Briefcase, section: 4 },
              { label: "Health Info", icon: Shield, section: 5 },
              { label: "Legal Terms", icon: Gavel, section: 9 }
            ].map((item, idx) => (
              <a
                key={idx}
                href={`#section-${item.section}`}
                className={`${inter.className} flex items-center gap-2 text-[#3D5A52]/70 hover:text-[#27645E] text-sm transition-colors group hover:bg-[#F5F5EC] p-2 rounded-lg`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#27645E]/10 group-hover:bg-[#27645E] flex items-center justify-center transition-colors">
                  <item.icon className="w-4 h-4 text-[#27645E] group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Introduction Card */}
        <div className="bg-gradient-to-br from-[#27645E] to-[#1f4d47] rounded-3xl shadow-xl p-8 md:p-12 mb-12 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#D9FB74] flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6 text-[#27645E]" />
            </div>
            <div>
              <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold mb-4`}>
                NestAid Terms of Use
              </h2>
              <p className={`${inter.className} text-white/90 text-base md:text-lg leading-relaxed`}>
                These Terms of Use ("Terms") govern your access to and use of the NestAid website (the "Site"), operated by NestAid, Inc. ("NestAid," "we," "us," or "our"). By accessing or using this Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section-1" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Globe className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Use of the Website
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed`}>
                The NestAid website is provided for informational purposes only, including learning about our non-medical home care services, requesting consultations, and exploring caregiving opportunities.
              </p>
              <div className="bg-[#F5F5EC] rounded-2xl p-6">
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                  You agree to use the Site only for lawful purposes and in a manner consistent with these Terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <AlertCircle className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  No Medical or Professional Advice
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#D9FB74]/20 to-[#D9FB74]/10 border-l-4 border-[#D9FB74] rounded-r-xl p-6">
                <p className={`${inter.className} text-[#27645E] text-base md:text-lg leading-relaxed font-semibold mb-3`}>
                  NestAid provides non-medical home care services only.
                </p>
                <p className={`${inter.className} text-[#3D5A52]/80 text-base leading-relaxed`}>
                  Content on this Site is not intended to provide medical, clinical, or legal advice and should not be relied upon as such.
                </p>
              </div>
              <p className={`${inter.className} text-[#3D5A52]/80 text-base leading-relaxed`}>
                You should always seek advice from qualified healthcare or legal professionals regarding medical or health-related decisions.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <UserCheck className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Eligibility
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                This Site is intended for use by individuals who are 18 years of age or older. By using the Site, you represent that you meet this requirement.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Briefcase className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Care Requests & Employment Inquiries
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              Submitting a care request or caregiver application through the Site:
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                "Does not guarantee services or employment",
                "Does not create a contractual relationship",
                "Is subject to additional agreements, screening, and approval"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-[#F5F5EC] rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#27645E] flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#D9FB74]"></div>
                  </div>
                  <span className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-[#FCF5EB] border border-[#27645E]/10 rounded-xl p-5">
              <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                NestAid reserves the right to accept or decline service requests or applications at its discretion.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Health Information & HIPAA
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed`}>
                NestAid provides non-medical, private-pay home care services and is not a "covered entity" under the Health Insurance Portability and Accountability Act (HIPAA). However, in the course of providing care, we may receive health-related information directly from clients or their families to help ensure safe and appropriate support.
              </p>
              <div className="bg-gradient-to-br from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6 border border-[#3D5A52]/5">
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed mb-4`}>
                  NestAid safeguards this information using administrative, technical, and physical protections designed to maintain confidentiality and security.
                </p>
                <p className={`${inter.className} text-[#3D5A52]/70 text-sm leading-relaxed italic`}>
                  In the event NestAid acts as a business associate to a covered entity under HIPAA, we will comply with applicable HIPAA requirements for that information.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Lock className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Intellectual Property
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed`}>
                All content on this Site—including text, graphics, logos, images, and design—is the property of NestAid, Inc. or its licensors and is protected by applicable intellectual property laws.
              </p>
              <div className="bg-[#F5F5EC] rounded-2xl p-6">
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                  You may not copy, reproduce, distribute, or use any content without prior written permission.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Globe className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Third-Party Links
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed`}>
                The Site may contain links to third-party websites for convenience. NestAid does not control or endorse these websites and is not responsible for their content, privacy practices, or availability.
              </p>
              <div className="bg-[#FCF5EB] rounded-2xl p-6">
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                  Accessing third-party sites is at your own risk.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <AlertCircle className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Disclaimer of Warranties
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                The Site is provided on an "as is" and "as available" basis. NestAid makes no warranties, express or implied, regarding the accuracy, completeness, or reliability of Site content.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="section-9" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Gavel className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Limitation of Liability
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                To the fullest extent permitted by law, NestAid, Inc. shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of—or inability to use—the Site.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Indemnification
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6 border border-[#3D5A52]/5">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                You agree to indemnify and hold harmless NestAid, Inc., its officers, employees, and affiliates from any claims arising out of your misuse of the Site or violation of these Terms.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Changes to These Terms
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed`}>
                NestAid may update these Terms from time to time. Changes will be posted on this page with an updated effective date.
              </p>
              <div className="bg-[#F5F5EC] rounded-2xl p-6">
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                  Continued use of the Site constitutes acceptance of the revised Terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building2 className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Governing Law
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#FCF5EB] to-[#F5F5EC] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                These Terms are governed by the laws of the Commonwealth of Massachusetts, without regard to conflict-of-law principles.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
