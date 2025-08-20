"use client"

import { InfoPageLayout } from "@/components/info-page-layout"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, MapPin, Clock, Users, DollarSign, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function CostOfCarePage() {
  const [location, setLocation] = useState("")
  const [careType, setCareType] = useState("")
  const [hours, setHours] = useState("")
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null)

  const calculateCost = () => {
    // Simple calculation logic - in real app this would be more sophisticated
    const baseRates: { [key: string]: number } = {
      "child-care": 18,
      "senior-care": 22,
      "special-needs": 25,
      "pet-care": 15,
    }

    const locationMultipliers: { [key: string]: number } = {
      "new-york": 1.4,
      california: 1.3,
      texas: 1.0,
      florida: 0.9,
      other: 1.0,
    }

    if (careType && location && hours) {
      const baseRate = baseRates[careType] || 20
      const multiplier = locationMultipliers[location] || 1.0
      const hoursNum = Number.parseInt(hours)
      const cost = baseRate * multiplier * hoursNum
      setEstimatedCost(cost)
    }
  }

  const averageRates = [
    {
      type: "Child Care",
      hourly: "$15 - $25",
      weekly: "$300 - $500",
      description: "Babysitting, nanny services, after-school care",
    },
    {
      type: "Senior Care",
      hourly: "$18 - $30",
      weekly: "$360 - $600",
      description: "Companion care, personal care, medication reminders",
    },
    {
      type: "Special Needs Care",
      hourly: "$20 - $35",
      weekly: "$400 - $700",
      description: "Specialized care for individuals with disabilities",
    },
    {
      type: "Pet Care",
      hourly: "$12 - $20",
      weekly: "$240 - $400",
      description: "Pet sitting, dog walking, overnight care",
    },
  ]

  const factors = [
    {
      icon: MapPin,
      title: "Location",
      description: "Urban areas typically have higher rates than rural areas due to cost of living differences.",
    },
    {
      icon: Clock,
      title: "Experience Level",
      description: "Caregivers with more experience, certifications, or specialized training command higher rates.",
    },
    {
      icon: Users,
      title: "Number of People",
      description: "Caring for multiple children or family members may increase the hourly rate.",
    },
    {
      icon: DollarSign,
      title: "Special Requirements",
      description: "Additional skills like cooking, tutoring, or medical care can affect pricing.",
    },
  ]

  return (
    <InfoPageLayout
      title="Cost of Care"
      subtitle="Understand care costs in your area and budget for your family's needs."
    >
      <ContentSection>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-primary" />
              Care Cost Calculator
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York</SelectItem>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                        <SelectItem value="florida">Florida</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="care-type">Type of Care</Label>
                    <Select value={careType} onValueChange={setCareType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select care type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child-care">Child Care</SelectItem>
                        <SelectItem value="senior-care">Senior Care</SelectItem>
                        <SelectItem value="special-needs">Special Needs Care</SelectItem>
                        <SelectItem value="pet-care">Pet Care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="hours">Hours per Week</Label>
                    <Input
                      id="hours"
                      type="number"
                      placeholder="Enter hours per week"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                  </div>

                  <Button onClick={calculateCost} className="w-full">
                    Calculate Estimated Cost
                  </Button>

                  {estimatedCost && (
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Weekly Cost</p>
                      <p className="text-3xl font-bold text-primary">${estimatedCost}</p>
                      <p className="text-xs text-muted-foreground mt-1">*This is an estimate. Actual costs may vary.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Average Rates by Care Type</h2>
            <div className="space-y-4">
              {averageRates.map((rate, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{rate.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Hourly:</span>
                      <span className="font-semibold">{rate.hourly}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">Weekly (20 hrs):</span>
                      <span className="font-semibold">{rate.weekly}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{rate.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Factors That Affect Cost">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {factors.map((factor, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <factor.icon className="w-6 h-6 text-primary mr-3" />
                  {factor.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{factor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Cost-Saving Tips">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ways to Save Money</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Book recurring care for better rates</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Share care with other families</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Consider newer caregivers building experience</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Be flexible with scheduling</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Payment Options</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Pay-as-you-go for occasional care</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Weekly or monthly payment plans</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Flexible spending account (FSA) eligible</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>Dependent care assistance programs</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <div className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Find Care?</h2>
          <p className="mb-6">
            Get personalized quotes from caregivers in your area and find the perfect match for your family.
          </p>
          <Button variant="secondary" size="lg">
            Find Caregivers Now
          </Button>
        </div>
      </ContentSection>
    </InfoPageLayout>
  )
}
