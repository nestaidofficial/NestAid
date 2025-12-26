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
    <div className="bg-background text-foreground">


      <main>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#FCF5EB' }}>
          <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-12 md:py-16">
              {/* Left Section - Text Content */}
              <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-5 mt-8 md:mt-0" data-aos="fade-right">
                {/* Tagline */}
                <div className="flex items-center gap-2 mt-0 md:mt-4">
                  <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                  <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                    ALWAYS THERE FOR YOU
                  </p>
                </div>

                {/* Headline */}
                <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[#1A5463] leading-[1.08]`}>
                  Care that is thoughtfully<br />
                  tailored
                </h1>

                {/* Body Text */}
                <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-xl`}>
                  At NestAid, we provide warm, dependable, non-medical home care for seniors and adults across Massachusetts—care that feels less like a service and more like a trusted helping hand.
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <button 
                    onClick={() => setGetStartedModalOpen(true)}
                    className={`${inter.className} bg-[#275F48] hover:bg-[#1f4a37] text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group`}
                  >
                    <span>Get Started</span>
                    <span className="w-10 h-10 bg-[#D9FB74] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E342E] transition-colors">
                      <svg className="w-5 h-5 text-[#234018]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L19.5 4.5M19.5 4.5H9.75M19.5 4.5V14.25" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="relative flex items-center justify-center md:justify-end" data-aos="fade-left">
                <div className="relative w-full max-w-md md:max-w-lg">
                  {/* Circular Image Container */}
                  <div className="relative w-full aspect-square">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/images/landing_page/herosection.jpg"
                        alt="Caregiver and senior"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    
                    {/* Floating Service Cards */}
                    {/* Top Left - Companionship */}
                    <div className="absolute top-8 -left-4 md:top-12 md:-left-6 bg-white rounded-xl md:rounded-xl shadow-xl p-2 md:p-3 flex items-center gap-2 animate-float" data-aos="fade-up" data-aos-delay="50">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8D4F0' }}>
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <p className={`${inter.className} text-[10px] text-gray-500 uppercase tracking-wider`}>Companionship</p>
                        <p className={`${inter.className} text-sm md:text-base font-bold text-[#1A5463]`}>24/7 Care</p>
                      </div>
                    </div>
                    
                    {/* Top Right - Meal Preparation */}
                    <div className="absolute top-12 -right-4 md:top-16 md:-right-8 bg-white rounded-xl md:rounded-xl shadow-xl p-2 md:p-3 flex items-center gap-2 animate-float" data-aos="fade-up" data-aos-delay="100" style={{ animationDelay: '0.2s' }}>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2D4F7' }}>
                        <Utensils className="w-4 h-4 md:w-5 md:h-5 text-[#D896E5]" />
                      </div>
                      <div>
                        <p className={`${inter.className} text-[10px] text-gray-500 uppercase tracking-wider`}>Meal Prep</p>
                        <p className={`${inter.className} text-sm md:text-base font-bold text-[#1A5463]`}>Daily</p>
                      </div>
                    </div>
                    
                    {/* Bottom Left - House Helper */}
                    <div className="absolute -bottom-4 -left-6 md:-bottom-8 md:-left-8 bg-white rounded-xl md:rounded-xl shadow-xl p-2 md:p-3 flex items-center gap-2 animate-float" data-aos="fade-up" data-aos-delay="150" style={{ animationDelay: '0.3s' }}>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A8D5E2' }}>
                        <Home className="w-4 h-4 md:w-5 md:h-5 text-[#1A5463]" />
                      </div>
                      <div>
                        <p className={`${inter.className} text-[10px] text-gray-500 uppercase tracking-wider`}>House Helper</p>
                        <p className={`${inter.className} text-sm md:text-base font-bold text-[#1A5463]`}>Available</p>
                      </div>
                    </div>
                    
                    {/* Bottom Right - Errands */}
                    <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white rounded-xl md:rounded-xl shadow-xl p-2 md:p-3 flex items-center gap-2 animate-float" data-aos="fade-up" data-aos-delay="200" style={{ animationDelay: '0.4s' }}>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                        <ShoppingBasket className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <p className={`${inter.className} text-[10px] text-gray-500 uppercase tracking-wider`}>Errands</p>
                        <p className={`${inter.className} text-sm md:text-base font-bold text-[#1A5463]`}>Support</p>
                      </div>
                    </div>
                  </div>
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
                    Care that grows with you
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

                {/* Home Icon with Text */}
                <div className="flex items-center gap-3 pt-2" data-aos="fade-right" data-aos-delay="300">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shadow-sm bg-[#8B5CF6]">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <p className={`${inter.className} text-sm text-[#1A5463] font-medium`}>
                    Serving Families Across Massachusetts
                  </p>
                </div>
              </div>

              {/* Right Section - Statistics Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-5">
                  {/* Top Left - Purple */}
                  <div className="bg-[#8B5CF6] rounded-2xl p-6 md:p-8 text-white shadow-lg" data-aos="fade-left" data-aos-delay="0">
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>100%</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                    Carefully vetted caregivers you can trust for safe, reliable support.
                    </p>
                  </div>

                  {/* Top Right - Gold */}
                  <div className="bg-[#e2c876] rounded-2xl p-6 md:p-8 text-[#1A5463] relative overflow-hidden shadow-lg" data-aos="fade-left" data-aos-delay="100">
                    <div className="absolute -top-6 -right-6 w-24 h-24 border-[6px] border-[#1A5463] rounded-full opacity-30"></div>
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}> 24hr</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                    Quickly matched care, tailored to your loved one’s needs.
                    </p>
                  </div>

                  {/* Bottom Left - Light Blue */}
                  <div className="bg-[#87CEEB] rounded-2xl p-6 md:p-8 text-[#1A5463] shadow-lg" data-aos="fade-left" data-aos-delay="200">
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>24/7</div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                    Support available anytime, day or night.
                    </p>
                  </div>

                  {/* Bottom Right - Dark Green */}
                  <div className="bg-[#1A5463] rounded-2xl p-6 md:p-8 text-white shadow-lg" data-aos="fade-left" data-aos-delay="300">
                    <div className={`${playfair.className} text-[40px] md:text-[48px] leading-none mb-4`}>1:1 </div>
                    <p className={`${inter.className} text-[15px] leading-relaxed`}>
                    Focused, personalized care from a dedicated caregiver.
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
                Trusted by Families
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-white leading-[1.08]`}>
              Our Approach to Care
            </h2>
          </div>
          

          {/* Service Cards - New Layout */}
          <div className="space-y-0 rounded-[25px] overflow-hidden">
            {/* Service 1: Compassionate Care - Image left, Text right */}
            <div className="flex flex-col lg:flex-row items-stretch min-h-[500px] lg:min-h-[600px]">
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative bg-[#FCF5EB] flex items-center justify-center p-8 lg:p-12" data-aos="fade-right">
                <div className="relative rounded-2xl md:rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-lg h-[300px] md:h-[400px] lg:h-full lg:max-h-[600px]">
                  <Image 
                    src="/images/landing_page/compassionate_care.jpg" 
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
                    At NestAid, compassion is not a promise—it's the standard that guides every interaction.
                  </p>
                  
                  {/* Soft Divider */}
                  <div className="mb-6">
                    <div className="h-px bg-[#1A5463]/20 w-full max-w-md"></div>
                  </div>
                  
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base md:text-lg`}>
                    We provide thoughtful in-home support that honors dignity, independence, and daily routines. Families trust NestAid for care that feels steady, personal, and deeply respectful.
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
                    src="/images/landing_page/image1.jpg" 
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
                    Experienced caregivers dedicated to your well-being. Our caregivers are carefully screened, trained, and matched to each family to ensure dependable, respectful support.
                  </p>
                  
                  {/* Soft Divider */}
                  <div className="mb-6">
                    <div className="h-px bg-[#1A5463]/20 w-full max-w-md"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: Quality Service - Image left, Text right */}
            <div className="flex flex-col lg:flex-row items-stretch min-h-[500px] lg:min-h-[600px]">
              {/* Image Column */}
              <div className="w-full lg:w-1/2 relative bg-[#FCF5EB] flex items-center justify-center p-8 lg:p-12" data-aos="fade-right">
                <div className="relative rounded-2xl md:rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-lg h-[300px] md:h-[400px] lg:h-full lg:max-h-[600px]">
                  <Image 
                    src="/images/landing_page/image2.jpg" 
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
                    Care at NestAid is guided by high standards and thoughtful attention to detail. We create personalized care plans that prioritize safety, dignity, and consistency—so families can feel confident every step of the way.
                  </p>
                  
                  {/* Soft Divider */}
                  <div className="mb-6">
                    <div className="h-px bg-[#1A5463]/20 w-full max-w-md"></div>
                  </div>
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
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
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
              Considering Professional Home Care for the First Time?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-3xl mx-auto`}>
              Choosing home care is an important decision. At NestAid, we guide you through every step with clarity, care, and a personalized approach designed for your family's peace of mind.
            </p>
          </div>

          {/* Three Step Cards with Creative Design */}
          <div className="relative px-4 lg:px-0">
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
                    We begin with a complimentary consultation to understand your needs, preferences, and goals. Our team answers your questions, explains care options clearly, and helps you determine the right next steps—without pressure.
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
                    Following your consultation, we assess your loved one's home environment and daily needs. From safety considerations to routine support, we create a personalized care plan and schedule—designed with your input and approval.
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
                    We carefully screen, train, and match caregivers based on experience, personality, and compatibility. You can feel confident knowing your loved one is supported by someone dependable, respectful, and trusted.
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
                Care Insights for<br />Everyday Living
              </h2>
            </div>
            <Link
              href="/resources"
              className={`${inter.className} inline-flex items-center justify-center text-white font-semibold text-base md:text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1f4a37]`}
              style={{ backgroundColor: '#275F48' }}
            >
              View More Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-12">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.id}`}
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
                className={`${inter.className} bg-[#275F48] hover:bg-[#1f4a37] text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group`}
              >
                <span>JOIN US TODAY</span>
                <span className="w-10 h-10 bg-[#D9FB74] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#4E342E] transition-colors">
                  <svg className="w-5 h-5 text-[#234018]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L19.5 4.5M19.5 4.5H9.75M19.5 4.5V14.25" />
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
      
      {/* Get Started Modal */}
      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
      />
    </div>
  )
}
