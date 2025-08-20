"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { 
  Users, Heart, DollarSign, Shield, Clock, Phone, Mail, HandHeart, 
  CheckCircle, Star, FileText, MessageCircle, Calendar, Home,
  CreditCard, UserCheck, Stethoscope, HelpCircle
} from "lucide-react"
import { FamilyCaregiverModal } from "@/components/family-caregiver-modal"

const FamilyCaregiverForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    relationship: "",
    recipientAge: "",
    recipientAddress: "",
    contactPreference: "",
    contactInput: "",
    additionalComments: ""
  })

  const handleSubmit = async () => {
    console.log("Form submitted:", formData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-xl" style={{ backgroundColor: '#fcf9f5' }}>
      <CardContent className="space-y-6 p-8" style={{ backgroundColor: '#fcf9f5' }}>
        <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-base sm:text-lg font-medium text-foreground">Full Name:</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="h-10 sm:h-12 text-base sm:text-lg transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="relationship" className="text-base sm:text-lg font-medium text-foreground">Relationship to loved one:</Label>
              <Input
                id="relationship"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                placeholder="e.g., Son, Daughter, Spouse, Friend"
                className="h-10 sm:h-12 text-base sm:text-lg transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="recipientAge" className="text-base sm:text-lg font-medium text-foreground">Age of the Recipient:</Label>
              <Input
                id="recipientAge"
                type="number"
                value={formData.recipientAge}
                onChange={(e) => setFormData({ ...formData, recipientAge: e.target.value })}
                placeholder="Enter age"
                className="h-10 sm:h-12 text-base sm:text-lg transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="recipientAddress" className="text-base sm:text-lg font-medium text-foreground">Address of the Recipient:</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                placeholder="Enter complete address including ZIP code"
                className="min-h-20 sm:min-h-24 text-base sm:text-lg transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base sm:text-lg font-medium text-foreground">Contact Preference:</Label>
              <RadioGroup
                value={formData.contactPreference}
                onValueChange={(value) => setFormData({ ...formData, contactPreference: value })}
                className="flex space-x-6"
              >
                {["Phone", "Email"].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <RadioGroupItem value={method} id={`contact-${method.toLowerCase()}`} />
                    <Label htmlFor={`contact-${method.toLowerCase()}`} className="text-base sm:text-lg">{method}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {formData.contactPreference && (
              <div className="space-y-3">
                <Label htmlFor="contactInput" className="text-base sm:text-lg font-medium text-foreground">
                  {formData.contactPreference === "Phone" ? "Phone Number:" : "Email Address:"}
                </Label>
                <Input
                  id="contactInput"
                  type={formData.contactPreference === "Phone" ? "tel" : "email"}
                  value={formData.contactInput}
                  onChange={(e) => setFormData({ ...formData, contactInput: e.target.value })}
                  placeholder={formData.contactPreference === "Phone" ? "(555) 123-4567" : "you@example.com"}
                  className="h-10 sm:h-12 text-base sm:text-lg transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                  required
                />
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="additionalComments" className="text-base sm:text-lg font-medium text-foreground">Additional Questions or Comments:</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                placeholder="Any additional information or questions..."
                className="min-h-32 text-lg transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
              />
            </div>
          </div>
        </CardContent>

            <div className="sticky bottom-0 backdrop-blur-sm border-t border-border p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 shadow-lg" style={{ backgroundColor: '#fcf9f5' }}>
        <Button 
          onClick={handleSubmit} 
          className="w-full sm:w-auto text-base sm:text-lg px-4 sm:px-6 py-3 sm:py-3 transition-all duration-200 hover:scale-105 h-12 sm:h-auto bg-primary hover:bg-primary/90 rounded-full"
        >
          Submit Application
        </Button>
      </div>
    </Card>
  )
}

export default function FamilyCaregiversPage() {
  const [showForm, setShowForm] = useState(false)
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)

  const benefits = [
    {
      icon: DollarSign,
      title: "Monthly Support",
      description: "You may qualify to receive up to $2,700 per month, helping ease the financial strain as you continue to care for someone close to you.",
      color: "bg-primary/20 text-primary"
    },
    {
      icon: Phone,
      title: "Ongoing Guidance",
      description: "You'll be paired with a dedicated care coordinator and nurse who are just a call or message away—offering advice, reassurance, or just someone to talk to when things get tough.",
      color: "bg-accent/20 text-primary"
    },
    {
      icon: Shield,
      title: "Empowering You",
      description: "Through our secure app, you'll gain a custom care roadmap, wellness tips, and access to a supportive peer network—so you never have to walk this path alone.",
      color: "bg-muted text-primary"
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Meet the Requirements",
      description: "To receive financial compensation for caring for a friend or family member, you must be enrolled with Entyre Care.",
      details: ["Personal visit", "Get enrolled", "Compensation and support"]
    },
    {
      number: "2", 
      title: "Personal Visit",
      description: "We'll arrange a personal consultation to understand your specific caregiving situation and needs."
    },
    {
      number: "3",
      title: "Get Enrolled", 
      description: "Complete the enrollment process and get approved for our family caregiver compensation program."
    },
    {
      number: "4",
      title: "Compensation and Support",
      description: "Start receiving monthly compensation along with ongoing coaching and support resources."
    }
  ]

  const faqData = [
    {
      question: "How to become a paid caregiver?",
      answer: "To become a paid caregiver through our program, you need to meet our eligibility requirements, complete the application process, and be approved for enrollment. We'll guide you through each step."
    },
    {
      question: "Am I eligible for compensation?", 
      answer: "You may be eligible if you're caring for a family member or friend who meets our care requirements, lives in Pennsylvania, and qualifies for our compensation program."
    },
    {
      question: "How much can I get paid as a caregiver?",
      answer: "Family caregivers can receive up to $2,700 per month through our compensation program, depending on the level of care needed and program eligibility."
    },
    {
      question: "Can I get paid where I live?",
      answer: "Currently, our family caregiver compensation program is available to residents of Pennsylvania. We're working to expand to other states."
    },
    {
      question: "What are the benefits for you and your loved one?",
      answer: "Benefits include monthly compensation, personalized coaching, dedicated care team support, access to resources, and the peace of mind that comes with professional backing."
    }
  ]

  const eligibilityCriteria = [
    "Care recipient must be over 65 years old",
    "Must be living in Pennsylvania",
    "Care recipient must have functional care needs or be homebound",
    "Caregivers can be adult children, relatives, or family members",
    "Recipient should not be enrolled in state Medicaid coverage"
  ]

  return (
    <div className="min-h-screen bg-background" style={{
      backgroundImage: 'url(/images/mainbg.png)',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Pennsylvania Notice */}
      <div className="text-center p-3 text-base font-medium text-white" style={{ backgroundColor: "#2C4F26" }}>
        Currently serving Pennsylvania residents only
      </div>
      
      {!showForm ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-muted/30 via-accent/10 to-muted/40">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }}
              >
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                    Up to $2,700/month
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground">
                    How to get paid taking care of a family member
                </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    You give your time, energy, and heart—simply because you care.
                  </p>
                  <p className="text-lg text-muted-foreground mb-4">
                    And while you never asked for anything in return, there may be support available for you too.
                  </p>
                  <p className="text-lg text-muted-foreground mb-8">
                    If you're helping a loved one at home, we're here to walk you through what's possible—
                    with compassion, not complication.
                  </p>
                <Button 
                  size="lg" 
                    className="py-6 px-12 text-lg bg-primary hover:bg-primary/90 rounded-full" 
                  onClick={() => setShowEligibilityModal(true)}
                >
                    Check Your Eligibility
                </Button>
              </motion.div>
              <motion.div 
                  initial={{ opacity: 0, x: 30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-accent/30 to-muted/50 rounded-2xl p-8 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="w-24 h-24 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">Caring for Family</h3>
                      <p className="text-muted-foreground">Get paid to care for your grandma</p>
                    </div>
                  </div>
              </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6 text-foreground">At Maya Care, we believe families deserve both recognition and support for the love they give every day.</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Our Home-Based Support Program, backed by state-funded health services, allows you to care for your loved one at home—while receiving monthly pay and access to meaningful resources.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="h-full p-10 bg-[#F3F3E6] shadow-lg hover:shadow-xl transition-shadow min-h-[400px]">
                      <div className={`${benefit.color} p-5 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center`}>
                        <benefit.icon className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-6 text-center text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground text-center leading-relaxed text-lg">{benefit.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Become Section */}
          <section className="py-20 bg-gradient-to-br from-accent/10 to-muted/30">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6 text-foreground">How to become a paid caregiver for a family member?</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  If you're eligible and your state offers a funded program, you can apply for compensation in just 4 simple steps. We're here to make the process easy—with a dedicated support person by your side to answer any questions along the way.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="space-y-8">
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.number}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className="bg-primary text-primary-foreground font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            {step.number}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-8"
                    >
                      <Button 
                        size="lg" 
                        className="py-4 px-8 text-lg bg-primary hover:bg-primary/90 rounded-full" 
                        onClick={() => setShowForm(true)}
                      >
                        Check Your Eligibility
                      </Button>
                    </motion.div>
                  </div>
                  <div className="bg-gradient-to-br from-accent/20 to-muted/40 rounded-xl p-8 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="w-20 h-20 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">Simple Process</h3>
                      <p className="text-muted-foreground">Get started in 4 easy steps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Counts as Care Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6 text-foreground">What Counts as Care?</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  To qualify, the person you're supporting must need help with basic daily tasks. These are known as Activities of Daily Living (ADLs).
                </p>
              </motion.div>

              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12">
                  {/* Image Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <div className="rounded-2xl overflow-hidden h-96 w-full">
                      <Image
                        src="/images/senior-care.jpg"
                        alt="Caregiver assisting elderly person with daily activities"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-8 border border-primary/10 md:col-span-2"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">What are ADLs?</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          Caregivers are compensated for helping with activities for daily living (ADLs). They include:
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {[
                          "Feeding",
                          "Bathing/Personal Hygiene", 
                          "Dressing",
                          "Using the Toilet",
                          "Getting in/out of bed or chairs",
                          "Eating and meal support",
                          "Cooking and meal prep",
                          "Managing medications",
                          "Light housekeeping and laundry",
                          "Grocery or pharmacy runs",
                          "Transportation to appointments",
                          "Emotional companionship and check-ins"
                        ].map((activity, index) => (
                          <motion.div
                            key={activity}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="bg-primary text-primary-foreground p-1 rounded-full">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="text-muted-foreground text-lg">{activity}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="pt-4"
                      >
                        <Button 
                          size="lg" 
                          className="w-full py-6 text-lg bg-accent hover:bg-accent/90 rounded-full" 
                          onClick={() => setShowForm(true)}
                        >
                          Calculate Your Compensation
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>


              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6 text-foreground">Jump directly to your question</h2>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqData.map((faq, index) => (
                    <motion.div
                        key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <AccordionItem value={`item-${index}`} className="border rounded-lg px-6 bg-muted/30">
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary text-primary-foreground p-1 rounded-full">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span>{faq.question}</span>
                        </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-4 pb-6 text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6">Get paid to care for your grandma</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                  Ready to start your journey as a paid family caregiver? Check your eligibility today and take the first step toward compensation and support.
                </p>
                <Button 
                  size="lg" 
                  className="py-6 px-12 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-full" 
                  onClick={() => setShowForm(true)}
                >
                  Check Your Eligibility
                </Button>
              </motion.div>
            </div>
          </section>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <section className="py-16 bg-gradient-to-br from-muted/30 to-accent/10">
            <div className="container mx-auto px-4 relative">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground">Care for your Family – Starts Here</h2>
              </div>
              <FamilyCaregiverForm />
            </div>
          </section>
        </motion.div>
      )}
      
      {/* Family Caregiver Eligibility Modal */}
      <FamilyCaregiverModal 
        isOpen={showEligibilityModal} 
        onClose={() => setShowEligibilityModal(false)} 
      />
    </div>
  )
} 