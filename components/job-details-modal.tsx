"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
        <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white md:max-w-4xl md:max-h-[90vh] md:m-auto md:rounded-lg overflow-y-auto z-[99999] [&>button]:absolute [&>button]:right-6">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-serif font-bold text-[#1A5463] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#16803C] rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              {job.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
          {/* Job Overview */}
          <div className="bg-[#F8FBF8] rounded-xl p-6 border border-[#E4F2D4]">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#16803C]" />
                <div>
                  <p className="font-semibold text-[#1A5463]">Location</p>
                  <p className="text-[#1A5463]/70">{job.city}, {job.state} {job.zipcode}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#16803C]" />
                <div>
                  <p className="font-semibold text-[#1A5463]">Posted</p>
                  <p className="text-[#1A5463]/70">{formatDate(job.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#1A5463] flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#16803C]" />
              About This Position
            </h3>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <p className="text-[#1A5463] leading-relaxed mb-6">
                {job.title} is looking for caring and compassionate caregivers to become a part of our team and join our mission of enhancing the lives of aging adults throughout our community. We provide a variety of services to help seniors remain in their home and meet the challenges of aging with dignity, care and compassion.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#1A5463] mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#16803C]" />
                    Primary Responsibilities
                  </h4>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#1A5463]">Companionship and conversation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#1A5463]">Light housekeeping tasks and meal preparation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#1A5463]">Medication and appointment reminders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#1A5463]">Providing personal care (incontinence care, bathing, transfers, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#1A5463]">Ability to treat and care for seniors and their property with dignity and respect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#1A5463]">Ability to communicate with clients in a friendly and congenial manner</span>
                    </li>
                  </ul>
                </div>

                                 <div>
                   <h4 className="font-semibold text-[#1A5463] mb-3 flex items-center gap-2">
                     <Shield className="w-4 h-4 text-[#16803C]" />
                     Qualifications & Requirements
                   </h4>
                   <ul className="space-y-2 ml-6">
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Home Health Aide or CNA certification</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Excellent communication skills</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Smart phone</span>
                     </li>
                   </ul>
                 </div>

                 <div>
                   <h4 className="font-semibold text-[#1A5463] mb-3 flex items-center gap-2">
                     <Award className="w-4 h-4 text-[#16803C]" />
                     Benefits & Perks
                   </h4>
                   <ul className="space-y-2 ml-6">
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Schedule that works for you</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">24/7 Office support</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Education/promotion opportunities</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Mileage reimbursement</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">401K with an employer match</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">$$ Referral Bonus $$</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Additional pay for weekend and holiday shifts</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Ava Reward program - earn gift cards</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-[#16803C] rounded-full mt-2 flex-shrink-0"></div>
                       <span className="text-[#1A5463]">Tap Check to get paid before payday!</span>
                     </li>
                   </ul>
                 </div>
              </div>
            </div>
          </div>

          

                    {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="flex-1 border-2 border-[#16803C] text-[#16803C] hover:bg-[#16803C] hover:text-white font-semibold rounded-full py-4 md:py-3 text-lg md:text-base"
            >
              Close
            </Button>
            <Button
              onClick={() => onApply(job)}
              size="lg"
              className="flex-1 bg-[#16803C] hover:bg-[#126030] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-4 md:py-3 text-lg md:text-base"
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
