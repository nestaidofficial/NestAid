"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  MessageCircle,
  Phone,
  ShieldCheck,
  Heart,
  Star,
  Clock,
  Users,
} from "lucide-react"
import { AdultCareGuideForm } from "./adult-care-guide-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  {
    icon: FileText,
    title: "Care Planning Guidance",
    description:
      "Comprehensive care planning assistance to help you make informed decisions about care options, services, and resources available.",
    image: "/placeholder.svg?height=400&width=600&text=Care+planning+guidance",
  },
  {
    icon: MessageCircle,
    title: "Care Consultation",
    description:
      "Expert consultations with experienced care professionals who understand adult care needs and can provide personalized recommendations.",
    image: "/placeholder.svg?height=400&width=600&text=Care+consultation+services",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description:
      "Accessible phone support services for questions, guidance, and ongoing assistance throughout your care journey.",
    image: "/placeholder.svg?height=400&width=600&text=Phone+support+services",
  },
  {
    icon: ShieldCheck,
    title: "Expert Knowledge",
    description:
      "Access to expert knowledge and resources from certified care professionals with extensive experience in adult care services.",
    image: "/placeholder.svg?height=400&width=600&text=Expert+care+knowledge",
  },
]

const stats = [
  { icon: Heart, number: "1200+", label: "Families Guided" },
  { icon: Users, number: "50+", label: "Care Experts" },
  { icon: Clock, number: "24/7", label: "Support Available" },
  { icon: Star, number: "4.9", label: "Guidance Rating" },
]

const DetailsView = ({ onFindCareClick }: { onFindCareClick: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1200&text=Adult+care+guidance+consultation"
          alt="Adult care guide hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Adult Care Guide
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                Expert Guidance for Care Decisions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Get expert guidance and support to navigate adult care options, make informed decisions, 
              and find the best care solutions for your unique needs.
            </p>
            <Button
              size="lg"
              className="py-6 px-12 text-lg bg-primary hover:bg-primary/90 text-white shadow-2xl"
              onClick={onFindCareClick}
            >
              Get Care Guidance
            </Button>
          </motion.div>

          {/* Right side - Space for image background */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Section - Zigzag Pattern */}
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Care Guidance Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert guidance and support services to help you navigate adult care options and make informed decisions.
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} space-y-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="pt-4">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold mb-6">Ready for Expert Care Guidance?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Get personalized guidance from care experts who understand your needs and can help you 
            make informed decisions about adult care options.
          </p>
          <Button size="lg" variant="secondary" className="py-6 px-12 text-lg" onClick={onFindCareClick}>
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  </motion.div>
)

const FormView = ({ onBackClick }: { onBackClick: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    <section className="min-h-screen py-8" className="bg-greentea">
      <div className="container mx-auto px-2 relative max-w-6xl">
        <AdultCareGuideForm />
      </div>
    </section>
  </motion.div>
)

export function AdultCareGuidePage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!showForm ? (
        <DetailsView key="details" onFindCareClick={() => setShowForm(true)} />
      ) : (
        <FormView key="form" onBackClick={() => setShowForm(false)} />
      )}
    </AnimatePresence>
  )
} 