import { Playfair_Display, Inter } from "next/font/google"
import Link from "next/link"
import { ShieldAlert, Lock, FileText, CheckCircle, AlertCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

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
    <div className="min-h-screen bg-background">
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
            <ShieldAlert className="w-4 h-4 text-[#D9FB74]" />
            <span className={`${inter.className} text-white/90 text-sm font-medium`}>
              Your Data, Your Control
            </span>
          </div>
          
          <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight`}>
            Limit the Processing of My Sensitive Data
          </h1>
          <p className={`${inter.className} text-white/80 text-lg md:text-xl max-w-2xl`}>
            We respect your privacy and provide transparency around how sensitive personal information is handled.
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
              { label: "What Is It", icon: ShieldAlert, section: 1 },
              { label: "How We Use", icon: Lock, section: 2 },
              { label: "Your Rights", icon: CheckCircle, section: 3 },
              { label: "Submit Request", icon: Mail, section: 4 }
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
              <ShieldAlert className="w-6 h-6 text-[#27645E]" />
            </div>
            <div>
              <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold mb-4`}>
                Limit Sensitive Data Processing
              </h2>
              <p className={`${inter.className} text-white/90 text-base md:text-lg leading-relaxed`}>
                NestAid, Inc. ("NestAid," "we," "us," or "our") respects your privacy and provides transparency around how sensitive personal information is handled.
              </p>
              <p className={`${inter.className} text-white/90 text-base md:text-lg leading-relaxed mt-4`}>
                This page explains your right to limit the processing of sensitive personal data and how to submit a request.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1 - What Is Sensitive Personal Data */}
          <section id="section-1" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <ShieldAlert className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  What Is Sensitive Personal Data?
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              Sensitive personal data may include information such as:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { 
                  title: "Health Information", 
                  desc: "Health-related information shared by you or your family",
                  icon: "🏥"
                },
                { 
                  title: "Government IDs", 
                  desc: "Government-issued identifiers",
                  icon: "🆔"
                },
                { 
                  title: "Account Details", 
                  desc: "Account or login information",
                  icon: "🔐"
                },
                { 
                  title: "Employment Info", 
                  desc: "Employment-related details provided by caregiver applicants",
                  icon: "💼"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F5F5EC] rounded-2xl p-6 border-l-4 border-[#27645E]">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className={`${playfair.className} text-lg font-semibold text-[#27645E] mb-2`}>
                        {item.title}
                      </h3>
                      <p className={`${inter.className} text-[#3D5A52]/70 text-sm leading-relaxed`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#D9FB74]/20 to-[#D9FB74]/10 border-l-4 border-[#D9FB74] rounded-r-xl p-6">
              <p className={`${inter.className} text-[#27645E] text-base md:text-lg font-semibold`}>
                NestAid collects such information only when necessary to provide non-medical home care services, respond to inquiries, or evaluate caregiver applications.
              </p>
            </div>
          </section>

          {/* Section 2 - How NestAid Uses Sensitive Personal Data */}
          <section id="section-2" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Lock className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  How NestAid Uses Sensitive Personal Data
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              NestAid uses sensitive personal data solely for legitimate business purposes, including:
            </p>

            <div className="space-y-4 mb-6">
              {[
                "Coordinating safe and appropriate non-medical care",
                "Communicating with families and caregivers",
                "Supporting care planning and scheduling",
                "Evaluating caregiver qualifications",
                "Complying with legal and regulatory requirements"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-[#F5F5EC] rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#27645E] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#D9FB74]" />
                  </div>
                  <span className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#D9FB74]/20 to-[#D9FB74]/10 border-l-4 border-[#D9FB74] rounded-r-xl p-6">
              <p className={`${inter.className} text-[#27645E] text-base md:text-lg font-semibold`}>
                NestAid does not use sensitive personal data for advertising, profiling, or unrelated purposes.
              </p>
            </div>
          </section>

          {/* Section 3 - Your Right to Limit Processing */}
          <section id="section-3" className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Your Right to Limit Processing
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6 md:p-8 border border-[#3D5A52]/5">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed mb-6`}>
                You may request that NestAid limit the processing of your sensitive personal data to what is necessary to:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "Provide Services", desc: "Requested care services", icon: "1" },
                  { title: "Security", desc: "Maintain security and integrity", icon: "2" },
                  { title: "Legal Compliance", desc: "Comply with legal obligations", icon: "3" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 text-center border border-[#3D5A52]/10">
                    <div className="w-12 h-12 rounded-full bg-[#27645E] flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#D9FB74] font-bold text-xl">{item.icon}</span>
                    </div>
                    <h3 className={`${playfair.className} text-lg font-semibold text-[#27645E] mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`${inter.className} text-[#3D5A52]/70 text-sm`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#FCF5EB] border border-[#27645E]/10 rounded-xl p-5">
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                  Where applicable, NestAid will honor verified requests consistent with our services and applicable law.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 - How to Submit a Request */}
          <section id="section-4" className="bg-gradient-to-br from-[#27645E] to-[#1f4d47] rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#D9FB74] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#27645E]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-2`}>
                  How to Submit a Request
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-white/90 text-base md:text-lg leading-relaxed mb-8`}>
              To request limitation of sensitive data processing, please contact us:
            </p>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-[#D9FB74] flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#27645E]" />
                </div>
                <h3 className={`${playfair.className} text-lg font-semibold mb-2`}>
                  Email Us
                </h3>
                <a 
                  href="mailto:privacy@nestaid.com"
                  className={`${inter.className} text-[#D9FB74] text-sm hover:underline`}
                >
                  privacy@nestaid.com
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-[#D9FB74] flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#27645E]" />
                </div>
                <h3 className={`${playfair.className} text-lg font-semibold mb-2`}>
                  Call Us
                </h3>
                <a 
                  href="tel:4129530622"
                  className={`${inter.className} text-[#D9FB74] text-sm hover:underline`}
                >
                  (412) 953-0622
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 rounded-full bg-[#D9FB74] flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#27645E]" />
                </div>
                <h3 className={`${playfair.className} text-lg font-semibold mb-2`}>
                  Visit Us
                </h3>
                <p className={`${inter.className} text-white/80 text-sm`}>
                  Somerville, Massachusetts
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
              <p className={`${inter.className} text-white/80 text-sm leading-relaxed`}>
                <strong className="text-white">NestAid, Inc.</strong><br />
                Address: Somerville, Massachusetts<br />
                Phone: (412) 953-0622<br />
                Email: privacy@nestaid.com
              </p>
            </div>

            <div className="bg-[#D9FB74]/20 border border-[#D9FB74]/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#D9FB74] flex-shrink-0 mt-0.5" />
                <p className={`${inter.className} text-white/90 text-sm leading-relaxed`}>
                  We may need to verify your identity before processing your request.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - What Happens After You Submit */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  What Happens After You Submit a Request
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              Once your request is verified, NestAid will:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { 
                  step: "1",
                  title: "Review", 
                  desc: "Review how your sensitive personal data is currently used"
                },
                { 
                  step: "2",
                  title: "Limit", 
                  desc: "Limit processing where feasible and appropriate"
                },
                { 
                  step: "3",
                  title: "Confirm", 
                  desc: "Confirm completion or explain any necessary limitations"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F5F5EC] rounded-2xl p-6 relative">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#27645E] flex items-center justify-center shadow-lg">
                    <span className="text-[#D9FB74] font-bold text-lg">{item.step}</span>
                  </div>
                  <div className="mt-4">
                    <h3 className={`${playfair.className} text-xl font-semibold text-[#27645E] mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`${inter.className} text-[#3D5A52]/70 text-sm leading-relaxed`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FCF5EB] border border-[#27645E]/10 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#27645E] flex-shrink-0 mt-0.5" />
                <p className={`${inter.className} text-[#3D5A52] text-base leading-relaxed`}>
                  <strong>Please note:</strong> Limiting certain data may affect our ability to provide services or respond to requests.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 - Additional Information */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Additional Information
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-6`}>
              For more details about how NestAid collects, uses, and protects personal information, please review our:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Privacy Policy", href: "/privacy-policy", icon: Lock },
                { title: "Cookie Preferences", href: "/cookie-settings", icon: FileText },
                { title: "Help Center", href: "/help-center", icon: Mail }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="bg-[#F5F5EC] hover:bg-[#27645E] rounded-2xl p-6 transition-all duration-300 group border border-[#3D5A52]/10 hover:border-[#27645E]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#27645E] group-hover:bg-[#D9FB74] flex items-center justify-center transition-colors">
                      <item.icon className="w-6 h-6 text-[#D9FB74] group-hover:text-[#27645E] transition-colors" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#3D5A52]/40 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className={`${playfair.className} text-lg font-semibold text-[#27645E] group-hover:text-white transition-colors`}>
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 7 - Updates */}
          <section className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-[#3D5A52]/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#27645E] to-[#1f4d47] flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-6 h-6 text-[#D9FB74]" />
              </div>
              <div className="flex-1">
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#27645E] mb-2`}>
                  Updates to This Page
                </h2>
                <div className="w-16 h-1 bg-[#D9FB74] rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#F5F5EC] to-[#FCF5EB] rounded-2xl p-6 md:p-8">
              <p className={`${inter.className} text-[#3D5A52] text-base md:text-lg leading-relaxed`}>
                NestAid may update this page from time to time to reflect changes in legal requirements or data practices. Updates will be posted with a revised effective date.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-br from-[#F5F5EC] to-[#FCF5EB] rounded-3xl shadow-sm p-8 md:p-12 border border-[#3D5A52]/10 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#27645E] flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-8 h-8 text-[#D9FB74]" />
              </div>
              <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#27645E] mb-4`}>
                Have Questions About Your Data?
              </h2>
              <p className={`${inter.className} text-[#3D5A52]/80 text-base md:text-lg leading-relaxed mb-8`}>
                We're here to help you understand and exercise your privacy rights. Contact us anytime with questions or concerns.
              </p>
              <Link
                href="mailto:privacy@nestaid.com"
                className={`${inter.className} inline-flex items-center justify-center gap-3 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg bg-[#27645E] hover:bg-[#1f4d47]`}
              >
                <Mail className="w-5 h-5" />
                <span>Contact Privacy Team</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
