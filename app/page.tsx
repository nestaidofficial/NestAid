"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { GetStartedModal } from "@/components/get-started-modal"
import { Playfair_Display, Inter } from "next/font/google"

import { Bath, Brain, Home, ShoppingBasket, Heart, Users, MessageCircle, Car, Utensils, Clock, Accessibility, Phone, UserCheck, AlertCircle, Stethoscope, FileText, Calendar, UserPlus, Target, Activity, Flower, Dumbbell, Apple, Smile, CalendarCheck, ClipboardList, HeartHandshake, MessageCircleHeart, GraduationCap, ShieldCheck, Award, RefreshCcw, ArrowLeft, ArrowRight, Quote } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const AppStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 29 29" fill="currentColor" {...props}>
    <path d="M18.33.02a6.93 6.93 0 0 0-4.34 1.73 6.93 6.93 0 0 0-4.34-1.73A7.03 7.03 0 0 0 2.72 7.05a7.03 7.03 0 0 0 5.2 6.83 6.4 6.4 0 0 0-2.03 4.93v.02a6.4 6.4 0 0 0 2.03 4.93 7.03 7.03 0 0 0 6.93 1.75 6.93 6.93 0 0 0 6.92-1.75 6.4 6.4 0 0 0 2.03-4.93v-.02a6.4 6.4 0 0 0-2.03-4.93 7.03 7.03 0 0 0 5.2-6.83A7.03 7.03 0 0 0 18.33.02Zm-9.4 2.82a4.1 4.1 0 0 1 3.4 1.43 4.1 4.1 0 0 1 3.4-1.43 4.2 4.2 0 0 1 4.2 4.23 4.2 4.2 0 0 1-2.7 3.95 6.93 6.93 0 0 0-3.5-3.4 6.93 6.93 0 0 0-3.5 3.4A4.2 4.2 0 0 1 4.73 7.1a4.2 4.2 0 0 1 4.2-4.23v.01Zm9.4 22.7a4.1 4.1 0 0 1-3.4-1.43 4.1 4.1 0 0 1-3.4 1.43 4.2 4.2 0 0 1-4.2-4.23v-.02a4.2 4.2 0 0 1 2.7-3.95 6.93 6.93 0 0 0 3.5 3.4 6.93 6.93 0 0 0 3.5-3.4 4.2 4.2 0 0 1 2.7 3.95v.02a4.2 4.2 0 0 1-4.2 4.23Z"></path>
  </svg>
)

const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 29 29" fill="currentColor" {...props}>
    <path d="m2.61 1.83 11.1 11.1-11.1 11.1c-1.2-1.2-1.2-3.14 0-4.24L5.75 17a3 3 0 0 0 0-4.24L2.6 9.64a3 3 0 0 1 0-4.24l.01-3.57Zm12.19 12.19L2.7 2.71a3 3 0 0 1 4.24 0l10.1 10.1a3 3 0 0 1 0 4.24L6.94 27.1a3 3 0 0 1-4.24 0l12.19-11.32.01-1.76Zm10.36-4.74a3 3 0 0 0-1.5-2.62l-4.9-2.83-10.1 10.1 10.1 10.1 4.9-2.83a3 3 0 0 0 1.5-2.62v-9.24Z"></path>
  </svg>
)

