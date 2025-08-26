"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { submitClientApplication } from "@/app/actions/simple-forms"

type Step = 
  | "state"
  | "looking_for"
  | "relationship"
  | "live_with"
  | "daily_help"
  | "guardian"
  | "medicaid"
  | "language"
  | "form"

interface FamilyCaregiverEligibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FamilyCaregiverEligibilityModal({ isOpen, onClose }: FamilyCaregiverEligibilityModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("state")
  const [selectedState, setSelectedState] = useState("")
  const [lookingFor, setLookingFor] = useState("")
  const [relationship, setRelationship] = useState("")
  const [liveWith, setLiveWith] = useState("")
  const [dailyHelp, setDailyHelp] = useState("")
  const [guardian, setGuardian] = useState("")
  const [medicaid, setMedicaid] = useState("")
  const [language, setLanguage] = useState("")

  const handleClose = () => {
    setCurrentStep("state")
    setSelectedState("")
    setLookingFor("")
    setRelationship("")
    setLiveWith("")
    setDailyHelp("")
    setGuardian("")
    setMedicaid("")
    setLanguage("")
    onClose()
  }

  const handleBack = () => {
    switch (currentStep) {
      case "form":
        setCurrentStep("language")
        break
      case "language":
        setCurrentStep("medicaid")
        break
      case "medicaid":
        setCurrentStep("guardian")
        break
      case "guardian":
        setCurrentStep("daily_help")
        break
      case "daily_help":
        setCurrentStep("live_with")
        break
      case "live_with":
        setCurrentStep("relationship")
        break
      case "relationship":
        setCurrentStep("looking_for")
        break
      case "looking_for":
        setCurrentStep("state")
        break
      default:
        setCurrentStep("state")
    }
  }

  const handleStateChoice = (state: string) => {
    setSelectedState(state)
    setCurrentStep("looking_for")
  }

  const handleLookingForChoice = (choice: string) => {
    setLookingFor(choice)
    setCurrentStep("relationship")
  }

  const handleRelationshipChoice = (rel: string) => {
    setRelationship(rel)
    if (lookingFor === "Care for a Family/Friend") {
      setCurrentStep("live_with")
    } else {
      setCurrentStep("live_with")
    }
  }

  const handleLiveWithChoice = (choice: string) => {
    setLiveWith(choice)
    setCurrentStep("daily_help")
  }

  const handleDailyHelpChoice = (choice: string) => {
    setDailyHelp(choice)
    setCurrentStep("guardian")
  }

  const handleGuardianChoice = (choice: string) => {
    setGuardian(choice)
    setCurrentStep("medicaid")
  }

  const handleMedicaidChoice = (choice: string) => {
    setMedicaid(choice)
    setCurrentStep("language")
  }

  const handleLanguageChoice = (choice: string) => {
    setLanguage(choice)
    setCurrentStep("form")
  }

  const getCurrentStep = () => {
    switch (currentStep) {
      case "state":
        return <StateStep />
      case "looking_for":
        return <LookingForStep />
      case "relationship":
        return <RelationshipStep />
      case "live_with":
        return <LiveWithStep />
      case "daily_help":
        return <DailyHelpStep />
      case "guardian":
        return <GuardianStep />
      case "medicaid":
        return <MedicaidStep />
      case "language":
        return <LanguageStep />
      case "form":
        return <FormStep />
      default:
        return <StateStep />
    }
  }

  const StateStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="w-10 h-10" />
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            What state are you living in?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <button
            onClick={() => handleStateChoice("Massachusetts")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span>Massachusetts</span>
          </button>
        </div>
      </div>
    </div>
  )

  const LookingForStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            What are you looking for?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <button
            onClick={() => handleLookingForChoice("Care for a Family/Friend")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span>Care for a Family/Friend</span>
          </button>
          <button
            onClick={() => handleLookingForChoice("Support from a Family Member/Friend")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span>Support from a Family Member/Friend</span>
          </button>
        </div>
      </div>
    </div>
  )

  const RelationshipStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            {lookingFor === "Care for a Family/Friend" 
              ? "Who do you care for? Choose your relationship with them."
              : "Who provides your care? Select your relationship with the caregiver."
            }
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {["Friend", "Child", "Grandchild", "Spouse", "Parent", "Legal Guardian", "Others"].map((rel) => (
            <button
              key={rel}
              onClick={() => handleRelationshipChoice(rel)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span>{rel}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const LiveWithStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            Does your caregiver live with you, or would they relocate to live with you?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {["Yes", "No"].map((choice) => (
            <button
              key={choice}
              onClick={() => handleLiveWithChoice(choice)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span>{choice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const DailyHelpStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            Does your caregiver provide daily help with tasks like bathing, dressing, eating, walking, toileting, or monitoring your safety?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {["Yes", "No"].map((choice) => (
            <button
              key={choice}
              onClick={() => handleDailyHelpChoice(choice)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span>{choice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const GuardianStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            Is the person caring for you legally your guardian or married to you?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {["Yes", "No"].map((choice) => (
            <button
              key={choice}
              onClick={() => handleGuardianChoice(choice)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span>{choice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const MedicaidStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            Do you have Medicaid?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {["Yes", "No"].map((choice) => (
            <button
              key={choice}
              onClick={() => handleMedicaidChoice(choice)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span>{choice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const LanguageStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#F5F5F0]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            What language would you prefer to be contacted in?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {["English", "Portuguese", "Spanish", "Hindi"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChoice(lang)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span>{lang}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const FormStep = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      postalCode: "",
      smsConsent: false,
    })

    const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = async () => {
      setIsSubmitting(true)

      try {
        const formDataObj = new FormData()
        formDataObj.append("careType", "family_caregiver_eligibility")
        formDataObj.append("state", selectedState)
        formDataObj.append("lookingFor", lookingFor)
        formDataObj.append("relationship", relationship)
        formDataObj.append("liveWith", liveWith)
        formDataObj.append("dailyHelp", dailyHelp)
        formDataObj.append("guardian", guardian)
        formDataObj.append("medicaid", medicaid)
        formDataObj.append("language", language)
        formDataObj.append("firstName", formData.firstName)
        formDataObj.append("lastName", formData.lastName)
        formDataObj.append("phone", formData.phone)
        formDataObj.append("email", formData.email)
        formDataObj.append("postalCode", formData.postalCode)
        formDataObj.append("smsConsent", formData.smsConsent.toString())

        const result = await submitClientApplication(formDataObj)
        setSubmitResult(result)

        if (result.success) {
          setTimeout(() => {
            handleClose()
          }, 2000)
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setSubmitResult({ success: false, message: "An unexpected error occurred" })
      } finally {
        setIsSubmitting(false)
      }
    }

    if (submitResult) {
      return (
        <div className="min-h-screen md:min-h-[500px] flex items-center justify-center">
          <div className="text-center p-8">
            {submitResult.success ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-4">{submitResult.message}</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{submitResult.message}</p>
              </>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen md:min-h-[600px] h-full">
        {/* Header */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10" />
          </div>
                  <div className="text-center px-8">
          <h1 className="text-2xl md:text-3xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            Talk to an Eligibility Specialist
          </h1>
        </div>
        </div>

        {/* Form content */}
        <div className="px-6 pb-8">
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleFieldChange("firstName")}
                  className="w-full p-6 text-lg font-normal text-black rounded-2xl border-2 border-gray-200 focus:border-gray-400 focus:ring-0 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ fontFamily: 'serif' }}
                  required
                />
              </div>

              <div>
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleFieldChange("lastName")}
                  className="w-full p-6 text-lg font-normal text-black rounded-2xl border-2 border-gray-200 focus:border-gray-400 focus:ring-0 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ fontFamily: 'serif' }}
                  required
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFieldChange("phone")}
                  className="w-full p-6 text-lg font-normal text-black rounded-2xl border-2 border-gray-200 focus:border-gray-400 focus:ring-0 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ fontFamily: 'serif' }}
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFieldChange("email")}
                  className="w-full p-6 text-lg font-normal text-black rounded-2xl border-2 border-gray-200 focus:border-gray-400 focus:ring-0 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ fontFamily: 'serif' }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-normal text-black" style={{ fontFamily: 'serif' }}>
                  Postal code where you're looking for care
                </Label>
                <Input
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleFieldChange("postalCode")}
                  className="w-full p-6 text-lg font-normal text-black rounded-2xl border-2 border-gray-200 focus:border-gray-400 focus:ring-0 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ fontFamily: 'serif' }}
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
              <Label htmlFor="sms-consent" className="text-lg font-normal text-black leading-relaxed" style={{ fontFamily: 'serif' }}>
                By checking this box, I consent to receive SMS messages from NestAid. Message & data rates may apply.
                Reply STOP to opt out. See our{" "}
                <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
              </Label>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.phone || !formData.postalCode}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 px-6 rounded-2xl text-lg font-normal disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ fontFamily: 'serif' }}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>

            <p className="text-lg font-normal text-black text-center mt-4" style={{ fontFamily: 'serif' }}>
              By clicking "Submit Application", you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-[#F5F5F0] md:max-w-4xl md:max-h-[90vh] md:m-auto md:rounded-lg overflow-y-auto [&>button]:absolute [&>button]:right-6 [&>button]:top-6 [&>button]:rounded-full [&>button]:bg-white [&>button]:w-12 [&>button]:h-12 [&>button]:shadow-lg [&>button]:border [&>button]:border-gray-200 [&>button]:hover:bg-gray-50 [&>button]:z-20 [&>button]:flex [&>button]:items-center [&>button]:justify-center">
        <DialogTitle className="sr-only">
          Family Caregiver Eligibility Check
        </DialogTitle>
        <div className="w-full min-h-full">
          <div className="transition-opacity duration-200 ease-out">
            {getCurrentStep()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
