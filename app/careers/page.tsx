import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CheckCircle, MapPin, Briefcase, Users, MessageSquare, Award } from "lucide-react"

export default function CareersPage() {
  const jobOpenings = [
    {
      category: "MARKETING",
      jobs: [
        {
          title: "UX/UI Designer",
          details: "Hybrid | Berlin (Germany, Berlin, Berlin)",
        },
        {
          title: "Marketing Intern",
          details: "On-site | Boston - HQ (United States, Massachusetts, Boston)",
        },
      ],
    },
    {
      category: "SALES & CUSTOMER SUCCESS",
      jobs: [
        {
          title: "Customer Success Specialist - Chicago, IL",
          details: "On-site | Chicago, IL (United States, Illinois, Chicago)",
        },
        {
          title: "Sales Manager",
          details: "Hybrid | Boston - HQ (United States, Massachusetts, Boston)",
        },
        {
          title: "Customer Success Specialist - Columbus, OH",
          details: "On-site | Columbus, OH (United States, Ohio, Columbus)",
        },
        {
          title: "Customer Success Specialist - Arlington, VA",
          details: "On-site | Arlington, VA (United States, Virginia, Arlington)",
        },
        {
          title: "Business Development Sales Specialist (Spanish Speaking)",
          details: "Hybrid | Boston - HQ (United States, Massachusetts, Boston)",
        },
      ],
    },
    {
      category: "FINANCE",
      jobs: [
        {
          title: "VP Finance – U.S. Operations",
          details: "On-site | Boston - HQ (United States, Massachusetts, Boston)",
        },
      ],
    },
    {
      category: "CLINICAL",
      jobs: [
        {
          title: "Registered Nurse – Chicago, IL",
          details: "Hybrid | Chicago, IL (United States, Illinois, Chicago)",
        },
        {
          title: "Licensed Social Worker",
          details: "On-site | Boston - HQ (United States, Massachusetts, Boston)",
        },
        {
          title: "Registered Nurse Ohio",
          details: "On-site | Columbus, OH (United States, Ohio, Columbus)",
        },
        {
          title: "Registered Nurse Boston",
          details: "On-site | Boston - HQ (United States, Massachusetts, Boston)",
        },
      ],
    },
    {
      category: "OTHER OPPORTUNITIES",
      jobs: [
        {
          title: "Data Analyst",
          details: "Hybrid | Boston - HQ (United States, Massachusetts, Boston)",
        },
      ],
    },
  ]

  const benefits = [
    "Mentor and coach families in compassionate home care",
    "Contribute to a company making a difference in people's lives",
    "Working hours during office hours",
    "Independence: We have a flat hierarchy",
    "Innovation: We seek out new technologies",
    "Very good pay: Receive an attractive salary",
  ]

  const applicationSteps = [
    {
      icon: <Users className="w-8 h-8 text-gray-700" />,
      title: "1. First Meeting",
      description:
        "After we have reviewed your application, we'll set up an initial video call for you and someone from our HR team. This allows us to get to know each other and ensure that you get a full briefing about the duties involved in the open position. If your ideas and ours align, the process continues!",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-gray-700" />,
      title: "2. Technical Interview",
      description:
        "In the next step, we'll seek to discover how you will fit in on a personal and professional level with your future colleagues. For this purpose, a hypothetical case may be part of the process. Such cases involve interviews and reviews with experienced colleagues from the relevant department.",
    },
    {
      icon: <Award className="w-8 h-8 text-gray-700" />,
      title: "3. Offer",
      description:
        "We make you an offer that reflects not only the value you bring to our company but also our commitment to your professional growth and satisfaction. Once the offer is extended, we collaborate closely with you to decide on a start date that is mutually convenient, ensuring a smooth and welcoming transition into our team.",
    },
  ]

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-100/50 rounded-full blur-2xl"></div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Become part of our team and make a difference!
            </h1>
            <p className="text-lg text-gray-600 mb-6">Working for Maya Care is much more than just a job:</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              It's exciting, creative, and driven by the common humanity we share with our loved ones, patients, and
              fellow workers. You too can do pioneering work and revolutionize the healthcare system.
            </p>
            <Button className="bg-[#D95A8A] text-white hover:bg-[#c74d7b] rounded-full px-8 py-6 text-base font-semibold">
              Open Positions
            </Button>
          </div>
          <div className="relative">
            <div className="absolute top-0 -right-10 w-40 h-40 bg-pink-100/50 rounded-full blur-3xl"></div>
            <Image
              src="/placeholder.svg?height=400&width=570&text=Maya+Care+Team"
              alt="Maya Care team photo"
              width={570}
              height={400}
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Working at Maya Care Section */}
      <section className="py-20 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500&text=Happy+Employee"
                alt="A smiling employee"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-green-700/80 backdrop-blur-sm text-white p-6 rounded-xl">
                <blockquote className="text-xl font-medium">
                  "The combination of skilled nursing and consulting is something I really like. I wouldn't want to do
                  anything else!"
                </blockquote>
              </div>
            </div>
            <div className="pl-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Working at Maya Care</h2>
              <ul className="space-y-5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-[#D95A8A] mr-4 flex-shrink-0" />
                    <span className="text-gray-600 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 bg-[#F5F1E8]">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Open Positions</h2>
            <p className="text-gray-600 mb-12 text-lg">Explore rewarding career opportunities at Maya Care</p>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <select className="w-full h-14 px-6 bg-white border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D95A8A] appearance-none cursor-pointer text-base">
                <option value="">Position</option>
                <option value="designer">UX/UI Designer</option>
                <option value="intern">Marketing Intern</option>
                <option value="customer-success">Customer Success Specialist</option>
                <option value="sales-manager">Sales Manager</option>
                <option value="vp-finance">VP Finance</option>
                <option value="nurse">Registered Nurse</option>
                <option value="social-worker">Licensed Social Worker</option>
                <option value="data-analyst">Data Analyst</option>
              </select>

              <select className="w-full h-14 px-6 bg-white border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D95A8A] appearance-none cursor-pointer text-base">
                <option value="">Department</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales & Customer Success</option>
                <option value="finance">Finance</option>
                <option value="clinical">Clinical</option>
                <option value="other">Other Opportunities</option>
              </select>

              <select className="w-full h-14 px-6 bg-white border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D95A8A] appearance-none cursor-pointer text-base">
                <option value="">Location</option>
                <option value="boston">Boston, MA</option>
                <option value="chicago">Chicago, IL</option>
                <option value="columbus">Columbus, OH</option>
                <option value="arlington">Arlington, VA</option>
                <option value="berlin">Berlin, Germany</option>
              </select>
            </div>

            {/* Job Listings */}
            <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200/50">
              {jobOpenings.map((category) => (
                <div key={category.category} className="mb-12 last:mb-0">
                  <h3 className="text-sm font-bold text-green-700 mb-8 uppercase tracking-wider">
                    {category.category}
                  </h3>
                  <div className="space-y-8">
                    {category.jobs.map((job) => (
                      <div key={job.title} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">{job.title}</h4>
                        <div className="flex items-center text-gray-500 text-base space-x-6">
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 mr-3" />
                            <span>{job.details.split("|")[0]?.trim()}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-3" />
                            <span>{job.details.split("|")[1]?.trim()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-20 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Stand For</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Regardless of difficulties that arise, we reinforce each other's optimism and work together as a team to
                find and implement solutions. At Maya Care every contribution is appreciated. And though we work at high
                speed, we always manage to meet our quality standards. We live innovation in a dynamic working
                environment.
              </p>
            </div>
            <Image
              src="/placeholder.svg?height=500&width=500&text=Company+Values"
              alt="A person in deep thought, representing company values"
              width={500}
              height={500}
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Your Application Process</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {applicationSteps.map((step) => (
              <div key={step.title} className="bg-[#EBF5EE] rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button className="bg-[#D95A8A] text-white hover:bg-[#c74d7b] rounded-full px-8 py-6 text-base font-semibold">
              Open Positions
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
