"use client"

import { useState, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { submitClientApplication } from "@/app/actions/simple-forms"

interface InHomeCareFormProps {
  onClose?: () => void
  onBack?: () => void
  inModal?: boolean
}

export function InHomeCareForm({ onClose, inModal = false, onBack }: InHomeCareFormProps) {
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

  // Create stable handlers to prevent re-rendering issues
  const handleFieldChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("careType", "in_home_care")
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

  if (submitResult) {
    return (
      <div className="min-h-screen md:min-h-[500px] flex items-center justify-center">
        <div className="text-center p-8">
          {submitResult.success ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-4">{submitResult.message}</p>
            </>
          ) : (
            <>
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-4">{submitResult.message}</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen md:min-h-[500px]">
      {/* Header */}
      <div className="px-6 py-8">
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
          <h1 className="text-3xl md:text-4xl font-normal text-black mb-4" style={{ fontFamily: 'serif' }}>
            Talk to a Care Specialist
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
                Postal code where care is needed
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
              {isSubmitting ? "Submitting..." : "Request A Free Consultation"}
            </Button>
          </div>

          <p className="text-lg font-normal text-black text-center mt-4" style={{ fontFamily: 'serif' }}>
            By clicking "Request A Free Consultation", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
