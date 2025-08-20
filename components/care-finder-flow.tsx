"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, Home, PawPrint } from "lucide-react"
import { InHomeCareForm } from "./in-home-care-form"
import { CompanionCareForm } from "./companion-care-form"

const careTypes = [
  {
    id: "senior_care",
    title: "Senior care",
    icon: Heart,
    description: "In-home care and companion services",
    image: "/placeholder.svg?width=120&height=120",
    color: "bg-greentea border-greentea hover:bg-greentea/80",
  },
  {
    id: "adult_care",
    title: "Adult care",
    icon: Users,
    description: "Care for adults with special needs",
    image: "/placeholder.svg?width=120&height=120",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
  {
    id: "family_care",
    title: "Family Care",
    icon: Users,
    description: "Joining Maya Care gives you access to caregivers for the whole household",
    image: "/placeholder.svg?width=120&height=120",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  {
    id: "pet_care",
    title: "Pet care",
    icon: PawPrint,
    description: "Pet sitting and dog walking",
    image: "/placeholder.svg?width=120&height=120",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
]

const seniorCareOptions = [
  {
    id: "in_home_care",
    title: "In-home care",
    description: "Personal care, meal prep, and daily assistance",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-24%20at%204.51.33%E2%80%AFPM-98NCLtdOQRCQnVxZLLivQbeWy6p3El.png",
  },
  {
    id: "companion_care",
    title: "Companion care",
    description: "Social interaction and light assistance",
    image: "/placeholder.svg?width=400&height=300",
  },
  {
    id: "senior_living",
    title: "Senior living community",
    description: "Assisted living and memory care facilities",
    image: "/placeholder.svg?width=400&height=300",
  },
  {
    id: "not_sure",
    title: "I am not sure yet",
    description: "Get help choosing the right care option",
    image: "/placeholder.svg?width=400&height=300",
  },
]

interface CareFinderFlowProps {
  onClose?: () => void
}

export function CareFinderFlow({ onClose }: CareFinderFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCareType, setSelectedCareType] = useState("")
  const [selectedSeniorCareType, setSelectedSeniorCareType] = useState("")
  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setDirection(-1)
    setCurrentStep((prev) => prev - 1)
  }

  const handleCareTypeSelect = (careType: string) => {
    setSelectedCareType(careType)
    if (careType === "senior_care") {
      handleNext()
    } else {
      // For other care types, we can add their specific flows later
      setCurrentStep(3) // Skip to form step for now
    }
  }

  const handleSeniorCareSelect = (seniorCareType: string) => {
    setSelectedSeniorCareType(seniorCareType)
    setCurrentStep(3) // Go to form step
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  // Step 1: Care Type Selection
  const CareTypeStep = () => (
    <motion.div
      key="care-type"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">What type of care do you need?</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Joining Maya Care gives you access to caregivers for the whole household.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {careTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${type.color} border-2`}
            onClick={() => handleCareTypeSelect(type.id)}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-24 h-24 mx-auto">
                <img src={type.image || "/placeholder.svg"} alt={type.title} className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

  // Step 2: Senior Care Specific Options
  const SeniorCareStep = () => (
    <motion.div
      key="senior-care"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-80 h-48 mx-auto rounded-2xl overflow-hidden mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-24%20at%204.51.33%E2%80%AFPM-98NCLtdOQRCQnVxZLLivQbeWy6p3El.png"
            alt="Senior care"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">What type of care are you interested in?</h1>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {seniorCareOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            onClick={() => handleSeniorCareSelect(option.id)}
            className="w-full p-6 h-auto text-left justify-start rounded-xl border-2 hover:border-primary hover:bg-primary/5"
          >
            <div className="space-y-1">
              <div className="font-semibold text-gray-900">{option.title}</div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={handleBack} className="text-gray-600">
          ← Back
        </Button>
      </div>
    </motion.div>
  )

  // Step 3: Form Step
  const FormStep = () => {
    if (selectedSeniorCareType === "in_home_care") {
      return <InHomeCareForm onClose={onClose} />
    } else if (selectedSeniorCareType === "companion_care") {
      return <CompanionCareForm onClose={onClose} />
    }

    // Default form for other care types
    return (
      <motion.div
        key="form"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{selectedCareType.replace("_", " ")} Form</h1>
          <p className="text-lg text-gray-600">
            This form is coming soon! We're working on creating the perfect experience for{" "}
            {selectedCareType.replace("_", " ")}.
          </p>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={handleBack} className="text-gray-600">
            ← Back to care types
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentStep >= step ? "bg-primary" : "bg-gray-300"
                  } transition-colors duration-200`}
                />
                {step < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        {onClose && (
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 1 && <CareTypeStep />}
          {currentStep === 2 && <SeniorCareStep />}
          {currentStep === 3 && <FormStep />}
        </AnimatePresence>
      </div>
    </div>
  )
}
