"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { X, MessageCircle, Home, Send, Search, ChevronDown, Smile } from "lucide-react"
import Image from "next/image"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [showConversation, setShowConversation] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [conversationMessage, setConversationMessage] = useState("")
  const pathname = usePathname()
  
  // Only show on homepage
  const isHomePage = pathname === "/"

  const handleSendMessage = () => {
    // Handle message sending logic here
    console.log({ email, message })
    // Reset form
    setEmail("")
    setMessage("")
  }

  // Don't render if not on homepage
  if (!isHomePage) return null

  return (
    <>
      {/* Backdrop Overlay - Only visible on mobile when chat is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center  active:scale-95 relative group"
          style={{
            backgroundColor: "#8B5CF6",
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          aria-label="Open chat"
        >
          {isOpen ? (
            <ChevronDown className="w-7 h-7 md:w-8 md:h-8 text-white transition-transform group-hover:translate-y-0.5" />
          ) : (
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 36 36" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-110"
            >
              {/* Chat bubble with rounded rectangle */}
              <rect 
                x="6" 
                y="8" 
                width="24" 
                height="18" 
                rx="5" 
                fill="white"
              />
              {/* Smile curve at bottom of bubble */}
              <path 
                d="M 12 22 Q 18 25, 24 22" 
                stroke="#8B5CF6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none"
              />
            </svg>
          )}
         
        </button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[380px] md:w-[380px] h-[580px] max-h-[calc(100vh-140px)] rounded-[28px] overflow-hidden transition-all duration-300 transform animate-slideUp flex flex-col"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.35), 0 8px 24px rgba(0, 0, 0, 0.12)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          {/* Main Content */}
          {showConversation ? (
            // Conversation View
            <div className="bg-white h-full flex flex-col">
          {/* Header */}
              <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3 flex-shrink-0 bg-white">
                <button
                  onClick={() => setShowConversation(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors -ml-1"
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-[15px]">
                    N
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[15px]">NestAid Team</h3>
                    <p className="text-[13px] text-gray-500 font-normal">The team can also help</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* Message from team */}
                  <div className="text-center text-[14px] text-gray-500 mb-6 leading-relaxed">
                    Our team are here to lend a hand,<br />
                    just let us know how we can help.
                  </div>
                  
                  {/* Bot message */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      N
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-[14px] text-gray-800">Welcome! 👋 How can I lend a hand?</p>
                    </div>
                  </div>

                  {/* Bot follow-up */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      N
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-[14px] text-gray-800">Great! Can we please grab a few details from you quickly? We'll respond here and by email.</p>
                      <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
                        <p className="text-[13px] font-medium text-gray-700 mb-2">Name</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button className="w-9 h-9 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-5 border-t border-gray-200 bg-white flex-shrink-0 space-y-3">
                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Chat with our team
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={conversationMessage}
                    onChange={(e) => setConversationMessage(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 transition-all flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ) : !showMessageForm ? (
            <div className="bg-white relative flex flex-col h-full">
              {/* Greeting Section - On Purple Background - Fixed at top */}
              <div className="relative px-6 pt-6 pb-8 text-left flex-shrink-0" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)" }}>
                {/* Header with Logo and Avatars */}
                <div className="flex items-center justify-between mb-8">
                  {/* Logo */}
                  <div className="flex items-center bg-white px-4 py-1.5 rounded-full shadow-md">
                    <Image
                      src="/logo.png"
                      alt="NestAid Logo"
                      width={80}
                      height={30}
                      className="h-6 w-auto"
                    />
                  </div>
                  
                  {/* Team Avatars and Close Button */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2.5">
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Team member"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Team member"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Team member"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
                      className="text-white/70 hover:text-white transition-colors ml-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
                  </div>
          </div>

                {/* Greeting Text */}
                <h2 className="text-[32px] font-bold text-white mb-0 leading-[1.1] tracking-tight">
                  Hi there <span className="inline-block animate-wave">👋</span>
                </h2>
                <p className="text-[32px] font-bold text-white leading-[1.1] tracking-tight">
                  How can we help?
                </p>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto bg-white">
              {/* Recent Message */}
                <div className="px-6 pt-5 pb-3">
                <div 
                  onClick={() => setShowConversation(true)}
                  className="bg-white rounded-[20px] border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                >
                  <p className="text-[11px] font-semibold text-gray-500 tracking-wide mb-3.5">
                    Recent message
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                          <Image
                            src="/placeholder-user.jpg"
                            alt="Team"
                            width={36}
                            height={36}
                            className="object-cover"
                          />
                        </div>
                        <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                          <Image
                            src="/placeholder-user.jpg"
                            alt="Team"
                            width={36}
                            height={36}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-[15px] mb-1">
                          Asked for Name
                        </p>
                        <p className="text-[13px] text-gray-500 font-normal">nestaid • 9h</p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Send Message Button */}
              <div className="px-6 pb-3">
                <button
                  onClick={() => {
                    setShowMessageForm(true)
                    setShowConversation(false)
                  }}
                  className="w-full bg-white rounded-[20px] border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all hover:border-gray-300 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-[15px] mb-1">
                        Send us a message
                      </p>
                      <p className="text-[13px] text-gray-500 font-normal">
                        We typically reply within 2 hours
                      </p>
                    </div>
                      <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                  </div>
                </button>
              </div>

              {/* Search for Help */}
              <div className="px-6 pb-3">
                <button className="w-full bg-white rounded-[20px] border border-gray-200 p-4 hover:bg-gray-50 hover:border-gray-300 transition-all text-left group">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-700 text-[15px]">
                      Search for help
                    </p>
                    <Search className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </button>
              </div>

              {/* Additional Menu Items */}
              <div className="px-6 pb-5 space-y-1">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                  <span className="text-[14px] text-gray-700 font-normal">Set up services</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                  <span className="text-[14px] text-gray-700 font-normal">Make changes to an invoice</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                  <span className="text-[14px] text-gray-700 font-normal">Set up an email signature</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </div>

              {/* Bottom Navigation - Fixed at bottom */}
              <div className="border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-center justify-around py-4 px-4">
                  <button className="flex flex-col items-center gap-1 group transition-all min-w-[60px]">
                    <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <span className="text-[11px] font-semibold text-purple-600">
                      Home
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-1 group transition-all min-w-[60px]">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-[11px] font-semibold text-gray-400 group-hover:text-purple-600 transition-colors">
                      Messages
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-1 group transition-all min-w-[60px]">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[11px] font-semibold text-gray-400 group-hover:text-purple-600 transition-colors">
                      Help
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Message Form View
            <div className="bg-white h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <button
                  onClick={() => setShowMessageForm(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors -ml-1"
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src="/placeholder-user.jpg" alt="Team" width={32} height={32} className="object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src="/placeholder-user.jpg" alt="Team" width={32} height={32} className="object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src="/placeholder-user.jpg" alt="Team" width={32} height={32} className="object-cover" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-semibold text-gray-900">nestaid</p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Within 2 hours
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Helper Text */}
                <div className="px-6 pt-8 pb-6 text-center">
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Our team are here to lend a hand,<br />
                    just let us know how we can help.
                  </p>
              </div>

              {/* Input Fields */}
                <div className="px-6 pb-6 flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl text-gray-900 placeholder-gray-400 text-[14px] focus:outline-none focus:border-purple-400 transition-all"
                  />
                  <div className="relative">
                    <textarea
                      placeholder="Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl text-gray-900 placeholder-gray-400 text-[14px] focus:outline-none focus:border-purple-400 resize-none pb-14"
                    />
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button 
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1.5"
                        aria-label="Add emoji"
                      >
                          <Smile className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                          className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }
        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
          display: inline-block;
          transform-origin: 70% 70%;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s backwards;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  )
}

