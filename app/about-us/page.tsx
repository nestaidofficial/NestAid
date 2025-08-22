"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Users, Award, MapPin, Phone, Mail, Clock, CheckCircle, Target, Lightbulb, Handshake, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AboutUsPage() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const coreValues = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We believe every individual deserves care that honors their dignity, respects their choices, and nurtures their wellbeing with genuine compassion.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your family's safety is our foundation. We maintain rigorous standards, comprehensive background checks, and continuous monitoring.",
    },
    {
      icon: Users,
      title: "Family-Centered",
      description: "We understand that care extends beyond the individual—we support entire families through their caregiving journey.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from caregiver training to customer service.",
    },
  ]

  const ourStory = [
    {
      year: "2018",
      title: "The Beginning",
      description: "NestAid was founded with a simple mission: make quality home care accessible to every family, everywhere."
    },
    {
      year: "2020",
      title: "Expanding Services",
      description: "Added family caregiver support programs, helping families navigate Medicaid-funded care options."
    },
    {
      year: "2023",
      title: "Nationwide Growth",
      description: "Expanded to serve families across multiple states, building a trusted network of professional caregivers."
    },
    {
      year: "2024",
      title: "Innovation & Care",
      description: "Launched comprehensive care plans and 24/7 support services, setting new standards in home care."
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former healthcare executive with 15+ years of experience in patient care and operations. Passionate about making quality care accessible to all families.",
      image: "/images/group.png",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Technology leader who previously built scalable healthcare platforms. Focused on creating seamless experiences for families and caregivers.",
      image: "/images/senior-care.jpg",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Chief Medical Officer",
      bio: "Board-certified physician with expertise in geriatrics and family medicine. Ensures our care standards meet the highest medical guidelines.",
      image: "/images/adult-care.jpg",
    }
  ]



  const stats = [
    { number: "10,000+", label: "Families Served", description: "Trusted by thousands of families nationwide" },
    { number: "2,500+", label: "Professional Caregivers", description: "Carefully vetted and trained care professionals" },
    { number: "3", label: "States Served", description: "Pennsylvania, Ohio, Massachusetts" },
    { number: "24/7", label: "Support Available", description: "Round-the-clock assistance when you need it" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#E8F5E8' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A5463] mb-6" data-aos="fade-up">
              About NestAid
            </h1>
            <p className="text-xl md:text-2xl text-[#1A5463]/80 mb-8 leading-relaxed" data-aos="fade-up">
              We're on a mission to make compassionate, quality care accessible to every family, everywhere.
            </p>
            <p className="text-lg text-[#1A5463]/70 max-w-3xl mx-auto" data-aos="fade-up">
              Founded on the belief that everyone deserves to age with dignity at home, NestAid connects families with trusted caregivers and provides the support needed for successful home care.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A5463] mb-6">Our Story</h2>
              <p className="text-lg text-[#1A5463]/80 max-w-3xl mx-auto">
                From a simple idea to a trusted partner for thousands of families nationwide
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div data-aos="fade-right">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A5463] mb-6">
                  Transforming Home Care, One Family at a Time
                </h3>
                <div className="space-y-4 text-lg text-[#1A5463]/80 leading-relaxed">
                  <p>
                    NestAid was born from a personal experience—watching a family struggle to find quality, affordable care for their aging parent. We realized that families needed more than just a caregiver; they needed a partner who understood their journey.
                  </p>
                  <p>
                    Today, we've grown into a comprehensive care platform that not only connects families with exceptional caregivers but also helps navigate the complex world of care funding, including Medicaid programs that can provide financial support for family caregivers.
                  </p>
                  <p>
                    Our approach is different. We don't just provide services—we build relationships. We don't just offer care—we offer peace of mind.
                  </p>
                </div>
              </div>
              <div className="relative" data-aos="fade-left">
                <div className="bg-[#E8F5E8] rounded-3xl p-8 h-[400px] flex items-center justify-center">
                  <Image
                    src="/images/group.jpg"
                    alt="NestAid care team"
                    width={400}
                    height={300}
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {ourStory.map((milestone, index) => (
                <div key={milestone.year} className="flex items-start gap-8" data-aos="fade-up">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#275F49] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A5463] mb-2">{milestone.title}</h3>
                    <p className="text-[#1A5463]/80">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FCFDFB' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A5463] mb-6">Our Core Values</h2>
              <p className="text-lg text-[#1A5463]/80 max-w-3xl mx-auto">
                These principles guide everything we do and shape how we serve families every day
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => (
                <Card key={value.title} className="border-2 border-[#E4F2D4] hover:shadow-lg transition-shadow" data-aos="fade-up">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E8F5E8] flex items-center justify-center">
                        <value.icon className="w-8 h-8 text-[#275F49]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1A5463] mb-3">{value.title}</h3>
                        <p className="text-[#1A5463]/80 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24 bg-[#275F49]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Impact</h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Measuring success through the families we serve and the care we provide
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center" data-aos="fade-up">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-white/80 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A5463] mb-6">Leadership Team</h2>
              <p className="text-lg text-[#1A5463]/80 max-w-3xl mx-auto">
                Meet the experienced leaders dedicated to transforming home care
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={member.name} className="text-center border-2 border-[#E4F2D4] hover:shadow-lg transition-shadow" data-aos="fade-up">
                  <CardContent className="p-8">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A5463] mb-2">{member.name}</h3>
                    <p className="text-[#275F49] font-semibold mb-4">{member.role}</p>
                    <p className="text-[#1A5463]/80 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-[#275F49]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up">
              Ready to Experience the NestAid Difference?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed" data-aos="fade-up">
              Join thousands of families who trust NestAid for compassionate, professional home care. Let us help you create a care plan that works for your family.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up">
              <Link href="/find-care">
                <Button size="lg" className="bg-white text-[#275F49] hover:bg-gray-100 font-bold text-lg px-8 py-4">
                  Find Care Today
                </Button>
              </Link>
              <Link href="/family-caregivers">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#275F49] font-bold text-lg px-8 py-4">
                  Family Caregiver Program
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
