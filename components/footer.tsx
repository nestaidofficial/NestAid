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
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div className="space-y-5">
            <h3 className={`${playfair.className} text-2xl font-bold text-[#0D2F3A] mb-4`}>NestAid</h3>
            <p className={`${inter.className} text-[15px] text-[#1A5463]/80 leading-relaxed`}>
              At NestAid, we understand the importance of maintaining open communication.
            </p>
            <div className="space-y-3 text-[15px]">
              <div className="flex items-center gap-3 text-[#1A5463]/80 hover:text-[#275F48] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                  <Building2 className="h-4 w-4 text-[#8B5CF6]" />
                </div>
                <span className={inter.className}>Somerville, Massachusetts</span>
              </div>
              <div className="flex items-center gap-3 text-[#1A5463]/80 hover:text-[#275F48] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                  <Phone className="h-4 w-4 text-[#8B5CF6]" />
                </div>
                <span className={inter.className}>4129530622</span>
              </div>
              <div className="flex items-center gap-3 text-[#1A5463]/80 hover:text-[#275F48] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                  <Mail className="h-4 w-4 text-[#8B5CF6]" />
                </div>
                <span className={inter.className}>information@nestaid.com</span>
              </div>
            </div>
            <div className="flex space-x-3 pt-3">
              <Link href="#" className="w-10 h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group">
                <Facebook className="h-4 w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group">
                <Instagram className="h-4 w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group">
                <Twitter className="h-4 w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-xl bg-white hover:bg-[#8B5CF6] shadow-sm hover:shadow-md flex items-center justify-center transition-all group">
                <Globe className="h-4 w-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className={`${playfair.className} text-xl font-bold text-[#0D2F3A]`}>Quick Links</h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link href="/" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → About Us
                </Link>
              </li>
              <li>
                <Link href="/help-center" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-5">
            <h3 className={`${playfair.className} text-xl font-bold text-[#0D2F3A]`}>Useful links</h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link href="/find-care" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Services
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Living Options
                </Link>
              </li>
              <li>
                <Link href="#" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Contact Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className={`${inter.className} text-[#1A5463]/80 hover:text-[#275F48] hover:translate-x-1 inline-block transition-all`}>
                  → Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Hours & CTA */}
          <div className="space-y-5">
            <h3 className={`${playfair.className} text-xl font-bold text-[#0D2F3A]`}>Get In Touch</h3>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 space-y-3 border border-[#8B5CF6]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className={`${inter.className} text-xs text-[#1A5463]/60 font-medium uppercase tracking-wider`}>Open Hours</p>
                  <p className={`${inter.className} text-sm font-semibold text-[#0D2F3A]`}>9 AM - 8 PM, Daily</p>
                </div>
              </div>
              <p className={`${inter.className} text-[14px] text-[#1A5463]/80 leading-relaxed`}>
                Contact us today to learn more about our senior care services and how we can assist you.
              </p>
              <Link
                href="tel:4129530622"
                className={`${inter.className} w-full inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95`}
                style={{ 
                  background: 'linear-gradient(135deg, #275F48 0%, #1f4a37 100%)',
                }}
              >
                <Phone className="h-4 w-4" />
                Call Us Today
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#1A5463]/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`${inter.className} text-sm text-[#1A5463]/60`}>
            © {new Date().getFullYear()} NestAid. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className={`${inter.className} text-[#1A5463]/60 hover:text-[#275F48] transition-colors`}>
              Privacy Policy
            </Link>
            <Link href="#" className={`${inter.className} text-[#1A5463]/60 hover:text-[#275F48] transition-colors`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
