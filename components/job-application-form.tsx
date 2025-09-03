"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, User, Mail, Phone, MapPin, Briefcase } from "lucide-react"
import { submitJobApplication } from "@/app/actions/job-applications"

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
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white md:max-w-2xl md:max-h-[90vh] md:m-auto md:rounded-lg overflow-y-auto z-[99999] [&>button]:absolute [&>button]:right-6">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-serif font-bold text-[#1A5463] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#16803C] rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              Apply for Position
            </DialogTitle>
            <div className="mt-4 p-4 bg-[#F8FBF8] rounded-lg border border-[#E4F2D4]">
              <div className="flex items-center gap-2 text-[#1A5463] mb-2">
                <MapPin className="w-4 h-4 text-[#16803C]" />
                <span className="font-semibold">{job.title}</span>
              </div>
              <p className="text-[#1A5463]/70 text-sm">{job.city}, {job.state}</p>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submit Result */}
            {submitResult && (
              <div className={`flex items-center gap-2 p-4 rounded-lg ${
                submitResult.success 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitResult.success ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{submitResult.message}</span>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-[#1A5463] font-medium">
                  First Name *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1A5463]/50" />
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    className="pl-10 border-2 border-gray-200 focus:border-[#16803C] focus:ring-0 rounded-full"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lastName" className="text-[#1A5463] font-medium">
                  Last Name *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1A5463]/50" />
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    className="pl-10 border-2 border-gray-200 focus:border-[#16803C] focus:ring-0 rounded-full"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobileNumber" className="text-[#1A5463] font-medium">
                Mobile Number *
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1A5463]/50" />
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleInputChange('mobileNumber')}
                  className="pl-10 border-2 border-gray-200 focus:border-[#16803C] focus:ring-0 rounded-full"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-[#1A5463] font-medium">
                Email Address *
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1A5463]/50" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className="pl-10 border-2 border-gray-200 focus:border-[#16803C] focus:ring-0 rounded-full"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={handleGoBack}
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                className="flex-1 border-2 border-[#16803C] text-[#16803C] hover:bg-[#16803C] hover:text-white font-semibold rounded-full py-4 md:py-3 text-lg md:text-base"
              >
                Go Back
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="flex-1 bg-[#16803C] hover:bg-[#126030] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-4 md:py-3 text-lg md:text-base"
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
