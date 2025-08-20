"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"


import { Bath, Heart, Users, MessageCircle, Car, Utensils, Clock, Accessibility, Phone, UserCheck, AlertCircle, Stethoscope, FileText, Calendar, UserPlus, Target, Activity, Flower, Brain, Dumbbell, Apple, Smile } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState, useEffect } from "react"

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
  const animationRef = useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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
    <div ref={animationRef} className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative w-full h-[80vh] md:h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/bg-image/find-care-bg.jpg" 
            alt="Find Care Background" 
            fill 
            className="object-cover"
            priority
          />
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Background Box with All Content */}
        <div 
          className="absolute bg-white/40 backdrop-blur-sm flex items-center justify-center
                     w-[350px] h-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2
                     md:w-[650px] md:h-[550px] md:left-auto md:right-8 md:translate-x-0
                     transition-all duration-700 ease-in-out"
          style={{
            borderRadius: isMobile ? '25%' : '33% 67% 79% 21% / 44% 34% 66% 56%',
            top: '50%',
            zIndex: 5
          }}
        >
          <div className="flex flex-col justify-center items-center text-center px-4 py-4 md:px-8 md:py-8 max-w-full transition-all duration-600 ease-in-out">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1A5463] mb-4 md:mb-6 leading-tight transition-all duration-500 ease-in-out">
              Find the Care You Deserve, Right at Home
            </h1>
            <p className="text-md md:text-base lg:text-lg text-[#1A5463] mb-4 md:mb-6 leading-relaxed transition-all duration-500 ease-in-out">
              At <span className="font-bold" style={{ color: '#1A5463' }}>NestAid</span>, we believe care should be personal. Our trusted caregivers are here to bring comfort, dignity, and peace of mind—right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 transition-all duration-500 ease-in-out">
              <Link href="/find-care">
                <button className="group bg-[#16803C] hover:bg-[#1f4a37] text-white font-bold text-xs md:text-base px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 md:gap-3 transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105">
                  JOIN NOW
                  <span className="bg-[#E4F2D4] text-[#275F48] rounded-full p-1.5 md:p-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 md:w-4 md:h-4 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </Link>
              <Link href="/help-center" className="text-xs md:text-base underline underline-offset-4 text-[#1A5463] transition-all duration-400 hover:text-[#275F48]">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Care We Provide Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#275F49' }}>
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-5xl font-serif py-10 font-bold tracking-tight text-center text-white mb-16">Care We Provide</h2>
          

          {/* Service Cards - New Layout */}
          <div className="space-y-16 md:space-y-24">
            {/* Service 1: In‑Home Care Services - Right aligned */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center slide-in-left" style={{ backgroundColor: '#DBD9FE' }}>
                  <Image src="/images/adult-care.jpg" alt="In‑Home Care Services" width={120} height={120} className="rounded-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 slide-in-right">
                <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: '#DBD9FE' }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#275F49] mb-6">In‑Home Care Services</h3>
                  <ul className="space-y-4">
                    {serviceDetails['in-home'].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#275F49' }}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-base text-[#275F49] leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 2: Companion & Household Support - Left aligned */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center slide-in-right" style={{ backgroundColor: '#E4F2D4' }}>
                  <Image src="/images/group.png" alt="Companion & Household Support" width={120} height={120} className="rounded-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 slide-in-left">
                <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: '#E4F2D4' }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#275F49] mb-6">Companion & Household Support</h3>
                  <ul className="space-y-4">
                    {serviceDetails['companion'].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#275F49' }}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-base text-[#275F49] leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 3: Special Needs & Disability Support - Right aligned */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center slide-in-left" style={{ backgroundColor: '#F0F0F0' }}>
                  <Image src="/images/adult-care.jpg" alt="Special Needs & Disability Support" width={120} height={120} className="rounded-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 slide-in-right">
                <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: '#F0F0F0' }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#275F49] mb-6">Special Needs & Disability Support</h3>
                  <ul className="space-y-4">
                    {serviceDetails['special-needs'].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#275F49' }}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-base text-[#275F49] leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 4: 24/7 Live‑In Care - Left aligned */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center slide-in-right" style={{ backgroundColor: '#DBD9FE' }}>
                  <Image src="/images/pet-care.jpg" alt="24/7 Live‑In Care" width={120} height={120} className="rounded-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 slide-in-left">
                <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: '#DBD9FE' }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#275F49] mb-6">24/7 Live‑In Care</h3>
                  <ul className="space-y-4">
                    {serviceDetails['live-in'].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#275F49' }}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-base text-[#275F49] leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 5: Personalized Care Plans - Right aligned */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center slide-in-left" style={{ backgroundColor: '#E4F2D4' }}>
                  <Image src="/images/group.png" alt="Personalized Care Plans" width={120} height={120} className="rounded-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 slide-in-right">
                <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: '#E4F2D4' }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#275F49] mb-6">Personalized Care Plans</h3>
                  <ul className="space-y-4">
                    {serviceDetails['care-plans'].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#275F49' }}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-base text-[#275F49] leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 6: Wellness & Yoga - Left aligned */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center slide-in-right" style={{ backgroundColor: '#F0F0F0' }}>
                  <Image src="/images/senior-care.jpg" alt="Wellness & Yoga" width={120} height={120} className="rounded-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 slide-in-left">
                <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: '#F0F0F0' }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#275F49] mb-6">Wellness & Yoga</h3>
                  <ul className="space-y-4">
                    {serviceDetails['wellness'].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#275F49' }}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-base text-[#275F49] leading-relaxed">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background">
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
                <li>
                  <Link href="/cost-of-care" className="hover:text-white">
                    Cost of Care
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
    </div>
  )
}