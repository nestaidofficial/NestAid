"use client"

import { useState, useEffect } from "react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X, ArrowLeft, Briefcase, Heart, Users, User } from "lucide-react"
import { InHomeCareForm } from "./in-home-care-form"
import { CompanionCareForm } from "./companion-care-form"
import { JobApplicationForm } from "./job-application-form"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})


interface GetStartedModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "initial" | "jobs" | "care" | "services" | "who_needs_care" | "job_gender" | "job_experience" | "form"
type Category = "senior_care" | "adult_care"
type ServiceType = "jobs" | "care"
type FormType = "in_home_care" | "companion_care" | "part_time_care" | "other"
type WhoNeedsCare = "me" | "parent" | "spouse" | "someone_else"

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("initial")
  const [serviceType, setServiceType] = useState<ServiceType | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null)
  const [whoNeedsCare, setWhoNeedsCare] = useState<WhoNeedsCare | null>(null)
  const [jobPreferences, setJobPreferences] = useState({
    gender: "" as string,
    experience: "" as string
  })

  // Handle body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  const handleClose = () => {
    setCurrentStep("initial")
    setServiceType(null)
    setSelectedCategory(null)
    setSelectedForm(null)
    setWhoNeedsCare(null)
    setJobPreferences({ gender: "", experience: "" })

    onClose()
  }

  const handleBack = () => {
    if (currentStep === "form") {
      if (serviceType === "jobs") {
        setCurrentStep("job_checklist")
      } else {
        setCurrentStep("who_needs_care")
        setWhoNeedsCare(null)
      }
    } else if (currentStep === "job_experience") {
      setCurrentStep("job_gender")
      setJobPreferences({ ...jobPreferences, experience: "" })
    } else if (currentStep === "job_gender") {
      setCurrentStep("services")
      setJobPreferences({ ...jobPreferences, gender: "" })
    } else if (currentStep === "who_needs_care") {
      setCurrentStep("services")
      setSelectedForm(null)
    } else if (currentStep === "services") {
      setCurrentStep("care")
      setSelectedCategory(null)
    } else if (currentStep === "jobs" || currentStep === "care") {
      setCurrentStep("initial")
      setServiceType(null)
    }
  }

  const handleInitialChoice = (type: ServiceType) => {
    setServiceType(type)
    setCurrentStep(type)
  }

  const handleCategoryChoice = (category: Category) => {
    setSelectedCategory(category)
    setCurrentStep("services")
  }

  const handleServiceChoice = (service: { title: string; href: string; formType?: FormType }) => {
    if (service.formType) {
      setSelectedForm(service.formType)
      setCurrentStep("who_needs_care")
    } else {
      // Navigate to external page and close modal
      window.location.href = service.href
      handleClose()
    }
  }

  const handleWhoNeedsCareChoice = (choice: WhoNeedsCare) => {
    setWhoNeedsCare(choice)
    setCurrentStep("form")
  }

  const handleJobGenderChoice = (gender: string) => {
    setJobPreferences({ ...jobPreferences, gender })
    setCurrentStep("job_experience")
  }

  const handleJobExperienceChoice = (experience: string) => {
    setJobPreferences({ ...jobPreferences, experience })
    setCurrentStep("form")
  }

  // Job categories
  const jobCategories = [
    { id: "senior_care" as Category, title: "Senior Care Jobs", href: "/jobs/senior-care", icon: Users },
    { id: "adult_care" as Category, title: "Adult Care Jobs", href: "/jobs/adult-care", icon: User },
  ]

  // Care categories
  const careCategories = [
    { id: "senior_care" as Category, title: "Senior care", icon: Users },
    { id: "adult_care" as Category, title: "Adult care", icon: User },
  ]

  // Services based on category
  const services = {
    senior_care: [
      { title: "In-Home Care", href: "/care/in-home-care", formType: "in_home_care" as FormType },
      { title: "Companion Care", href: "/care/companion-care", formType: "companion_care" as FormType },
      { title: "Part-time Care", href: "/care/part-time-care", formType: "part_time_care" as FormType },
      { title: "Other", href: "/care/other", formType: "other" as FormType },
    ],
    adult_care: [
      { title: "In-Home Care", href: "/care/in-home-care", formType: "in_home_care" as FormType },
      { title: "Companion Care", href: "/care/companion-care", formType: "companion_care" as FormType },
      { title: "Part-time Care", href: "/care/part-time-care", formType: "part_time_care" as FormType },
      { title: "Other", href: "/care/other", formType: "other" as FormType },
    ],
  }



    // Initial Step - What are you looking for?
  const InitialStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10" />
          <div className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
            What are you looking for?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <button
            onClick={() => handleInitialChoice("jobs")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>A job</span>
          </button>

          <button
            onClick={() => handleInitialChoice("care")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>Care for an adult</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Jobs Step - Job Categories
  const JobsStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
            What type of job are you looking for?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {jobCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChoice(category.id)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span className={playfair.className}>{category.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // Care Step - Care Categories
  const CareStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
            What type of care are you looking for?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          {careCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChoice(category.id)}
              className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
            >
              <span className={playfair.className}>{category.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // Services Step - Specific Services
  const ServicesStep = () => {
    if (!selectedCategory) return null
    
    const categoryServices = services[selectedCategory]
    const categoryTitle = careCategories.find(c => c.id === selectedCategory)?.title || ""

    return (
      <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
        {/* Header */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
              {serviceType === "jobs" ? "Job Opportunities" : `${categoryTitle} Services`}
            </h1>
          </div>
        </div>

        {/* Options */}
        <div className="px-6 pb-8">
          <div className="max-w-lg mx-auto space-y-4">
            {serviceType === "jobs" ? (
              // Job flow - show checklist options
              [
                { title: "In-Home Care" },
                { title: "Companionship" },
                { title: "Live-In Care" },
                { title: "Transportation" },
                { title: "Respite Care" }
              ].map((service, index) => (
                <div key={index}>
                  <Button
                    onClick={() => setCurrentStep("job_gender")}
                    className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200 h-auto"
                  >
                    <span className={playfair.className}>{service.title}</span>
                  </Button>
                </div>
              ))
            ) : (
              // Care flow - show existing services
              categoryServices.map((service, index) => (
                <div key={index}>
                  <Button
                    onClick={() => handleServiceChoice(service)}
                    className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200 h-auto"
                  >
                    <span className={playfair.className}>{service.title}</span>
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  // Job Gender Step
  const JobGenderStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
            Gender
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <button
            onClick={() => handleJobGenderChoice("Male")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>Male</span>
          </button>

          <button
            onClick={() => handleJobGenderChoice("Female")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>Female</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Job Experience Step
  const JobExperienceStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
            Do you have prior experience as caregiver?
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <button
            onClick={() => handleJobExperienceChoice("Yes")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>Yes</span>
          </button>

          <button
            onClick={() => handleJobExperienceChoice("No")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>No</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Who Needs Care Step
  const WhoNeedsCareStep = () => (
    <div className="min-h-screen md:min-h-[500px] bg-[#FCF5EB]">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h1 className={`${playfair.className} text-3xl md:text-4xl font-normal text-black mb-4`}>
            Who the care is for:
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto space-y-4">
          <button
            onClick={() => handleWhoNeedsCareChoice("me")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>Me</span>
          </button>

          <button
            onClick={() => handleWhoNeedsCareChoice("parent")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>A Parent</span>
          </button>

          <button
            onClick={() => handleWhoNeedsCareChoice("spouse")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>My Spouse</span>
          </button>

          <button
            onClick={() => handleWhoNeedsCareChoice("someone_else")}
            className="w-full p-6 text-center text-black text-lg font-medium bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl transition-all duration-200"
          >
            <span className={playfair.className}>Someone else</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Family Caregivers Step - REMOVED
  const FamilyCaregiversStep = () => {
    return null
  }

  // Form Step - Show the selected form
  const FormStep = () => {
    if (serviceType === "jobs") {
      return (
        <div className="min-h-screen md:min-h-[600px] h-full">
          <JobApplicationForm 
            onClose={handleClose} 
            inModal={true} 
            onBack={handleBack}
            jobPreferences={jobPreferences}
          />
        </div>
      )
    }

    if (!selectedForm) return null

    const renderForm = () => {
      switch (selectedForm) {
        case "in_home_care":
          return <InHomeCareForm onClose={handleClose} inModal={true} onBack={handleBack} />
        case "companion_care":
          return <CompanionCareForm onClose={handleClose} inModal={true} onBack={handleBack} />
        case "part_time_care":
          return <InHomeCareForm onClose={handleClose} inModal={true} onBack={handleBack} />
        case "other":
          return <InHomeCareForm onClose={handleClose} inModal={true} onBack={handleBack} />
        default:
          return null
      }
    }

    return (
      <div className="min-h-screen md:min-h-[600px] h-full">
        {renderForm()}
      </div>
    )
  }

  const getCurrentStep = () => {
    switch (currentStep) {
      case "initial":
        return <InitialStep />
      case "jobs":
        return <JobsStep />
      case "care":
        return <CareStep />
      case "services":
        return <ServicesStep />
      case "who_needs_care":
        return <WhoNeedsCareStep />
      case "job_gender":
        return <JobGenderStep />
      case "job_experience":
        return <JobExperienceStep />
      case "form":
        return <FormStep />
      default:
        return <InitialStep />
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose} className="z-[99999]">
        <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-[#FCF5EB] md:max-w-4xl md:max-h-[90vh] md:m-auto md:rounded-lg overflow-y-auto z-[99999] [&>button]:absolute [&>button]:right-6 [&>button]:top-6 [&>button]:rounded-full [&>button]:bg-white [&>button]:w-12 [&>button]:h-12 [&>button]:shadow-lg [&>button]:border [&>button]:border-gray-200 [&>button]:hover:bg-gray-50 [&>button]:z-20 [&>button]:flex [&>button]:items-center [&>button]:justify-center">
          <DialogTitle className="sr-only">
            Get Started - Find Care or Jobs
          </DialogTitle>
          <div className="w-full min-h-full">
            <div className="transition-opacity duration-200 ease-out">
              {getCurrentStep()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      

    </>
  )
} 