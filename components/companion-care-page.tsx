"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HeartHandshake,
  Car,
  Sparkles,
  BrainCircuit,
  Languages,
  ShieldCheck,
  ArrowLeft,
  Heart,
  Users,
  Clock,
  Star,
} from "lucide-react"
import { CompanionCareForm } from "./companion-care-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  {
    icon: HeartHandshake,
    title: "Meaningful Companionship",
    description:
      "Our core service. We provide friendly conversation, emotional support, and engage in shared hobbies like cards, reading, puzzles, or simply enjoying a meal together.",
    image: "/placeholder.svg?height=400&width=600&text=Elderly+person+and+companion+playing+cards",
  },
  {
    icon: Car,
    title: "Errands & Outings",
    description:
      "We help maintain independence by assisting with essential errands. This includes grocery shopping, pharmacy runs, and accompanying clients to doctor's appointments or social visits.",
    image: "/placeholder.svg?height=400&width=600&text=Companion+helping+with+grocery+shopping",
  },
  {
    icon: Sparkles,
    title: "Light Household Tasks",
    description:
      "To ensure a comfortable living environment, our companions can help with light housekeeping such as dusting, tidying up, folding laundry, and watering plants.",
    image: "/placeholder.svg?height=400&width=600&text=Companion+helping+with+light+housework",
  },
  {
    icon: BrainCircuit,
    title: "Mental & Emotional Wellness",
    description:
      "We actively promote mental wellness by playing memory-stimulating games, reading aloud, or watching shows together. We also provide gentle, non-medical reminders for tasks and hydration.",
    image: "/placeholder.svg?height=400&width=600&text=Companion+reading+with+elderly+person",
  },
  {
    icon: Languages,
    title: "Multilingual & Culturally Aware",
    description:
      "To ensure maximum comfort, we offer language-specific companions (based on availability) and focus on cultural understanding to create a strong, respectful bond.",
    image: "/placeholder.svg?height=400&width=600&text=Diverse+companions+speaking+different+languages",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Safety",
    description:
      "Your safety is paramount. All our caregivers are background-checked and trained to be a respectful, non-intrusive presence. We provide daily notes for family updates if requested.",
    image: "/placeholder.svg?height=400&width=600&text=Professional+caregiver+with+safety+badge",
  },
]

const stats = [
  { icon: Heart, number: "500+", label: "Happy Clients" },
  { icon: Users, number: "200+", label: "Trained Companions" },
  { icon: Clock, number: "24/7", label: "Support Available" },
  { icon: Star, number: "4.9", label: "Average Rating" },
]

const DetailsView = ({ onFindCareClick }: { onFindCareClick: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1200&text=Elderly+person+with+companion+smiling"
          alt="Companion care hero"
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
              Companion Care
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">That Feels Like Family</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Experience the warmth of genuine companionship. Our caring professionals provide friendship, support, and
              assistance to help you or your loved ones live independently with dignity and joy.
            </p>
            <Button
              size="lg"
              className="py-6 px-12 text-lg bg-rose hover:bg-rose/90 text-white shadow-2xl border-2 border-rose/20"
              onClick={onFindCareClick}
            >
              Find Your Companion
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
          <h2 className="text-4xl font-bold mb-4">How We Enrich Lives</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our companion care services are designed to bring joy, comfort, and meaningful connection to everyday life.
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
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Companion?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step towards enriching companionship. Our team is here to match you with the perfect
            caregiver who understands your unique needs and preferences.
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
        <CompanionCareForm />
      </div>
    </section>
  </motion.div>
)

export function CompanionCarePage() {
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