export default function Component() {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // State to track which service details are shown
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  
  // State for get started modal
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  
  // State for testimonial slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  // Listen for custom event from mobile FAB to open modal
  useEffect(() => {
    const handleOpenModal = () => {
      setGetStartedModalOpen(true)
    }

    window.addEventListener('openGetStartedModal', handleOpenModal)
    
    return () => {
      window.removeEventListener('openGetStartedModal', handleOpenModal)
    }
  }, [])
  
  // Service details data with icons
  const serviceDetails = {
    'in-home': [
      { text: 'Bathing', icon: Bath },
      { text: 'Personal Hygiene', icon: Heart },
      { text: 'Feeding', icon: Utensils },
      { text: 'Mobility Assistance', icon: Accessibility },
      { text: 'Safety supervision', icon: UserCheck }
    ],
    'companion': [
      { text: 'Friendly conversation and social engagement', icon: MessageCircle },
      { text: 'Assistance with hobbies and activities', icon: Activity },
      { text: 'Escorting to appointments and errands', icon: Car },
      { text: 'Meal preparation and companionship during meals', icon: Utensils },
      { text: 'Medication reminders and light supervision', icon: Clock }
    ],
    'special-needs': [
      { text: 'Assistance with daily living activities (dressing, bathing)', icon: Users },
      { text: 'Mobility and transfer support', icon: Accessibility },
      { text: 'Communication assistance and advocacy', icon: Phone },
      { text: 'Behavioral support and crisis intervention', icon: AlertCircle },
      { text: 'Coordination with healthcare providers and therapists', icon: Stethoscope }
    ],
    'live-in': [
      { text: 'Around-the-clock personal care and supervision', icon: Clock },
      { text: 'Medication management and reminders', icon: Heart },
      { text: 'Assistance with toileting and hygiene', icon: Bath },
      { text: 'Overnight monitoring and safety checks', icon: UserCheck },
      { text: 'Meal preparation and feeding assistance', icon: Utensils }
    ],
    'care-plans': [
      { text: 'Comprehensive initial assessment', icon: FileText },
      { text: 'Tailored care schedule and goals', icon: Target },
      { text: 'Regular progress evaluations and adjustments', icon: Calendar },
      { text: 'Coordination with family and medical professionals', icon: UserPlus },
      { text: 'Flexible services adapting to changing needs', icon: Activity }
    ],
    'wellness': [
      { text: 'Guided yoga sessions for flexibility and balance', icon: Flower },
      { text: 'Meditation and mindfulness coaching', icon: Brain },
      { text: 'Light exercise and stretching routines', icon: Dumbbell },
      { text: 'Nutrition and wellness education', icon: Apple },
      { text: 'Stress management and relaxation techniques', icon: Smile }
    ]
  };
  
  const toggleDetails = (serviceKey: string) => {
    setShowDetails(prev => ({
      ...prev,
      [serviceKey]: !prev[serviceKey]
    }));
  };


  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Testimonials data
  const testimonials = [
    {
      quote: "As my father's medical needs increased, we knew we couldn't keep up on our own. NestAid provided structure, reliability, and a calm presence that immediately put us at ease. They manage everything from daily care to small details we often overlooked, and their communication with us is always clear. I finally feel confident knowing my father is in good hands every single day.",
      name: "Mark Johnson",
      title: "Financial Advisor",
      image: "/images/group.jpg",
      quoteBg: "#FDF2DC",
      iconColor: "#F2D18B",
      decorativeShapes: ["#D7E4E1", "#B5D8CB", "#8B5CF6"]
    },
    {
      quote: "My father has always been the rock of our family, and watching him struggle with his health was incredibly difficult. NestAid changed everything. The caregivers don't just meet his needs—they connect with him, listen to his stories, and treat him with the respect he deserves. It feels like they've become an extension of our family, and that peace of mind is something I can't put a price on.",
      name: "David Miller",
      title: "Civil Engineer",
      image: "/images/group.jpg",
      quoteBg: "#E8E3FF",
      iconColor: "#6D28D9",
      decorativeShapes: ["#E8E3FF", "#1A5463", "#B5D8CB"]
    },
    {
      quote: "I never thought I would see my father smile the way he does now. Before NestAid, he was withdrawn and tired. Their team treats him like a person with a full history—not just a patient—and that has made all the difference. He laughs again, tells stories, and feels valued. As a son, there's no greater comfort than knowing my dad is being cared for with genuine compassion.",
      name: "Christopher Adams",
      title: "Software Developer",
      image: "/images/senior-care.jpg",
      quoteBg: "#E0F2FE",
      iconColor: "#1A5463",
      decorativeShapes: ["#87CEEB", "#1A5463", "#D7E4E1"]
    },
    {
      quote: "My mother has always valued her independence, and I worried that outside care would take that away. NestAid has done the opposite. They give her the gentle support she needs while still letting her make her own choices. She feels safe, respected, and happy—and for our family, that sense of security means everything.",
      name: "Jonathan Reyes",
      title: "Small Business Owner",
      image: "/images/adult-care.jpg",
      quoteBg: "#F3E8FF",
      iconColor: "#8B5CF6",
      decorativeShapes: ["#F3E8FF", "#C4B5FD", "#F2D18B"]
    }
  ];

  const featuredArticles = [
    {
      id: "physical-activities",
      category: "Wellness",
      title: "Physical Activities For Older Adults",
      description: "Light exercises like walking or stretching help seniors stay strong, balanced, and independent.",
      image: "/images/adult-care.jpg"
    },
    {
      id: "social-engagement",
      category: "Health",
      title: "The Importance Of Social Engagement For Seniors",
      description: "Explore how meaningful conversations and community events uplift mental health and reduce loneliness.",
      image: "/images/group.jpg"
    },
    {
      id: "right-caregiver",
      category: "Memory",
      title: "Choosing The Right Caregiver For Seniors",
      description: "Guidance for families on selecting caregivers who align with needs, qualifications, and personalities.",
      image: "/images/senior-care.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };



  return (
    <div className="bg-background text-foreground overflow-x-hidden">


      <main>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#FCF5EB' }}>
          <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-12 md:py-16">
              {/* Left Section - Text Content */}
              <div className="flex flex-col justify-center space-y-5" data-aos="fade-right">
                

                {/* Headline */}
                <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[#1A5463] leading-[1.08]`}>
                  Exceptional Senior<br />
                  Care, Thoughtfully<br />
                  Tailored Comfort
                </h1>

                {/* Body Text */}
                <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-xl`}>
                  At NestAid, we provide compassionate adult daycare services that go beyond routine care. With personalized attention, meaningful activities, and a community-driven environment, we help your loved ones live with joy.
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <button 
                    onClick={() => setGetStartedModalOpen(true)}
                    className={`${inter.className} bg-[#275F48] hover:bg-[#1f4a37] text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group`}
                  >
                    <span>Join Us</span>
                    <span className="w-10 h-10 bg-[#D9FB74] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E342E] transition-colors">
                      <svg className="w-5 h-5 text-[#234018]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L19.5 4.5M19.5 4.5H9.75M19.5 4.5V14.25" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Section - Image and Social Icons */}
              <div className="relative flex items-center justify-center md:justify-end" data-aos="fade-left">
                <div className="relative w-full max-w-md md:max-w-lg">
                  {/* Circular Image Container */}
                  <div className="relative w-full aspect-square">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/images/group-photoroom.png"
                        alt="Caregiver and senior"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Social Media Icons - Right Edge */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 md:translate-x-12 flex flex-col gap-4 z-10">
                    <a href="#" className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#275F48] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#275F48] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#275F48] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>

                  {/* Vertical Divider Line */}
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-[#E8E8E8] translate-x-8 md:translate-x-14 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality In-Home Care Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: '#FCF5EB' }}>
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Section - Text and Images */}
              <div className="space-y-5">
                {/* Tagline */}
                <div className="flex items-center gap-2 mb-2" data-aos="fade-right" data-aos-delay="0">
                  <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                  <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                    WE ARE ALWAYS CLOSE
                  </p>
                </div>

                {/* Main Headline */}
                <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[#1A5463] leading-[1.08]`} data-aos="fade-right" data-aos-delay="100">
                  We Deliver The Highest Quality In-Home Care
                </h2>

                {/* Body Text */}
                <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-xl`} data-aos="fade-right" data-aos-delay="200">
                  Choosing NestAid means placing your loved ones in the hands of a deeply dedicated, compassionate, and experienced team—committed to providing exceptional care.
                </p>

                {/* Headshots */}
                <div className="flex items-center gap-3 pt-2" data-aos="fade-right" data-aos-delay="300">
                  <div className="flex -space-x-2">
                    {["#8B5CF6", "#87CEEB", "#87CEEB", "#F4D7B5", "#D4AF37"].map((color, idx) => (
                      <div
                        key={`headshot-${idx}`}
                        className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center overflow-hidden p-0.5 shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        <Image src="/placeholder-user.jpg" alt="Family" width={44} height={44} className="rounded-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className={`${inter.className} text-sm text-[#1A5463] font-medium`}>
                    Over 2,000 Satisfied Families
                  </p>
                </div>
              </div>

              {/* Right Section - Statistics Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-5">
                  {/* Top Left - Purple */}
                  <div className="bg-[#8B5CF6] rounded-2xl p-6 md:p-8 text-white shadow-lg" data-aos="fade-left" data-aos-delay="0">
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>92+</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                      Trusted Nursing Professionals for Your Loved Ones
                    </p>
                  </div>

                  {/* Top Right - Gold */}
                  <div className="bg-[#D4AF37] rounded-2xl p-6 md:p-8 text-[#1A5463] relative overflow-hidden shadow-lg" data-aos="fade-left" data-aos-delay="100">
                    <div className="absolute -top-6 -right-6 w-24 h-24 border-[6px] border-[#1A5463] rounded-full opacity-30"></div>
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>2K+</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                      Proudly Serving 2,000+ Satisfied Patients with Compassionate Support
                    </p>
                  </div>

                  {/* Bottom Left - Light Blue */}
                  <div className="bg-[#87CEEB] rounded-2xl p-6 md:p-8 text-[#1A5463] shadow-lg" data-aos="fade-left" data-aos-delay="200">
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>120+</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                      Building a Strong Community of Caring Volunteers
                    </p>
                  </div>

                  {/* Bottom Right - Dark Green */}
                  <div className="bg-[#1A5463] rounded-2xl p-6 md:p-8 text-white shadow-lg" data-aos="fade-left" data-aos-delay="300">
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>300+</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                      Trusted by Hundreds of Families and Clients Across the Region
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Care We Provide Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#27645E' }} >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D9FB74] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-white/80`}>
                EXCELLENCE IN CARE
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-white leading-[1.08]`}>
              Why We Stand Out
            </h2>
          </div>
          

          {/* Service Cards - New Layout */}
          <div className="space-y-0">
            {/* Service 1: Compassionate Care - Image left, Text right */}
            <div className="flex flex-col lg:flex-row items-stretch min-h-[500px] lg:min-h-[600px]">
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative bg-[#FCF5EB] flex items-center justify-center p-8 lg:p-12" data-aos="fade-right">
                <div className="relative rounded-2xl md:rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-lg h-[300px] md:h-[400px] lg:h-full lg:max-h-[600px]">
                  <Image 
                    src="/images/adult-care.jpg" 
                    alt="Compassionate Care" 
                    fill
                    className="object-cover" 
                  />
                </div>
              </div>
              
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex items-center p-8 lg:p-12 lg:pl-16" style={{ backgroundColor: '#E8E3FF' }} data-aos="fade-left">
                <div className="max-w-xl">
                  <h3 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1A5463] mb-6 leading-tight`}>
                    Compassionate<br />Care
                  </h3>
                  <p className={`${inter.className} text-[#1A5463] mb-6 leading-relaxed text-base md:text-lg`}>
                    Personalized support delivered with kindness and trust. We understand that care needs don't follow a schedule—which is why our professional team provides consistent, compassionate assistance tailored to each individual.
                  </p>
                  
                  {/* Decorative Wavy Line */}
                  <div className="mb-6">
                    <svg className="w-full max-w-md h-16" viewBox="0 0 400 60" preserveAspectRatio="none">
                      <path
                        d="M 0 30 Q 50 10, 100 30 T 200 30 T 300 30 T 400 30"
                        stroke="#1A5463"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base md:text-lg`}>
                    This approach ensures peace of mind for families and consistent, compassionate care for your loved ones—anytime, day or night.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2: Professional Team - Text left, Image right */}
            <div className="flex flex-col lg:flex-row-reverse items-stretch min-h-[500px] lg:min-h-[600px]">
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative bg-[#FCF5EB] flex items-center justify-center p-8 lg:p-12" data-aos="fade-left">
                <div className="relative rounded-2xl md:rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-lg h-[300px] md:h-[400px] lg:h-full lg:max-h-[600px]">
                  <Image 
                    src="/images/group.png" 
                    alt="Professional Team" 
                    fill
                    className="object-cover" 
                  />
                </div>
              </div>
              
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex items-center p-8 lg:p-12 lg:pr-16" style={{ backgroundColor: '#FDF2DC' }} data-aos="fade-right">
                <div className="max-w-xl ml-auto">
                  <h3 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1A5463] mb-6 leading-tight`}>
                    Professional<br />Team
                  </h3>
                  <p className={`${inter.className} text-[#1A5463] mb-6 leading-relaxed text-base md:text-lg`}>
                    Experienced caregivers dedicated to your well-being. Quality support involves more than just meeting needs; it's about exceeding expectations with every interaction. Our trained team provides consistent, compassionate assistance tailored to each individual.
                  </p>
                  
                  {/* Decorative Wavy Line */}
                  <div className="mb-6">
                    <svg className="w-full max-w-md h-16" viewBox="0 0 400 60" preserveAspectRatio="none">
                      <path
                        d="M 0 30 Q 50 10, 100 30 T 200 30 T 300 30 T 400 30"
                        stroke="#1A5463"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base md:text-lg`}>
                    Whether it's daily care, emotional support, or simply being present, we're here to uplift and empower every step of the way.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3: Quality Service - Image left, Text right */}
            <div className="flex flex-col lg:flex-row items-stretch min-h-[500px] lg:min-h-[600px]">
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative bg-[#FCF5EB] flex items-center justify-center p-8 lg:p-12" data-aos="fade-right">
                <div className="relative rounded-2xl md:rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-lg h-[300px] md:h-[400px] lg:h-full lg:max-h-[600px]">
                  <Image 
                    src="/images/senior-care.jpg" 
                    alt="Quality Service" 
                    fill
                    className="object-cover" 
                  />
                </div>
              </div>
              
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex items-center p-8 lg:p-12 lg:pl-16" style={{ backgroundColor: '#F3E8FF' }} data-aos="fade-left">
                <div className="max-w-xl">
                  <h3 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] font-bold text-[#1A5463] mb-6 leading-tight`}>
                    Quality<br />Service
                  </h3>
                  <p className={`${inter.className} text-[#1A5463] mb-6 leading-relaxed text-base md:text-lg`}>
                    High standards with personalized care plans for every client. We ensure safety, dignity, and peace of mind through consistent, compassionate assistance that goes beyond meeting basic needs.
                  </p>
                  
                  {/* Decorative Wavy Line */}
                  <div className="mb-6">
                    <svg className="w-full max-w-md h-16" viewBox="0 0 400 60" preserveAspectRatio="none">
                      <path
                        d="M 0 30 Q 50 10, 100 30 T 200 30 T 300 30 T 400 30"
                        stroke="#1A5463"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base md:text-lg`}>
                    From identifying specific needs to creating tailored solutions, we're committed to excellence in care that makes a real difference in the lives of those we serve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F6F4EC' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                WE ARE ALWAYS CLOSE
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08]`}>
              Hear What Families Are Saying About NestAid Care
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="relative rounded-[32px] shadow-2xl overflow-hidden transition-all duration-500 ease-in-out">
              <div className="relative w-full h-[420px]">
                <Image
                  key={currentTestimonial}
                  src={testimonials[currentTestimonial].image}
                  alt={`Testimonial from ${testimonials[currentTestimonial].name}`}
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority={false}
                />
              </div>
            </div>

            <div 
              className="rounded-[32px] p-8 md:p-12 shadow-lg flex flex-col justify-between transition-all duration-500 ease-in-out"
              style={{ backgroundColor: testimonials[currentTestimonial].quoteBg }}
            >
              <div>
                <div className="mb-6">
                  <span 
                    className="text-5xl transition-colors duration-500 inline-block"
                    style={{ color: testimonials[currentTestimonial].iconColor }}
                  >
                    ✺
                  </span>
                </div>
                <p 
                  key={currentTestimonial}
                  className={`${playfair.className} italic text-base md:text-lg text-[#1A3D35] leading-relaxed transition-opacity duration-500`}
                >
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <Image
                  src="/images/group-Photoroom.png"
                  alt={`${testimonials[currentTestimonial].name}`}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className={`${inter.className} font-bold text-base text-[#1A3D35]`}>
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className={`${inter.className} text-sm text-[#4B5A55] font-normal`}>
                    {testimonials[currentTestimonial].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-14">
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 rounded-full bg-white text-[#1A5463] shadow-lg flex items-center justify-center hover:bg-[#1A5463] hover:text-white transition-colors"
              aria-label="View previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-14 h-14 rounded-full bg-white text-[#1A5463] shadow-lg flex items-center justify-center hover:bg-[#1A5463] hover:text-white transition-colors"
              aria-label="View next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>





      {/* First Time Considering Professional Home Care Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                YOUR JOURNEY STARTS HERE
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-6`}>
              First Time Considering Professional Home Care?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-3xl mx-auto`}>
              Starting home care can feel like a big step, but at NestAid, we make it easier. Our caring team works closely with you to create a personalized plan that brings comfort, safety, and peace of mind right to your home.
            </p>
          </div>

          {/* Three Step Cards with Creative Design */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative">
              
              {/* Step 1 */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8B5CF6] via-[#87CEEB] to-[#D4AF37] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 md:p-10 shadow-xl bg-white" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="flex flex-col items-start mb-6">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Phone className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D9FB74] flex items-center justify-center">
                        <span className={`${playfair.className} text-sm font-bold text-[#1A5463]`}>01</span>
                      </div>
                    </div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 leading-tight`}>
                      Book Your Free Consultation
                    </h3>
                  </div>
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base`}>
                    We'll start by meeting with you and your family to understand your specific needs, preferences, and goals. In this free consultation, we'll answer your questions, explain how professional caregivers can help, and guide you through the next steps.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#87CEEB] via-[#1A5463] to-[#8B5CF6] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 md:p-10 shadow-xl" style={{ backgroundColor: '#EFF5F4' }}>
                  <div className="flex flex-col items-start mb-6">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A5463] to-[#275F48] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <ClipboardList className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D9FB74] flex items-center justify-center">
                        <span className={`${playfair.className} text-sm font-bold text-[#1A5463]`}>02</span>
                      </div>
                    </div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 leading-tight`}>
                      Build Your Care Plan
                    </h3>
                  </div>
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base`}>
                    Once you choose NestAid, we'll visit your loved one's home to assess safety, comfort, and daily living needs. From identifying fall risks to suggesting ways to make life easier, we'll design a tailored care plan and schedule—built around your approval.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group" data-aos="fade-up" data-aos-delay="200">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#8B5CF6] to-[#87CEEB] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 md:p-10 shadow-xl" style={{ backgroundColor: '#EDFAE1' }}>
                  <div className="flex flex-col items-start mb-6">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#275F48] to-[#1A5463] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <UserCheck className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D9FB74] flex items-center justify-center">
                        <span className={`${playfair.className} text-sm font-bold text-[#1A5463]`}>03</span>
                      </div>
                    </div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 leading-tight`}>
                      Meet Your Caregiver
                    </h3>
                  </div>
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base`}>
                    We carefully screen and hand-select caregivers who fit your loved one's needs, personality, and preferences. You'll have peace of mind knowing they're safe, comfortable, and cared for—by someone who feels like family.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 -z-10">
              <svg className="w-full h-full" viewBox="0 0 1200 4" preserveAspectRatio="none">
                <path
                  d="M 0 2 Q 200 0, 400 2 T 800 2 T 1200 2"
                  stroke="#1A5463"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Articles Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  Care Services Designed With Heart
                </p>
              </div>
              <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08]`}>
                Helpful Articles, Stories<br />For Seniors
              </h2>
            </div>
            <Link
              href="/blog"
              className={`${inter.className} inline-flex items-center justify-center bg-[#8B5CF6] text-white font-semibold text-base md:text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5`}
            >
              View More Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-12">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="bg-white rounded-[32px] shadow-lg overflow-hidden border border-[#ECE7DA] flex flex-col h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col gap-4 flex-grow">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-[#1A5463] w-fit" style={{ backgroundColor: '#E6F0EA' }}>
                    {article.category}
                  </span>
                  <h3 className={`${playfair.className} text-[24px] lg:text-[28px] text-[#1A5463] leading-tight group-hover:text-[#8B5CF6] transition-colors`}>
                    {article.title}
                  </h3>
                  <p className={`${inter.className} text-[#446056] text-base leading-relaxed`}>
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                START YOUR JOURNEY
              </p>
            </div>

            {/* Main Heading */}
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-6`}>
              Ready to Experience Compassionate Care?
            </h2>
            
            {/* Description */}
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] mb-10 max-w-3xl mx-auto leading-relaxed`}>
              Join thousands of families who trust NestAid to provide the care their loved ones deserve. 
              Start your journey today and discover the difference personalized, professional care can make.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setGetStartedModalOpen(true)}
                className={`${inter.className} group relative bg-[#D9FB74] hover:bg-[#C4E860] text-[#1A5463] font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105`}
              >
                <span>JOIN US TODAY</span>
                <span className="bg-[#275F48] text-white rounded-full p-2 group-hover:bg-[#1A5463] group-hover:scale-110 transition-all duration-200">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <Link 
                href="/find-care" 
                className={`${inter.className} text-base md:text-lg text-[#1A5463] hover:text-[#275F48] transition-colors duration-200 font-medium border-b-2 border-[#1A5463]/30 hover:border-[#275F48] pb-1`}
              >
                Learn More About Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className=" text-background bg-[#275F49]">
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Maya Care</h3>
              <ul className="space-y-2 text-background/70">
                <li>
                  <Link href="/about-us" className="hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-background/70">
                <li>
                  <Link href="/safety-center" className="hover:text-white">
                    Safety Center
                  </Link>
                </li>
                <li>
                  <Link href="/help-center" className="hover:text-white">
                    Help Center
                  </Link>
                </li>

              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Business</h3>
              <ul className="space-y-2 text-background/70">
                <li>
                  <Link href="/corporate-benefits" className="hover:text-white">
                    Corporate Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/become-a-partner" className="hover:text-white">
                    Become a Partner
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="bg-background text-foreground rounded-lg p-2 flex items-center justify-center font-semibold"
                >
                  <AppStoreIcon className="w-6 h-6 mr-2" />
                  Download on the App Store
                </a>
                <a
                  href="#"
                  className="bg-background text-foreground rounded-lg p-2 flex items-center justify-center font-semibold"
                >
                  <GooglePlayIcon className="w-6 h-6 mr-2" />
                  Get it on Google Play
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-background/50">
            <p>© 2025 Maya Care, Inc. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white">
                Terms of use
              </Link>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Get Started Modal */}
      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
      />
    </div>
  )
}
