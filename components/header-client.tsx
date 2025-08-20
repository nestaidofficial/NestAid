"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Menu, Phone, ChevronDown } from "lucide-react"
import { GetStartedModal } from "./get-started-modal"
import { MobileHeaderExtension } from "./mobile-header-extension"

export function HeaderClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroSectionHeight = window.innerHeight // Hero section is 100vh
      
      // Show header if scrolling up (any amount) or if still in hero section
      if (currentScrollY < lastScrollY || currentScrollY <= heroSectionHeight) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > heroSectionHeight) {
        // Hide header only when scrolling down AND past hero section
        setIsHeaderVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header 
        className={`fixed top-0 z-40 w-full bg-transparent transition-transform duration-300 ${
          isHeaderVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`} 
        style={{ backgroundColor: 'transparent', backdropFilter: 'none' }}
      >

      <div className="container mx-auto flex items-center justify-between px-4" style={{ height: '4rem', minHeight: '4rem', maxHeight: '4rem' }}>
        <Link href="/" className="flex items-center">
          <div className="bg-green-700 rounded-full px-6 py-3 shadow-sm">
            <span className="text-white font-serif text-xl font-medium">NestAid</span>
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
                  <Link href="/family-caregivers" className="text-base font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-gray-900">
                    Family Caregivers
                  </Link>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-base font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-gray-900 !bg-transparent data-[state=open]:!bg-gray-100">
                          Resources
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[280px] gap-3 p-4">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link href="/about-us" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 text-sm font-medium">About us</Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link href="/cost-of-care" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 text-sm font-medium">Cost of care calculator</Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link href="/help-center" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 text-sm font-medium">Help center</Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            </nav>
          )}

          {/* Header Buttons - Hidden on mobile, shown on desktop */}
          {!isAdminPage && (
            <div className="hidden md:flex items-center">
              {/* Contact Us Button */}
              <Button
                onClick={() => setGetStartedModalOpen(true)}
                className="rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-all shadow-sm border border-gray-200/50 px-6 py-6"
                style={{ backgroundColor: '#E4F2D4', fontSize: '1rem', lineHeight: '1.5' }}
              >
                Join Now
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
              <SheetContent side="right" className="w-80" style={{ backgroundColor: '#E4F2D8' }}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col space-y-2 mt-6">
                  {!isAdminPage && (
                    <>
                      <Link href="/find-care" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-[#D9FB74]">Find care</Link>
                      <Link href="/jobs/senior-care" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-[#D9FB74]">Find jobs</Link>
                      <Link href="/family-caregivers" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-[#D9FB74]">Family Caregivers</Link>
                      <button onClick={() => setMobileResourcesOpen(prev => !prev)} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-[#D9FB74]">
                        Resources
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileResourcesOpen && (
                        <div className="pl-3 space-y-1">
                          <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-[#D9FB74]">About us</Link>
                          <Link href="/cost-of-care" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-[#D9FB74]">Cost of care calculator</Link>
                          <Link href="/help-center" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-[#D9FB74]">Help center</Link>
                        </div>
                      )}
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
    </>
  )
}

