"use client"

import { useEffect } from "react"
import Image from "next/image"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function AboutUsPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col">
        {/* Top Section - Text on Cream Background (1/3 of height) */}
        <div className="relative flex-shrink-0" style={{ backgroundColor: '#FCF5EB', height: '33.33vh', minHeight: '300px' }}>
          <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center pt-12 md:pt-16">
              {/* Tagline */}
              <div className="flex items-center justify-center gap-2 mb-4 mt-8 md:mt-12" data-aos="fade-up">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  CARE THAT FEELS LIKE FAMILY
                </p>
              </div>
              {/* Main Heading */}
              <h1 className={`${playfair.className} text-[40px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.1] mb-8 md:mb-12`} data-aos="fade-up">
                Building a Better Tomorrow,<br />
                at Home
              </h1>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Image (2/3 of height) */}
        <div className="relative w-full flex-shrink-0" style={{ height: '70vh', minHeight: '700px' }}>
          <Image
            src="/images/group.jpg"
            alt="Caregiver with senior"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 md:py-32 lg:py-40" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-10 md:mb-12 text-center justify-center" data-aos="fade-up">
              <span className="text-[#8B5CF6] text-xl md:text-2xl font-semibold">✺</span>
              <p className={`${inter.className} text-sm md:text-base uppercase tracking-[0.35em] text-[#1A5463]`}>
                WHO WE ARE
              </p>
            </div>
            {/* Content */}
            <div className="max-w-3xl mx-auto space-y-6" data-aos="fade-up">
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                At NestAid, we believe care should feel personal, respectful, and reassuring. We support adults and seniors with thoughtful in-home care that helps them live safely, comfortably, and independently in the place they call home.
              </p>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                Our approach is centered on dignity, consistency, and genuine human connection—so families can feel confident knowing their loved ones are cared for with attention and heart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16" data-aos="fade-up">
              {/* Tagline */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-[#8B5CF6] text-xl font-semibold">✺</span>
                <p className={`${inter.className} text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  THOUGHTFUL CARE FOR EVERY NEED
                </p>
              </div>
              {/* Heading */}
              <h2 className={`${playfair.className} text-[40px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.1]`}>
                Supporting Better Living—<br />
                Today and Tomorrow
              </h2>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12" data-aos="fade-up">
              {/* Our Mission Card */}
              <div className="rounded-3xl p-8" style={{ backgroundColor: '#A8D5E2' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#1A5463]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463]`}>
                      Our Mission
                    </h3>
                  </div>
                </div>
                <p className={`${inter.className} text-sm md:text-base text-[#1A5463] leading-relaxed`}>
                  At NestAid, our mission is to provide personalized in-home care that honors each individual's needs, routines, and independence. Through thoughtful support and meaningful companionship, we promote physical well-being, emotional comfort, and a genuine sense of connection—right at home.
                </p>
              </div>

              {/* Our Vision Card */}
              <div className="rounded-3xl p-8" style={{ backgroundColor: '#D896E5' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                      <circle cx="8" cy="8" r="4"/>
                      <circle cx="16" cy="8" r="4"/>
                      <circle cx="8" cy="16" r="4"/>
                      <circle cx="16" cy="16" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white`}>
                      Our Vision
                    </h3>
                  </div>
                </div>
                <p className={`${inter.className} text-sm md:text-base text-white leading-relaxed`}>
                  To redefine in-home care by creating a future where every adult and senior can age with dignity, independence, and peace of mind—supported by compassionate care that feels like family.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden" data-aos="fade-up">
              <Image
                src="/images/senior-care.jpg"
                alt="Healthcare professional"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#2A5F5A' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Decorative Image Container */}
            <div className="relative" data-aos="fade-right">
              {/* Pink Container with Triangle Pattern */}
              <div className="relative rounded-2xl overflow-visible" style={{ backgroundColor: '#F2D4F7', padding: '40px' }}>
            {/* Triangle Pattern Background */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                      <pattern id="trianglePattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                        <polygon points="25,8 21,16 29,16" fill="#2A5F5A" opacity="0.5"/>
                  </pattern>
                </defs>
                    <rect width="100%" height="100%" fill="url(#trianglePattern)"/>
              </svg>
            </div>
            
                {/* Circular Image Container */}
                <div className="relative w-full aspect-square max-w-[420px] mx-auto">
                  {/* White arc decoration at top right */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 md:w-40 md:h-40 bg-[#2A5F5A] rounded-full z-0" />
                  
                  {/* Main circular image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl z-10">
                  <Image
                    src="/images/senior-care.jpg"
                    alt="Caregiver assisting senior"
                    fill
                    className="object-cover"
                  />
              </div>
            </div>
            
                {/* Decorative Cross at bottom left */}
                <div className="absolute bottom-6 left-6 z-20">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="22" y="0" width="16" height="60" rx="8" fill="#2A5F5A"/>
                    <rect x="0" y="22" width="60" height="16" rx="8" fill="#2A5F5A"/>
              </svg>
                </div>
            </div>
          </div>

          {/* Right Side - Content */}
            <div className="py-8 md:py-12">
              {/* Tagline */}
              <div className="flex items-center gap-2 mb-6" data-aos="fade-up">
                <span className="text-[#D896E5] text-xl font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-white`}>
                  WHAT GUIDES US
                </p>
              </div>
              
              {/* Heading */}
              <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-white leading-[1.2] mb-6`} data-aos="fade-up">
                Care Rooted in Integrity,<br />
                Guided by Purpose
              </h2>
              
              {/* Description */}
              <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed mb-8`} data-aos="fade-up">
                Choosing NestAid means choosing a team that leads with honesty, compassion, and accountability. Every decision we make is grounded in what's best for the individuals and families we serve—because trust is the foundation of meaningful care.
              </p>
              
              {/* Checkpoints */}
              <div className="space-y-4 mb-8" data-aos="fade-up">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D896E5' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className={`${inter.className} text-base text-white/90`}>
                    <span className="font-semibold text-white">Integrity</span> We do what's right, consistently and transparently
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D896E5' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className={`${inter.className} text-base text-white/90`}>
                    <span className="font-semibold text-white">Excellence</span> We hold ourselves to high standards to deliver reliable, thoughtful care every day.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D896E5' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className={`${inter.className} text-base text-white/90`}>
                    <span className="font-semibold text-white">Collaboration</span> We work closely with families, caregivers, and communities to create the best outcomes together.
                  </p>
                </div>
              </div>
              
              {/* CTA Button */}
              <div data-aos="fade-up">
                <button className={`${inter.className} px-8 py-4 rounded-full font-semibold text-white uppercase tracking-wider text-sm transition-all hover:opacity-90`} style={{ backgroundColor: '#27645E' }}>
                  MAKE AN ENQUIRY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
