"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  DollarSign, Users, Phone, CheckCircle, 
  FileText, Home, GraduationCap,
  Heart, Shield, Utensils, Bath, 
  Car, Clock, UserCheck, Play, Star
} from "lucide-react"
import { FamilyCaregiverModal } from "@/components/family-caregiver-modal"

export default function FamilyCaregiversPage() {
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  const benefits = [
    {
      title: "Monthly Compensation",
      description: "Earn up to $2,900/month depending on state rules and care level.",
      icon: DollarSign
    },
    {
      title: "Dedicated Care Manager",
      description: "One point of contact to guide you through enrollment, Medicaid paperwork, and compliance.",
      icon: Users
    },
    {
      title: "Training & Education",
      description: "Free caregiver training modules (safety, personal care, medication reminders, fall prevention).",
      icon: GraduationCap
    },
    {
      title: "Emotional Support",
      description: "Access support groups, 24/7 chat assistance, and caregiver resources.",
      icon: Heart
    },
    {
      title: "Advocacy",
      description: "We work with Medicaid agencies to make sure families get the benefits they deserve.",
      icon: Shield
    }
  ]

  const processSteps = [
    {
      number: "1",
      title: "Check Your Eligibility",
      description: "Enroll with Nestaid to access the program.",
      icon: CheckCircle
    },
    {
      number: "2", 
      title: "In-Home Visit",
      description: "A registered nurse will visit your loved one, assess their needs, and explain the process.",
      icon: Home
    },
    {
      number: "3",
      title: "Get Enrolled",
      description: "Once approved, you'll sign your caregiver agreement and begin receiving compensation (up to $2,900/month).",
      icon: FileText
    },
    {
      number: "4",
      title: "Ongoing Support",
      description: "You'll continue to get paid monthly, plus receive guidance, regular check-ins, and emotional support from our care team.",
      icon: Heart
    }
  ]

  const adlActivities = [
    { text: "Eating / Feeding", icon: Utensils },
    { text: "Bathing / Personal Hygiene", icon: Bath },
    { text: "Dressing", icon: UserCheck },
    { text: "Using the Toilet", icon: Home },
    { text: "Walking / Mobility", icon: Users },
    { text: "Transportation", icon: Car }
  ]

  const keyPoints = [
    "Keep your loved one safe at home instead of moving them to a facility.",
    "Get financial stability while providing care.",
    "Access support, training, and guidance as a recognized caregiver."
  ]

  const caregiverRequirements = [
    "Must be 18 years or older",
    "Must be legally allowed to work in the U.S.",
    "Must be capable of providing necessary care (daily tasks, supervision, mobility help)",
    "In some states, spouses may not qualify—Nestaid checks state-specific rules."
  ]

  const recipientRequirements = [
    "Must be enrolled in Medicaid (Nestaid can help apply if not enrolled)",
    "Must require assistance with two or more ADLs (Activities of Daily Living)",
    "Must live at home (not in a nursing facility)."
  ]

  const successStories = [
    {
      name: "Maria Rodriguez",
      age: "52",
      story: "I've been caring for my mother for 3 years. Nestaid helped me get $2,400/month while keeping mom at home where she's happiest.",
      image: "/images/senior-care.jpg"
    },
    {
      name: "James Thompson",
      age: "45",
      story: "As a single dad caring for my disabled son, this program gave me the financial stability to provide quality care without sacrificing our lifestyle.",
      image: "/images/adult-care.jpg"
    },
    {
      name: "Sarah Chen",
      age: "38",
      story: "The training and support from Nestaid made me a better caregiver for my grandmother. The monthly compensation was life-changing.",
      image: "/images/group.png"
    }
  ]



  return (
    <div className="min-h-screen bg-background">
            {/* Hero Section */}
      <section className="relative overflow-x-hidden bg-white">
        {/* Desktop Layout - Image left, title and content box right */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-16 py-32">
            <div className="flex items-start gap-12 max-w-7xl mx-auto">
              {/* Left Side - Larger Image Box (pill-shaped) */}
              <div className="flex-[1.4]" data-aos="fade-right">
                <div className="bg-white rounded-[3.5rem] overflow-hidden h-[500px] w-full relative">
                  <Image 
                    src="/images/adult-care.jpg" 
                    alt="Family Caregiver Background" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Title and Content Box Container */}
              <div className="flex-[1] space-y-8">
                {/* Title outside and above the content box */}
                <div className="text-left" data-aos="fade-down">
                  <h1 className="text-6xl lg:text-7xl font-bold text-black leading-[0.8] tracking-tight">
                    Turn Your Care<br />
                    into Support
                  </h1>
                </div>
                
                {/* Content Box (pill-shaped) */}
                <div className="bg-[#4a7c59] rounded-[3.5rem] p-10 h-[350px] w-full flex flex-col justify-center" data-aos="fade-left">
                  <h2 className="text-2xl font-semibold text-white mb-6 leading-tight">
                    Get Paid to Care for Family
                  </h2>
                  <p className="text-base text-white/90 mb-8 leading-relaxed">
                    Caring for a loved one is rewarding, but it can also bring financial and emotional challenges. Nestaid helps family caregivers receive compensation through Medicaid-funded programs, so you can focus on providing quality care without financial strain.
                  </p>
                  <div>
                    <Button 
                      className="bg-white text-[#4a7c59] hover:bg-gray-100 font-medium text-base px-8 py-3 rounded-full transition-all duration-300"
                      onClick={() => setShowEligibilityModal(true)}
                    >
                      Check Your Eligibility
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout - Stacked boxes */}
        <div className="lg:hidden">
          <div className="container mx-auto px-6 py-20">
            {/* Heading outside - hidden on phone sizes */}
            <div className="text-center mb-12 hidden sm:block">
              <h1 className="text-4xl md:text-5xl font-bold text-black leading-[0.8] tracking-tight">
                Turn Your Care<br />
                into Support
              </h1>
            </div>
            
            {/* Image Box */}
            <div className="mb-6 mt-10" data-aos="fade-up">
              <div className="bg-white rounded-[3.5rem] overflow-hidden h-[300px] w-full relative">
                <Image 
                  src="/images/adult-care.jpg" 
                  alt="Family Caregiver Background" 
                  fill 
                  className="object-cover rounded-[3.5rem]"
                  priority
                />
              </div>
            </div>

            {/* Content Box */}
            <div className="bg-[#4a7c59] rounded-[3.5rem] p-8 h-[300px] w-full flex flex-col justify-center" data-aos="fade-up">
              <h2 className="text-2xl sm:text-xl font-semibold text-white mb-4 text-center">
                Get Paid to Care for Family
              </h2>
              <p className="text-sm text-white/90 mb-6 leading-relaxed text-center">
                Caring for a loved one is rewarding, but it can also bring financial and emotional challenges. Nestaid helps family caregivers receive compensation through Medicaid-funded programs.
              </p>
              
              <div className="text-center">
                <Button 
                  className="bg-white text-[#4a7c59] hover:bg-gray-100 font-medium text-sm px-6 py-2.5 rounded-full transition-all duration-300"
                  onClick={() => setShowEligibilityModal(true)}
                >
                  Check Your Eligibility
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Program Section */}
      <section className="py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A5463] mb-8">
                What is the Family Caregiver Program?
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Content */}
              <div className="space-y-6" data-aos="fade-right">
                <p className="text-lg text-[#1A5463] leading-relaxed">
                  The Family Caregiver Program is designed to support those who care for aging parents, disabled adults, or loved ones with chronic conditions. Instead of hiring an outside caregiver, Medicaid allows eligible family members to provide care at home and receive monthly pay.
                </p>
                
                <p className="text-lg text-[#1A5463] leading-relaxed font-medium">
                  Nestaid acts as the bridge—we handle applications, paperwork, and compliance so you don't have to.
                </p>
              </div>

              {/* Image */}
              <div className="relative" data-aos="fade-left">
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/adult-care.jpg"
                    alt="Family caregiver helping elderly parent"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                  />
                      </div>
              </div>
            </div>


              </div>
            </div>
          </section>

      {/* Video Testimonial Section */}
      <section className="py-16 md:py-24 bg-[#FCFDFB] overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A5463] mb-8" data-aos="fade-up">
              See How Nestaid Changed Lives
            </h2>
            <p className="text-lg text-[#1A5463] mb-12" data-aos="fade-up">
              Watch real families share their experiences with our Family Caregiver Program
            </p>
            
            {/* Video Placeholder */}
            <div className="relative bg-gradient-to-br from-[#275F49] to-[#1A5463] rounded-3xl overflow-hidden shadow-2xl" data-aos="zoom-in">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Maria's Story</h3>
                  <p className="text-white/90">How she earned $2,400/month caring for her mother</p>
                </div>
              </div>
              
              {/* Video overlay image */}
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/images/senior-care.jpg"
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* How It Works Section */}
      <section className="py-16 md:py-24 overflow-x-hidden bg-[#E8F5E8]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#275F49] mb-6">
              Get Paid to Care for Your Loved One with Nestaid
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg text-[#275F49]/80 leading-relaxed" data-aos="fade-up">
                Caring for family is one of life's greatest responsibilities—and with Nestaid, you don't have to do it alone. If you qualify for your state's funded caregiver program, you can receive financial support while providing the care your loved one needs.
              </p>
              <p className="text-lg text-[#275F49] font-semibold" data-aos="fade-up">
                Here's how it works in just four simple steps:
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative" data-aos="fade-up">
                  {/* Connecting line - only show if not last item */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-[#275F49]/30 hidden md:block"></div>
                  )}
                  
                  <div className="flex items-start gap-6 md:gap-8">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[#275F49] flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{step.number.padStart(2, '0')}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl md:text-2xl font-semibold text-[#275F49] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-[#275F49]/80 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 mb-8">
              <p className="text-lg text-[#275F49]/80 max-w-3xl mx-auto leading-relaxed">
                At Nestaid, we make the process simple, supportive, and stress-free—so you can focus on what truly matters: caring for your loved one.
              </p>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-[#275F49] hover:bg-[#1f4a37] text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setShowEligibilityModal(true)}
              >
                Start the Process Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 md:py-24 bg-white overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A5463] mb-4">
              Eligibility Requirements Explained
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Caregiver Requirements */}
              <div className="bg-[#FCFDFB] rounded-3xl p-8 md:p-10 border-2 border-[#E4F2D4] shadow-sm" data-aos="fade-right">
                <div className="text-center mb-8">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src="/images/group.png"
                      alt="Caregiver requirements"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463]">
                    Caregiver Requirements
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {caregiverRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#275F48] rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#1A5463] text-base leading-relaxed">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Recipient Requirements */}
              <div className="bg-[#FCFDFB] rounded-3xl p-8 md:p-10 border-2 border-[#E4F2D4] shadow-sm" data-aos="fade-left">
                <div className="text-center mb-8">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src="/images/senior-care.jpg"
                      alt="Care recipient requirements"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463]">
                    Care Recipient Requirements
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {recipientRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#275F48] rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#1A5463] text-base leading-relaxed">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ADL Activities Section */}
            <div className="mt-16">
              <div className="bg-[#FCFDFB] rounded-3xl p-8 md:p-12 border-2 border-[#E4F2D4] shadow-sm" data-aos="fade-up">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463] mb-8 text-center">
                  Activities of Daily Living (ADLs)
                </h3>
                <p className="text-lg text-[#1A5463] text-center mb-8">
                  Your loved one must need help with at least two of these activities:
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adlActivities.map((activity, index) => (
                    <div key={activity.text} className="flex items-center space-x-4 bg-white rounded-2xl p-4 border border-[#E4F2D4]">
                      <div className="w-12 h-12 rounded-full bg-[#E4F2D4] flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-6 h-6 text-[#275F48]" />
                      </div>
                      <span className="text-[#1A5463] font-medium">{activity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 md:py-24 bg-[#FCFDFB] overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A5463] mb-4">
              Real Stories, Real Results
            </h2>
            <p className="text-lg text-[#1A5463] max-w-3xl mx-auto">
              Meet families who transformed their caregiving journey with Nestaid's support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={story.name} className="bg-white border-2 border-[#E4F2D4] hover:shadow-lg transition-shadow" data-aos="fade-up">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A5463] mb-1">{story.name}</h3>
                    <p className="text-sm text-[#275F48] font-medium">Age {story.age}</p>
                      </div>
                      
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                  <p className="text-[#1A5463] text-center leading-relaxed italic">
                    "{story.story}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>




      {/* Final CTA Section */}
      <section className="py-16 md:py-24 overflow-x-hidden" style={{ backgroundColor: '#275F49' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up">
              Ready to Turn Your Care into Support?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed" data-aos="fade-up">
              Nestaid makes it easy—no stress, no confusion. We'll handle the paperwork and guide you through the process so you can focus on caring for your family while receiving the financial support you deserve.
                </p>
                <Button 
                  size="lg" 
              className="bg-[#16803C] hover:bg-[#1f4a37] text-white font-bold text-xl px-12 py-6 rounded-full transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => setShowEligibilityModal(true)}
              data-aos="fade-up"
                >
              Get Started Today
                </Button>
              </div>
            </div>
          </section>
      
      {/* Family Caregiver Eligibility Modal */}
      <FamilyCaregiverModal 
        isOpen={showEligibilityModal} 
        onClose={() => setShowEligibilityModal(false)} 
      />
    </div>
  )
} 