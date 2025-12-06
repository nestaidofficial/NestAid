"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle, Phone, Mail, HelpCircle, Users, CreditCard, Shield, Home, Heart, FileText, Clock, Star, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFaqs, setFilteredFaqs] = useState([])

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn how to find care and get started with NestAid",
      color: "#E8F5E8"
    },
    {
      icon: Heart,
      title: "Care Services",
      description: "Information about our different types of care services",
      color: "#FCFDFB"
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Understand costs, insurance, and Medicaid coverage",
      color: "#E4F2D4"
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Background checks, safety features, and best practices",
      color: "#DBD9FE"
    },
    {
      icon: MessageCircle,
      title: "Support & Communication",
      description: "How to get help and stay connected with your care team",
      color: "#E8F5E8"
    },
  ]

  const comprehensiveFaqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What makes NestAid different from other home care services?",
          answer: "NestAid combines personalized care with comprehensive family support. We don't just provide caregivers—we offer complete care solutions including Medicaid navigation and ongoing support throughout your care journey."
        },
        {
          question: "How do I get started with NestAid?",
          answer: "Getting started is easy! Simply contact us for a free consultation where we'll assess your needs, explain your options, and help you create a personalized care plan. We'll handle all the paperwork and guide you through every step."
        },
        {
          question: "What areas do you serve?",
          answer: "We currently serve families in Pennsylvania, Ohio, Massachusetts, and are rapidly expanding to additional states. Contact us to check availability in your area."
        },
      ]
    },
    {
      category: "Care Services",
      questions: [
        {
          question: "What types of care do you provide?",
          answer: "We offer comprehensive non-medical home care including companion care, personal care assistance, specialized care for disabilities, and live-in care."
        },
        {
          question: "How quickly can care services begin?",
          answer: "For immediate care needs, we can often arrange services within 24-48 hours."
        },
        {
          question: "Can I choose my caregiver?",
          answer: "Absolutely! We carefully match you with caregivers based on your specific needs, personality, and preferences. You have the final say in selecting your caregiver, and we ensure they're the right fit for your family."
        },
        {
          question: "What if I'm not satisfied with my caregiver?",
          answer: "If you're not completely satisfied, please contact our support team immediately. We'll work with you to resolve any issues and help you find a better match if needed. Your satisfaction is our priority."
        },
      ]
    },
    {
      category: "Safety & Security",
      questions: [
        {
          question: "How do you ensure the quality and safety of your caregivers?",
          answer: "Every caregiver undergoes comprehensive background checks, identity verification, reference checks, and ongoing training. We also provide continuous monitoring and support to maintain the highest standards of care."
        },
        {
          question: "What happens in case of an emergency?",
          answer: "All caregivers are trained in basic emergency procedures. For medical emergencies, call 911 immediately. You can also contact our 24/7 safety hotline for urgent safety concerns."
        },
        {
          question: "Are caregivers insured?",
          answer: "Yes, all our caregivers are covered by comprehensive insurance including liability and bonding coverage. This provides additional protection and peace of mind for families."
        },
      ]
    },
    {
      category: "Payments & Billing",
      questions: [
        {
          question: "Do you help with insurance and Medicaid?",
          answer: "Yes! We specialize in helping families navigate Medicaid-funded care programs. Our team assists with applications, paperwork, and compliance requirements."
        },
        {
          question: "How much does care cost?",
          answer: "Care costs vary based on your specific needs, location, and type of services. Many of our services are covered by Medicaid or insurance. We provide free consultations to discuss options and costs."
        },
        {
          question: "What insurance do you accept?",
          answer: "We work with most major insurance plans and specialize in Medicaid programs. Our team will verify your coverage and help maximize your benefits to reduce out-of-pocket costs."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. All costs are discussed upfront during your consultation, and there are no hidden fees or surprise charges."
        },
      ]
    },
    {
      category: "Support & Communication",
      questions: [
        {
          question: "How do I contact my care team?",
          answer: "You'll have direct contact information for your caregiver and care manager. We also provide 24/7 support through phone, email, and live chat for any urgent needs or questions."
        },
        {
          question: "What if I need to change my care schedule?",
          answer: "We understand that needs can change. Simply contact your care manager, and we'll work with you to adjust your schedule. We strive to accommodate changes whenever possible."
        },
        {
          question: "How often will you check in with us?",
          answer: "Your care manager will check in regularly to ensure everything is going well. The frequency depends on your needs, but typically includes weekly check-ins initially, then monthly ongoing support."
        },
      ]
    }
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7",
      color: "#E8F5E8"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support representative",
      action: "Call (1-800-NESTAID)",
      available: "Mon-Fri 8AM-8PM EST",
      color: "#FCFDFB"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "help@nestaid.com",
      available: "Response within 24 hours",
      color: "#E4F2D4"
    },
  ]

  // Filter FAQs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(comprehensiveFaqs)
    } else {
      const filtered = comprehensiveFaqs.map(category => ({
        ...category,
        questions: category.questions.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
      setFilteredFaqs(filtered)
    }
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#E8F5E8' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A5463] mb-6" data-aos="fade-up">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-[#1A5463]/80 mb-8 leading-relaxed" data-aos="fade-up">
              Find answers to your questions and get the support you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto" data-aos="fade-up">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A5463]/60 w-6 h-6" />
                <Input 
                  placeholder="Search for help articles, FAQs, or topics..." 
                  className="pl-12 py-4 text-lg border-2 border-[#275F49]/20 focus:border-[#275F49] rounded-2xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A5463] mb-6">Browse by Category</h2>
              <p className="text-lg text-[#1A5463]/80">
                Find information organized by topic to get answers quickly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#275F49]/20" data-aos="fade-up">
                  <CardHeader className="text-center" style={{ backgroundColor: category.color }}>
                    <category.icon className="w-16 h-16 mx-auto mb-4 text-[#275F49]" />
                    <CardTitle className="text-xl text-[#1A5463]">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-[#1A5463]/80 text-center">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FCFDFB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A5463] mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-[#1A5463]/80">
                Get comprehensive answers to the most common questions about NestAid and our services
              </p>
            </div>

            <div className="space-y-12">
              {(filteredFaqs.length > 0 ? filteredFaqs : comprehensiveFaqs).map((category, categoryIndex) => (
                <div key={categoryIndex} data-aos="fade-up">
                  <h3 className="text-2xl font-bold text-[#275F49] mb-6 flex items-center">
                    <div className="w-2 h-2 bg-[#275F49] rounded-full mr-3"></div>
                    {category.category}
                  </h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="border-b border-[#E4F2D4]">
                        <AccordionTrigger className="text-left py-6 hover:no-underline">
                          <span className="flex items-start text-[#1A5463]">
                            <HelpCircle className="w-5 h-5 text-[#275F49] mr-3 flex-shrink-0 mt-0.5" />
                            <span className="font-semibold text-left">{faq.question}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-[#1A5463]/80 ml-8 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchTerm.trim() !== "" && (
              <div className="text-center py-12" data-aos="fade-up">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-[#275F49]/60" />
                <h3 className="text-xl font-semibold text-[#1A5463] mb-2">No results found</h3>
                <p className="text-[#1A5463]/80 mb-6">
                  We couldn't find any FAQs matching "{searchTerm}". Try different keywords or browse by category.
                </p>
                <Button onClick={() => setSearchTerm("")} className="bg-[#275F49] hover:bg-[#1f4a37]">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A5463] mb-6">Contact Support</h2>
              <p className="text-lg text-[#1A5463]/80">
                Can't find what you're looking for? Our support team is here to help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <Card key={index} className="text-center border-2 border-[#E4F2D4] hover:shadow-lg transition-shadow" data-aos="fade-up">
                  <CardHeader style={{ backgroundColor: option.color }}>
                    <option.icon className="w-16 h-16 mx-auto mb-4 text-[#275F49]" />
                    <CardTitle className="text-xl text-[#1A5463]">{option.title}</CardTitle>
                    <p className="text-sm text-[#1A5463]/70 font-medium">{option.available}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-[#1A5463]/80 mb-6">{option.description}</p>
                    <Button className="w-full bg-[#275F49] hover:bg-[#1f4a37]">{option.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#E8F5E8' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A5463] mb-8" data-aos="fade-up">
              Still Need Help?
            </h2>
            <p className="text-lg text-[#1A5463]/80 mb-8" data-aos="fade-up">
              Explore our other resources or get personalized assistance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up">
              <Link href="/safety-center">
                <Button size="lg" variant="outline" className="border-[#275F49] text-[#275F49] hover:bg-[#275F49] hover:text-white font-bold text-lg px-8 py-4">
                  Safety Center
                </Button>
              </Link>
              <Link href="/about-us">
                <Button size="lg" variant="outline" className="border-[#275F49] text-[#275F49] hover:bg-[#275F49] hover:text-white font-bold text-lg px-8 py-4">
                  About NestAid
                </Button>
              </Link>
              <Link href="/find-care">
                <Button size="lg" className="bg-[#275F49] hover:bg-[#1f4a37] font-bold text-lg px-8 py-4">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
