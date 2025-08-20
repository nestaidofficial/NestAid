"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Upload, X, MapPin, Clock, DollarSign, User, Briefcase, Shield, Heart } from "lucide-react"
import { submitJobApplication } from "@/app/actions/simple-forms"

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobType?: 'senior-care' | 'adult-care' | 'pet-care'
  job: {
    id: number
    title: string
    location: string
    type: string
    description: string
    hourlyRate: string
    schedule: string
    requirements: string[]
  }
}

export function JobApplicationModal({ isOpen, onClose, job, jobType = 'senior-care' }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    isOver18: false,
    zipCode: "",
    travelDistance: 5,
    preferredStartDate: "",
    availableHours: "",
    profilePhoto: null as File | null,
    resume: null as File | null,
    eligibleToWork: "",
    backgroundCheckConsent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePhoto' | 'resume') => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, [field]: file })
    }
  }

  const removeFile = (field: 'profilePhoto' | 'resume') => {
    setFormData({ ...formData, [field]: null })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.isOver18 || 
        !formData.zipCode || !formData.preferredStartDate || !formData.availableHours || 
        !formData.resume || !formData.eligibleToWork || !formData.backgroundCheckConsent) {
      setSubmitResult({ 
        success: false, 
        message: "Please fill in all required fields and provide consent for background check." 
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Create FormData for submission
      const serverFormData = new FormData()
      serverFormData.append('fullName', formData.fullName)
      serverFormData.append('phone', formData.phone)
      serverFormData.append('email', formData.email)
      serverFormData.append('isOver18', formData.isOver18.toString())
      serverFormData.append('zipCode', formData.zipCode)
      serverFormData.append('travelDistance', formData.travelDistance.toString())
      serverFormData.append('preferredStartDate', formData.preferredStartDate)
      serverFormData.append('availableHours', formData.availableHours)
      serverFormData.append('eligibleToWork', formData.eligibleToWork)
      serverFormData.append('backgroundCheckConsent', formData.backgroundCheckConsent.toString())
      
      // Add job information
      serverFormData.append('jobType', jobType)
      serverFormData.append('specificJobId', job.id.toString())
      serverFormData.append('jobTitle', job.title)
      
      // Note: File uploads are logged but not actually stored without database
      if (formData.profilePhoto) {
        console.log('Profile photo would be uploaded:', formData.profilePhoto.name)
      }
      if (formData.resume) {
        console.log('Resume would be uploaded:', formData.resume.name)
      }
      
      const result = await submitJobApplication(serverFormData)
      setSubmitResult(result)
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      isOver18: false,
      zipCode: "",
      travelDistance: 5,
      preferredStartDate: "",
      availableHours: "",
      profilePhoto: null,
      resume: null,
      eligibleToWork: "",
      backgroundCheckConsent: false,
    })
    setSubmitResult(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  // Success/Error States
  if (submitResult) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center p-8">
            {submitResult.success ? (
              <>
                <CheckCircle className="w-16 h-16 text-deepgreen mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-deepgreen mb-2">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">{submitResult.message}</p>
                <Button onClick={handleClose} className="w-full">
                  Close
                </Button>
              </>
            ) : (
              <>
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-700 mb-2">Submission Failed</h2>
                <p className="text-muted-foreground mb-6">{submitResult.message}</p>
                <div className="flex gap-3">
                  <Button onClick={() => setSubmitResult(null)} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                  <Button onClick={handleClose} className="flex-1">
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Main application form
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {/* Header */}
            <div className="text-center p-8 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
              <p className="text-gray-600 text-sm">
                Join our network of caring professionals
              </p>
            </div>

            {/* Job Details Summary */}
            <div className="mx-8 mb-6">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span>{job.hourlyRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{job.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information Section */}
            <div className="px-8 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location & Availability Section */}
            <div className="px-8 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location & Availability
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    ZIP Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Travel Distance (miles)
                  </Label>
                  <Select
                    value={formData.travelDistance.toString()}
                    onValueChange={(value) => setFormData({...formData, travelDistance: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Up to 5 miles</SelectItem>
                      <SelectItem value="10">Up to 10 miles</SelectItem>
                      <SelectItem value="15">Up to 15 miles</SelectItem>
                      <SelectItem value="25">Up to 25 miles</SelectItem>
                      <SelectItem value="50">Up to 50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Preferred Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={(e) => setFormData({...formData, preferredStartDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Available Hours <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.availableHours}
                    onValueChange={(value) => setFormData({...formData, availableHours: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="part-time-mornings">Part-time (Mornings)</SelectItem>
                      <SelectItem value="part-time-afternoons">Part-time (Afternoons)</SelectItem>
                      <SelectItem value="part-time-evenings">Part-time (Evenings)</SelectItem>
                      <SelectItem value="part-time-weekends">Part-time (Weekends)</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="overnight">Overnight</SelectItem>
                      <SelectItem value="live-in">Live-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* File Uploads Section */}
            <div className="px-8 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Documents
              </h2>
              
              {/* Profile Photo */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Profile Photo (Optional)
                </Label>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload a professional photo (JPG, PNG - Max 5MB)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'profilePhoto')}
                      className="hidden"
                      id="profile-photo-upload"
                    />
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="profile-photo-upload" className="cursor-pointer">
                        Choose Photo
                      </label>
                    </Button>
                  </div>
                  {formData.profilePhoto && (
                    <div className="flex items-center justify-between p-3 bg-greentea border border-greentea rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-deepgreen" />
                        <span className="text-sm text-deepgreen">{formData.profilePhoto.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile('profilePhoto')}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Resume <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload your resume (PDF, DOC, DOCX - Max 10MB)
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                      className="hidden"
                      id="resume-upload"
                    />
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                  {formData.resume && (
                    <div className="flex items-center justify-between p-3 bg-greentea border border-greentea rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-deepgreen" />
                        <span className="text-sm text-deepgreen">{formData.resume.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile('resume')}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Work Authorization Section */}
            <div className="px-8 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Work Authorization
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Are you eligible to work in the United States? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.eligibleToWork}
                    onValueChange={(value) => setFormData({...formData, eligibleToWork: value})}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="eligible-yes" />
                      <Label htmlFor="eligible-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="eligible-no" />
                      <Label htmlFor="eligible-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="age-consent"
                      checked={formData.isOver18}
                      onCheckedChange={(checked) => setFormData({...formData, isOver18: !!checked})}
                      className="mt-1"
                    />
                    <Label htmlFor="age-consent" className="text-sm text-gray-700 leading-5">
                      I confirm that I am 18 years of age or older <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="background-consent"
                      checked={formData.backgroundCheckConsent}
                      onCheckedChange={(checked) => setFormData({...formData, backgroundCheckConsent: !!checked})}
                      className="mt-1"
                    />
                    <Label htmlFor="background-consent" className="text-sm text-gray-700 leading-5">
                      I consent to a background check as part of the application process <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 mt-8 px-8 pb-8">
              <Button type="button" variant="outline" onClick={handleClose} className="px-8 py-3">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-40 px-8 py-3 bg-primary hover:bg-primary/90 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 