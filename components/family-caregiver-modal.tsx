"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ArrowLeft, Heart, Users, User, Baby, Crown, Shield } from "lucide-react"

interface FamilyCaregiverModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "care_need" | "relationship" | "form"
type CareNeed = "care_for_loved_one" | "care_from_loved_ones"
type Relationship = "friend" | "child" | "grandchild" | "spouse" | "parent" | "guardian"

export function FamilyCaregiverModal({ isOpen, onClose }: FamilyCaregiverModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("care_need")
  const [careNeed, setCareNeed] = useState<CareNeed | null>(null)
  const [relationship, setRelationship] = useState<Relationship | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    postalCode: "",
    smsConsent: false,
  })

  const handleClose = () => {
    setCurrentStep("care_need")
    setCareNeed(null)
    setRelationship(null)
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      postalCode: "",
      smsConsent: false,
    })
    onClose()
  }

  const handleBack = useCallback(() => {
    if (currentStep === "form") {
      setCurrentStep("relationship")
    } else if (currentStep === "relationship") {
      setCurrentStep("care_need")
    }
  }, [currentStep])

  const handleFieldChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Handle form submission here
    console.log("Family caregiver form submitted:", {
      careNeed,
      relationship,
      ...formData
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    handleClose()
  }

  const variants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  }

  // Step 1: Care Need
  const CareNeedStep = useMemo(() => (
    <div className="min-h-[500px] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div />
        <button onClick={handleClose} className="p-2 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center space-y-8">
        <motion.h1 
          className="text-2xl md:text-3xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          In need of
        </motion.h1>
        
        <div className="max-w-md mx-auto space-y-4">
          <motion.button
            onClick={() => {
              setCareNeed("care_for_loved_one")
              setCurrentStep("relationship")
            }}
            className="w-full p-6 rounded-full text-left flex items-center space-x-4 transition-all duration-150 hover:shadow-lg bg-deepgreen text-white hover:bg-deepgreen/90"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <Heart className="w-6 h-6 text-lime" />
            </div>
            <span className="text-lg font-medium">Care for loved one</span>
          </motion.button>

          <motion.button
            onClick={() => {
              setCareNeed("care_from_loved_ones")
              setCurrentStep("relationship")
            }}
            className="w-full p-6 rounded-full text-left flex items-center space-x-4 transition-all duration-150 hover:shadow-lg bg-deepgreen text-white hover:bg-deepgreen/90"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <Users className="w-6 h-6 text-lime" />
            </div>
            <span className="text-lg font-medium">Care from loved ones</span>
          </motion.button>
        </div>
      </div>
    </div>
  ), [])

  // Step 2: Relationship
  const RelationshipStep = useMemo(() => (
    <div className="min-h-[500px] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button onClick={handleClose} className="p-2 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center space-y-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Relation to the care recipient:
        </h1>
        
        <div className="max-w-md mx-auto space-y-3">
          {[
            { id: "friend", label: "Friend", icon: Users },
            { id: "child", label: "Child", icon: Baby },
            { id: "grandchild", label: "Grandchild", icon: Heart },
            { id: "spouse", label: "Spouse", icon: Crown },
            { id: "parent", label: "Parent", icon: User },
            { id: "guardian", label: "Guardian", icon: Shield },
          ].map((relation, index) => {
            const Icon = relation.icon
            return (
              <motion.button
                key={relation.id}
                onClick={() => {
                  setRelationship(relation.id as Relationship)
                  setCurrentStep("form")
                }}
                className="w-full p-4 rounded-full text-left flex items-center space-x-4 transition-all duration-150 hover:shadow-lg bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-deepgreen"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-deepgreen" />
                </div>
                <span className="text-base font-medium text-gray-800">{relation.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  ), [handleBack])

  // Step 3: Contact Form
  const ContactFormStep = useMemo(() => (
    <div className="min-h-[600px] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button onClick={handleClose} className="p-2 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          Get Your Eligibility Information
        </h1>
        
        <div className="space-y-4">
          <div>
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleFieldChange("firstName")}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:border-deepgreen focus:ring-0"
              required
            />
          </div>

          <div>
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleFieldChange("lastName")}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:border-deepgreen focus:ring-0"
              required
            />
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleFieldChange("phone")}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:border-deepgreen focus:ring-0"
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleFieldChange("email")}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:border-deepgreen focus:ring-0"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Postal code where care is needed
            </Label>
            <Input
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleFieldChange("postalCode")}
              className="w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:border-deepgreen focus:ring-0"
              required
            />
          </div>

          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="sms-consent"
              checked={formData.smsConsent}
              onCheckedChange={(checked) => setFormData({ ...formData, smsConsent: !!checked })}
              className="mt-1"
            />
            <Label htmlFor="sms-consent" className="text-xs text-gray-500 leading-relaxed">
              By checking this box, I consent to receive SMS messages from Maya Care. Message & data rates may apply. 
              Reply STOP to opt out. See our{" "}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </Label>
          </div>

          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.phone || !formData.postalCode}
              className="w-full bg-deepgreen hover:bg-deepgreen/90 text-white py-4 px-6 rounded-full text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? "Submitting..." : "Check My Eligibility"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By clicking "Check My Eligibility", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  ), [formData, handleSubmit, isSubmitting, handleFieldChange, handleBack])

  const getCurrentStep = () => {
    switch (currentStep) {
      case "care_need":
        return CareNeedStep
      case "relationship":
        return RelationshipStep
      case "form":
        return ContactFormStep
      default:
        return CareNeedStep
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white md:max-w-4xl md:max-h-[90vh] md:m-auto md:rounded-lg overflow-y-auto">
        <DialogTitle className="sr-only">
          Family Caregiver Eligibility Check
        </DialogTitle>
        <motion.div 
          className="w-full min-h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {getCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
} 