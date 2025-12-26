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
    <footer 
      className="relative"
      style={{ 
        background: "linear-gradient(180deg, #FCF5EB 0%, #F5F1E8 50%, #EDE9E0 100%)",
      }}
    >
      <div className="container mx-auto px-5 md:px-4 pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Information */}
          <div className="space-y-4 md:space-y-5">
            <h3 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#0D2F3A] mb-3 md:mb-4`}>NestAid</h3>
            <p className={`${inter.className} text-sm md:text-[15px] text-[#1A5463]/80 leading-relaxed`}>
              At NestAid, we understand the importance of maintaining open communication.
            </p>
            <div className="space-y-2.5 md:space-y-3 text-sm md:text-[15px]">
              <div className="flex items-center gap-2.5 md:gap-3 text-[#1A5463]/80 hover:text-[#275F48] transition-colors group">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors flex-shrink-0">
                  <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6]" />
                </div>
                <span className={`${inter.className} break-words`}>Somerville, Massachusetts</span>
              </div>
              <div className="flex items-center gap-2.5 md:gap-3 text-[#1A5463]/80 hover:text-[#275F48] transition-colors group">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors flex-shrink-0">
                  <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6]" />
                </div>
                <Link href="tel:4129530622" className={`${inter.className} break-words`}>4129530622</Link>
              </div>
              <div className="flex items-start gap-2.5 md:gap-3 text-[#1A5463]/80 hover:text-[#275F48] transition-colors group">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors flex-shrink-0 mt-0.5">
                  <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6]" />
                </div>
                <Link href="mailto:information@nestaid.com" className={`${inter.className} break-all text-sm md:text-base`}>information@nestaid.com</Link>
              </div>
            </div>
            <div className="flex space-x-2.5 md:space-x-3 pt-2 md:pt-3">
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group active:scale-95">
                <Facebook className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group active:scale-95">
                <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group active:scale-95">
                <Twitter className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group active:scale-95">
                <Globe className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:space-y-5">
            <h3 className={`${playfair.className} text-lg md:text-xl font-bold text-[#0D2F3A]`}>Quick Links</h3>
            <ul className="space-y-2.5 md:space-y-3 text-sm md:text-[15px]">
              <li>
                <Link href="/" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → About Us
                </Link>
              </li>
              <li>
                <Link href="/help-center" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-4 md:space-y-5">
            <h3 className={`${playfair.className} text-lg md:text-xl font-bold text-[#0D2F3A]`}>Useful links</h3>
            <ul className="space-y-2.5 md:space-y-3 text-sm md:text-[15px]">
              <li>
                <Link href="/find-care" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Services
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Living Options
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Contact Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all py-1 active:text-[#275F48]`}>
                  → Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Hours & CTA */}
          <div className="space-y-4 md:space-y-5">
            <h3 className={`${playfair.className} text-lg md:text-xl font-bold text-[#0D2F3A]`}>Get In Touch</h3>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 space-y-3 border border-[#8B5CF6]/10 shadow-sm">
              <div className="flex items-center gap-2.5 md:gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <p className={`${inter.className} text-[10px] md:text-xs text-[#1A5463]/60 font-medium uppercase tracking-wider`}>Open Hours</p>
                  <p className={`${inter.className} text-xs md:text-sm font-semibold text-[#0D2F3A]`}>9 AM - 8 PM, Daily</p>
                </div>
              </div>
              <p className={`${inter.className} text-xs md:text-[14px] text-[#1A5463]/80 leading-relaxed`}>
                Contact us today to learn more about our senior care services and how we can assist you.
              </p>
              <Link
                href="tel:4129530622"
                className={`${inter.className} w-full inline-flex items-center justify-center gap-2 text-white font-semibold text-sm md:text-base px-5 md:px-6 py-3 md:py-3.5 rounded-lg md:rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95`}
                style={{ 
                  background: 'linear-gradient(135deg, #275F48 0%, #1f4a37 100%)',
                }}
              >
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
                Call Us Today
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#1A5463]/10 mt-10 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-4">
          <p className={`${inter.className} text-xs md:text-sm text-[#1A5463]/60 text-center md:text-left`}>
            © {new Date().getFullYear()} NestAid. All Rights Reserved.
          </p>
          <div className="flex gap-5 md:gap-6 text-xs md:text-sm">
            <Link href="#" className={`${inter.className} text-[#1A5463]/60 hover:text-[#275F48] transition-colors active:text-[#275F48]`}>
              Privacy Policy
            </Link>
            <Link href="#" className={`${inter.className} text-[#1A5463]/60 hover:text-[#275F48] transition-colors active:text-[#275F48]`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
