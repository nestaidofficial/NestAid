import { InfoPageLayout } from "@/components/info-page-layout"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle, Phone, Mail, HelpCircle, Users, CreditCard, Shield } from "lucide-react"

export default function HelpCenterPage() {
  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn how to create your profile and find the perfect caregiver",
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Understand our payment system, fees, and billing processes",
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Information about background checks, safety features, and best practices",
    },
    {
      icon: MessageCircle,
      title: "Communication",
      description: "How to message caregivers and manage your conversations",
    },
  ]

  const faqs = [
    {
      question: "How do I find a caregiver?",
      answer:
        "Start by posting a job or browsing caregiver profiles in your area. You can filter by experience, availability, and specific skills. Once you find someone you're interested in, send them a message to discuss your needs.",
    },
    {
      question: "What background checks do you perform?",
      answer:
        "We conduct comprehensive background checks including criminal history, identity verification, and reference checks. All caregivers must pass these checks before they can accept jobs on our platform.",
    },
    {
      question: "How does payment work?",
      answer:
        "Payments are processed securely through our platform. You can pay by credit card, debit card, or bank transfer. Caregivers are paid after each completed session, and you'll receive detailed invoices for your records.",
    },
    {
      question: "What if I'm not satisfied with a caregiver?",
      answer:
        "If you're not completely satisfied, please contact our support team immediately. We'll work with you to resolve any issues and help you find a better match if needed.",
    },
    {
      question: "Can I book recurring care?",
      answer:
        "Yes! You can set up recurring bookings for regular care needs. This ensures your preferred caregiver is available for your ongoing schedule.",
    },
    {
      question: "What happens in case of an emergency?",
      answer:
        "All caregivers are trained in basic emergency procedures. For medical emergencies, call 911 immediately. You can also contact our 24/7 safety hotline for urgent safety concerns.",
    },
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support representative",
      action: "Call Now",
      available: "Mon-Fri 8AM-8PM EST",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "Send Email",
      available: "Response within 24 hours",
    },
  ]

  return (
    <InfoPageLayout title="Help Center" subtitle="Find answers to your questions and get the support you need.">
      <ContentSection>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input placeholder="Search for help articles..." className="pl-10 py-3 text-lg" />
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Browse by Category">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <category.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-center">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Frequently Asked Questions">
        <Accordion type="single" collapsible className="w-full mb-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <span className="flex items-center">
                  <HelpCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mt-4 ml-7">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentSection>

      <ContentSection title="Contact Support">
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <option.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{option.available}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{option.description}</p>
                <Button className="w-full">{option.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection>
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
          <Button size="lg">Contact Support</Button>
        </div>
      </ContentSection>
    </InfoPageLayout>
  )
}
