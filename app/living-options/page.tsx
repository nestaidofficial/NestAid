"use client"

import { useState, useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Playfair_Display, Inter } from "next/font/google"
import { Home, Clock, Moon, CalendarClock, Timer, Heart } from "lucide-react"
import { GetStartedModal } from "@/components/get-started-modal"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function LivingOptionsPage() {
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const careOptions = [
    {
      icon: Home,
      title: "Live-In Care",
      description: "A dedicated caregiver lives in the home to provide continuous support, companionship, and assistance with daily routines.",
      color: "#E8D4F0"
    },
    {
      icon: Clock,
      title: "24-Hour Care",
      description: "Shift-based care ensures constant, awake support at all times—ideal for individuals who require ongoing supervision and assistance.",
      color: "#A8D5E2"
    },
    {
      icon: Moon,
      title: "Overnight Care",
      description: "Support during evening and nighttime hours to promote safety, comfort, and peace of mind.",
      color: "#D896E5"
    },
    {
      icon: CalendarClock,
      title: "Hourly In-Home Care",
      description: "Flexible care scheduled around your needs—perfect for daily routines, companionship, and household support.",
      color: "#F2D4F7"
    },
    {
      icon: Timer,
      title: "Short-Term Care",
      description: "Temporary in-home support during recovery, transitions, or when extra help is needed for a limited time.",
      color: "#E8D4F0"
    },
    {
      icon: Heart,
      title: "Respite Living Support",
      description: "Short-term care that allows family caregivers time to rest and recharge while loved ones remain at home.",
      color: "#A8D5E2"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                CARE THAT FITS YOUR LIFE
              </p>
            </div>
            <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-8`}>
              Flexible In-Home Living & Care Options
            </h1>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
              Every family's situation is different. NestAid offers flexible in-home care options designed to support adults and seniors safely and comfortably—whether care is needed for a few hours a week or around the clock.
            </p>
          </div>
        </div>
      </section>

      {/* Living & Care Options Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-12 text-center`}>
              Living & Care Options
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="p-8">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: option.color }}
                      >
                        <Icon className="w-8 h-8 text-[#1A5463]" />
                      </div>
                      <h3 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#1A5463] mb-4`}>
                        {option.title}
                      </h3>
                      <p className={`${inter.className} text-base text-[#1A5463]/80 leading-relaxed`}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How to Choose Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-8 text-center`}>
              How Do I Choose the Right Living Option?
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed text-center`}>
                Choosing the right care depends on daily routines, safety needs, and family support. Our care team takes the time to understand your situation and helps you choose an option that feels right—today and as needs evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#275F48' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] mb-6`}>
              Let's Find the Right Care Option Together
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed mb-10`}>
              A simple conversation can help bring clarity and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:4129530622"
                className={`${inter.className} bg-white hover:bg-gray-100 text-[#275F48] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                Talk to Our Care Team
              </a>
              <button 
                onClick={() => setGetStartedModalOpen(true)}
                className={`${inter.className} bg-[#27645E] hover:bg-[#1f4d47] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                Request a Care Consultation
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

