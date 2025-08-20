import { InfoPageLayout } from "@/components/info-page-layout"
import { ContentSection } from "@/components/content-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Users, Award } from "lucide-react"
import Image from "next/image"

export default function AboutUsPage() {
  return (
    <InfoPageLayout
      title="About Maya Care"
      subtitle="We're on a mission to make quality care accessible to every family, everywhere."
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <ContentSection>
            <p className="text-lg leading-relaxed">
              Founded in 2018, Maya Care has grown from a simple idea to a trusted platform connecting millions of
              families with qualified caregivers across the country. We believe that everyone deserves access to quality
              care, whether it's for children, seniors, or special needs family members.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Our platform combines cutting-edge technology with human compassion to create meaningful connections
              between families and caregivers. We're not just a marketplace – we're a community built on trust, safety,
              and shared values.
            </p>
          </ContentSection>
          <Button size="lg" className="mt-6">
            Join Our Community
          </Button>
        </div>
        <div className="relative h-96">
          <Image
            src="/placeholder.svg?width=500&height=400"
            alt="Maya Care team and community"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <ContentSection title="Our Values">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 not-prose">
          {[
            {
              icon: Heart,
              title: "Compassion",
              description: "We lead with empathy and understanding in everything we do.",
            },
            {
              icon: Shield,
              title: "Safety",
              description: "Your family's safety is our top priority, always.",
            },
            {
              icon: Users,
              title: "Community",
              description: "We build lasting relationships based on trust and respect.",
            },
            {
              icon: Award,
              title: "Excellence",
              description: "We strive for the highest standards in care and service.",
            },
          ].map((value) => (
            <Card key={value.title} className="text-center">
              <CardContent className="p-6">
                <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Our Impact">
        <div className="grid md:grid-cols-3 gap-8 not-prose">
          {[
            { number: "2M+", label: "Families Served" },
            { number: "500K+", label: "Trusted Caregivers" },
            { number: "50", label: "States Covered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Leadership Team">
        <div className="grid md:grid-cols-3 gap-8 not-prose">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Co-Founder",
              bio: "Former healthcare executive with 15+ years of experience in patient care and operations.",
              image: "professional+headshot+of+a+woman+CEO",
            },
            {
              name: "Michael Chen",
              role: "CTO & Co-Founder",
              bio: "Technology leader who previously built scalable platforms at major tech companies.",
              image: "professional+headshot+of+a+man+CTO",
            },
            {
              name: "Dr. Emily Rodriguez",
              role: "Chief Medical Officer",
              bio: "Pediatrician and geriatrician with expertise in family care and safety protocols.",
              image: "professional+headshot+of+a+woman+doctor",
            },
          ].map((leader) => (
            <Card key={leader.name}>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={`/placeholder.svg?width=96&height=96&query=${leader.image}`}
                    alt={leader.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-bold text-lg">{leader.name}</h3>
                <p className="text-primary font-medium mb-2">{leader.role}</p>
                <p className="text-muted-foreground text-sm">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>
    </InfoPageLayout>
  )
}
