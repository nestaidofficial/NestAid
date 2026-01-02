"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Playfair_Display, Inter } from "next/font/google"
import { AlertCircle, CheckCircle, User, Mail, Phone, MapPin, Briefcase } from "lucide-react"
import { submitJobApplication } from "@/app/actions/job-applications"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

interface JobApplicationFormProps {
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
  job: {
    id: string
    title: string
    city: string
    state: string
  }
  searchLocation: string
}

export function JobApplicationForm({ isOpen, onClose, onGoBack, job, searchLocation }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('jobId', job.id)
      formDataToSubmit.append('firstName', formData.firstName)
      formDataToSubmit.append('lastName', formData.lastName)
      formDataToSubmit.append('mobileNumber', formData.mobileNumber)
      formDataToSubmit.append('email', formData.email)

      formDataToSubmit.append('searchLocation', searchLocation)
      formDataToSubmit.append('jobTitle', job.title)

      const result = await submitJobApplication(formDataToSubmit)
      setSubmitResult(result)

      if (result.success) {
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          email: ""
        })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An error occurred. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: ""
      })
      setSubmitResult(null)
      onClose()
    }
  }

  const handleGoBack = () => {
    if (!isSubmitting) {
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: ""
      })
      setSubmitResult(null)
      onGoBack()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="z-[99999]">
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-[#FCF5EB] md:max-w-2xl md:max-h-[90vh] md:m-auto md:rounded-3xl overflow-y-auto z-[99999] [&>button]:absolute [&>button]:right-6 [&>button]:text-[#1E4D47]">
        <div className="p-6 md:p-8 lg:p-10">
          <DialogHeader className="mb-8">
            <DialogTitle className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#1E4D47] flex items-center gap-4`}>
              <div className="w-12 h-12 bg-[#3F736D] rounded-full flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              Apply for Position
            </DialogTitle>
            <div className="mt-6 p-5 bg-[#3F736D] rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 text-white mb-2">
                <MapPin className="w-5 h-5 text-[#D9FB74]" />
                <span className={`${playfair.className} font-bold text-lg`}>{job.title}</span>
              </div>
              <p className={`${inter.className} text-white/80 text-sm`}>{job.city}, {job.state}</p>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submit Result */}
            {submitResult && (
              <div className={`${inter.className} flex items-center gap-3 p-4 rounded-2xl ${
                submitResult.success 
                  ? 'bg-[#D9FB74]/30 text-[#1E4D47] border border-[#1E4D47]' 
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {submitResult.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{submitResult.message}</span>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="firstName" className={`${inter.className} text-[#1E4D47] font-semibold mb-2 block`}>
                  First Name *
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3F736D]" />
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    className={`${inter.className} pl-12 h-12 border-2 border-gray-200 focus:border-[#3F736D] focus:ring-0 rounded-full bg-white text-[#1E4D47] placeholder:text-gray-400`}
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lastName" className={`${inter.className} text-[#2C5F4F] font-semibold mb-2 block`}>
                  Last Name *
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3F736D]" />
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    className={`${inter.className} pl-12 h-12 border-2 border-gray-200 focus:border-[#3F736D] focus:ring-0 rounded-full bg-white text-[#1E4D47] placeholder:text-gray-400`}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobileNumber" className={`${inter.className} text-[#2C5F4F] font-semibold mb-2 block`}>
                Mobile Number *
              </Label>
              <div className="relative mt-2">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3F736D]" />
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleInputChange('mobileNumber')}
                  className={`${inter.className} pl-12 h-12 border-2 border-[#B8D4CB] focus:border-[#5A8B7A] focus:ring-0 rounded-full bg-white text-[#2C5F4F] placeholder:text-[#8BB9A8]`}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className={`${inter.className} text-[#2C5F4F] font-semibold mb-2 block`}>
                Email Address *
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3F736D]" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className={`${inter.className} pl-12 h-12 border-2 border-[#B8D4CB] focus:border-[#5A8B7A] focus:ring-0 rounded-full bg-white text-[#2C5F4F] placeholder:text-[#8BB9A8]`}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#B8D4CB]">
              <Button
                type="button"
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                className={`${inter.className} flex-1 border-2 border-[#1E4D47] text-[#1E4D47] hover:bg-[#D9FB74]/20 hover:border-[#1E4D47] font-semibold rounded-full py-4 md:py-3 text-base transition-all duration-300 disabled:opacity-50`}
              >
                Go Back
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className={`${inter.className} flex-1 bg-[#1E4D47] hover:bg-[#163D37] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 py-4 md:py-3 text-base disabled:opacity-50`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
