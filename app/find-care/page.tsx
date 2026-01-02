"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Playfair_Display, Inter } from "next/font/google"

import { Bath, Heart, Users, MessageCircle, Car, Utensils, Clock, Accessibility, Phone, UserCheck, AlertCircle, Stethoscope, FileText, Calendar, UserPlus, Target, Activity, Flower, Brain, Dumbbell, Apple, Smile, ClipboardList } from "lucide-react"
import { useState, useEffect } from "react"
import { GetStartedModal } from "@/components/get-started-modal"

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



export default function FindCarePage() {
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false)
  
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
    'companionship': [
      { text: 'Meaningful conversation and presence', icon: MessageCircle },
      { text: 'Engagement in daily activities', icon: Activity },
      { text: 'Encouraging independence', icon: Heart },
      { text: 'Consistent, trusted support', icon: UserCheck }
    ],
    'personal-care': [
      { text: 'Bathing, grooming, and dressing help', icon: Bath },
      { text: 'Daily routine and mobility support', icon: Accessibility },
      { text: 'Always respectful and private', icon: Heart },
      { text: 'Comfort-focused, personal care', icon: Users }
    ],
    'household-help': [
      { text: 'Light housekeeping and laundry', icon: Activity },
      { text: 'Home organization and tidying', icon: FileText },
      { text: 'Safe, clean living spaces', icon: UserCheck },
      { text: 'Support for daily comfort', icon: Heart }
    ],
    'respite-care': [
      { text: 'Short-term caregiver relief', icon: Clock },
      { text: 'Reliable, uninterrupted care', icon: Heart },
      { text: 'Flexible scheduling', icon: Calendar },
      { text: 'Peace of mind for families', icon: Users }
    ],
    'meal-prep': [
      { text: 'Nutritious meal support', icon: Utensils },
      { text: 'Dietary preferences respected', icon: Heart },
      { text: 'Daily nourishment assistance', icon: Activity },
      { text: 'Comfort-focused routines', icon: Smile }
    ],
    'transportation': [
      { text: 'Appointments and errands', icon: Car },
      { text: 'Safe everyday outings', icon: UserCheck },
      { text: 'Dependable, punctual care', icon: Clock },
      { text: 'Supporting independence', icon: Heart }
    ],
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




  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-12 md:py-16">
            {/* Left Section - Text Content */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-5 mt-8 md:mt-0" data-aos="fade-right">
              {/* Tagline */}
              <div className="flex items-center gap-2">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  Care that grows with you
                </p>
              </div>

              {/* Headline */}
              <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[#1A5463] leading-[1.08]`}>
                Personalized In-Home Care<br />
                You Can Rely On
              </h1>

              {/* Body Text */}
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-xl`}>
                NestAid supports adults and seniors with compassionate, non-medical care delivered in the comfort of your home. Every care plan is personalized, professionally managed, and built to support safety, independence, and peace of mind.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button 
                  onClick={() => setGetStartedModalOpen(true)}
                  className={`${inter.className} bg-[#27645E] hover:bg-[#1f4d47] text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group`}
                >
                  <span>Schedule a Free Consultation</span>
                  <span className="w-10 h-10 bg-[#D9FB74] rounded-full flex items-center justify-center flex-shrink-0">
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
                {/* Main Image */}
                <div className="relative w-full aspect-square">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/bg-image/find-care-bg.jpg" 
                      alt="Caregiver with senior"
              fill 
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care We Provide Section */}
      <section id="services" className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F5F5EC' }} >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                SUPPORTING INDEPENDENCE AT HOME
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08]`}>
              Personalized In-Home Care,<br />Built Around Your Needs
            </h2>
          </div>

          {/* Service Cards Grid - 3 columns, 2 rows */}
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
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Meaningful companionship that brightens each day with care.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['companionship'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
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
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Compassionate personal care with dignity and respect.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['personal-care'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
              </ul>
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
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Keeping your home comfortable, organized, and welcoming.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['household-help'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
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
              <p className={`${inter.className} text-[#1A5463] text-base leading-relaxed mb-6`}>
                Temporary relief for family caregivers, ensuring continuous care.
              </p>
              <ul className={`${inter.className} space-y-2 text-[#1A5463] text-sm`}>
                {serviceDetails['respite-care'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
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
              <p className={`${inter.className} text-[#4A4A4A] text-base leading-relaxed mb-6`}>
                Healthy, delicious meals prepared with care and consideration.
              </p>
              <ul className={`${inter.className} space-y-2 text-[#4A4A4A] text-sm`}>
                {serviceDetails['meal-prep'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
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
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Safe, reliable rides to keep you connected and independent.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['transportation'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
            </div>

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
              Choosing home care is an important decision. At NestAid, we walk with you every step of the way—making it easy to begin in just three thoughtful steps.
            </p>
          </div>

          {/* Three Step Cards with Creative Design */}
          <div className="relative px-4 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative items-stretch">
              
              {/* Step 1 */}
              <div className="relative group flex" data-aos="fade-up" data-aos-delay="0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#A6C8E1] via-[#87CEEB] to-[#5C8A7D] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 md:p-10 shadow-xl flex flex-col w-full" style={{ backgroundColor: '#A6C8E1' }}>
                  <div className="flex flex-col items-start mb-6">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-white">
                        <Phone className="w-10 h-10" style={{ color: '#0D2F3A' }} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D9FB74] flex items-center justify-center">
                        <span className={`${playfair.className} text-sm font-bold text-[#1A5463]`}>01</span>
                      </div>
                    </div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 leading-tight`}>
                      Book Your Free Consultation
                    </h3>
                  </div>
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base flex-1`}>
                    We begin with a complimentary consultation to understand your needs, preferences, and goals. Our team answers your questions, explains care options clearly, and helps you determine the right next steps—without pressure.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group flex" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D5B896] via-[#A6C8E1] to-[#5C8A7D] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 md:p-10 shadow-xl flex flex-col w-full" style={{ backgroundColor: '#D5B896' }}>
                  <div className="flex flex-col items-start mb-6">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-white">
                        <ClipboardList className="w-10 h-10" style={{ color: '#0D2F3A' }} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D9FB74] flex items-center justify-center">
                        <span className={`${playfair.className} text-sm font-bold text-[#1A5463]`}>02</span>
                      </div>
                    </div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463] mb-4 leading-tight`}>
                      Build Your Care Plan
                    </h3>
                  </div>
                  <p className={`${inter.className} text-[#1A5463] leading-relaxed text-base flex-1`}>
                    Following your consultation, we assess your loved one's home environment and daily needs. From safety considerations to routine support, we create a personalized care plan and schedule—designed with your input and approval.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group flex" data-aos="fade-up" data-aos-delay="200">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5C8A7D] via-[#A6C8E1] to-[#D5B896] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-3xl p-8 md:p-10 shadow-xl flex flex-col w-full" style={{ backgroundColor: '#5C8A7D' }}>
                  <div className="flex flex-col items-start mb-6">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-white">
                        <UserCheck className="w-10 h-10" style={{ color: '#0D2F3A' }} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D9FB74] flex items-center justify-center">
                        <span className={`${playfair.className} text-sm font-bold text-[#1A5463]`}>03</span>
                      </div>
                    </div>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-white mb-4 leading-tight`}>
                      Meet Your Caregiver
                    </h3>
                  </div>
                  <p className={`${inter.className} text-white/90 leading-relaxed text-base flex-1`}>
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

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-[#FCF5EB] overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-6`} data-aos="fade-up">
              Let's Find the Right Care—Together
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] mb-8 leading-relaxed`} data-aos="fade-up">
              Our trusted caregivers are here to bring comfort, dignity, and peace of mind right to your doorstep. It's time to take the next step.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2" data-aos="fade-up">
              <button 
                onClick={() => setGetStartedModalOpen(true)}
                className={`${inter.className} bg-[#27645E] hover:bg-[#1f4d47] text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group`}
              >
                <span>Make an Enquiry</span>
                <span className="w-10 h-10 bg-[#D9FB74] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#234018]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L19.5 4.5M19.5 4.5H9.75M19.5 4.5V14.25" />
                  </svg>
                </span>
              </button>
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