import { InfoPageLayout } from "@/components/info-page-layout"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, CheckCircle, AlertTriangle, Users, FileCheck, Phone } from "lucide-react"

export default function SafetyCenterPage() {
  const safetyFeatures = [
    {
      icon: FileCheck,
      title: "Background Checks",
      description:
        "All caregivers undergo comprehensive background checks including criminal history, identity verification, and reference checks.",
    },
    {
      icon: Shield,
      title: "Identity Verification",
      description:
        "We verify the identity of every caregiver through government-issued ID and additional documentation.",
    },
    {
      icon: Users,
      title: "Reference Verification",
      description:
        "We contact and verify references provided by caregivers to ensure their experience and reliability.",
    },
    {
      icon: CheckCircle,
      title: "Ongoing Monitoring",
      description: "We continuously monitor for any changes in background status and maintain updated records.",
    },
  ]

  const safetyTips = [
    {
      category: "Before Hiring",
      tips: [
        "Review the caregiver's profile, reviews, and background check results thoroughly",
        "Conduct a video interview to get to know the caregiver personally",
        "Ask for and contact additional references beyond those listed",
        "Discuss your specific needs and expectations clearly",
        "Trust your instincts – if something doesn't feel right, keep looking",
      ],
    },
    {
      category: "During Care",
      tips: [
        "Start with shorter sessions to build trust and assess compatibility",
        "Check in regularly, especially during the first few sessions",
        "Install security cameras in common areas (with proper disclosure)",
        "Keep emergency contacts and important information easily accessible",
        "Maintain open communication with your caregiver",
      ],
    },
    {
      category: "Red Flags",
      tips: [
        "Requests for payment outside the platform",
        "Reluctance to provide references or additional information",
        "Inconsistent stories about experience or background",
        "Pressure to make quick decisions without proper vetting",
        "Unprofessional communication or behavior",
      ],
    },
  ]

  return (
    <InfoPageLayout
      title="Safety Center"
      subtitle="Your family's safety is our top priority. Learn about our safety measures and best practices."
    >
      <ContentSection>
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-12">
          <div className="flex items-start">
            <Shield className="w-8 h-8 text-primary mt-1 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">Our Safety Commitment</h2>
              <p className="text-muted-foreground">
                Maya Care is committed to providing a safe platform for families and caregivers. We implement multiple
                layers of safety measures and continuously improve our processes to ensure the highest standards of
                security and trust.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Safety Features">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {safetyFeatures.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon className="w-6 h-6 text-primary mr-3" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Safety Tips & Best Practices">
        <Accordion type="single" collapsible className="w-full">
          {safetyTips.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <span className="flex items-center">
                  {section.category === "Red Flags" && <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />}
                  {section.category !== "Red Flags" && <CheckCircle className="w-5 h-5 text-green-500 mr-2" />}
                  {section.category}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 mt-4">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentSection>

      <ContentSection title="Report Safety Concerns">
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Need to Report a Safety Issue?</h3>
              <p className="text-amber-700 mb-4">
                If you encounter any safety concerns or suspicious behavior, please report it immediately. Our safety
                team investigates all reports promptly and takes appropriate action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center text-amber-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">Emergency: 911</span>
                </div>
                <div className="flex items-center text-amber-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">Safety Hotline: 1-800-MAYA-SAFE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Additional Resources">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Download our comprehensive safety checklist to ensure you're taking all necessary precautions.
              </p>
              <a href="#" className="text-primary hover:underline font-medium">
                Download PDF →
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Preparedness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to prepare for emergencies and create safety plans with your caregiver.
              </p>
              <a href="#" className="text-primary hover:underline font-medium">
                View Guide →
              </a>
            </CardContent>
          </Card>
        </div>
      </ContentSection>
    </InfoPageLayout>
  )
}
