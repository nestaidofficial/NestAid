import Image from "next/image"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const blogArticles = [
  {
    id: "physical-activities",
    category: "Wellness",
    title: "Physical Activities For Older Adults",
    description: "Light exercises like walking or stretching help seniors stay strong, balanced, and independent.",
    image: "/images/findjobs/physical_activities.png"
  },
  {
    id: "social-engagement",
    category: "Health",
    title: "The Importance Of Social Engagement For Seniors",
    description: "Explore how meaningful conversations and community events uplift mental health and reduce loneliness.",
    image: "/images/group.jpg"
  },
  {
    id: "right-caregiver",
    category: "Memory",
    title: "Choosing The Right Caregiver For Seniors",
    description: "Guidance for families on selecting caregivers who align with needs, qualifications, and personalities.",
    image: "/images/findjobs/socialwithcaregiver.png"
  },
  {
    id: "companionship",
    category: "Care Services",
    title: "Companionship Care",
    description: "Meaningful companionship that brightens each day with care. Our companion care services provide emotional support and social engagement.",
    image: "/images/resources/companion1.png"
  },
  {
    id: "assistance",
    category: "Care Services",
    title: "Daily Living Assistance",
    description: "Tailored assistance to make daily life easier and more fulfilling. Comprehensive support with activities of daily living.",
    image: "/images/resources/Dailyliving.png"
  },
  {
    id: "support",
    category: "Care Services",
    title: "Special Needs Support",
    description: "Reliable support designed to nurture comfort and independence. Specialized services for individuals with disabilities or special requirements.",
    image: "/images/resources/specsupport.png"
  },
  {
    id: "caregiving",
    category: "Care Services",
    title: "24/7 Live-In Caregiving",
    description: "Dedicated caregivers offering daily support with warmth and respect. Continuous support and supervision around the clock.",
    image: "/images/resources/livin.png"
  },
  {
    id: "guidance",
    category: "Care Services",
    title: "Care Planning & Guidance",
    description: "Compassionate guidance for seniors and families at every step. Expert help navigating the complexities of senior care.",
    image: "/images/resources/careplanning.png"
  }
]

export default function ResourcesPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#8B5CF6] text-lg font-semibold">✺</span>
            <p className={`${inter.className} text-xs md:text-sm uppercase tracking-[0.35em] text-[#1A5463]`}>
              NestAid Resources
            </p>
          </div>
          <h1 className={`${playfair.className} text-[40px] md:text-[56px] lg:text-[64px] text-[#1A5463] leading-[1.1] mb-6`}>
            Stories That Inspire Confident Care
          </h1>
          <p className={`${inter.className} text-base md:text-lg text-[#1A5463] leading-relaxed mb-10`}>
            Explore practical advice, uplifting stories, and expert guidance curated for families supporting their loved ones every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogArticles.map((article) => (
            <Link
              key={article.id}
              href={`/resources/${article.id}`}
              className="bg-white rounded-[32px] shadow-lg overflow-hidden border border-[#ECE7DA] flex flex-col h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col gap-4 flex-grow">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-[#1A5463] w-fit" style={{ backgroundColor: '#E6F0EA' }}>
                  {article.category}
                </span>
                <h2 className={`${playfair.className} text-[24px] lg:text-[28px] text-[#1A5463] leading-tight group-hover:text-[#8B5CF6] transition-colors`}>
                  {article.title}
                </h2>
                <p className={`${inter.className} text-[#446056] text-base leading-relaxed`}>
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

