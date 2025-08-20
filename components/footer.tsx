import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Maya Care Logo" width={120} height={32} className="brightness-0 invert" />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Find trusted care, for peace of mind. Connecting families with qualified caregivers across the country.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/care/in-home-care" className="text-primary-foreground/80 hover:text-primary-foreground">
                  In-home care
                </Link>
              </li>
              <li>
                <Link href="/care/companion-care" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Companion care
                </Link>
              </li>
              <li>
                <Link
                  href="/care/special-needs-care"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Special needs care
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-primary-foreground/80 hover:text-primary-foreground">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/safety-center" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Safety center
                </Link>
              </li>
              <li>
                <Link href="/become-a-partner" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Become a partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help-center" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="/cost-of-care" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Cost of care
                </Link>
              </li>
              <li>
                <Link href="/corporate-benefits" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Corporate benefits
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60">© 2024 Maya Care. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
