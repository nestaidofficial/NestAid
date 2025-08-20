"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { GetStartedModal } from "./get-started-modal"

export function MobileGetStartedFab() {
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false)
  const [chatBotOpen, setChatBotOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only show buttons when scrolling up (and user has scrolled at least a bit)
      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Handle escape key to close chatbot and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && chatBotOpen) {
        setChatBotOpen(false)
      }
    }

    if (chatBotOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when chatbot is open
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'unset'
      }
    }
  }, [chatBotOpen])

  // Only show on homepage and not on admin pages
  if (isAdminPage || !isHomePage) return null

  return (
    <>
      {/* Desktop Chat Button - Bottom Right */}
      {!getStartedModalOpen && (
        <div className="hidden md:block fixed bottom-6 right-6 z-[60]">
          <Button
            onClick={() => setChatBotOpen(true)}
            className="rounded-full p-6 shadow-lg text-gray-800 hover:opacity-90 transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#D9FB74' }}
          >
            <MessageCircle className="w-10 h-10" />
          </Button>
        </div>
      )}

      {/* Mobile Bottom Buttons Container - Transparent */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 transition-transform duration-300 ease-in-out ${
          isVisible && !getStartedModalOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center gap-4">
          {/* Get Started Button */}
          <Button
            onClick={() => setGetStartedModalOpen(true)}
            className="rounded-full font-semibold px-6 py-5 text-lg transition-colors shadow-lg text-gray-800 hover:opacity-90"
            style={{ backgroundColor: '#D9FB74', minWidth: '240px' }}
          >
            Get Started
          </Button>

          {/* Chat Button */}
          <Button
            onClick={() => setChatBotOpen(true)}
            className="rounded-full px-5 py-5 transition-colors shadow-lg text-white hover:opacity-90 text-lg font-semibold flex items-center gap-2"
            style={{ backgroundColor: '#16803C', minWidth: '100px' }}
          >
            <MessageCircle className="w-6 h-6" />
            Chat
          </Button>
        </div>
      </div>

      {/* Chat Bot Window - Responsive */}
      {chatBotOpen && (
        <div className={`fixed z-[100] transition-all duration-300 ease-in-out flex flex-col mobile-chat-window ${
          chatBotOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } md:bottom-20 md:right-6 md:w-96 md:h-[600px] md:rounded-2xl md:shadow-2xl inset-0 md:inset-auto`} 
        style={{ 
          backgroundColor: '#B8C5A3'
        }}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 md:rounded-t-2xl" style={{ backgroundColor: '#B8C5A3' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" 
                  alt="Rebecca AI" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Rebecca AI</h2>
              </div>
            </div>
            <Button
              onClick={() => setChatBotOpen(false)}
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto md:h-80 min-h-0" style={{ backgroundColor: '#E8F0D8' }}>
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="bg-white/90 rounded-2xl p-4 max-w-[85%] shadow-sm">
                <p className="text-gray-800 leading-relaxed">
                  Hi! I'm Healthcare AI Chatbot, your medical assistant. I'm here to provide reliable health information, symptom checks, and medication guidance. How can I assist you today?
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat Input Area */}
          <div className="p-4 md:rounded-b-2xl mobile-chat-input" style={{ 
            backgroundColor: '#E8F0D8'
          }}>
            <div className="bg-white/90 rounded-2xl p-3 mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
                />
                <Button
                  className="rounded-full p-3 min-w-[48px] h-12"
                  style={{ backgroundColor: '#4A5D3A' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </div>
            </div>
            
            {/* Bottom Navigation */}
            <div className="flex justify-center gap-16 pb-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" style={{ color: '#4A5D3A' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#4A5D3A' }}>Chat</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9CA3AF' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">Voice</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Get Started Modal */}
      <GetStartedModal 
        isOpen={getStartedModalOpen} 
        onClose={() => setGetStartedModalOpen(false)} 
      />
    </>
  )
} 