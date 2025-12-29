"use client"

import { useState, useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Playfair_Display, Inter } from "next/font/google"
import { ChevronDown } from "lucide-react"
import { GetStartedModal } from "@/components/get-started-modal"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function PricingPage() {
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const faqs = [
    {
      question: "How much does in-home care cost per hour in Massachusetts?",
      answer: "In-home non-medical care in Massachusetts is typically billed hourly. Rates vary based on care needs, schedule, and services provided. NestAid shares exact pricing after a personalized consultation."
    },
    {
      question: "Is there a minimum number of hours required?",
      answer: "Care plans are flexible and designed around your needs. Minimum hours may apply depending on scheduling and location, which we'll clearly explain during your consultation."
    },
    {
      question: "Does NestAid accept insurance or Medicare?",
      answer: "NestAid is a private-pay provider. Medicare generally does not cover non-medical home care, but some long-term care insurance plans or veterans benefits may apply."
    },
    {
      question: "Can care hours be adjusted over time?",
      answer: "Yes. Care needs often change, and our plans are designed to adapt—whether you need more support or less."
    },
    {
      question: "What services are included in the cost?",
      answer: "Services may include companionship, personal care, household help, meal preparation, transportation, and respite care. Each care plan is customized."
    },
    {
      question: "How do I know what level of care is right?",
      answer: "Our care team conducts a complimentary consultation to understand needs, routines, and preferences—then recommends the right level of support."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No. NestAid believes in transparency. All pricing is clearly explained before care begins."
    },
    {
      question: "How quickly can care start?",
      answer: "In many cases, care can begin shortly after the consultation, depending on availability and care needs."
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                CARE COSTS & PLANNING
              </p>
            </div>
            <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-8`}>
              How Much Does In-Home Care Cost in Massachusetts?
            </h1>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-6`}>
              Understanding the cost of in-home care is an important step when planning support for yourself or a loved one. At NestAid, we believe families deserve transparent, straightforward information—so you can make decisions with confidence and peace of mind.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed`}>
              The cost of non-medical in-home care in Massachusetts varies based on individual needs, schedules, and the level of support required. While pricing matters, choosing the right care is also about comfort, trust, and quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* Factors Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-8 text-center`}>
              What Factors Affect the Cost of In-Home Care?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-12 text-center`}>
              In-home care is personalized, and pricing reflects that flexibility. Common factors include:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm" data-aos="fade-up">
                <h3 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#1A5463] mb-4`}>
                  Level of Care Needed
                </h3>
                <p className={`${inter.className} text-base text-[#1A5463]/80 leading-relaxed`}>
                  Companionship, personal care, household help, and respite care each require different levels of support and caregiver involvement.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                <h3 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#1A5463] mb-4`}>
                  Hours & Frequency
                </h3>
                <p className={`${inter.className} text-base text-[#1A5463]/80 leading-relaxed`}>
                  Care can range from a few hours a week to daily or extended support. More hours typically reduce the stress on family caregivers but increase overall cost.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm" data-aos="fade-up" data-aos-delay="200">
                <h3 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#1A5463] mb-4`}>
                  Schedule of Care
                </h3>
                <p className={`${inter.className} text-base text-[#1A5463]/80 leading-relaxed`}>
                  Weekday, weekend, overnight, or holiday care may influence pricing.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                <h3 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#1A5463] mb-4`}>
                  Individual Preferences
                </h3>
                <p className={`${inter.className} text-base text-[#1A5463]/80 leading-relaxed`}>
                  Meal preparation, transportation, routines, mobility needs, and lifestyle preferences all shape a customized care plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Average Cost Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-8`}>
              Average Cost of In-Home Care in Massachusetts
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-6`}>
              While every family's situation is unique, non-medical in-home care in Massachusetts is typically billed hourly.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-6`}>
              At NestAid, we create personalized care plans after a consultation, ensuring families only pay for the care they truly need—nothing more.
            </p>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed font-semibold`}>
              Final pricing is shared clearly before care begins, with no hidden fees or surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-8 text-center`}>
              Is In-Home Care Worth the Cost?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-10 text-center`}>
              Many families choose in-home care because it offers meaningful benefits beyond cost comparisons:
            </p>

            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#8B5CF6] mt-2"></div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    One-on-one, personalized attention
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#8B5CF6] mt-2"></div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Comfort of staying at home
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#8B5CF6] mt-2"></div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Flexible scheduling
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#8B5CF6] mt-2"></div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Support for independence and dignity
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#8B5CF6] mt-2"></div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Relief for family caregivers
                  </p>
                </li>
              </ul>
              <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mt-8`}>
                In-home care often provides value by helping adults and seniors maintain routine, safety, and emotional well-being in familiar surroundings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How NestAid Supports Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-8 text-center`}>
              How NestAid Supports You
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-10 text-center`}>
              At NestAid, we focus on clarity—not pressure.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm" data-aos="fade-up">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>
                  </div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Complimentary care consultation
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>
                  </div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Personalized care recommendations
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>
                  </div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Transparent pricing discussions
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>
                  </div>
                  <p className={`${inter.className} text-base md:text-lg text-[#1A5463]`}>
                    Flexible plans that grow with changing needs
                  </p>
                </div>
              </div>
            </div>

            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mt-10 text-center`}>
              We're here to help you plan care with confidence and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#27645E' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] mb-6`}>
              Get Clear Answers About Care Costs
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-white/90 leading-relaxed mb-10`}>
              A short conversation can bring clarity and peace of mind.
            </p>
            <button 
              onClick={() => setGetStartedModalOpen(true)}
              className={`${inter.className} bg-[#D9FB74] hover:bg-[#c5e665] text-[#1A5463] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              Request a Care Consultation
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-12 text-center`}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className={`${playfair.className} text-lg md:text-xl font-semibold text-[#1A5463]`}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`flex-shrink-0 w-5 h-5 text-[#1A5463] transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 md:px-8 pb-5 md:pb-6">
                      <p className={`${inter.className} text-base md:text-lg text-[#1A5463]/80 leading-relaxed`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
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

