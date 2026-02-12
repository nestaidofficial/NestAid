import { Playfair_Display, Inter } from "next/font/google"
import Link from "next/link"
import { Shield, Lock, Eye, FileText, Users, Globe, Bell, Mail, Database, Cookie, ShieldCheck, MessageSquare } from "lucide-react"

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
            <Shield className="w-4 h-4 text-[#D9FB74]" />
            <span className={`${inter.className} text-white/90 text-sm font-medium`}>
              Your Privacy Matters
            </span>
          </div>
          
          <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight`}>
            Privacy Policy
          </h1>
          <p className={`${inter.className} text-white/80 text-lg md:text-xl max-w-2xl`}>
            We're committed to protecting your personal information and being transparent about how we use it.
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
              { label: "Information", icon: Database, section: 1 },
              { label: "Usage", icon: Eye, section: 2 },
              { label: "Cookies", icon: Cookie, section: 3 },
              { label: "Security", icon: ShieldCheck, section: 5 }
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
              <Shield className="w-6 h-6 text-[#27645E]" />
            </div>
            <div>
              <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold mb-4`}>
                NestAid Privacy Policy
              </h2>
              <p className={`${inter.className} text-white/90 text-base md:text-lg leading-relaxed`}>
                At NestAid, Inc. ("NestAid," "we," "us," or "our"), protecting your privacy is our priority. This Privacy Policy outlines how we collect, use, share, and protect your personal information when you visit our website or use our services throughout Massachusetts.
              </p>
              <p className={`${inter.className} text-white/90 text-base md:text-lg leading-relaxed mt-4`}>
                By accessing or using our website, you acknowledge and agree to the terms outlined in this Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section-1" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Database className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Information We Collect
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              We collect information you voluntarily provide to us and information that is collected automatically when you use our website.
            </p>
            
            {/* Information You Provide */}
            <div className="bg-[#F5F5EC] rounded-2xl p-6 mb-6">
              <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#27645E] mb-4`}>
                Information You Provide
              </h3>
              <p className={`${inter.className} text-[#3D5A52]/80 text-base leading-relaxed mb-4`}>
                You may provide personal information when you:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Request a care consultation",
                  "Contact us through forms, email, or phone",
                  "Apply for a caregiving position",
                  "Subscribe to updates or communications"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#27645E] mt-2 flex-shrink-0"></div>
                    <span className={`${inter.className} text-[#3D5A52] text-base`}>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#3D5A52]/10">
                <p className={`${inter.className} text-[#3D5A52]/80 text-base leading-relaxed mb-4`}>
                  This information may include:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Name, email address, phone number",
                    "Zip code or city",
                    "Care needs or preferences",
                    "Employment or application-related information"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27645E] mt-2 flex-shrink-0"></div>
                      <span className={`${inter.className} text-[#3D5A52] text-base`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Information Collected Automatically */}
            <div className="bg-[#FCF5EB] rounded-2xl p-6">
              <h3 className={`${playfair.className} text-xl md:text-2xl font-semibold text-[#27645E] mb-4`}>
                Information Collected Automatically
              </h3>
              <p className={`${inter.className} text-[#3D5A52]/80 text-base leading-relaxed mb-4`}>
                When you visit our website, we may automatically collect:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "IP address",
                  "Browser type and device information",
                  "Pages viewed and time spent on the site",
                  "Cookies and similar technologies"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#27645E] mt-2 flex-shrink-0"></div>
                    <span className={`${inter.className} text-[#3D5A52] text-base`}>{item}</span>
                  </div>
                ))}
              </div>
              <p className={`${inter.className} text-[#3D5A52]/70 text-sm leading-relaxed mt-4 italic`}>
                This information helps us improve website performance and user experience.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Eye className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  How We Use Your Information
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              We use personal information to:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                "Respond to inquiries and consultation requests",
                "Coordinate non-medical home care services",
                "Communicate with families and caregivers",
                "Evaluate caregiver applications",
                "Improve our website and services",
                "Send relevant updates or communications (with consent)",
                "Comply with legal and regulatory obligations"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#F5F5EC] rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-[#27645E] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className={`${inter.className} text-[#3D5A52] text-base`}>{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-[#D9FB74]/20 to-[#D9FB74]/10 border-l-4 border-[#D9FB74] rounded-r-xl p-6">
              <p className={`${inter.className} text-[#27645E] text-base md:text-lg font-semibold`}>
                NestAid does not sell personal information to third parties.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Cookie className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Cookies & Website Technologies
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                NestAid uses cookies and similar technologies to understand how visitors use our website and to improve functionality. You may disable cookies through your browser settings; however, some features of the site may not function properly.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Users className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Information Sharing & Disclosure
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              We may share personal information:
            </p>
            
            <div className="space-y-4 mb-6">
              {[
                "With trusted service providers who assist in operating our website or services",
                "When required by law or to protect legal rights and safety",
                "With your consent"
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
                We do not share personal information with third parties for their own marketing purposes.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <ShieldCheck className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Data Security
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6 border border-[#3D5A52]/5">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                NestAid maintains reasonable administrative, technical, and physical safeguards designed to protect personal information. While we take data protection seriously, no system can guarantee complete security.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Children's Privacy
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                NestAid's website and services are intended for adults. We do not knowingly collect personal information from children under the age of 13. If such information is identified, it will be promptly deleted.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bell className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Your Rights & Choices
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              You may request to:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { title: "Access or correct", desc: "your personal information" },
                { title: "Opt out", desc: "of marketing communications" },
                { title: "Request deletion", desc: "of personal data, where applicable" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F5F5EC] rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#27645E] flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{idx + 1}</span>
                  </div>
                  <h3 className={`${playfair.className} text-lg font-semibold text-[#27645E] mb-1`}>
                    {item.title}
                  </h3>
                  <p className={`${inter.className} text-[#3D5A52]/70 text-sm`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-[#FCF5EB] rounded-xl p-5 border border-[#27645E]/10">
              <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                Requests can be made by contacting us using the information below.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Globe className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Massachusetts Residents
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                NestAid operates in Massachusetts and complies with applicable state privacy and data protection laws. If you have questions regarding your personal information or our privacy practices, please contact us directly.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Updates to This Policy
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-[#FCF5EB] rounded-2xl p-6">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                NestAid may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
