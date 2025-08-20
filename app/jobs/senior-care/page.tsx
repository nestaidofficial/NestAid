"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Search,
  Navigation
} from "lucide-react"

export default function FindJobsPage() {
  const [locationQuery, setLocationQuery] = useState("")

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get city/state
          setLocationQuery("Current Location")
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden">
        {/* Desktop Layout - Full height with overlay */}
        <div className="hidden lg:block relative h-[100vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src="/images/bg-image/find-job-bg.jpg" 
              alt="Caregiver Background" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Background Box with Content */}
          <div 
            className="absolute backdrop-blur-sm w-full h-[500px] left-0 bg-white/35"
            style={{
              borderRadius: '49% 51% 48% 52% / 100% 100% 0% 0%',
              bottom: 0,
              zIndex: 5
            }}
          >
            <div className="flex flex-col justify-center items-center text-center px-8 py-12 max-w-5xl mx-auto h-full">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1A5463] mb-6 leading-tight">
                Care with Purpose. Work with Heart.
              </h1>
              <p className="text-lg lg:text-xl text-[#1A5463] mb-8 leading-relaxed">
                Join our growing team of caregivers and make every day meaningful.
              </p>
              
              {/* Job Search Bar */}
              <div className="w-full max-w-2xl space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="relative flex-1 w-full sm:max-w-md">
                    <Input
                      type="text"
                      placeholder="Postal Code or City & State"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="h-14 px-4 border-2 border-gray-300 rounded-full text-base bg-white focus:border-[#275F48] focus:ring-0 shadow-sm"
                    />
                  </div>
                  
                  <Button className="h-14 bg-[#4A6741] hover:bg-[#3d5436] text-white font-semibold text-base px-8 rounded-full transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap">
                    Find Jobs
                  </Button>
                </div>
                
                <div className="flex justify-start">
                  <Button 
                    onClick={handleUseCurrentLocation}
                    variant="ghost"
                    className="text-[#275F48] hover:text-[#1f4a37] text-base font-medium transition-all duration-300 flex items-center gap-2 underline decoration-2 underline-offset-4"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-[#275F48] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#275F48]"></div>
                    </div>
                    Use Current Location
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout - Stacked: Image first, then content */}
        <div className="lg:hidden">
          {/* Background Image Section */}
          <div className="relative h-[50vh] md:h-[60vh]">
            <Image 
              src="/images/bg-image/find-job-bg.jpg" 
              alt="Caregiver Background" 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="bg-[#FCFDFB] px-4 py-8 md:px-6 md:py-12">
            <div className="flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 md:mb-6 leading-tight">
                Care with Purpose. Work with Heart.
              </h1>
              <p className="text-sm md:text-lg text-[#1A5463] mb-6 md:mb-8 leading-relaxed">
                Join our growing team of caregivers and make every day meaningful.
              </p>
              
              {/* Job Search Bar */}
              <div className="w-full max-w-2xl space-y-3 md:space-y-4">
                <div className="flex flex-col gap-3 items-center">
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Postal Code or City & State"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="h-12 md:h-14 px-4 border-2 border-gray-300 rounded-full text-sm md:text-base bg-white focus:border-[#275F48] focus:ring-0 shadow-sm"
                    />
                  </div>
                  
                  <Button className="w-full h-12 md:h-14 bg-[#4A6741] hover:bg-[#3d5436] text-white font-semibold text-sm md:text-base px-6 md:px-8 rounded-full transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Find Jobs
                  </Button>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleUseCurrentLocation}
                    variant="ghost"
                    className="text-[#275F48] hover:text-[#1f4a37] text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 underline decoration-2 underline-offset-4"
                  >
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[#275F48] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#275F48]"></div>
                    </div>
                    Use Current Location
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Highlight - Stats Section */}
      <section className="py-16 md:py-24 bg-[#FCFDFB] overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E4F2D4] flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-[#275F48]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463] mb-2">11,000+</h3>
              <p className="text-sm md:text-base text-[#1A5463] leading-relaxed">
                seniors turn 65 each day → Demand for caregivers is growing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E4F2D4] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#275F48]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463] mb-2">92%</h3>
              <p className="text-sm md:text-base text-[#1A5463] leading-relaxed">
                of families value caregivers as essential.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E4F2D4] flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 md:w-10 md:h-10 text-[#275F48]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463] mb-2">#1</h3>
              <p className="text-sm md:text-base text-[#1A5463] leading-relaxed">
                One of the fastest-growing professions in the U.S.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us - Benefits Section */}
      <section className="py-16 md:py-24 overflow-x-hidden" style={{ backgroundColor: '#275F49' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Why Work With Us?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Meaningful Impact</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Every shift changes lives.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Flexibility</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Choose hours that fit your lifestyle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Growth & Training</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                We invest in your development.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Supportive Team</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                You're never alone in your work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caregiver Roles - Cards Section */}
      <section className="py-16 md:py-24 bg-[#FCFDFB] overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A5463] mb-4">
              Caregiver Roles
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#E4F2D4] flex items-center justify-center mb-4 group-hover:bg-[#275F48] transition-colors">
                <Heart className="w-6 h-6 text-[#275F48] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#1A5463] mb-2">Companion / Caregiver</h3>
              <p className="text-sm text-[#1A5463] leading-relaxed">
                Emotional support & daily help.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#E4F2D4] flex items-center justify-center mb-4 group-hover:bg-[#275F48] transition-colors">
                <Users className="w-6 h-6 text-[#275F48] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#1A5463] mb-2">Care Coordinator</h3>
              <p className="text-sm text-[#1A5463] leading-relaxed">
                Manage schedules & client care.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#E4F2D4] flex items-center justify-center mb-4 group-hover:bg-[#275F48] transition-colors">
                <Brain className="w-6 h-6 text-[#275F48] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#1A5463] mb-2">Specialized Support</h3>
              <p className="text-sm text-[#1A5463] leading-relaxed">
                Gentle, patient care for memory needs.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#E4F2D4] flex items-center justify-center mb-4 group-hover:bg-[#275F48] transition-colors">
                <Car className="w-6 h-6 text-[#275F48] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#1A5463] mb-2">Transportation Assistant</h3>
              <p className="text-sm text-[#1A5463] leading-relaxed">
                Safe rides for seniors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Day-to-Day Responsibilities */}
      <section className="py-16 md:py-24 overflow-x-hidden" style={{ backgroundColor: '#275F49' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Day-to-Day Responsibilities
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-sm font-medium">Memory Care</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-sm font-medium">Meal Prep</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Home className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-sm font-medium">Household Support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-sm font-medium">Personal Care</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Car className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-sm font-medium">Transportation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-white text-sm font-medium">Companionship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-16 md:py-24 bg-[#FCFDFB] overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A5463] mb-4">
              Who We're Looking For
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                "Compassion",
                "Organization", 
                "Time Management",
                "Communication",
                "Driver's License (preferred)",
                "Clear Background Check"
              ].map((quality, index) => (
                <div
                  key={quality}
                  className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-[#E4F2D4]"
                >
                  <CheckCircle className="w-4 h-4 text-[#275F48]" />
                  <span className="text-sm font-medium text-[#1A5463]">{quality}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 overflow-x-hidden" style={{ backgroundColor: '#275F49' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-white/60 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-6 leading-relaxed">
              "Being a caregiver isn't just a job. It's building a bond that changes lives — theirs and mine."
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-white/80 mt-4">— Sarah M., Caregiver</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#FCFDFB] overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A5463] mb-6">
              Ready to Start Your Caregiving Journey?
            </h2>
            <p className="text-lg text-[#1A5463] mb-8 leading-relaxed">
              Join thousands of caregivers who are making a difference every day. Your compassionate heart is exactly what families are looking for.
            </p>
            <Button className="bg-[#16803C] hover:bg-[#1f4a37] text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Your Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}