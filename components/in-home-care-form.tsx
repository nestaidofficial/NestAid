"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, ArrowLeft, X, Home, Heart, Utensils, Bath, Car, ShoppingBag, Stethoscope, User, Activity, Check, Lightbulb, MoreHorizontal } from "lucide-react"
import { submitClientApplication } from "@/app/actions/simple-forms"

interface InHomeCareFormProps {
  onClose?: () => void
  onBack?: () => void
  inModal?: boolean
}

export function InHomeCareForm({ onClose, inModal = false, onBack }: InHomeCareFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const [formData, setFormData] = useState({
    whoNeedsCare: "", // "parent_loved_one" or "me"
    assistanceTypes: [] as string[],
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
      formDataObj.append("careType", "in_home_care")
      formDataObj.append("whoNeedsCare", formData.whoNeedsCare)
      formDataObj.append("firstName", formData.firstName)
      formDataObj.append("lastName", formData.lastName)
      formDataObj.append("phone", formData.phone)
      formDataObj.append("email", formData.email)
      formDataObj.append("postalCode", formData.postalCode)
      formDataObj.append("smsConsent", formData.smsConsent.toString())
      
      // Add assistance types
      formData.assistanceTypes.forEach((type) => {
        formDataObj.append("assistanceTypes", type)
      })

      const result = await submitClientApplication(formDataObj)
      setSubmitResult(result)

      if (result.success) {
        setTimeout(() => {
          if (onClose) {
            onClose()
          } else {
          window.location.href = "/care/in-home-care?submitted=true"
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

  // Simplified variants for better mobile performance
  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }

  // Step 1: Who needs care?
  const WhoNeedsCareStep = useMemo(() => (
    <div className="min-h-[600px]" style={{ backgroundColor: inModal ? '#FCFDFB' : 'white' }}>
      {/* Header with background color when in modal */}
      {inModal ? (
        <div className="px-6 py-8" style={{ backgroundColor: '#B8C4A3' }}>
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack} 
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Who needs care?</h1>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1} 
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            {onClose && (
              <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Who needs care?</h1>
          </div>
        </div>
      )}

      {/* Options with background */}
      <div className={inModal ? "p-6 pt-8" : "px-6 pb-6"}>
        <div className="max-w-md mx-auto space-y-4">
          <button
            onClick={() => {
              setFormData({ ...formData, whoNeedsCare: "parent_loved_one" })
              handleNext()
            }}
            className="w-full p-4 rounded-full text-left flex items-center space-x-4 transition-colors duration-150 hover:shadow-lg bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
            style={{ backgroundColor: inModal ? '#FCFDFB' : 'rgb(249 250 251)' }}
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <Heart className="w-5 h-5" style={{ color: inModal ? '#B7C5A3' : '#16803C' }} />
            </div>
            <span className="text-base font-medium text-gray-800">A parent or loved one</span>
          </button>

          <button
            onClick={() => {
              setFormData({ ...formData, whoNeedsCare: "me" })
              handleNext()
            }}
            className="w-full p-4 rounded-full text-left flex items-center space-x-4 transition-colors duration-150 hover:shadow-lg bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
            style={{ backgroundColor: inModal ? '#FCFDFB' : 'rgb(249 250 251)' }}
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <User className="w-5 h-5" style={{ color: inModal ? '#B7C5A3' : '#16803C' }} />
            </div>
            <span className="text-base font-medium text-gray-800">Me</span>
          </button>
        </div>
      </div>
    </div>
  ), [formData.whoNeedsCare, handleNext, handleBack, inModal, onBack, currentStep])

  // Step 2: What kinds of assistance are needed?
  const AssistanceTypesStep = useMemo(() => (
    <div className="min-h-[600px]" style={{ backgroundColor: inModal ? '#FCFDFB' : 'white' }}>
      {/* Header with background color when in modal */}
      {inModal ? (
        <div className="px-6 py-8" style={{ backgroundColor: '#B8C4A3' }}>
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleBack} 
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">What kinds of assistance are needed?</h1>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>
            {onClose && (
              <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">What kinds of assistance are needed?</h1>
          </div>
        </div>
      )}

      {/* Options with background */}
      <div className={inModal ? "p-6 pt-8" : "px-6 pb-6"}>
        <div className="max-w-md mx-auto space-y-3">
          {[
            { id: "mobility_assistance", label: "Mobility assistance", icon: Activity },
            { id: "everyday_tasks", label: "Everyday tasks", icon: Check },
            { id: "memory_care", label: "Memory care", icon: Lightbulb },
            { id: "other", label: "Other", icon: MoreHorizontal },
          ].map((assistance, index) => {
            const Icon = assistance.icon
            const isSelected = formData.assistanceTypes.includes(assistance.id)
            
            return (
              <button
                key={assistance.id}
                onClick={() => {
                  const updated = isSelected
                    ? formData.assistanceTypes.filter(type => type !== assistance.id)
                    : [...formData.assistanceTypes, assistance.id]
                  setFormData({ ...formData, assistanceTypes: updated })
                }}
                className={`w-full p-4 rounded-full text-left flex items-center justify-between transition-colors duration-150 hover:shadow-lg border-2 ${
                  isSelected 
                    ? (inModal ? "border-gray-300 text-gray-800" : "bg-deepgreen/10 border-deepgreen text-deepgreen")
                    : (inModal ? "bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300" : "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-deepgreen")
                }`}
                style={{ 
                  backgroundColor: isSelected && inModal ? '#B7C5A3' : (inModal ? '#FCFDFB' : undefined),
                  borderColor: isSelected && inModal ? '#B7C5A3' : undefined,
                  color: isSelected && inModal ? 'white' : undefined
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <Icon 
                      className="w-5 h-5" 
                      style={{ 
                        color: isSelected && inModal ? 'white' : (inModal ? '#B7C5A3' : '#16803C')
                      }} 
                    />
                  </div>
                  <span className="text-base font-medium text-gray-800">{assistance.label}</span>
                </div>
                <div 
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${isSelected ? "" : ""}`}
                  style={{
                    borderColor: inModal ? '#B7C5A3' : '#16803C',
                    backgroundColor: isSelected ? (inModal ? '#B7C5A3' : '#16803C') : 'transparent'
                  }}
                >
                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="pt-4">
          <Button
            onClick={handleNext}
            disabled={formData.assistanceTypes.length === 0}
            className={`${inModal ? 'bg-[#B7C5A3] hover:bg-[#A8B595]' : 'bg-deepgreen hover:bg-deepgreen/90'} text-white px-8 py-3 rounded-full text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  ), [formData.assistanceTypes, handleNext, handleBack, onClose, inModal])

  // Step 3: Contact Information Form
  const ContactFormStep = useMemo(() => (
    <div className="min-h-[600px]" style={{ backgroundColor: inModal ? '#FCFDFB' : 'white' }}>
      {/* Header with background color when in modal */}
      {inModal ? (
        <div className="px-6 py-8" style={{ backgroundColor: '#B8C4A3' }}>
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleBack} 
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {formData.whoNeedsCare === "parent_loved_one" ? "Find Care for a Loved One" : "Find Care for Me"}
            </h1>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>
            {onClose && (
              <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {formData.whoNeedsCare === "parent_loved_one" ? "Find Care for a Loved One" : "Find Care for Me"}
            </h1>
          </div>
        </div>
      )}

      {/* Form content */}
      <div className={inModal ? "p-6 pt-8" : "px-6 pb-6"}>
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleFieldChange("firstName")}
                className={`w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:ring-0 ${
                  inModal ? 'focus:border-[#B7C5A3]' : 'focus:border-deepgreen'
                }`}
                required
              />
            </div>

            <div>
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleFieldChange("lastName")}
                className={`w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:ring-0 ${
                  inModal ? 'focus:border-[#B7C5A3]' : 'focus:border-deepgreen'
                }`}
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFieldChange("phone")}
                className={`w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:ring-0 ${
                  inModal ? 'focus:border-[#B7C5A3]' : 'focus:border-deepgreen'
                }`}
                required
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFieldChange("email")}
                className={`w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:ring-0 ${
                  inModal ? 'focus:border-[#B7C5A3]' : 'focus:border-deepgreen'
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Postal code where care is needed
              </Label>
              <Input
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleFieldChange("postalCode")}
                className={`w-full p-4 text-lg rounded-xl border-2 border-gray-200 focus:ring-0 ${
                  inModal ? 'focus:border-[#B7C5A3]' : 'focus:border-deepgreen'
                }`}
                required
              />
            </div>
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
              className="w-full bg-deepgreen hover:bg-deepgreen/90 text-white p-4 rounded-full text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Request A Free Consultation"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
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
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.15,
              ease: "easeOut"
            }}
          >
            {currentStep === 1 && WhoNeedsCareStep}
            {currentStep === 2 && AssistanceTypesStep}
            {currentStep === 3 && ContactFormStep}
          </motion.div>
      </AnimatePresence>
      </div>
  )
}
