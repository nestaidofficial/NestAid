"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, ArrowLeft, X, Heart, User, HeartHandshake, Car, Sparkles, MoreHorizontal } from "lucide-react"
import { submitClientApplication } from "@/app/actions/simple-forms"

interface CompanionCareFormProps {
  onClose?: () => void
  onBack?: () => void
  inModal?: boolean
}

export function CompanionCareForm({ onClose, inModal = false, onBack }: CompanionCareFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const [formData, setFormData] = useState({
    whoNeedsCare: "", // "parent_loved_one" or "me"
    companionshipTypes: [] as string[],
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    postalCode: "",
    smsConsent: false,
  })

  // Create stable handlers to prevent re-rendering issues
  const handleFieldChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }, [])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentStep((prev) => prev + 1)
  }, [])

  const handleBack = useCallback(() => {
    setDirection(-1)
    setCurrentStep((prev) => prev - 1)
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("careType", "companion_care")
      formDataObj.append("whoNeedsCare", formData.whoNeedsCare)
      formDataObj.append("firstName", formData.firstName)
      formDataObj.append("lastName", formData.lastName)
      formDataObj.append("phone", formData.phone)
      formDataObj.append("email", formData.email)
      formDataObj.append("postalCode", formData.postalCode)
      formDataObj.append("smsConsent", formData.smsConsent.toString())
      
      // Add companionship types
      formData.companionshipTypes.forEach((type) => {
        formDataObj.append("companionshipTypes", type)
      })

      const result = await submitClientApplication(formDataObj)
      setSubmitResult(result)

      if (result.success) {
        setTimeout(() => {
          if (onClose) {
            onClose()
          } else {
            window.location.href = "/care/companion-care?submitted=true"
          }
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({ success: false, message: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
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

  // Step 1: Who needs care?
  const WhoNeedsCareStep = useMemo(() => (
    <div className="min-h-[600px] p-6 space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={inModal && currentStep === 1 ? onBack : handleBack} disabled={!inModal && currentStep === 1} className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50">
          <ArrowLeft className="w-6 h-6" />
        </button>
        {onClose && !inModal && (
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="text-center space-y-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Who needs care?</h1>
        
        <div className="max-w-md mx-auto space-y-4">
          <motion.button
            onClick={() => {
              setFormData({ ...formData, whoNeedsCare: "parent_loved_one" })
              handleNext()
            }}
            className="w-full p-4 rounded-full text-left flex items-center space-x-4 transition-all duration-150 hover:shadow-lg bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-deepgreen"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <Heart className="w-5 h-5 text-deepgreen" />
            </div>
            <span className="text-base font-medium text-gray-800">A parent or loved one</span>
          </motion.button>

          <motion.button
            onClick={() => {
              setFormData({ ...formData, whoNeedsCare: "me" })
              handleNext()
            }}
            className="w-full p-4 rounded-full text-left flex items-center space-x-4 transition-all duration-150 hover:shadow-lg bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-deepgreen"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <User className="w-5 h-5 text-deepgreen" />
            </div>
            <span className="text-base font-medium text-gray-800">Me</span>
          </motion.button>
        </div>
      </div>
    </div>
  ), [formData.whoNeedsCare, handleNext, handleBack, inModal, onBack, currentStep])

  // Step 2: What kinds of companionship are needed?
  const CompanionshipTypesStep = useMemo(() => (
    <div className="min-h-[600px] p-6 space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        {onClose && !inModal && (
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="text-center space-y-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">What kinds of companionship are needed?</h1>
        
        <div className="max-w-md mx-auto space-y-3">
          {[
            { id: "meaningful_companionship", label: "Meaningful companionship", icon: HeartHandshake },
            { id: "errands_outings", label: "Errands & outings", icon: Car },
            { id: "light_household", label: "Light household tasks", icon: Sparkles },
            { id: "other", label: "Other", icon: MoreHorizontal },
          ].map((companionship, index) => {
            const Icon = companionship.icon
            const isSelected = formData.companionshipTypes.includes(companionship.id)
            
            return (
              <button
                key={companionship.id}
                onClick={() => {
                  const updated = isSelected
                    ? formData.companionshipTypes.filter(type => type !== companionship.id)
                    : [...formData.companionshipTypes, companionship.id]
                  setFormData({ ...formData, companionshipTypes: updated })
                }}
                className={`w-full p-4 rounded-full text-left flex items-center justify-between transition-colors duration-150 hover:shadow-lg border-2 ${
                  isSelected 
                    ? "bg-deepgreen/10 border-deepgreen text-deepgreen" 
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-deepgreen"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-deepgreen" />
                  </div>
                  <span className="text-base font-medium text-gray-800">{companionship.label}</span>
                </div>
                <div className={`w-5 h-5 border-2 border-deepgreen rounded-full flex items-center justify-center ${isSelected ? "bg-deepgreen" : ""}`}>
                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="pt-4">
          <Button
            onClick={handleNext}
            disabled={formData.companionshipTypes.length === 0}
            className="bg-deepgreen hover:bg-deepgreen/90 text-white px-8 py-3 rounded-full text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  ), [formData.companionshipTypes, handleNext, handleBack, onClose, inModal])

  // Step 3: Contact Information Form
  const ContactFormStep = useMemo(() => (
    <div className="min-h-[700px] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        {onClose && !inModal && (
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
          {formData.whoNeedsCare === "parent_loved_one" ? "Find Care for a Loved One" : "Find Care for Me"}
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
              {isSubmitting ? "Submitting..." : "Request A Free Consultation"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By clicking "Request A Free Consultation", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  ), [formData, handleSubmit, isSubmitting, handleFieldChange])

  if (submitResult) {
    return (
      <div className="min-h-[600px] p-6 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            {submitResult.success ? (
              <>
                <CheckCircle className="w-16 h-16 text-deepgreen mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-deepgreen mb-2">
                  <span className="text-deepgreen">Request Submitted </span>
                  <span className="text-sunflower">Successfully!</span>
                </h2>
                <p className="text-gray-600 mb-4">{submitResult.message}</p>
                <p className="text-sm text-gray-500">You will be contacted shortly...</p>
              </>
            ) : (
              <>
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-700 mb-2">Submission Failed</h2>
                <p className="text-gray-600 mb-4">{submitResult.message}</p>
                <Button onClick={() => setSubmitResult(null)}>Try Again</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {currentStep === 1 && WhoNeedsCareStep}
          {currentStep === 2 && CompanionshipTypesStep}
          {currentStep === 3 && ContactFormStep}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
