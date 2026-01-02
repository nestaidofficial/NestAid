import Image from "next/image"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { Bath, Heart, Users, MessageCircle, Car, Utensils, Clock, Accessibility, Phone, UserCheck, AlertCircle, Stethoscope, FileText, Calendar, UserPlus, Target, Activity, Flower, Brain, Dumbbell, Apple, Smile } from "lucide-react"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

// Care services data with full content
const careServices: Record<string, {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  backgroundColor: string
  features: Array<{ icon: any, text: string }>
  content: Array<{ type: 'paragraph' | 'heading' | 'list', content: string | string[] }>
}> = {
  "companionship": {
    id: "companionship",
    title: "Companionship Care",
    subtitle: "Meaningful companionship that brightens each day with care",
    description: "At NestAid, we understand that companionship is essential to quality of life. Our companion care services provide emotional support, social engagement, and a friendly presence to help seniors combat loneliness and stay connected.",
    image: "/images/group.jpg",
    backgroundColor: "#5B8A7D",
    features: [
      { icon: MessageCircle, text: "Friendly conversation and social engagement" },
      { icon: Activity, text: "Assistance with hobbies and activities" },
      { icon: Car, text: "Escorting to appointments and errands" },
      { icon: Utensils, text: "Meal preparation and companionship during meals" },
      { icon: Clock, text: "Medication reminders and light supervision" }
    ],
    content: [
      {
        type: "paragraph",
        content: "Companionship care goes beyond basic assistance—it's about building meaningful relationships that enhance quality of life. Our compassionate caregivers become trusted friends who bring joy, conversation, and emotional support to daily living."
      },
      {
        type: "heading",
        content: "What is Companionship Care?"
      },
      {
        type: "paragraph",
        content: "Companionship care focuses on providing social interaction and emotional support for seniors who may be experiencing loneliness or isolation. This type of care is ideal for individuals who are relatively independent but could benefit from regular social engagement and light assistance with daily activities."
      },
      {
        type: "heading",
        content: "Services Included"
      },
      {
        type: "list",
        content: [
          "Engaging conversation and active listening",
          "Accompanying to social events, religious services, or community activities",
          "Playing games, reading together, or enjoying hobbies",
          "Light housekeeping and meal preparation",
          "Medication reminders and health monitoring",
          "Transportation to appointments and errands",
          "Assistance with correspondence and technology"
        ]
      },
      {
        type: "heading",
        content: "Benefits of Companionship Care"
      },
      {
        type: "paragraph",
        content: "Regular social interaction has been proven to improve mental health, cognitive function, and overall well-being. Our companion caregivers help reduce feelings of isolation, provide mental stimulation through engaging activities, and offer emotional support during challenging times."
      },
      {
        type: "heading",
        content: "Who Benefits from Companionship Care?"
      },
      {
        type: "paragraph",
        content: "Companionship care is perfect for seniors who are generally independent but would appreciate regular social interaction, those recovering from illness or surgery, individuals whose family members live far away, or anyone experiencing loneliness or depression."
      },
      {
        type: "heading",
        content: "Our Approach"
      },
      {
        type: "paragraph",
        content: "At NestAid, we carefully match companions with clients based on personality, interests, and preferences. We believe that the best care relationships are built on mutual respect, shared interests, and genuine friendship. Our caregivers are trained not just in practical assistance but in creating meaningful, uplifting connections."
      }
    ]
  },
  "assistance": {
    id: "assistance",
    title: "Daily Living Assistance",
    subtitle: "Tailored assistance to make daily life easier and more fulfilling",
    description: "Our in-home care services provide comprehensive support with activities of daily living, helping seniors maintain independence and dignity while receiving the assistance they need.",
    image: "/images/adult-care.jpg",
    backgroundColor: "#B084CC",
    features: [
      { icon: Bath, text: "Bathing and personal hygiene" },
      { icon: Heart, text: "Personal care and grooming" },
      { icon: Utensils, text: "Meal preparation and feeding" },
      { icon: Accessibility, text: "Mobility assistance and transfers" },
      { icon: UserCheck, text: "Safety supervision and monitoring" }
    ],
    content: [
      {
        type: "paragraph",
        content: "Daily living assistance helps seniors maintain their independence while ensuring they receive the support they need with personal care tasks. Our caregivers provide respectful, dignified assistance that prioritizes comfort and autonomy."
      },
      {
        type: "heading",
        content: "Comprehensive Personal Care"
      },
      {
        type: "paragraph",
        content: "Our in-home care services cover all aspects of daily living, from morning routines to evening care. We understand that personal care is deeply personal, which is why our caregivers are trained to provide assistance with sensitivity, respect, and professionalism."
      },
      {
        type: "heading",
        content: "Services We Provide"
      },
      {
        type: "list",
        content: [
          "Bathing, showering, and personal hygiene assistance",
          "Grooming, including hair care, shaving, and oral hygiene",
          "Dressing and clothing selection",
          "Toileting and incontinence care",
          "Mobility assistance and fall prevention",
          "Transferring from bed to chair or wheelchair",
          "Exercise and physical activity support",
          "Nutrition monitoring and meal assistance"
        ]
      },
      {
        type: "heading",
        content: "Maintaining Dignity and Independence"
      },
      {
        type: "paragraph",
        content: "We believe that receiving assistance shouldn't mean losing independence. Our caregivers encourage clients to do as much as they can for themselves while providing support where needed. This approach helps maintain physical abilities, builds confidence, and preserves dignity."
      },
      {
        type: "heading",
        content: "Safety First"
      },
      {
        type: "paragraph",
        content: "Safety is our top priority. Our caregivers are trained in proper transfer techniques, fall prevention, and emergency response. We conduct home safety assessments to identify and address potential hazards, ensuring a safe living environment."
      },
      {
        type: "heading",
        content: "Flexible Care Schedules"
      },
      {
        type: "paragraph",
        content: "Whether you need a few hours of assistance each day or around-the-clock care, we create customized schedules that fit your needs and routine. Our flexible approach ensures you receive the right level of support at the right times."
      }
    ]
  },
  "support": {
    id: "support",
    title: "Special Needs Support",
    subtitle: "Reliable support designed to nurture comfort and independence",
    description: "Our specialized support services address the unique needs of individuals with disabilities, chronic conditions, or special requirements, providing compassionate care tailored to each person's situation.",
    image: "/images/senior-care.jpg",
    backgroundColor: "#6B6B6B",
    features: [
      { icon: Users, text: "Assistance with daily living activities" },
      { icon: Accessibility, text: "Mobility and transfer support" },
      { icon: Phone, text: "Communication assistance and advocacy" },
      { icon: AlertCircle, text: "Behavioral support and crisis intervention" },
      { icon: Stethoscope, text: "Coordination with healthcare providers" }
    ],
    content: [
      {
        type: "paragraph",
        content: "Special needs support requires expertise, patience, and genuine compassion. Our caregivers are specially trained to work with individuals who have physical disabilities, developmental challenges, chronic illnesses, or cognitive impairments."
      },
      {
        type: "heading",
        content: "Specialized Care for Unique Needs"
      },
      {
        type: "paragraph",
        content: "Every individual has unique abilities, challenges, and preferences. We create personalized care plans that address specific needs while promoting independence, engagement, and quality of life."
      },
      {
        type: "heading",
        content: "Our Support Services"
      },
      {
        type: "list",
        content: [
          "Assistance with activities of daily living tailored to abilities",
          "Mobility support and adaptive equipment assistance",
          "Communication support for speech or language challenges",
          "Sensory support for those with sensory processing needs",
          "Behavioral support with positive reinforcement techniques",
          "Social skills development and community integration",
          "Medication management and health monitoring",
          "Coordination with therapists, doctors, and specialists"
        ]
      },
      {
        type: "heading",
        content: "Person-Centered Approach"
      },
      {
        type: "paragraph",
        content: "We see the person first, not the disability. Our caregivers focus on strengths, interests, and goals while providing the support needed to overcome challenges. We encourage participation in community activities, skill development, and meaningful relationships."
      },
      {
        type: "heading",
        content: "Family Partnership"
      },
      {
        type: "paragraph",
        content: "Families are essential partners in care. We maintain open communication, provide regular updates, and welcome family involvement in care decisions. We also offer respite care to give family caregivers much-needed breaks."
      },
      {
        type: "heading",
        content: "Professional Training"
      },
      {
        type: "paragraph",
        content: "Our caregivers receive specialized training in disability awareness, adaptive communication, behavioral support strategies, and condition-specific care techniques. We stay current with best practices and continue education to provide the highest quality support."
      }
    ]
  },
  "caregiving": {
    id: "caregiving",
    title: "24/7 Live-In Caregiving",
    subtitle: "Dedicated caregivers offering daily support with warmth and respect",
    description: "Our live-in caregiving services provide continuous support and supervision, giving families peace of mind knowing their loved ones receive care around the clock in the comfort of home.",
    image: "/images/pet-care.jpg",
    backgroundColor: "#A6C8E1",
    features: [
      { icon: Clock, text: "Around-the-clock personal care and supervision" },
      { icon: Heart, text: "Medication management and reminders" },
      { icon: Bath, text: "Assistance with toileting and hygiene" },
      { icon: UserCheck, text: "Overnight monitoring and safety checks" },
      { icon: Utensils, text: "Meal preparation and feeding assistance" }
    ],
    content: [
      {
        type: "paragraph",
        content: "Live-in caregiving provides the highest level of in-home care, offering continuous support for seniors who need frequent assistance or supervision. This option allows individuals to age in place safely while receiving personalized care around the clock."
      },
      {
        type: "heading",
        content: "Comprehensive 24/7 Care"
      },
      {
        type: "paragraph",
        content: "With live-in care, a dedicated caregiver resides in your home, providing assistance whenever needed. This continuous presence ensures immediate response to emergencies, consistent care routines, and peace of mind for families."
      },
      {
        type: "heading",
        content: "What Live-In Care Includes"
      },
      {
        type: "list",
        content: [
          "24-hour availability for any care needs",
          "Personal care assistance (bathing, dressing, grooming)",
          "Medication reminders and health monitoring",
          "Meal planning, preparation, and feeding assistance",
          "Light housekeeping and laundry",
          "Mobility assistance and fall prevention",
          "Overnight supervision and safety monitoring",
          "Companionship and social engagement",
          "Coordination with family and healthcare providers"
        ]
      },
      {
        type: "heading",
        content: "When to Consider Live-In Care"
      },
      {
        type: "paragraph",
        content: "Live-in care is ideal for individuals who need frequent assistance throughout the day and night, those at risk of falls or wandering, seniors recovering from surgery or illness, or anyone whose family members cannot provide continuous supervision."
      },
      {
        type: "heading",
        content: "Benefits of Live-In Care"
      },
      {
        type: "paragraph",
        content: "Unlike facility-based care, live-in caregiving allows seniors to remain in familiar surroundings while receiving personalized, one-on-one attention. It often costs less than assisted living facilities and provides greater flexibility and independence."
      },
      {
        type: "heading",
        content: "Our Live-In Caregivers"
      },
      {
        type: "paragraph",
        content: "We carefully select and train our live-in caregivers to ensure they can provide excellent care while maintaining professional boundaries. They receive private quarters in the home and regular time off, ensuring they remain energized and attentive to your loved one's needs."
      }
    ]
  },
  "guidance": {
    id: "guidance",
    title: "Care Planning & Guidance",
    subtitle: "Compassionate guidance for seniors and families at every step",
    description: "Our care planning services help families navigate the complexities of senior care, creating personalized plans that address medical, emotional, and practical needs.",
    image: "/images/adult-care.jpg",
    backgroundColor: "#D4B896",
    features: [
      { icon: FileText, text: "Comprehensive initial assessment" },
      { icon: Target, text: "Tailored care schedule and goals" },
      { icon: Calendar, text: "Regular progress evaluations" },
      { icon: UserPlus, text: "Coordination with medical professionals" },
      { icon: Activity, text: "Flexible services adapting to changing needs" }
    ],
    content: [
      {
        type: "paragraph",
        content: "Navigating senior care can be overwhelming. Our care planning services provide expert guidance, helping families understand options, make informed decisions, and create comprehensive care plans tailored to individual needs and circumstances."
      },
      {
        type: "heading",
        content: "Comprehensive Care Assessment"
      },
      {
        type: "paragraph",
        content: "We begin with a thorough assessment of your loved one's physical health, cognitive abilities, daily living needs, safety concerns, and personal preferences. This assessment forms the foundation of a personalized care plan."
      },
      {
        type: "heading",
        content: "Our Care Planning Process"
      },
      {
        type: "list",
        content: [
          "In-home assessment of needs and environment",
          "Review of medical history and current conditions",
          "Discussion of preferences, routines, and goals",
          "Safety evaluation and home modification recommendations",
          "Development of customized care schedule",
          "Caregiver matching based on personality and needs",
          "Coordination with physicians and healthcare team",
          "Regular reassessment and plan adjustments"
        ]
      },
      {
        type: "heading",
        content: "Personalized Care Plans"
      },
      {
        type: "paragraph",
        content: "Every care plan is unique, reflecting individual health status, personal preferences, cultural considerations, and family dynamics. We create detailed plans that address all aspects of care while remaining flexible enough to adapt to changing needs."
      },
      {
        type: "heading",
        content: "Family Support and Education"
      },
      {
        type: "paragraph",
        content: "We recognize that family members often need guidance too. We provide education about conditions, care techniques, and available resources. We help families understand what to expect and how to best support their loved ones."
      },
      {
        type: "heading",
        content: "Ongoing Care Coordination"
      },
      {
        type: "paragraph",
        content: "Care needs change over time. We monitor progress, conduct regular reassessments, and adjust care plans as needed. We coordinate with healthcare providers, manage appointments, and ensure all aspects of care work together seamlessly."
      },
      {
        type: "heading",
        content: "Advocating for Your Loved One"
      },
      {
        type: "paragraph",
        content: "Our care planners serve as advocates, ensuring your loved one receives appropriate care and services. We communicate with healthcare providers, navigate insurance and benefits, and help families make informed decisions about care options."
      }
    ]
  },
  "therapy": {
    id: "therapy",
    title: "Wellness & Therapy",
    subtitle: "Personalized therapies to restore strength, balance, and peace",
    description: "Our wellness and therapy services promote physical health, mental well-being, and overall quality of life through gentle exercises, mindfulness practices, and holistic approaches to senior health.",
    image: "/images/senior-care.jpg",
    backgroundColor: "#5B8A7D",
    features: [
      { icon: Flower, text: "Guided yoga sessions for flexibility" },
      { icon: Brain, text: "Meditation and mindfulness coaching" },
      { icon: Dumbbell, text: "Light exercise and stretching routines" },
      { icon: Apple, text: "Nutrition and wellness education" },
      { icon: Smile, text: "Stress management techniques" }
    ],
    content: [
      {
        type: "paragraph",
        content: "Wellness is about more than just physical health—it encompasses mind, body, and spirit. Our wellness and therapy services take a holistic approach to senior health, promoting vitality, independence, and joy in everyday life."
      },
      {
        type: "heading",
        content: "Holistic Wellness Approach"
      },
      {
        type: "paragraph",
        content: "We believe that true wellness comes from balancing physical fitness, mental clarity, emotional health, and social connection. Our programs are designed to address all these aspects, helping seniors thrive at any age."
      },
      {
        type: "heading",
        content: "Our Wellness Services"
      },
      {
        type: "list",
        content: [
          "Gentle yoga adapted for seniors and limited mobility",
          "Guided meditation and breathing exercises",
          "Light strength and flexibility training",
          "Balance exercises and fall prevention",
          "Walking programs and outdoor activities",
          "Nutritional counseling and meal planning",
          "Stress reduction techniques",
          "Cognitive exercises and brain health activities",
          "Social engagement and group activities"
        ]
      },
      {
        type: "heading",
        content: "Physical Wellness"
      },
      {
        type: "paragraph",
        content: "Regular physical activity helps maintain strength, flexibility, and balance—all crucial for independence. Our gentle exercise programs are tailored to individual abilities and health conditions, focusing on safe, enjoyable movement that builds confidence and capability."
      },
      {
        type: "heading",
        content: "Mental and Emotional Well-Being"
      },
      {
        type: "paragraph",
        content: "Mental health is as important as physical health. Our meditation, mindfulness, and relaxation techniques help reduce anxiety, improve mood, and enhance cognitive function. We also facilitate social connections that combat loneliness and depression."
      },
      {
        type: "heading",
        content: "Nutrition and Lifestyle"
      },
      {
        type: "paragraph",
        content: "Good nutrition fuels both body and mind. We provide education about healthy eating for seniors, help with meal planning, and can prepare nutritious meals that support overall wellness. We also address sleep, hydration, and other lifestyle factors that impact health."
      },
      {
        type: "heading",
        content: "Personalized Programs"
      },
      {
        type: "paragraph",
        content: "Every senior has different abilities, interests, and goals. We create customized wellness programs that match individual fitness levels, preferences, and health conditions. Whether it's chair yoga, walking clubs, or meditation sessions, we find activities that bring joy and benefit."
      }
    ]
  }
}

