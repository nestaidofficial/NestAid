"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Playfair_Display, Inter } from "next/font/google"
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Star,
  Heart,
  Shield,
  Award,
  Gift,
  Calendar,
  Car,
  GraduationCap,
  Phone,
  Smartphone
} from "lucide-react"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

interface JobDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  job: {
    id: string
    title: string
    description: string
    city: string
    state: string
    zipcode: string
    created_at: string
  }
  onApply: (job: any) => void
}

export function JobDetailsModal({ isOpen, onClose, job, onApply }: JobDetailsModalProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="z-[99999]">
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-[#F9FBFA] md:max-w-4xl md:max-h-[90vh] md:m-auto md:rounded-3xl overflow-y-auto z-[99999] [&>button]:absolute [&>button]:right-6 [&>button]:text-[#5A6B6A]">
        <div className="p-6 md:p-8 lg:p-10">
          <DialogHeader className="mb-8">
            <DialogTitle className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#2C5F4F] flex items-center gap-4`}>
              <div className="w-12 h-12 bg-[#5A8B7A] rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              {job.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
          {/* Job Overview */}
          <div className="bg-gradient-to-r from-[#E8F5F1] to-[#F0F9F6] rounded-2xl p-6 md:p-8 border border-[#B8D4CB] shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="w-6 h-6 text-[#5A8B7A]" />
                </div>
                <div>
                  <p className={`${inter.className} font-semibold text-[#2C5F4F] mb-1`}>Location</p>
                  <p className={`${inter.className} text-[#5A6B6A]`}>{job.city}, {job.state} {job.zipcode}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Calendar className="w-6 h-6 text-[#5A8B7A]" />
                </div>
                <div>
                  <p className={`${inter.className} font-semibold text-[#2C5F4F] mb-1`}>Posted</p>
                  <p className={`${inter.className} text-[#5A6B6A]`}>{formatDate(job.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-6">
            <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold text-[#2C5F4F] flex items-center gap-3`}>
              <Heart className="w-6 h-6 text-[#5A8B7A]" />
              About This Position
            </h3>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <p className={`${inter.className} text-[#5A6B6A] text-base md:text-lg leading-relaxed mb-8`}>
                {job.title} is looking for caring and compassionate caregivers to become a part of our team and join our mission of enhancing the lives of aging adults throughout our community. We provide a variety of services to help seniors remain in their home and meet the challenges of aging with dignity, care and compassion.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#2C5F4F] mb-4 flex items-center gap-3`}>
                    <CheckCircle className="w-5 h-5 text-[#5A8B7A]" />
                    Primary Responsibilities
                  </h4>
                  <ul className={`${inter.className} space-y-3 ml-2`}>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Companionship and conversation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Light housekeeping tasks and meal preparation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Medication and appointment reminders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Providing personal care (incontinence care, bathing, transfers, etc.)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Ability to treat and care for seniors and their property with dignity and respect</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Ability to communicate with clients in a friendly and congenial manner</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#2C5F4F] mb-4 flex items-center gap-3`}>
                    <Shield className="w-5 h-5 text-[#5A8B7A]" />
                    Qualifications & Requirements
                  </h4>
                  <ul className={`${inter.className} space-y-3 ml-2`}>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Home Health Aide or CNA certification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Excellent communication skills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Smart phone</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`${playfair.className} text-xl md:text-2xl font-bold text-[#2C5F4F] mb-4 flex items-center gap-3`}>
                    <Award className="w-5 h-5 text-[#5A8B7A]" />
                    Benefits & Perks
                  </h4>
                  <ul className={`${inter.className} space-y-3 ml-2`}>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Schedule that works for you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">24/7 Office support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Education/promotion opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Mileage reimbursement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">401K with an employer match</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">$$ Referral Bonus $$</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Additional pay for weekend and holiday shifts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Ava Reward program - earn gift cards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#5A8B7A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#5A6B6A] leading-relaxed">Tap Check to get paid before payday!</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#B8D4CB]">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className={`${inter.className} flex-1 border-2 border-[#B8D4CB] text-[#3A6F5E] hover:bg-[#E8F5F1] hover:border-[#8BB9A8] font-semibold rounded-full py-4 md:py-3 text-base transition-all duration-300`}
            >
              Close
            </Button>
            <Button
              onClick={() => onApply(job)}
              size="lg"
              className={`${inter.className} flex-1 bg-[#5A8B7A] hover:bg-[#4A7B6A] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 py-4 md:py-3 text-base`}
            >
              Apply Now
            </Button>
          </div>
         </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

