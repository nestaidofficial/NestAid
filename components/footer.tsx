import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Building2, Phone, Mail, Globe } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <p className="text-base text-[#1A5463] leading-relaxed">
              At NestAid, we understand the importance of maintaining open communication.
            </p>
            <div className="space-y-2 text-base">
              <div className="flex items-center gap-2 text-[#1A5463]">
                <Building2 className="h-5 w-5" />
                <span>Somerville, Massachusetts</span>
              </div>
              <div className="flex items-center gap-2 text-[#1A5463]">
                <Phone className="h-5 w-5" />
                <span>4129530622</span>
              </div>
              <div className="flex items-center gap-2 text-[#1A5463]">
                <Mail className="h-5 w-5" />
                <span>information@nestaid.com</span>
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-[#1A5463]/30 bg-[#1A5463]/10 hover:bg-[#1A5463]/20 flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4 text-[#1A5463]" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-[#1A5463]/30 bg-[#1A5463]/10 hover:bg-[#1A5463]/20 flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4 text-[#1A5463]" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-[#1A5463]/30 bg-[#1A5463]/10 hover:bg-[#1A5463]/20 flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4 text-[#1A5463]" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-[#1A5463]/30 bg-[#1A5463]/10 hover:bg-[#1A5463]/20 flex items-center justify-center transition-colors">
                <Globe className="h-4 w-4 text-[#1A5463]" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-[#1A5463]`}>Quick Links</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-[#1A5463]`}>Useful links</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/find-care" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Living Options
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#1A5463] hover:text-[#275F48] transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Hours & CTA */}
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-[#1A5463]`}>Open Hours</h3>
            <p className="text-base text-[#1A5463]">9 AM - 8 PM, Monday - Sunday</p>
            <p className="text-base text-[#1A5463] leading-relaxed">
              Contact us today to learn more about our senior care services and how we can assist you and your loved ones.
            </p>
            <Link
              href="tel:4129530622"
              className="inline-block text-white font-semibold px-6 py-3 rounded-full transition-colors hover:bg-[#1f4a37]"
              style={{ backgroundColor: '#275F48' }}
            >
              Call Us Today
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#1A5463]/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-[#1A5463]/70">© NestAid. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