export default async function CareServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = careServices[slug]

  if (!service) {
    notFound()
  }

  return (
    <div className="bg-[#F5F5EC] min-h-screen">
      <main className="container mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Service Header */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
            <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
              CARE SERVICES DESIGNED WITH HEART
            </p>
          </div>
          <h1 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.1] mb-6`}>
            {service.title}
          </h1>
          <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-8`}>
            {service.description}
          </p>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="rounded-3xl p-8 md:p-10 shadow-lg" style={{ backgroundColor: service.backgroundColor }}>
            <h2 className={`${playfair.className} text-[28px] md:text-[36px] font-semibold mb-8 ${service.backgroundColor === '#A6C8E1' || service.backgroundColor === '#D4B896' ? 'text-[#1A5463]' : 'text-white'}`}>
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${service.backgroundColor === '#A6C8E1' || service.backgroundColor === '#D4B896' ? 'bg-[#1A5463]' : 'bg-white'}`}>
                      <IconComponent className={`w-6 h-6 ${service.backgroundColor === '#A6C8E1' || service.backgroundColor === '#D4B896' ? 'text-white' : 'text-[#1A5463]'}`} />
                    </div>
                    <p className={`${inter.className} text-base leading-relaxed ${service.backgroundColor === '#A6C8E1' || service.backgroundColor === '#D4B896' ? 'text-[#1A5463]' : 'text-white'}`}>
                      {feature.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detailed Content */}
        <article className="max-w-3xl mx-auto">
          <div className={`${inter.className} prose prose-lg max-w-none`}>
            {service.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-[#1A5463] text-base md:text-lg leading-relaxed mb-6">
                    {block.content}
                  </p>
                )
              }
              
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className={`${playfair.className} text-[28px] md:text-[36px] text-[#1A5463] font-semibold mt-10 mb-6`}>
                    {block.content}
                  </h2>
                )
              }
              
              if (block.type === 'list' && Array.isArray(block.content)) {
                return (
                  <ul key={index} className="space-y-3 mb-8 ml-6">
                    {block.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-[#1A5463] text-base md:text-lg leading-relaxed list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              }
              
              return null
            })}
          </div>
        </article>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <h2 className={`${playfair.className} text-[28px] md:text-[36px] text-[#1A5463] font-semibold mb-4`}>
            Ready to Get Started?
          </h2>
          <p className={`${inter.className} text-base md:text-lg text-[#1A5463] mb-8 leading-relaxed`}>
            Contact us today to learn more about our {service.title.toLowerCase()} services and how we can help you or your loved one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/find-care#services"
              className={`${inter.className} bg-[#27645E] hover:bg-[#1f4d47] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              EXPLORE ALL SERVICES
            </Link>
            <Link
              href="/"
              className={`${inter.className} bg-[#27645E] hover:bg-[#1f4d47] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              CONTACT US
            </Link>
          </div>
        </div>

        {/* Back to Services Link */}
        <div className="max-w-3xl mx-auto mt-12">
          <Link
            href="/find-care"
            className={`${inter.className} inline-flex items-center gap-2 text-[#1A5463] hover:text-[#8B5CF6] transition-colors font-medium`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Care Services
          </Link>
        </div>
      </main>
    </div>
  )
}

// Generate static params for all care services
export async function generateStaticParams() {
  return Object.keys(careServices).map((slug) => ({
    slug: slug,
  }))
}






