"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Phone } from "lucide-react"
import { GetStartedModal } from "./get-started-modal"
import { MobileHeaderExtension } from "./mobile-header-extension"

export function HeaderClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isCallButtonVisible, setIsCallButtonVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")

  useEffect(() => {
    let ticking = false
    let lastKnownScrollY = 0
    
    const handleScroll = () => {
      lastKnownScrollY = window.scrollY
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = lastKnownScrollY
          const heroSectionHeight = window.innerHeight // Hero section is 100vh
          const scrollDelta = currentScrollY - lastScrollY
          
          // Only trigger state change if scroll delta is significant (> 5px)
          // This prevents micro-movements from causing glitches
          if (Math.abs(scrollDelta) > 5) {
            // Show header if scrolling up or if still in hero section
            if (scrollDelta < 0 || currentScrollY <= heroSectionHeight) {
              setIsHeaderVisible(true)
            } else if (scrollDelta > 0 && currentScrollY > heroSectionHeight) {
              // Hide header only when scrolling down AND past hero section
              setIsHeaderVisible(false)
            }
            
            // Call button visibility - show when scrolling up, hide when scrolling down
            if (scrollDelta < 0 && currentScrollY > 100) {
              // Scrolling up and not at the very top
              setIsCallButtonVisible(true)
            } else if (scrollDelta > 0 || currentScrollY <= 100) {
              // Scrolling down or near the top
              setIsCallButtonVisible(false)
            }
            
            setLastScrollY(currentScrollY)
          }
          
          ticking = false
        })
        
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header 
        className={`fixed top-0 z-40 w-full bg-transparent ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`} 
        style={{ 
          backgroundColor: 'transparent', 
          backdropFilter: 'none',
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform'
        }}
      >

      <div className="container mx-auto flex items-center justify-between px-4" style={{ height: '4rem', minHeight: '4rem', maxHeight: '4rem' }}>
        <Link href="/" className="flex items-center">
          <div className="rounded-full px-4 py-2  flex items-center" style={{ backgroundColor: '#DEED6A' }}>
            <Image
              src="/logo.png"
              alt="NestAid Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation - Moved to right side */}
          {!isAdminPage && (
            <nav className="hidden md:flex items-center">
              <div className="rounded-full px-2 py-2 shadow-sm border border-gray-200/50" style={{ backgroundColor: '#DBD9FE' }}>
                <div className="flex items-center gap-1">
                  <Link href="/find-care" className="text-base font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-gray-900">
                    Find care
                  </Link>
                  <Link href="/jobs/senior-care" className="text-base font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-gray-900">
                    Find jobs
                  </Link>
                  <Link href="/resources" className="text-base font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-gray-900">
                    Resources
                  </Link>
                </div>
              </div>
            </nav>
          )}

          {/* Header Buttons - Hidden on mobile, shown on desktop */}
          {!isAdminPage && (
            <div className="hidden md:flex items-center gap-3">
              {/* Contact Us Button */}
              <Button
                onClick={() => setGetStartedModalOpen(true)}
                className="rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-all shadow-sm border border-gray-200/50 px-6 py-6"
                style={{ backgroundColor: '#DBD9FE', fontSize: '1rem', lineHeight: '1.5' }}
              >
                Join Now
              </Button>
              {/* Call Button */}
              <Button
                asChild
                className="rounded-full font-medium hover:bg-[#1f4a37] transition-all shadow-sm border border-gray-200/50 px-6 py-6"
                style={{ backgroundColor: '#DEED6A', fontSize: '1rem', lineHeight: '1.5' }}
              >
                <Link href="tel:4129530622" className="flex items-center gap-2 " >
                  <Phone className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-900" style={{  fontSize: '1rem', lineHeight: '1.5' }} >(412) 953-0622</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Menu - Hidden on desktop */}
          <div className="md:hidden mr-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="rounded-full px-6 py-4" style={{ backgroundColor: '#DBD9FE' }}>
                  <Menu className="h-12 w-12" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" style={{ backgroundColor: '#F5F5F0' }}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col space-y-2 mt-6">
                  {!isAdminPage && (
                    <>
                      <Link href="/find-care" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-white/50">Find care</Link>
                      <Link href="/jobs/senior-care" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-white/50">Find jobs</Link>
                      <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-white/50">Resources</Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
        {/* Get Started Modal - Desktop only, mobile uses FAB */}
        <div className="hidden md:block">
          <GetStartedModal 
            isOpen={getStartedModalOpen} 
            onClose={() => setGetStartedModalOpen(false)} 
          />
        </div>
      </header>
      
      {/* Mobile Header Extension - Shows location and phone on mobile */}
      <MobileHeaderExtension isAdminPage={isAdminPage} />
      
      {/* Mobile Call Button - Sticky at bottom left, hidden on desktop, shows on scroll up */}
      {!isAdminPage && (
        <div 
          className={`md:hidden fixed bottom-6 left-6 z-50 transition-all duration-300 ${
            isCallButtonVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
        >
          <Link href="tel:4129530622">
            <button
              className="w-16 h-16 rounded-full flex items-center justify-center active:scale-95 relative group"
              style={{
                backgroundColor: '#8B5CF6',
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              aria-label="Call us"
            >
              <Phone className="w-7 h-7 text-white transition-transform group-hover:scale-110" />
            </button>
          </Link>
        </div>
      )}
    </>
  )
}

