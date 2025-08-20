"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Coffee,
  Car,
  Gamepad2,
  ShieldCheck,
  Heart,
  Star,
  Clock,
  Users,
} from "lucide-react"
import { AdultCompanionCareForm } from "./adult-companion-care-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  {
    icon: Coffee,
    title: "Social Companionship",
    description:
      "Meaningful social interaction and emotional support to combat isolation and loneliness, promoting mental wellness and happiness.",
    image: "/placeholder.svg?height=400&width=600&text=Social+companionship+for+adults",
  },
  {
    icon: Car,
    title: "Transportation & Errands",
    description:
      "Reliable transportation services for appointments, shopping, and social activities, helping maintain independence and community connection.",
    image: "/placeholder.svg?height=400&width=600&text=Transportation+and+errands",
  },
  {
    icon: Gamepad2,
    title: "Recreational Activities",
    description:
      "Engaging recreational activities, hobbies, and entertainment tailored to individual interests and abilities for enhanced quality of life.",
    image: "/placeholder.svg?height=400&width=600&text=Recreational+activities+for+adults",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Companions",
    description:
      "Thoroughly screened and trained companions who understand adult needs and provide respectful, professional companionship services.",
    image: "/placeholder.svg?height=400&width=600&text=Trusted+adult+companions",
  },
]

const stats = [
  { icon: Heart, number: "800+", label: "Adults Supported" },
  { icon: Users, number: "200+", label: "Companion Caregivers" },
  { icon: Clock, number: "24/7", label: "Support Available" },
  { icon: Star, number: "4.8", label: "Client Satisfaction" },
]

const DetailsView = ({ onFindCareClick }: { onFindCareClick: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1200&text=Adult+companion+care+services"
          alt="Adult companion care hero"
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
              Adult Companion Care
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                Professional Companionship for Adults
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Meaningful companionship services designed for adults who value independence while enjoying 
              professional support and social engagement.
            </p>
            <Button
              size="lg"
              className="py-6 px-12 text-lg bg-rose hover:bg-rose/90 text-white shadow-2xl border-2 border-rose/20"
              onClick={onFindCareClick}
            >
              Find Adult Companion Care
            </Button>
          </motion.div>

          {/* Right side - Space for image background */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 bg-gradient-to-b from-greentea to-white">
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
          <h2 className="text-4xl font-bold mb-4">Adult Companion Care Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional companionship services that enhance social connection, support independence, and improve quality of life.
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
                    <div className="bg-gradient-to-b from-greentea to-white/20 backdrop-blur-sm p-3 rounded-full">
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
          <h2 className="text-4xl font-bold mb-6">Ready for Professional Companion Care?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Connect with experienced companion caregivers who understand adult needs and provide meaningful 
            social support while respecting independence.
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
        <AdultCompanionCareForm />
      </div>
    </section>
  </motion.div>
)

export function AdultCompanionCarePage() {
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