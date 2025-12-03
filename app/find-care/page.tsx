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
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#FCF5EB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-12 md:py-16">
            {/* Left Section - Text Content */}
            <div className="flex flex-col justify-center space-y-5" data-aos="fade-right">
              {/* Tagline */}
              <div className="flex items-center gap-2">
                <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
                <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                  WE ARE ALWAYS CLOSE
                </p>
          </div>

              {/* Headline */}
              <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[#1A5463] leading-[1.08]`}>
                Exceptional, Tailored<br />
                Senior Care
              </h1>

              {/* Body Text */}
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed max-w-xl`}>
                At NestAid, we provide compassionate adult daycare services that go beyond routine care. With personalised attention, meaningful activities
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                <button 
                  onClick={() => setGetStartedModalOpen(true)}
                  className={`${inter.className} bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  MAKE AN ENQUIRY
                </button>
                <Link 
                  href="#services"
                  className={`${inter.className} bg-[#275F48] hover:bg-[#1f4a37] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  OUR SERVICES
                </Link>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="relative flex items-center justify-center md:justify-end" data-aos="fade-left">
              <div className="relative w-full max-w-md md:max-w-lg">
                {/* Decorative Purple Butterfly/Flower Element */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 50C40 35 25 25 15 25C5 25 0 35 0 45C0 55 5 65 15 65C25 65 40 55 40 50Z" fill="#8B5CF6" opacity="0.8"/>
                    <path d="M80 50C80 35 95 25 105 25C115 25 120 35 120 45C120 55 115 65 105 65C95 65 80 55 80 50Z" fill="#A78BFA" opacity="0.8"/>
                    <path d="M60 30C60 20 50 10 40 10C30 10 25 20 25 30C25 40 30 50 40 50C50 50 60 40 60 30Z" fill="#C4B5FD" opacity="0.7"/>
                    <path d="M60 70C60 80 50 90 40 90C30 90 25 80 25 70C25 60 30 50 40 50C50 50 60 60 60 70Z" fill="#DDD6FE" opacity="0.7"/>
                  </svg>
        </div>

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
      <section id="services" className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} >
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                HELPING SENIORS THRIVE WITH CARE
              </p>
            </div>
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08]`}>
              Exceptional Care, Tailored To<br />Every Need
            </h2>
          </div>

          {/* Service Cards Grid - 3 columns, 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
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
                {serviceDetails['companion'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
            </Link>

            {/* Card 2: Assistance */}
            <Link 
              href="/care/assistance"
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
                Assistance
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Tailored assistance to make daily life easier and more fulfilling.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['in-home'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
              </ul>
            </Link>

            {/* Card 3: Support */}
            <Link 
              href="/care/support"
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
                Support
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Reliable support designed to nurture comfort and independence.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['special-needs'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
            </Link>

            {/* Card 4: Caregiving */}
            <Link 
              href="/care/caregiving"
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
                Caregiving
              </h3>
              <p className={`${inter.className} text-[#1A5463] text-base leading-relaxed mb-6`}>
                Dedicated caregivers offering daily support with warmth and respect.
              </p>
              <ul className={`${inter.className} space-y-2 text-[#1A5463] text-sm`}>
                {serviceDetails['live-in'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
            </Link>

            {/* Card 5: Guidance */}
            <Link 
              href="/care/guidance"
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
                Guidance
              </h3>
              <p className={`${inter.className} text-[#4A4A4A] text-base leading-relaxed mb-6`}>
                Compassionate guidance for seniors and families at every step.
              </p>
              <ul className={`${inter.className} space-y-2 text-[#4A4A4A] text-sm`}>
                {serviceDetails['care-plans'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
            </Link>

            {/* Card 6: Therapy */}
            <Link 
              href="/care/therapy"
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
                Therapy
              </h3>
              <p className={`${inter.className} text-white text-base leading-relaxed mb-6`}>
                Personalized therapies to restore strength, balance, and peace.
              </p>
              <ul className={`${inter.className} space-y-2 text-white text-sm`}>
                {serviceDetails['wellness'].map((item, index) => (
                  <li key={index}>• {item.text}</li>
                ))}
                  </ul>
            </Link>

          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-[#FCF5EB] overflow-x-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-6`} data-aos="fade-up">
              Ready to Find the Care You Deserve?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] mb-8 leading-relaxed`} data-aos="fade-up">
              Just like we mentioned at the top—care should be personal. Our trusted caregivers are here to bring comfort, dignity, and peace of mind right to your doorstep. 
              <span className="font-bold"> It's time to take the next step.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up">
              <button 
                onClick={() => setGetStartedModalOpen(true)}
                className={`${inter.className} group bg-[#275F49] hover:bg-[#1f4a37] text-white font-semibold text-base px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                MAKE AN ENQUIRY
              </button>
              <Link 
                href="#services" 
                className={`${inter.className} bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                OUR SERVICES
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#275F49] text-background">
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