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

  const experts = [
    {
      name: "Michael Johnson",
      title: "Director of Senior Services",
      image: "/images/group.png",
      color: "#E8D4F0",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Sophia Grace",
      title: "Senior Nurse",
      image: "/images/senior-care.jpg",
      color: "#A8D5E2",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Ethan Williams",
      title: "Health Officer",
      image: "/images/adult-care.jpg",
      color: "#F2D4F7",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "David Martinez",
      title: "Care Coordinator",
      image: "/images/group.jpg",
      color: "#D896E5",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Jennifer Lee",
      title: "Senior Care Specialist",
      image: "/images/group.png",
      color: "#E8D4F0",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Robert Taylor",
      title: "Patient Care Manager",
      image: "/images/senior-care.jpg",
      color: "#A8D5E2",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    }
  ]

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
                  HELPING SENIORS THRIVE WITH CARE
                </p>
              </div>
              {/* Main Heading */}
              <h1 className={`${playfair.className} text-[40px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.1] mb-8 md:mb-12`} data-aos="fade-up">
                Building A Better<br />
                Tomorrow For Seniors
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
            <div className="max-w-3xl mx-auto" data-aos="fade-up">
              <p className={`${playfair.className} text-xl md:text-2xl lg:text-3xl text-[#1A5463] leading-relaxed text-left`}>
                At NestAid, we believe that growing older should be embraced with dignity, comfort, and joy. Our mission is to provide compassionate adult daycare services that support the emotional, physical, and social well-being of every individual in our care.
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
                Building A Better<br />
                Tomorrow For Seniors
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
                  At NestAid, we provide personalized adult daycare services that prioritize individual needs. Our engaging activities promote mental and physical well-being, while our community environment fosters social connections and a sense of belonging.
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
                  We aim for a world where seniors are valued and involved, with communities that include them in decisions and appreciate their roles. Through lifelong learning, social engagement, and quality healthcare, we strive to improve their lives.
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
                  WE ARE ALWAYS CLOSE
                </p>
              </div>
              
              {/* Heading */}
              <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-white leading-[1.2] mb-6`} data-aos="fade-up">
                Driven By Integrity The<br />
                Principles Steering Every<br />
                Step
              </h2>
              
              {/* Description */}
              <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed mb-8`} data-aos="fade-up">
                Choosing NestAid means placing your loved ones in the hands of a deeply dedicated, compassionate, and experienced team—committed to providing exceptional care.
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
                    We do what's right, even when no one is watching staying true
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D896E5' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className={`${inter.className} text-base text-white/90`}>
                    Excellence we strive for the highest quality in everything aiming to exceed
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D896E5' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className={`${inter.className} text-base text-white/90`}>
                    Collaboration we believe in working together, combining diverse
                  </p>
                </div>
              </div>
              
              {/* CTA Button */}
              <div data-aos="fade-up">
                <button className={`${inter.className} px-8 py-4 rounded-full font-semibold text-white uppercase tracking-wider text-sm transition-all hover:opacity-90`} style={{ backgroundColor: '#D896E5' }}>
                  MAKE AN ENQUIRY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Experts Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F2F2EF' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Top Section - Header with Two Columns */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {/* Left Column - Tagline and Heading */}
              <div data-aos="fade-up">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#8B5CF6] text-xl font-semibold">✺</span>
                  <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                    WE ARE ALWAYS CLOSE
                  </p>
                </div>
                <h2 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.2]`}>
                  Meet Our Experts
                </h2>
              </div>

              {/* Right Column - Description */}
              <div className="flex items-center" data-aos="fade-up">
                <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                  We're redefining the aging journey with compassion and care. We believe every stage of life should be lived with dignity, comfort, and connection.
                </p>
              </div>
            </div>

            {/* Experts Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {experts.map((expert, index) => (
                <div key={expert.name} className="bg-white rounded-2xl overflow-hidden shadow-sm" data-aos="fade-up" data-aos-delay={index * 100}>
                  {/* Image */}
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Info Block */}
                  <div className="p-5" style={{ backgroundColor: expert.color }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`${inter.className} text-lg md:text-xl font-bold text-[#1A5463] mb-1`}>
                          {expert.name}
                        </h3>
                        <p className={`${inter.className} text-sm md:text-base text-[#1A5463]/80`}>
                          {expert.title}
                        </p>
                      </div>
                      
                      {/* Social Icons */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <a 
                          href={expert.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#1A5463] hover:opacity-70 transition-opacity"
                          aria-label="Facebook"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a 
                          href={expert.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#1A5463] hover:opacity-70 transition-opacity"
                          aria-label="LinkedIn"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Senior Care Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/senior-care.jpg"
            alt="Senior care support"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay on Left Side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full container mx-auto px-4 md:px-6 lg:px-12 flex items-center">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h2 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] text-white leading-[1.2] mb-6`} data-aos="fade-up">
              Support Senior Care<br />
              Where It's Needed Most
            </h2>
            
            {/* Description */}
            <p className={`${inter.className} text-base md:text-lg text-white leading-relaxed mb-8`} data-aos="fade-up" data-aos-delay="100">
              Choosing NestAid means placing your loved ones in the hands of a deeply dedicated, compassionate, and experienced team
            </p>
            
            {/* CTA Button */}
            <div data-aos="fade-up" data-aos-delay="200">
              <button className={`${inter.className} px-8 py-4 rounded-full font-semibold text-white uppercase tracking-wider text-sm transition-all hover:opacity-90`} style={{ backgroundColor: '#D896E5' }}>
                MAKE AN ENQUIRY
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
