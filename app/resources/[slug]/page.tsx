import Image from "next/image"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from "@/app/metadata"
import { generateArticleSchema } from "@/lib/seo/structured-data"
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

// Blog posts data with full content
const blogPosts: Record<string, {
  id: string
  category: string
  title: string
  description: string
  image: string
  content: Array<{ type: 'paragraph' | 'heading' | 'list', content: string | string[] }>
}> = {
  "physical-activities": {
    id: "physical-activities",
    category: "Wellness",
    title: "Physical Activities For Older Adults",
    description: "Light exercises like walking or stretching help seniors stay strong, balanced, and independent.",
    image: "/images/findjobs/physical_activities.png",
    content: [
      {
        type: "paragraph",
        content: "Maintaining physical activity becomes increasingly important as we age. Regular exercise helps seniors maintain their independence, improve balance, and enhance overall quality of life."
      },
      {
        type: "heading",
        content: "Benefits of Physical Activity for Seniors"
      },
      {
        type: "paragraph",
        content: "Physical activities offer numerous benefits for older adults, including improved cardiovascular health, stronger bones and muscles, better balance and coordination, and enhanced mental well-being. Even light exercises can make a significant difference in daily life."
      },
      {
        type: "heading",
        content: "Recommended Activities"
      },
      {
        type: "list",
        content: [
          "Walking - A simple yet effective way to stay active. Aim for 20-30 minutes daily.",
          "Stretching - Helps maintain flexibility and reduces the risk of falls.",
          "Chair exercises - Perfect for those with limited mobility.",
          "Water aerobics - Low-impact exercise that's gentle on joints.",
          "Tai Chi - Improves balance and promotes relaxation."
        ]
      },
      {
        type: "paragraph",
        content: "Before starting any new exercise program, it's important to consult with a healthcare provider to ensure the activities are safe and appropriate for your individual health condition."
      },
      {
        type: "heading",
        content: "Getting Started Safely"
      },
      {
        type: "paragraph",
        content: "Start slowly and gradually increase intensity. Listen to your body and rest when needed. Stay hydrated, wear appropriate footwear, and consider exercising with a friend or caregiver for added safety and motivation."
      }
    ]
  },
  "social-engagement": {
    id: "social-engagement",
    category: "Health",
    title: "The Importance Of Social Engagement For Seniors",
    description: "An informative piece on the importance of social engagement for seniors, highlighting benefits for mental health and community building.",
    image: "/images/group.jpg",
    content: [
      {
        type: "paragraph",
        content: "Social engagement plays a crucial role in the overall health and well-being of seniors. Meaningful connections and regular interactions with others can significantly impact mental health, cognitive function, and quality of life."
      },
      {
        type: "heading",
        content: "Why Social Connections Matter"
      },
      {
        type: "paragraph",
        content: "As we age, maintaining social connections becomes more challenging due to retirement, mobility issues, or the loss of loved ones. However, staying socially engaged is essential for combating loneliness, reducing the risk of depression, and maintaining cognitive health."
      },
      {
        type: "heading",
        content: "Benefits of Social Engagement"
      },
      {
        type: "list",
        content: [
          "Reduced risk of depression and anxiety",
          "Improved cognitive function and memory",
          "Lower blood pressure and reduced stress",
          "Stronger immune system",
          "Increased sense of purpose and belonging",
          "Better overall quality of life"
        ]
      },
      {
        type: "heading",
        content: "Ways to Stay Socially Connected"
      },
      {
        type: "paragraph",
        content: "There are many ways seniors can maintain social connections. Joining community centers, participating in group activities, volunteering, attending religious services, or simply having regular phone calls with family and friends can make a significant difference."
      },
      {
        type: "paragraph",
        content: "Technology also offers new opportunities for connection through video calls, social media, and online communities. Don't hesitate to ask family members for help learning these tools."
      },
      {
        type: "heading",
        content: "Building a Supportive Community"
      },
      {
        type: "paragraph",
        content: "At NestAid, we understand the importance of social engagement. Our caregivers not only provide physical assistance but also offer companionship, conversation, and emotional support to help seniors maintain meaningful connections and combat isolation."
      }
    ]
  },
  "right-caregiver": {
    id: "right-caregiver",
    category: "Memory",
    title: "Choosing The Right Caregiver For Seniors",
    description: "A guide for families on choosing the right caregiver for seniors, focusing on assessing needs, qualifications, and compatibility.",
    image: "/images/findjobs/socialwithcaregiver.png",
    content: [
      {
        type: "paragraph",
        content: "Choosing the right caregiver for your loved one is one of the most important decisions you'll make. The right match can significantly improve your loved one's quality of life and provide peace of mind for your entire family."
      },
      {
        type: "heading",
        content: "Assessing Your Loved One's Needs"
      },
      {
        type: "paragraph",
        content: "Before beginning your search, take time to thoroughly assess your loved one's specific needs. Consider their physical health, cognitive abilities, mobility, medication requirements, and personal preferences."
      },
      {
        type: "list",
        content: [
          "Medical needs and health conditions",
          "Assistance with daily activities (bathing, dressing, eating)",
          "Mobility support and fall prevention",
          "Medication management",
          "Companionship and emotional support",
          "Specialized care for conditions like dementia or Parkinson's"
        ]
      },
      {
        type: "heading",
        content: "Essential Qualifications to Look For"
      },
      {
        type: "paragraph",
        content: "When evaluating potential caregivers, consider their training, experience, certifications, and background. Look for caregivers who have experience with your loved one's specific conditions and who demonstrate genuine compassion and professionalism."
      },
      {
        type: "heading",
        content: "Evaluating Compatibility"
      },
      {
        type: "paragraph",
        content: "Skills and qualifications are important, but personality compatibility is equally crucial. Your loved one should feel comfortable and safe with their caregiver. Consider arranging trial visits to assess how well they interact."
      },
      {
        type: "heading",
        content: "Questions to Ask Potential Caregivers"
      },
      {
        type: "list",
        content: [
          "What is your experience with seniors who have similar needs?",
          "Do you have relevant certifications or training?",
          "Can you provide references from previous clients?",
          "How do you handle emergencies?",
          "What is your availability and flexibility?",
          "How do you communicate with family members?"
        ]
      },
      {
        type: "heading",
        content: "Trust NestAid to Find Your Perfect Match"
      },
      {
        type: "paragraph",
        content: "At NestAid, we carefully screen and match caregivers with families based on needs, preferences, and compatibility. Our rigorous vetting process ensures you'll work with qualified, compassionate professionals who are truly dedicated to your loved one's well-being."
      }
    ]
  },
  "companionship": {
    id: "companionship",
    category: "Care Services",
    title: "Companionship Care",
    description: "Meaningful companionship that brightens each day with care. Our companion care services provide emotional support, social engagement, and a friendly presence.",
    image: "/images/group.jpg",
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
    category: "Care Services",
    title: "Daily Living Assistance",
    description: "Tailored assistance to make daily life easier and more fulfilling. Comprehensive support with activities of daily living.",
    image: "/images/adult-care.jpg",
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
    category: "Care Services",
    title: "Special Needs Support",
    description: "Reliable support designed to nurture comfort and independence. Specialized services for individuals with disabilities or special requirements.",
    image: "/images/senior-care.jpg",
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
    category: "Care Services",
    title: "24/7 Live-In Caregiving",
    description: "Dedicated caregivers offering daily support with warmth and respect. Continuous support and supervision around the clock.",
    image: "/images/pet-care.jpg",
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
    category: "Care Services",
    title: "Care Planning & Guidance",
    description: "Compassionate guidance for seniors and families at every step. Expert help navigating the complexities of senior care.",
    image: "/images/adult-care.jpg",
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
    category: "Care Services",
    title: "Wellness & Therapy",
    description: "Personalized therapies to restore strength, balance, and peace. Holistic approaches to senior health and well-being.",
    image: "/images/senior-care.jpg",
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

const baseUrl = 'https://www.nestaid.us'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return {}
  }

  const keywords = [
    post.category.toLowerCase(),
    'senior care resources',
    'elderly care information',
    'caregiving tips',
    'Massachusetts',
    post.title.toLowerCase(),
  ]

  return generatePageMetadata({
    title: `${post.title} | NestAid Resources`,
    description: post.description,
    keywords,
    canonical: `${baseUrl}/resources/${slug}`,
    image: post.image,
  })
}

export default async function ResourcePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  // Published date (using current date as fallback since it's not in data)
  const publishedDate = new Date().toISOString()
  
  // Generate Article schema
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      name: 'NestAid',
    },
    publisher: {
      name: 'NestAid',
      logo: `${baseUrl}/logo.png`,
    },
  })

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Resources', url: `${baseUrl}/resources` },
    { name: post.title, url: `${baseUrl}/resources/${slug}` },
  ])

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="container mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.1] mb-6`}>
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto">
          <div className={`${inter.className} prose prose-lg max-w-none`}>
            {post.content.map((block, index) => {
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

          {/* Category Badge */}
          <div className="mt-12 pt-8 border-t border-[#E6DED0]">
            <span className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-[#1A5463]" style={{ backgroundColor: '#E6F0EA' }}>
              {post.category}
            </span>
          </div>
        </article>
      </main>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

