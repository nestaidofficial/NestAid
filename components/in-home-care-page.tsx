"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Utensils,
  Sparkles,
  ShowerHead,
  Clock,
  Car,
  Users,
  ShieldCheck,
  ArrowLeft,
  Heart,
  Star,
  Pill,
} from "lucide-react"
import { InHomeCareForm } from "./in-home-care-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  {
    icon: User,
    title: "Personalized Daily Support",
    description:
      "Non-medical assistance with daily living activities, companionship, and establishing safe routines to prevent falls and maintain independence in your own home.",
    image: "/placeholder.svg?height=400&width=600&text=Caregiver+helping+elderly+person+with+daily+activities",
  },
  {
    icon: Utensils,
    title: "Meal Assistance",
    description:
      "Light meal preparation according to dietary needs, help with grocery lists, and tidying the kitchen after meals. We ensure nutritious, delicious meals that meet your preferences.",
    image: "/placeholder.svg?height=400&width=600&text=Caregiver+preparing+healthy+meal+in+kitchen",
  },
  {
    icon: Sparkles,
    title: "Light Housekeeping",
    description:
      "Keeping the living space clean and comfortable with dusting, sweeping, laundry, and general organization. We help maintain a tidy, welcoming home environment.",
    image: "/placeholder.svg?height=400&width=600&text=Caregiver+doing+light+housekeeping+tasks",
  },
  {
    icon: ShowerHead,
    title: "Hygiene & Grooming Support",
    description:
      "Respectful, non-medical standby support with bathing, dressing guidance, and oral hygiene reminders. We help maintain dignity and personal care routines.",
    image: "/placeholder.svg?height=400&width=600&text=Caregiver+assisting+with+personal+hygiene",
  },
  {
    icon: Pill,
    title: "Medication Reminders",
    description:
      "Gentle reminders to take prescribed medications on schedule, help with organizing pill boxes, and ensuring medication compliance for better health outcomes.",
    image: "/placeholder.svg?height=400&width=600&text=Caregiver+helping+with+medication+reminders",
  },
  {
    icon: Car,
    title: "Errands & Transportation",
    description:
      "Providing reliable accompaniment to medical appointments, pharmacies, grocery stores, and other essential errands. We help maintain your independence and social connections.",
    image: "/placeholder.svg?height=400&width=600&text=Caregiver+driving+client+to+appointment",
  },

  {
    icon: ShieldCheck,
    title: "Safe & Reliable Caregivers",
    description:
      "Our caregivers are thoroughly vetted, background-checked, and receive ongoing training to provide the best support. Your safety and security are our top priorities.",
    image: "/placeholder.svg?height=400&width=600&text=Professional+caregiver+with+certification+badge",
  },
]

const stats = [
  { icon: Heart, number: "1000+", label: "Families Served" },
  { icon: Users, number: "300+", label: "Trained Caregivers" },
  { icon: Clock, number: "24/7", label: "Care Available" },
  { icon: Star, number: "4.8", label: "Average Rating" },
]

const DetailsView = ({ onFindCareClick }: { onFindCareClick: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1200&text=Professional+caregiver+helping+elderly+person+at+home"
          alt="In-home care hero"
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
              In-Home Care
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                Professional Care at Home
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Comprehensive, non-medical support designed to help your loved ones live safely and comfortably in their
              own home. Experience personalized care that adapts to your unique needs and schedule.
            </p>
            <Button
              size="lg"
              className="py-6 px-12 text-lg bg-rose hover:bg-rose/90 text-white shadow-2xl border-2 border-rose/20"
              onClick={onFindCareClick}
            >
              Find In-Home Care
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
          <h2 className="text-4xl font-bold mb-4">Comprehensive In-Home Care Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete range of services for daily support and peace of mind, tailored to help you maintain independence
            and dignity at home.
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
                    <div className="bg-lime/30 backdrop-blur-sm p-3 rounded-full">
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
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Quality In-Home Care?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Take the first step towards personalized, professional care at home. Our experienced team is ready to create
            a care plan that fits your unique needs and lifestyle.
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
        <InHomeCareForm />
      </div>
    </section>
  </motion.div>
)

export function InHomeCarePage() {
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
