"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AOS from 'aos'
import { Playfair_Display, Inter } from "next/font/google"
import { GooglePlacesAutocomplete } from "@/components/google-places-autocomplete"
import { SimpleLocationInput } from "@/components/simple-location-input"
import { 
  MapPin, 
  Users, 
  Heart, 
  Clock, 
  TrendingUp, 
  Award, 
  CheckCircle,
  Utensils,
  Car,
  Home,
  Brain,
  Shield,
  Star,
  Quote,
  Navigation,
  AlertCircle,
  Search,
  Calendar,
  UserCircle,
  Sparkles
} from "lucide-react"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

interface LocationData {
  formatted_address: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface JobPosting {
  id: string;
  title: string;
  description: string;
  zipcode: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  created_at: string;
  updated_at: string;
}

export default function FindJobsPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize AOS with optimized settings
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 50,
      anchorPlacement: 'top-bottom'
    } as Parameters<typeof AOS.init>[0]);
  }, []);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setError(null);
  };

  const handleSearchJobs = async () => {
    if (!selectedLocation) {
      setError('Please select a location first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Build search parameters for the results page
      const searchParams = new URLSearchParams();
      
      if (selectedLocation.zipcode) {
        searchParams.append('zipcode', selectedLocation.zipcode);
      } else if (selectedLocation.lat && selectedLocation.lng) {
        searchParams.append('lat', selectedLocation.lat.toString());
        searchParams.append('lng', selectedLocation.lng.toString());
        searchParams.append('radius', '80.47'); // 50 miles in km
      }
      
      // Add the formatted location for display
      searchParams.append('location', selectedLocation.formatted_address);
      
      // Redirect to search results page
      window.location.href = `/jobs/search-results?${searchParams.toString()}`;
    } catch (err) {
      setError('An error occurred while searching for jobs.');
      console.error('Error searching jobs:', err);
      setIsLoading(false);
    }
  };



  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero-section" className="relative w-full min-h-screen overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-12 md:py-16">
            
            {/* Left Image */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-center" data-aos="fade-right" data-aos-delay="200">
              <div className="relative w-[280px] h-[380px] -rotate-3" style={{ transform: 'rotate(-3deg) translateZ(0)', backfaceVisibility: 'hidden' }}>
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/findjobs/image5.jpg"
                    alt="Senior with flowers"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 0vw, 280px"
                  />
                </div>
                {/* Decorative shadow/background */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-[#E8E3FF] -z-10"></div>
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 flex flex-col justify-center items-center text-center space-y-6" data-aos="fade-up">
              {/* Tagline */}
              <p className={`${inter.className} text-sm md:text-base uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold`}>
                CAREER OPPORTUNITIES IN HOME CARE
              </p>

              {/* Main Headline */}
              <div className="relative">
                <h1 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-[#1A5463] leading-[1.1]`}>
                  Find caregiving jobs<br />
                  that fit your life
                </h1>
              </div>

              {/* Description */}
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-lg`}>
                Join a supportive caregiving community where your work is valued. NestAid connects dedicated caregivers with families who need reliable, non-medical in-home support.
              </p>

              {/* ZIP Code Search */}
              <div className="w-full max-w-md space-y-4 pt-4 px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <div className="relative flex-1 w-full">
                    <GooglePlacesAutocomplete
                      onLocationSelect={handleLocationSelect}
                      placeholder="Enter ZIP code or city"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSearchJobs}
                    disabled={isLoading || !selectedLocation}
                    className={`${inter.className} h-14 bg-[#27645E] hover:bg-[#1f4d47] text-white font-semibold text-base px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? 'Searching...' : 'Find Jobs'}
                  </Button>
                </div>
                
                {error && (
                  <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-center" data-aos="fade-left" data-aos-delay="200">
              <div className="relative w-[280px] h-[380px] rotate-3" style={{ transform: 'rotate(3deg) translateZ(0)', backfaceVisibility: 'hidden' }}>
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/findjobs/image3.jpg"
                    alt="Elderly couple"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 0vw, 280px"
                  />
                </div>
                {/* Decorative shadow/background */}
                <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl bg-[#E0E0E0] -z-10"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Images Row */}
        <div className="lg:hidden flex justify-center gap-4 px-4 pb-8">
          <div className="relative w-[140px] h-[180px]" style={{ transform: 'rotate(-3deg) translateZ(0)', backfaceVisibility: 'hidden' }}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/findjobs/image5.jpg"
                alt="Senior with flowers"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 140px, 0vw"
              />
            </div>
          </div>
          <div className="relative w-[140px] h-[180px]" style={{ transform: 'rotate(3deg) translateZ(0)', backfaceVisibility: 'hidden' }}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/findjobs/image3.jpg"
                alt="Elderly couple"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 140px, 0vw"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Why Join Our Care Team Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Content */}
            <div className="space-y-6 order-2 lg:order-1" data-aos="fade-right">
              <div className="flex items-center gap-2">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  JOIN OUR TEAM
                </p>
              </div>
              <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08]`}>
                Why Caregivers Choose NestAid
              </h2>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                Choosing a career in home care means choosing work that truly matters. At NestAid, caregivers play a vital role in helping individuals live safely, comfortably, and with dignity in their own homes.
              </p>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                We support our caregivers with respectful placements, meaningful one-on-one care, and a culture built on trust, compassion, and reliability—because great care starts with feeling valued.
              </p>
            </div>

            {/* Right Section - Image */}
            <div className="relative order-1 lg:order-2" data-aos="fade-left" data-aos-delay="100">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/findjobs/Joinourteam.png" 
                  alt="Caregiver with Senior" 
                  width={600} 
                  height={500}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8E3FF] rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
 {/* Who We're Looking For Section */}
 <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Content */}
            <div className="space-y-6 order-2 lg:order-1" data-aos="fade-right">
              <div className="flex items-center gap-2">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  WHO WE'RE LOOKING FOR
                </p>
              </div>
              <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08]`}>
                Our Caregivers are the heart of our Company
              </h2>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                We welcome individuals who are compassionate, reliable, and committed to making a difference. Whether you're experienced or just beginning your caregiving journey, if you have a genuine desire to help others, we'd love to meet you.
              </p>
              
              {/* Basic Requirements Heading */}
              <h3 className={`${playfair.className} text-2xl md:text-3xl text-[#1A5463] pt-4`}>
                Basic requirements we are looking for-
              </h3>
              
              {/* Qualities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Heart, text: "Compassion & empathy" },
                  { icon: Users, text: "Strong communication skills" },
                  { icon: CheckCircle, text: "Good organization & attention to detail" },
                  { icon: Clock, text: "Excellent time-management" },
                  { icon: Car, text: "A valid driver's license (optional)" },
                  { icon: Shield, text: "Ability to pass background check" }
                ].map((quality, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm border border-[#E8E3FF]">
                    <div className="w-10 h-10 rounded-full bg-[#E8E3FF] flex items-center justify-center flex-shrink-0">
                      <quality.icon className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <span className={`${inter.className} text-sm font-medium text-[#1A5463]`}>{quality.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="relative order-1 lg:order-2" data-aos="fade-left" data-aos-delay="100">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/findjobs/whowearelookingfor.png" 
                  alt="Compassionate Caregiver" 
                  width={600} 
                  height={500}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#8B5CF6]/20 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      {/* What It Means to Be a Caregiver Section */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#1A5463' }}>
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D9FB74] text-lg font-semibold">🌱</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-white/80`}>
                WHAT IT MEANS TO BE A CAREGIVER
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-white leading-[1.08] mb-6`}>
              Caregiving That Supports Daily Life with Dignity
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed`}>
              You are the friendly face, the trusted support, and the steady presence that brings comfort and dignity to clients and their families. Depending on your training and experience, you may help with:
            </p>
          </div>

          {/* Caregiver Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2 lg:px-0">
            
            {/* Card 1: Companionship */}
            <div 
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group transition-all duration-300" 
              style={{ backgroundColor: '#5B8A7D' }} 
              data-aos="fade-up" 
              data-aos-delay="0"
            >
              {/* Decorative Icon - Companionship */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.95">
                  <circle cx="22" cy="26" r="6" fill="white"/>
                  <circle cx="42" cy="26" r="6" fill="white"/>
                  <path d="M12 44C12 38 16 34 22 34C26 34 28.5 35.5 30 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M52 44C52 38 48 34 42 34C38 34 35.5 35.5 34 38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="32" cy="20" r="4" fill="white" opacity="0.8"/>
                  <path d="M20 40C20 36 24 32 32 32C40 32 44 36 44 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
                </svg>
              </div>
              
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4`}>
                Companionship
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed`}>
                Meaningful companionship that brightens each day with care.
              </p>
            </div>

            {/* Card 2: Personal Care */}
            <div 
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group transition-all duration-300" 
              style={{ backgroundColor: '#B084CC' }} 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              {/* Decorative Icon - Personal Care */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.95">
                  <path d="M32 18C32 18 24 12 18 15C12 18 12 26 18 32C22 36 32 46 32 46C32 46 42 36 46 32C52 26 52 18 46 15C40 12 32 18 32 18Z" fill="white"/>
                  <circle cx="32" cy="28" r="8" fill="white" opacity="0.3"/>
                  <path d="M24 36L28 40L40 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                </svg>
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4`}>
                Personal Care
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed`}>
                Compassionate personal care with dignity and respect.
              </p>
            </div>

            {/* Card 3: Household Help */}
            <div 
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group transition-all duration-300" 
              style={{ backgroundColor: '#6B6B6B' }} 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              {/* Decorative Icon - Household Help */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.95">
                  <path d="M32 12L18 24V48C18 49.1046 18.8954 50 20 50H24V38C24 36.8954 24.8954 36 26 36H38C39.1046 36 40 36.8954 40 38V50H44C45.1046 50 46 49.1046 46 48V24L32 12Z" fill="white"/>
                  <rect x="28" y="40" width="8" height="10" fill="white" opacity="0.2"/>
                  <circle cx="46" cy="28" r="2" fill="white" opacity="0.6"/>
                  <path d="M16 52L48 52" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4`}>
                Household Help
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed`}>
                Keeping your home comfortable, organized, and welcoming.
              </p>
            </div>

            {/* Card 4: Respite Care */}
            <div 
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group transition-all duration-300" 
              style={{ backgroundColor: '#A6C8E1' }} 
              data-aos="fade-up" 
              data-aos-delay="0"
            >
              {/* Decorative Icon - Respite Care */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.95">
                  <path d="M32 14L18 20V34C18 42 24 48 32 50C40 48 46 42 46 34V20L32 14Z" fill="#1A5463" stroke="#1A5463" strokeWidth="2" strokeLinejoin="round" opacity="0.9"/>
                  <path d="M32 24L28 28L32 32L36 28L32 24Z" fill="#fff" opacity="0.6"/>
                  <circle cx="32" cy="38" r="3" fill="#fff" opacity="0.7"/>
                  <path d="M26 40L38 40" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                </svg>
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4`}>
                Respite Care
              </h3>
              <p className={`${inter.className} text-[#1A5463] text-base leading-relaxed`}>
                Temporary relief for family caregivers, ensuring continuous care.
              </p>
            </div>

            {/* Card 5: Meal Preparation */}
            <div 
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group transition-all duration-300" 
              style={{ backgroundColor: '#D4B896' }} 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              {/* Decorative Icon - Meal Preparation */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.95">
                  <circle cx="32" cy="32" r="18" fill="#fff" opacity="0.85"/>
                  <circle cx="32" cy="32" r="14" stroke="#D4B896" strokeWidth="2" opacity="0.4"/>
                  <path d="M24 24L28 28M32 20L32 28M40 24L36 28" stroke="#D4B896" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
                  <path d="M32 38C34.2091 38 36 36.2091 36 34C36 31.7909 34.2091 30 32 30C29.7909 30 28 31.7909 28 34C28 36.2091 29.7909 38 32 38Z" fill="#D4B896" opacity="0.5"/>
                </svg>
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4`}>
                Meal Preparation
              </h3>
              <p className={`${inter.className} text-[#4A4A4A] text-base leading-relaxed`}>
                Healthy, delicious meals prepared with care and consideration.
              </p>
            </div>

            {/* Card 6: Transportation */}
            <div 
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group transition-all duration-300" 
              style={{ backgroundColor: '#5B8A7D' }} 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              {/* Decorative Icon - Transportation */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.95">
                  <path d="M16 38C16 40.2091 17.7909 42 20 42C22.2091 42 24 40.2091 24 38C24 35.7909 22.2091 34 20 34C17.7909 34 16 35.7909 16 38Z" fill="white"/>
                  <path d="M40 38C40 40.2091 41.7909 42 44 42C46.2091 42 48 40.2091 48 38C48 35.7909 46.2091 34 44 34C41.7909 34 40 35.7909 40 38Z" fill="white"/>
                  <path d="M50 32L52 26C52.5 24 51 22 49 22H44L40 18H24L20 22H15C13 22 11.5 24 12 26L14 32L10 36V44C10 45.1046 10.8954 46 12 46H14C15.1046 46 16 45.1046 16 44V42H48V44C48 45.1046 48.8954 46 50 46H52C53.1046 46 54 45.1046 54 44V36L50 32Z" fill="white"/>
                  <rect x="18" y="26" width="28" height="12" rx="2" fill="white" opacity="0.3"/>
                  <path d="M24 30L40 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4`}>
                Transportation
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed`}>
                Safe, reliable rides to keep you connected and independent.
              </p>
            </div>

          </div>
        </div>
      </section>

     

      {/* A Career With Purpose Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Image */}
            <div className="relative" data-aos="fade-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/findjobs/careerwithpurpose.png" 
                  alt="Career with Purpose" 
                  width={600} 
                  height={500}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8E3FF] rounded-3xl -z-10"></div>
            </div>

            {/* Right Section - Content */}
            <div className="space-y-6" data-aos="fade-left" data-aos-delay="100">
              <div className="flex items-center gap-2">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  A CAREER WITH PURPOSE
                </p>
              </div>
              <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08]`}>
                When you Join our Team You Join A Family
              </h2>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                We believe in supporting you with ongoing training, guidance, and a work environment where you feel valued and appreciated.
              </p>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                Our caregivers play a vital role in our mission to provide exceptional care in the community, and we're committed to helping you grow—professionally and personally.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Calendar, text: "Flexible schedules" },
                  { icon: Heart, text: "Meaningful one-on-one care" },
                  { icon: Users, text: "Supportive care team" },
                  { icon: Home, text: "Non-medical home care roles" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm border border-[#E8E3FF] hover:shadow-md transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-[#E8E3FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B5CF6] transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-[#8B5CF6] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className={`${inter.className} text-base font-medium text-[#1A5463]`}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Support Section */}
      <section className="py-20 md:py-28 overflow-hidden bg-background">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                TRAINING & SUPPORT
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08] mb-6`}>
              We Support You at Every Step
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-3xl mx-auto`}>
              From day one, we provide the training, guidance, and support you need to feel confident and prepared in your role.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto px-2 lg:px-0">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="0">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Comprehensive Training</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                Full onboarding and ongoing training to help you feel confident, capable, and supported.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Flexible Scheduling</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                Flexible schedules that fit your life—not the other way around.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Career Growth</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                Opportunities to grow your skills, gain experience, and take on meaningful responsibilities.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Supportive Community</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                A responsive, respectful team that listens and supports you when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                JOIN OUR CARE TEAM
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08] mb-6`}>
              Ready to Make a Difference?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] mb-10 leading-relaxed`}>
              Join a team where your compassion, reliability, and care truly matter—to families and to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  const heroSection = document.getElementById('hero-section');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${inter.className} h-14 bg-[#27645E] hover:bg-[#1f4d47] text-white font-semibold text-base px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Start Your Application
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}