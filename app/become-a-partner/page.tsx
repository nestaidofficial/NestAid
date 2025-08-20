import { InfoPageLayout } from "@/components/info-page-layout"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Handshake, TrendingUp, Users, Globe, CheckCircle, Building, Phone, Mail } from "lucide-react"

export default function BecomePartnerPage() {
  const partnerTypes = [
    {
      icon: Building,
      title: "Healthcare Organizations",
      description: "Hospitals, clinics, and healthcare systems looking to extend care services",
      benefits: ["Expand service offerings", "Generate additional revenue", "Improve patient outcomes"],
    },
    {
      icon: Users,
      title: "Senior Living Communities",
      description: "Assisted living facilities and senior communities",
      benefits: ["Support aging in place", "Provide family peace of mind", "Increase occupancy rates"],
    },
    {
      icon: Globe,
      title: "Technology Partners",
      description: "Software companies and platforms serving families or caregivers",
      benefits: ["API integration opportunities", "White-label solutions", "Revenue sharing models"],
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Generate new revenue streams through our partnership programs",
    },
    {
      icon: Users,
      title: "Expanded Reach",
      description: "Access our network of families and caregivers nationwide",
    },
    {
      icon: Handshake,
      title: "Dedicated Support",
      description: "Get dedicated partnership support and account management",
    },
    {
      icon: CheckCircle,
      title: "Proven Platform",
      description: "Leverage our established, trusted care marketplace",
    },
  ]

  return (
    <InfoPageLayout
      title="Become a Partner"
      subtitle="Join our network of trusted partners and help us expand access to quality care."
    >
      <ContentSection>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Partner with Maya Care</h2>
            <p className="text-lg mb-6">
              We're looking for like-minded organizations to join our mission of making quality care accessible to every
              family. Whether you're a healthcare organization, senior living community, or technology company, we have
              partnership opportunities that can benefit your business and our shared customers.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <benefit.icon className="w-6 h-6 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Partnership Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Co-marketing opportunities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Revenue sharing programs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Technical integration support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Training and certification programs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Priority customer support</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Partnership Opportunities">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {partnerTypes.map((type, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="text-center">
                <type.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Get Started">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Partner Application</h3>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>

                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>

                  <div>
                    <Label htmlFor="partnerType">Partnership Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select partnership type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthcare">Healthcare Organization</SelectItem>
                        <SelectItem value="senior-living">Senior Living Community</SelectItem>
                        <SelectItem value="technology">Technology Partner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your organization</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your organization and how you'd like to partner with us"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Our Partnership Team</h3>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-primary mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground">1-800-MAYA-PARTNER</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-primary mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">partnerships@mayacare.com</p>
                      <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Next Steps</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Submit your partnership application</li>
                  <li>2. Schedule a discovery call with our team</li>
                  <li>3. Review partnership agreement and terms</li>
                  <li>4. Begin integration and onboarding process</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <div className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="mb-6">
            Join our growing network of partners and help us make quality care accessible to more families. Let's work
            together to create meaningful impact in the care industry.
          </p>
          <Button variant="secondary" size="lg">
            Schedule a Call
          </Button>
        </div>
      </ContentSection>
    </InfoPageLayout>
  )
}
