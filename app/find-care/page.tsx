"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Playfair_Display, Inter } from "next/font/google"

import { Bath, Heart, Users, MessageCircle, Car, Utensils, Clock, Accessibility, Phone, UserCheck, AlertCircle, Stethoscope, FileText, Calendar, UserPlus, Target, Activity, Flower, Brain, Dumbbell, Apple, Smile } from "lucide-react"
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
                NestAid supports adults and seniors with compassionate, non-medical care delivered in the comfort of home. Every care plan is personalized, professionally managed, and built to support safety, independence, and peace of mind.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button 
                  onClick={() => setGetStartedModalOpen(true)}
                  className={`${inter.className} bg-[#275F48] hover:bg-[#1f4a37] text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group`}
                >
                  <span>Schedule a Free Consultation</span>
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
                {/* Main Image */}
                <div className="relative w-full aspect-square">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/bg-image/find-care-bg.jpg" 
                      alt="Caregiver with senior"
              fill 
              className="object-cover"
              priority
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
            <Link 
              href="/care/companionship"
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" 
              style={{ backgroundColor: '#5B8A7D' }} 
              data-aos="fade-up" 
              data-aos-delay="0"
            >
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="white" opacity="0.9">
                  <circle cx="20" cy="20" r="10"/>
                  <circle cx="40" cy="20" r="10"/>
                  <circle cx="20" cy="40" r="10"/>
                  <circle cx="40" cy="40" r="10"/>
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
            </Link>

            {/* Card 2: Personal Care */}
            <Link 
              href="/care/personal-care"
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" 
              style={{ backgroundColor: '#B084CC' }} 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="white" opacity="0.9">
                  <path d="M30 10L35 25L50 25L38 35L43 50L30 40L17 50L22 35L10 25L25 25Z"/>
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
            </Link>

            {/* Card 3: Household Help */}
            <Link 
              href="/care/household-help"
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" 
              style={{ backgroundColor: '#6B6B6B' }} 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="white" opacity="0.9">
                  <path d="M30 10L40 20L50 10L50 30L40 40L50 50L30 50L20 40L10 50L10 30L20 20Z"/>
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
            </Link>

            {/* Card 4: Respite Care */}
            <Link 
              href="/care/respite-care"
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" 
              style={{ backgroundColor: '#A6C8E1' }} 
              data-aos="fade-up" 
              data-aos-delay="0"
            >
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="white" opacity="0.9">
                  <path d="M20 20L40 20L40 40L20 40Z" transform="rotate(45 30 30)"/>
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
            </Link>

            {/* Card 5: Meal Preparation */}
            <Link 
              href="/care/meal-preparation"
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" 
              style={{ backgroundColor: '#D4B896' }} 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="white" opacity="0.9">
                  <circle cx="30" cy="30" r="20"/>
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
            </Link>

            {/* Card 6: Transportation */}
            <Link 
              href="/care/transportation"
              className="rounded-3xl p-8 lg:p-10 relative shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" 
              style={{ backgroundColor: '#5B8A7D' }} 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 group-hover:scale-110 transition-transform duration-300">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="white" opacity="0.9">
                  <path d="M30 10L35 20L45 25L35 30L30 40L25 30L15 25L25 20Z"/>
                  <circle cx="30" cy="30" r="8"/>
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
            </Link>

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
                className={`${inter.className} group bg-[#275F49] hover:bg-[#1f4a37] text-white font-semibold text-base px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Make an Enquiry
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