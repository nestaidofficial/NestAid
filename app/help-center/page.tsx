"use client"

import { useState, useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Playfair_Display, Inter } from "next/font/google"
import { Search, ChevronDown, Play, DollarSign, Shield, MessageCircle } from "lucide-react"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

type FAQ = {
  question: string
  answer: string
}

type Category = {
  id: string
  title: string
  description: string
  icon: any
  color: string
  faqs: FAQ[]
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const categories: Category[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn how to find care and get started with NestAid",
      icon: Play,
      color: "#E8D4F0",
      faqs: [
        {
          question: "How does NestAid work?",
          answer: "NestAid connects families with trusted, vetted caregivers for in-home support. We start with a care consultation, match you with a suitable caregiver, and coordinate care based on your schedule, needs, and preferences."
        },
        {
          question: "Who can use NestAid services?",
          answer: "NestAid services are available for seniors, adults needing daily support, individuals recovering at home, and families seeking respite or companion care."
        },
        {
          question: "How do I request care?",
          answer: "You can request care by filling out our online form, calling our support team, or scheduling a consultation. A care coordinator will guide you through the next steps."
        },
        {
          question: "How long does it take to start care?",
          answer: "Care can often begin within a few days, depending on your location, care needs, and caregiver availability."
        },
        {
          question: "What information do I need to get started?",
          answer: "We'll ask about care needs, schedule preferences, home environment, and any special considerations to ensure a safe and appropriate caregiver match."
        },
        {
          question: "Can I speak to someone before booking care?",
          answer: "Yes. You can speak directly with a NestAid care coordinator before making any commitment."
        },
        {
          question: "What areas does NestAid serve?",
          answer: "NestAid currently serves only Massachusetts region. Availability may vary by location—contact us to confirm service in your area."
        }
      ]
    },
    {
      id: "care-services",
      title: "Care Services",
      description: "Explore our in-home care options and support services",
      icon: MessageCircle,
      color: "#A8D5E2",
      faqs: [
        {
          question: "What types of in-home care does NestAid offer?",
          answer: "NestAid provides non-medical in-home care, including companionship, personal assistance, live-in care, 24-hour care, and respite support."
        },
        {
          question: "What is the difference between live-in and 24-hour care?",
          answer: "Live-in care involves one caregiver living in the home with scheduled rest periods. 24-hour care includes multiple caregivers working in shifts to provide continuous, around-the-clock support."
        },
        {
          question: "Do you offer hourly or part-time care?",
          answer: "Yes. NestAid offers flexible hourly and part-time care options based on your needs and schedule."
        },
        {
          question: "Can care be short-term or temporary?",
          answer: "Yes. Care can be arranged for short-term recovery, travel coverage, or temporary family support."
        },
        {
          question: "What is respite care?",
          answer: "Respite care provides temporary caregiver support to give family caregivers time to rest, recharge, or attend to personal needs."
        },
        {
          question: "What tasks can a caregiver help with?",
          answer: "Caregivers assist with daily living activities such as personal care, meal preparation, light housekeeping, companionship, and mobility support."
        },
        {
          question: "Do caregivers provide companionship?",
          answer: "Yes. Companionship is a core part of our services, including conversation, shared activities, and emotional support."
        },
        {
          question: "Can caregivers help with meals and errands?",
          answer: "Caregivers can help with meal preparation, grocery shopping, and essential errands as part of daily support."
        },
        {
          question: "What care is not provided?",
          answer: "NestAid does not provide medical care, nursing services, medication administration, or clinical treatments."
        }
      ]
    },
    {
      id: "payments-billing",
      title: "Payments & Billing",
      description: "Understand pricing, billing, and payment options",
      icon: DollarSign,
      color: "#D896E5",
      faqs: [
        {
          question: "How much does in-home care cost?",
          answer: "The cost of in-home care depends on care type, hours, and location. NestAid provides transparent pricing after your care consultation."
        },
        {
          question: "How is pricing calculated?",
          answer: "Pricing is based on the level of care required, schedule, and duration of services."
        },
        {
          question: "What payment methods are accepted?",
          answer: "NestAid accepts common payment methods including credit cards and electronic payments."
        },
        {
          question: "Do you accept insurance or Medicaid?",
          answer: "NestAid is a non-medical home care agency and does not directly accept Medicare, Medicaid, or traditional health insurance for payment. Our services focus on personal care, companionship, and daily living support, which are typically not covered by medical insurance plans.\n\nHowever, depending on their individual plan, some families are able to offset costs through long-term care insurance, veterans' benefits, or personal health accounts such as HSAs or FSAs.\n\nOur team is happy to help you understand your options and provide any documentation you may need for reimbursement."
        },
        {
          question: "When will I be billed?",
          answer: "Billing typically occurs on a regular schedule, such as weekly or bi-weekly, depending on your care arrangement."
        },
        {
          question: "Can I change or cancel care?",
          answer: "Yes. Care schedules can be adjusted or canceled with advance notice, subject to our cancellation policy."
        },
        {
          question: "Are there any long-term contracts?",
          answer: "No. NestAid does not require long-term contracts. Our care services are flexible and designed to adapt as your needs change."
        }
      ]
    },
    {
      id: "safety-security",
      title: "Safety & Security",
      description: "How we protect families and caregivers",
      icon: Shield,
      color: "#F2D4F7",
      faqs: [
        {
          question: "How are caregivers screened?",
          answer: "All caregivers undergo a thorough screening process, including interviews, experience verification, and background checks."
        },
        {
          question: "Do caregivers undergo background checks?",
          answer: "Yes. At NestAid, every caregiver undergoes a thorough background screening before they begin working with families. This typically includes criminal history checks, reference verification, and other vetting to help ensure safety and trust."
        },
        {
          question: "How does NestAid ensure caregiver quality?",
          answer: "Caregivers are evaluated based on experience, references, and ongoing performance feedback."
        },
        {
          question: "What safety measures are in place?",
          answer: "NestAid follows safety best practices, caregiver guidelines, and clear communication protocols to protect families and caregivers."
        },
        {
          question: "What happens if I have a safety concern?",
          answer: "You can contact NestAid support immediately. We take all concerns seriously and act promptly."
        },
        {
          question: "How does NestAid protect my personal information?",
          answer: "NestAid uses secure systems and privacy safeguards to protect personal and financial information."
        }
      ]
    },
    {
      id: "support-communication",
      title: "Support & Communication",
      description: "Get help and stay connected with your care team",
      icon: MessageCircle,
      color: "#E8D4F0",
      faqs: [
        {
          question: "How do I contact my care coordinator?",
          answer: "You can reach your assigned care coordinator by phone, email, or through NestAid support channels."
        },
        {
          question: "What if I need to change my care schedule?",
          answer: "Schedule changes can be requested through your care coordinator with reasonable notice."
        },
        {
          question: "How do I provide feedback or report an issue?",
          answer: "Feedback and concerns can be shared directly with NestAid support or your care coordinator."
        },
        {
          question: "What happens if my caregiver is unavailable?",
          answer: "NestAid will work to arrange a replacement caregiver whenever possible to ensure continuity of care."
        },
        {
          question: "How do I reach NestAid support?",
          answer: "You can contact NestAid by phone, email or through Nessa- our AI agent."
        },
        {
          question: "What are your support hours?",
          answer: "Our support hours are 9am-8pm. Emergency concerns are prioritized whenever they arise."
        }
      ]
    }
  ]

  // Filter categories and FAQs based on search query
  const filteredCategories = categories.map(category => {
    const filteredFaqs = category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return { ...category, faqs: filteredFaqs }
  }).filter(category => 
    category.faqs.length > 0 || 
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const displayCategories = searchQuery ? filteredCategories : categories

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
              <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
                WE'RE HERE TO HELP
              </p>
            </div>
            <h1 className={`${playfair.className} text-[38px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.08] mb-8`}>
              How Can We Help You?
            </h1>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-10`}>
              Find answers to common questions about NestAid's in-home care services, pricing, and support.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-[#1A5463]/40" />
              </div>
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inter.className} w-full pl-12 pr-4 py-4 rounded-full border-2 border-[#1A5463]/20 focus:border-[#8B5CF6] focus:outline-none text-[#1A5463] placeholder:text-[#1A5463]/40 bg-white shadow-sm`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid (show only when no search or no category selected) */}
      {!searchQuery && !selectedCategory && (
        <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white rounded-2xl p-8 text-left hover:shadow-lg transition-all duration-300 group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: category.color }}
                    >
                      <Icon className="w-8 h-8 text-[#1A5463]" />
                    </div>
                    <h3 className={`${playfair.className} text-2xl font-bold text-[#1A5463] mb-3`}>
                      {category.title}
                    </h3>
                    <p className={`${inter.className} text-base text-[#1A5463]/80 leading-relaxed`}>
                      {category.description}
                    </p>
                    <div className={`${inter.className} text-sm text-[#8B5CF6] mt-4 flex items-center gap-2 group-hover:gap-3 transition-all`}>
                      View FAQs
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {(searchQuery || selectedCategory) && (
        <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F5EC' }} data-aos="fade-up">
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            {selectedCategory && !searchQuery && (
              <button
                onClick={() => setSelectedCategory(null)}
                className={`${inter.className} text-[#8B5CF6] hover:text-[#1A5463] mb-8 flex items-center gap-2 transition-colors`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all categories
              </button>
            )}

            <div className="max-w-4xl mx-auto">
              {displayCategories.map((category) => {
                if (selectedCategory && category.id !== selectedCategory) return null
                
                const Icon = category.icon
                return (
                  <div key={category.id} className="mb-12">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      >
                        <Icon className="w-7 h-7 text-[#1A5463]" />
                      </div>
                      <div>
                        <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#1A5463]`}>
                          {category.title}
                        </h2>
                        <p className={`${inter.className} text-sm md:text-base text-[#1A5463]/70`}>
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* FAQs */}
                    <div className="space-y-4">
                      {category.faqs.map((faq, index) => {
                        const globalIndex = categories.findIndex(c => c.id === category.id) * 1000 + index
                        return (
                          <div 
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-sm"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                          >
                            <button
                              onClick={() => toggleFaq(globalIndex)}
                              className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                            >
                              <span className={`${playfair.className} text-lg md:text-xl font-semibold text-[#1A5463]`}>
                                {faq.question}
                              </span>
                              <ChevronDown 
                                className={`flex-shrink-0 w-5 h-5 text-[#1A5463] transition-transform ${
                                  openFaqIndex === globalIndex ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {openFaqIndex === globalIndex && (
                              <div className="px-6 md:px-8 pb-5 md:pb-6">
                                <p className={`${inter.className} text-base md:text-lg text-[#1A5463]/80 leading-relaxed whitespace-pre-line`}>
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {displayCategories.length === 0 && (
                <div className="text-center py-12">
                  <p className={`${inter.className} text-lg text-[#1A5463]/60`}>
                    No results found for "{searchQuery}". Try a different search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FCF5EB' }} data-aos="fade-up">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${playfair.className} text-[32px] md:text-[42px] lg:text-[48px] text-[#1A5463] leading-[1.1] mb-6`}>
              Still Have Questions?
            </h2>
            <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-10`}>
              Our care team is here to help. Reach out for personalized support and guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:4129530622"
                className={`${inter.className} bg-[#27645E] hover:bg-[#1f4d47] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                Call Us: (412) 953-0622
              </a>
              <a
                href="mailto:information@nestaid.com"
                className={`${inter.className} bg-white hover:bg-gray-50 text-[#1A5463] border-2 border-[#1A5463] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
