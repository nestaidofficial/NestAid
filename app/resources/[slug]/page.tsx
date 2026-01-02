import Image from "next/image"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"
import { notFound } from "next/navigation"

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
  author: string
  publishedDate: string
  content: Array<{ type: 'paragraph' | 'heading' | 'list', content: string | string[] }>
}> = {
  "physical-activities": {
    id: "physical-activities",
    category: "Wellness",
    title: "Physical Activities For Older Adults",
    description: "Light exercises like walking or stretching help seniors stay strong, balanced, and independent.",
    image: "/images/adult-care.jpg",
    author: "Emily Williams",
    publishedDate: "August 7, 2025",
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
    author: "Emily Williams",
    publishedDate: "August 7, 2025",
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
    image: "/images/senior-care.jpg",
    author: "Emily Williams",
    publishedDate: "August 7, 2025",
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
  }
}

export default async function ResourcePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-[#FCF5EB] min-h-screen">
      <main className="container mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-12 md:pb-16">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className={`${playfair.className} text-[36px] md:text-[48px] lg:text-[56px] text-[#1A5463] leading-[1.1] mb-6`}>
            {post.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/images/group-Photoroom.png"
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
            <div className={`${inter.className} text-left`}>
              <p className="font-semibold text-[#1A5463]">{post.author}</p>
              <p className="text-sm text-[#446056]">Published Date : {post.publishedDate}</p>
            </div>
          </div>
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

