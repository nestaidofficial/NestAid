import { InfoPageLayout } from "@/components/info-page-layout"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp, Shield, DollarSign, CheckCircle, Star } from "lucide-react"

export default function CorporateBenefitsPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Reduce employee turnover and absenteeism with reliable care solutions",
    },
    {
      icon: TrendingUp,
      title: "Increased Productivity",
      description: "Employees focus better knowing their loved ones are well cared for",
    },
    {
      icon: Users,
      title: "Employee Satisfaction",
      description: "Attract and retain top talent with comprehensive care benefits",
    },
    {
      icon: Shield,
      title: "Peace of Mind",
      description: "All caregivers are background-checked and verified for safety",
    },
  ]

  const features = [
    "Dedicated account management",
    "Volume discounts for employees",
    "Priority customer support",
    "Detailed usage analytics",
    "Custom onboarding programs",
    "Flexible payment options",
    "Emergency care coordination",
    "Wellness program integration",
  ]

  const plans = [
    {
      name: "Starter",
      employees: "50-200",
      price: "Contact for pricing",
      features: [
        "Basic platform access",
        "Standard customer support",
        "Monthly usage reports",
        "Employee onboarding materials",
      ],
    },
    {
      name: "Professional",
      employees: "200-1000",
      price: "Contact for pricing",
      features: [
        "All Starter features",
        "Dedicated account manager",
        "Priority customer support",
        "Custom onboarding program",
        "Advanced analytics dashboard",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      employees: "1000+",
      price: "Custom pricing",
      features: [
        "All Professional features",
        "Custom integrations",
        "24/7 emergency support",
        "Wellness program integration",
        "Custom reporting",
        "API access",
      ],
    },
  ]

  const testimonials = [
    {
      company: "TechCorp Inc.",
      industry: "Technology",
      employees: "500+",
      quote:
        "Maya Care has been a game-changer for our employee benefits package. Our team members love the flexibility and peace of mind it provides.",
      name: "Sarah Johnson",
      title: "HR Director",
    },
    {
      company: "Healthcare Partners",
      industry: "Healthcare",
      employees: "1200+",
      quote:
        "The quality of caregivers and the platform's ease of use have exceeded our expectations. It's become one of our most valued benefits.",
      name: "Michael Chen",
      title: "Benefits Manager",
    },
  ]

  return (
    <InfoPageLayout
      title="Corporate Benefits"
      subtitle="Enhance your employee benefits package with comprehensive care solutions."
    >
      <ContentSection>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Maya Care for Your Business?</h2>
            <p className="text-lg mb-6">
              Help your employees balance work and family life with access to trusted, vetted caregivers. Our corporate
              benefits program provides comprehensive care solutions that reduce stress and increase productivity across
              your organization.
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
            <h3 className="text-xl font-bold mb-4">What's Included</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Pricing Plans">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-muted-foreground">{plan.employees} employees</div>
                <div className="text-3xl font-bold text-primary mt-2">{plan.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="What Our Partners Say">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 text-primary mr-2" />
                  <div>
                    <div className="font-semibold">{testimonial.company}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.industry} • {testimonial.employees} employees
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-muted-foreground mb-4">"{testimonial.quote}"</blockquote>
                <div className="text-sm">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Implementation Process">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: "1",
              title: "Consultation",
              description: "We assess your company's needs and customize a solution",
            },
            {
              step: "2",
              title: "Setup",
              description: "Quick platform setup and integration with your systems",
            },
            {
              step: "3",
              title: "Onboarding",
              description: "Employee training and support materials provided",
            },
            {
              step: "4",
              title: "Launch",
              description: "Go live with ongoing support and account management",
            },
          ].map((process, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {process.step}
              </div>
              <h3 className="font-bold mb-2">{process.title}</h3>
              <p className="text-sm text-muted-foreground">{process.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection>
        <div className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">
            Join hundreds of companies that trust Maya Care to support their employees' care needs. Contact us today for
            a custom quote and implementation timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Schedule Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </ContentSection>
    </InfoPageLayout>
  )
}
