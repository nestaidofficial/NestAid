import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Building2, Phone, Mail, Globe } from "lucide-react"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export function Footer() {
  return (
    <footer className="relative bg-[#FEFEDF] w-full py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Dark Green Section */}
          <div className="relative bg-[#27645E] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#fff] text-sm md:text-base font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-white/70`}>
                  CARE THAT FEELS LIKE FAMILY
                </p>
              </div>
              <h3 className={`${playfair.className} text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight`}>
                Building a Better Tomorrow, at Home
              </h3>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/90">
                <Building2 className="h-5 w-5 text-[#D9FB74]" />
                <span className={`${inter.className} text-sm md:text-base`}>Somerville, Massachusetts</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Phone className="h-5 w-5 text-[#D9FB74]" />
                <Link href="tel:4129535320" className={`${inter.className} text-sm md:text-base hover:text-white transition-colors`}>
                  (412) 953-5320
                </Link>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="h-5 w-5 text-[#D9FB74]" />
                <Link href="mailto:information@nestaid.com" className={`${inter.className} text-sm md:text-base hover:text-white transition-colors`}>
                  information@nestaid.com
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mb-8">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <Facebook className="h-4 w-4 text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <Instagram className="h-4 w-4 text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <Twitter className="h-4 w-4 text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <Globe className="h-4 w-4 text-white" />
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-auto">
              <p className={`${inter.className} text-sm text-white/60`}>
                Need some help?{' '}
                <Link href="/help-center" className="text-white underline hover:text-[#D9FB74] transition-colors">
                  Get in touch
                </Link>
              </p>
            </div>

            {/* Large Watermark */}
            <div className="absolute bottom-6 left-0 right-0 px-6 md:px-8 lg:px-10 opacity-[0.07] pointer-events-none">
              <h2 className={`${playfair.className} text-[60px] md:text-[90px] lg:text-[100px] font-bold text-white leading-none`}>
                NestAid
              </h2>
            </div>
          </div>

          {/* Right Side - Light Green Section with Links */}
          <div className="bg-[#F5F5EC] rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {/* Quick Links */}
              <div>
                <h4 className={`${playfair.className} text-base md:text-lg font-bold text-[#3D5A52] mb-4`}>Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/help-center" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Useful Links */}
              <div>
                <h4 className={`${playfair.className} text-base md:text-lg font-bold text-[#3D5A52] mb-4`}>Useful Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/find-care" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs/senior-care" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Find Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className={`${inter.className} text-sm md:text-base text-[#3D5A52]/80 hover:text-[#3D5A52] transition-colors flex items-center gap-2`}>
                      <span>→</span> Resources
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Get In Touch Card */}
              <div className="sm:col-span-2">
                <h4 className={`${playfair.className} text-base md:text-lg font-bold text-[#3D5A52] mb-4`}>Get In Touch</h4>
                <div className="bg-white/60 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3D5A52]/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-[#3D5A52]" />
                    </div>
                    <div>
                      <p className={`${inter.className} text-xs text-[#3D5A52]/60 font-medium uppercase tracking-wider`}>Open Hours</p>
                      <p className={`${inter.className} text-sm font-semibold text-[#3D5A52]`}>9 AM - 8 PM, Daily</p>
                    </div>
                  </div>
                  <p className={`${inter.className} text-sm text-[#3D5A52]/80 leading-relaxed`}>
                    Contact us today to learn more about our care services and how we can assist you.
                  </p>
                  <Link
                    href="tel:4129535320"
                    className={`${inter.className} w-full inline-flex items-center justify-center gap-3 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group bg-[#27645E] hover:bg-[#1f4d47]`}
                  >
                    <span>Call Us Today</span>
                    <span className="w-8 h-8 bg-[#D9FB74] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#234018]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L19.5 4.5M19.5 4.5H9.75M19.5 4.5V14.25" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="w-full py-4 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-[#3D5A52]/10 mt-6">
          <p className={`${inter.className} text-xs md:text-sm text-[#3D5A52]/60 text-center md:text-left`}>
            © {new Date().getFullYear()} NestAid. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-xs md:text-sm">
            <Link href="/privacy-policy" className={`${inter.className} text-[#3D5A52]/60 hover:text-[#3D5A52] transition-colors`}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className={`${inter.className} text-[#3D5A52]/60 hover:text-[#3D5A52] transition-colors`}>
              Terms of Service
            </Link>
            <Link href="/accessibility" className={`${inter.className} text-[#3D5A52]/60 hover:text-[#3D5A52] transition-colors`}>
              Accessibility
            </Link>
            <Link href="/cookie-settings" className={`${inter.className} text-[#3D5A52]/60 hover:text-[#3D5A52] transition-colors`}>
              Cookie Settings
            </Link>
            <Link href="/sensitive-data-settings" className={`${inter.className} text-[#3D5A52]/60 hover:text-[#3D5A52] transition-colors`}>
              Sensitive Data Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
