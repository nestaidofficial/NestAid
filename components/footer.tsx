import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Building2, Phone, Mail, Globe } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: "#1A5463" }}>
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <div className="rounded-full px-4 py-2 shadow-sm border border-white/30 flex items-center" style={{ backgroundColor: '#FCF5EB' }}>
                <Image
                  src="/logo.png"
                  alt="NestAid Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <p className="text-base text-white/90 leading-relaxed">
              At NestAid, we understand the importance of maintaining open communication.
            </p>
            <div className="space-y-2 text-base">
              <div className="flex items-center gap-2 text-white/90">
                <Building2 className="h-5 w-5" />
                <span>Somerville, Massachusetts</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Phone className="h-5 w-5" />
                <span>4129530622</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Mail className="h-5 w-5" />
                <span>information@nestaid.com</span>
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Globe className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-white`}>Quick Links</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/" className="text-white/90 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-white/90 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/90 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/90 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-white`}>Useful links</h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/find-care" className="text-white/90 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/90 hover:text-white transition-colors">
                  Living Options
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/90 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/90 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Hours & CTA */}
          <div className="space-y-4">
            <h3 className={`${playfair.className} text-lg font-bold text-white`}>Open Hours</h3>
            <p className="text-base text-white/90">9 AM - 8 PM, Monday - Sunday</p>
            <p className="text-base text-white/90 leading-relaxed">
              Contact us today to learn more about our senior care services and how we can assist you and your loved ones.
            </p>
            <Link
              href="tel:4129530622"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Call Us Today
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-white/70">© NestAid. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
