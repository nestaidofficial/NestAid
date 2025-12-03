"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AOS from 'aos'
import 'aos/dist/aos.css'
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
  Search
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

  // Initialize AOS with smooth settings
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
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
      <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-12 md:py-16">
            
            {/* Left Image */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-center" data-aos="fade-right" data-aos-delay="200">
              <div className="relative w-[280px] h-[380px] transform -rotate-3">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/adult-care.jpg"
                    alt="Senior with flowers"
                    fill
                    className="object-cover"
                    priority
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
                SENIOR CARE SERVICES
              </p>

              {/* Main Headline */}
              <div className="relative">
                <h1 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-[#1A5463] leading-[1.1]`}>
                  Best elder care for<br />
                  <span className="relative inline-block">
                    your loved ones
                    {/* Decorative underline */}
                    <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 8C50 2 100 10 150 6C200 2 250 10 298 4" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-lg`}>
                Join our growing team of caregivers and make every day meaningful. We connect compassionate caregivers with families who need support.
              </p>

              {/* Postal Code Search */}
              <div className="w-full max-w-md space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <div className="relative flex-1 w-full">
                    <GooglePlacesAutocomplete
                      onLocationSelect={handleLocationSelect}
                      placeholder="Enter Postal Code or City"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSearchJobs}
                    disabled={isLoading || !selectedLocation}
                    className={`${inter.className} h-14 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
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
              <div className="relative w-[280px] h-[380px] transform rotate-3">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/senior-care.jpg"
                    alt="Elderly couple"
                    fill
                    className="object-cover"
                    priority
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
          <div className="relative w-[140px] h-[180px] transform -rotate-3">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/adult-care.jpg"
                alt="Senior with flowers"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative w-[140px] h-[180px] transform rotate-3">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/senior-care.jpg"
                alt="Elderly couple"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Why Join Our Care Team Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Image */}
            <div className="relative" data-aos="fade-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/group.jpg" 
                  alt="Care Team" 
                  width={600} 
                  height={500}
                  className="object-cover w-full h-[400px] md:h-[500px]" 
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
                  JOIN OUR TEAM
                </p>
              </div>
              <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08]`}>
                Why Join Our Care Team?
              </h2>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                Choosing a career in home care means choosing a profession that truly matters. In-home caregiving is one of the fastest-growing, most stable, and most meaningful fields today.
              </p>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                It is a role built on trust, compassion, and human connection—and one where you can make an immediate, lasting impact on someone's life.
              </p>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                More than <span className="font-bold text-[#8B5CF6]">90% of people</span> view in-home care as an essential, respected profession. When you join our team, you become part of a community that values dignity, compassion, and the belief that every person deserves to age comfortably in their own home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Means to Be a Caregiver Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#1A5463' }}>
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
              Our Caregivers Are The Heart Of Our Company
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed`}>
              You are the friendly face, the trusted support, and the steady presence that brings comfort and dignity to clients and their families. Depending on your training and experience, you may help with:
            </p>
          </div>

          {/* Caregiver Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Alzheimer's & Dementia Support */}
            <div className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#5B8A7D' }} data-aos="fade-up" data-aos-delay="0">
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-12 h-12 text-white/80" />
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4 mt-8`}>
                Alzheimer's & Dementia Support
              </h3>
              <p className={`${inter.className} text-white/90 text-base leading-relaxed`}>
                Providing patience, understanding, and safety for clients with memory challenges.
              </p>
            </div>

            {/* Card 2: Meal Preparation */}
            <div className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#B084CC' }} data-aos="fade-up" data-aos-delay="100">
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="w-12 h-12 text-white/80" />
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4 mt-8`}>
                Meal Preparation
              </h3>
              <p className={`${inter.className} text-white/90 text-base leading-relaxed`}>
                Preparing nutritious meals that support health and daily comfort.
              </p>
            </div>

            {/* Card 3: Household Help */}
            <div className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#6B6B6B' }} data-aos="fade-up" data-aos-delay="200">
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <Home className="w-12 h-12 text-white/80" />
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4 mt-8`}>
                Household Help
              </h3>
              <p className={`${inter.className} text-white/90 text-base leading-relaxed`}>
                Light housekeeping, organization, and creating a warm, safe home environment.
              </p>
            </div>

            {/* Card 4: Personal Care */}
            <div className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#A6C8E1' }} data-aos="fade-up" data-aos-delay="0">
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-12 h-12 text-[#1A5463]/70" />
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 mt-8`}>
                Personal Care
              </h3>
              <p className={`${inter.className} text-[#1A5463] text-base leading-relaxed`}>
                Assistance with bathing, grooming, dressing, and daily routines—always with dignity and respect.
              </p>
            </div>

            {/* Card 5: Transportation */}
            <div className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#D4B896' }} data-aos="fade-up" data-aos-delay="100">
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <Car className="w-12 h-12 text-[#1A5463]/70" />
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 mt-8`}>
                Transportation
              </h3>
              <p className={`${inter.className} text-[#1A5463] text-base leading-relaxed`}>
                Helping clients get to appointments, outings, and errands safely.
              </p>
            </div>

            {/* Card 6: Companionship */}
            <div className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#5B8A7D' }} data-aos="fade-up" data-aos-delay="200">
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-12 h-12 text-white/80" />
              </div>
              <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4 mt-8`}>
                Companionship
              </h3>
              <p className={`${inter.className} text-white/90 text-base leading-relaxed`}>
                Every task you perform contributes to a client's independence, confidence, and overall well-being.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Who We're Looking For Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }}>
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
                Great Caregiving Is About The Heart
              </h2>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
                We welcome individuals who are compassionate, reliable, and committed to making a difference. Whether you're experienced or just beginning your caregiving journey, if you have a genuine desire to help others, we'd love to meet you.
              </p>
              
              {/* Qualities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Heart, text: "Compassion & empathy" },
                  { icon: Users, text: "Strong communication skills" },
                  { icon: CheckCircle, text: "Good organization & attention to detail" },
                  { icon: Clock, text: "Excellent time-management" },
                  { icon: Car, text: "A valid driver's license" },
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
                  src="/images/adult-care.jpg" 
                  alt="Compassionate Caregiver" 
                  width={600} 
                  height={500}
                  className="object-cover w-full h-[400px] md:h-[500px]" 
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#8B5CF6]/20 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* A Career With Purpose Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#8B5CF6' }}>
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Section - Image */}
            <div className="relative" data-aos="fade-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/senior-care.jpg" 
                  alt="Career with Purpose" 
                  width={600} 
                  height={500}
                  className="object-cover w-full h-[400px] md:h-[500px]" 
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 rounded-3xl -z-10"></div>
            </div>

            {/* Right Section - Content */}
            <div className="space-y-6" data-aos="fade-left" data-aos-delay="100">
              <div className="flex items-center gap-2">
                <span className="text-[#D9FB74] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-white/80`}>
                  A CAREER WITH PURPOSE
                </p>
              </div>
              <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-white leading-[1.08]`}>
                When You Join Our Team, You Join A Family
              </h2>
              <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed`}>
                We believe in supporting you with ongoing training, guidance, and a work environment where you feel valued and appreciated.
              </p>
              <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed`}>
                Our caregivers play a vital role in our mission to provide exceptional care in the community, and we're committed to helping you grow—professionally and personally.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white`}>92+</h3>
                  <p className={`${inter.className} text-sm text-white/80`}>Professionals</p>
                </div>
                <div className="text-center">
                  <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white`}>2K+</h3>
                  <p className={`${inter.className} text-sm text-white/80`}>Clients Served</p>
                </div>
                <div className="text-center">
                  <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white`}>98%</h3>
                  <p className={`${inter.className} text-sm text-white/80`}>Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Benefits Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                TRAINING & BENEFITS
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08] mb-6`}>
              We Invest In Your Success
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-3xl mx-auto`}>
              We offer comprehensive onboarding, continuous training, and a range of benefits designed to help you succeed.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="0">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Comprehensive Training</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                Full onboarding and ongoing skill development programs.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Flexible Scheduling</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                Choose hours that work for your lifestyle.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Career Growth</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                Opportunities for advancement and specialization.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 rounded-full bg-[#E8E3FF] flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h3 className={`${playfair.className} text-xl font-bold text-[#1A5463] mb-3`}>Supportive Community</h3>
              <p className={`${inter.className} text-sm text-[#1A5463] leading-relaxed`}>
                A team that has your back every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A5463' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in">
            <Quote className="w-12 h-12 text-white/60 mx-auto mb-6" />
            <blockquote className={`${playfair.className} text-xl md:text-2xl lg:text-3xl italic text-white mb-6 leading-relaxed`}>
              "Being a caregiver isn't just a job. It's building a bond that changes lives — theirs and mine."
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className={`${inter.className} text-white/80 mt-4`}>— Sarah M., Caregiver</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                START YOUR JOURNEY
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.08] mb-6`}>
              Ready to Make a Difference?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] mb-10 leading-relaxed`}>
              Join thousands of caregivers who are making a difference every day. Your compassionate heart is exactly what families are looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className={`${inter.className} bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base px-10 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}>
                Start Your Application
              </Button>
              <Link 
                href="/find-care"
                className={`${inter.className} bg-[#1A5463] hover:bg-[#275F48] text-white font-semibold text-base px-10 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center`}
              >
                Learn About Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}