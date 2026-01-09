"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { X, MessageCircle, Home, Send, ChevronDown, Smile } from "lucide-react"
import Image from "next/image"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export function ChatWidget() {
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [showConversation, setShowConversation] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'details'>('date')
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [conversationMessage, setConversationMessage] = useState("")
  const [bookingName, setBookingName] = useState("")
  const [bookingEmail, setBookingEmail] = useState("")
  const [bookingPhone, setBookingPhone] = useState("")
  const [bookingNotes, setBookingNotes] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', text: string }>>([])
  const [threadId, setThreadId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Avoid hydration mismatch by waiting for client render
  useEffect(() => {
    setHydrated(true)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Fetch available time slots when date is selected
  useEffect(() => {
    if (selectedDate && bookingStep === 'time') {
      fetchAvailableSlots()
    }
  }, [selectedDate, bookingStep])

  const fetchAvailableSlots = async () => {
    if (!selectedDate) return
    
    setLoadingSlots(true)
    try {
      const response = await fetch('/api/available-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.availableSlots) {
        setAvailableSlots(data.availableSlots)
      } else {
        console.error('Error fetching slots:', data.error)
        // Fallback to all slots if API fails
        setAvailableSlots(['9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm'])
      }
    } catch (error) {
      console.error('Error fetching available slots:', error)
      // Fallback to all slots if API fails
      setAvailableSlots(['9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm'])
    } finally {
      setLoadingSlots(false)
    }
  }

  if (!hydrated) return null

  // Helper functions for calendar
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek }
  }

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    
    // Only weekdays are available (Mon-Fri)
    const dayOfWeek = checkDate.getDay()
    return checkDate >= today && dayOfWeek >= 1 && dayOfWeek <= 5
  }

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }
  
  // Only show on homepage
  const isHomePage = pathname === "/"

  const handleSendMessage = () => {
    // Handle message sending logic here
    console.log({ email, message })
    // Reset form
    setEmail("")
    setMessage("")
  }

  const handleQuickQuestion = async (question: string) => {
    // Add user question to messages
    setMessages(prev => [...prev, { type: 'user', text: question }])
    // Open conversation view
    setShowConversation(true)
    setShowMessageForm(false)
    setShowBooking(false)
    // Send to AI
    await sendMessageToAI(question)
  }

  const handleOpenConversation = () => {
    // Open conversation view without any pre-filled message
    setMessages([])
    setShowConversation(true)
    setShowMessageForm(false)
    setShowBooking(false)
  }

  const sendMessageToAI = async (userMessage: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          threadId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Add bot response to messages
      if (data.response) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: data.response 
        }])
        
        // Save thread ID for conversation continuity
        if (data.threadId) {
          setThreadId(data.threadId)
        }
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I\'m having trouble connecting right now. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendConversationMessage = async () => {
    if (!conversationMessage.trim() || isLoading) return
    
    const userMessage = conversationMessage
    // Add user message to conversation
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    // Clear input immediately for better UX
    setConversationMessage("")
    // Send to AI
    await sendMessageToAI(userMessage)
  }

  // Don't render if not on homepage
  if (!isHomePage) return null

  return (
    <>
      {/* Backdrop Overlay - Only visible on desktop when chat is open */}
      {isOpen && (
        <div 
          className="hidden md:block fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
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
          className="fixed inset-0 md:bottom-24 md:right-6 md:inset-auto z-50 w-full md:w-[380px] h-full md:h-[580px] md:max-h-[calc(100vh-140px)] md:rounded-[28px] overflow-hidden transition-all duration-300 transform animate-slideUp flex flex-col"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.35), 0 8px 24px rgba(0, 0, 0, 0.12)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          {/* Main Content */}
          {showBooking ? (
            // Booking Flow View
            <div className="bg-white h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <button
                  onClick={() => {
                    if (bookingStep === 'date') {
                      setShowBooking(false)
                      setSelectedDate(null)
                    } else if (bookingStep === 'time') {
                      setBookingStep('date')
                      setSelectedDate(null)
                      setSelectedTime('')
                      setAvailableSlots([])
                    } else {
                      setBookingStep('time')
                      setSelectedTime('')
                    }
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors -ml-1"
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-center flex-1">
                  <p className={`${playfair.className} text-[14px] font-semibold text-gray-900`}>Schedule Consultation</p>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Booking Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {bookingStep === 'date' ? (
                  // Date Selection
                  <div className="p-6 space-y-4">
                    {/* Meeting Info */}
                    <div className="mb-2">
                      <h3 className={`${playfair.className} text-lg font-semibold text-gray-900 mb-3`}>15 Minute Meeting</h3>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            15 min
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Phone call
                          </p>
                        </div>
                        <div className="text-left text-sm space-y-1">
                          <p className="font-medium text-gray-900">Time zone</p>
                          <p className="text-gray-600">Eastern Time - US & Canada</p>
                          <p className="text-gray-500">({new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })})</p>
                        </div>
                      </div>
                    </div>

                    {/* Calendar Header */}
                    <div>
                      <h4 className={`${playfair.className} text-base font-semibold text-gray-900 mb-4`}>Select a Date</h4>
                      
                      {/* Month Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={previousMonth}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Previous month"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="text-base font-medium text-gray-900">
                          {formatMonthYear(currentMonth)}
                        </span>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Next month"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="mb-4">
                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                          {(() => {
                            const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)
                            const days = []
                            
                            // Empty cells before first day
                            for (let i = 0; i < startingDayOfWeek; i++) {
                              days.push(<div key={`empty-${i}`} className="aspect-square" />)
                            }
                            
                            // Days of month
                            for (let day = 1; day <= daysInMonth; day++) {
                              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                              const available = isDateAvailable(date)
                              const selected = isSameDay(selectedDate, date)
                              
                              days.push(
                                <button
                                  key={day}
                                  onClick={() => {
                                    if (available) {
                                      setSelectedDate(date)
                                      setSelectedTime('')
                                      setAvailableSlots([])
                                      setBookingStep('time')
                                    }
                                  }}
                                  disabled={!available}
                                  className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                                    selected
                                      ? 'bg-blue-600 text-white'
                                      : available
                                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                      : 'text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  {day}
                                </button>
                              )
                            }
                            
                            return days
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : bookingStep === 'time' ? (
                  // Time Selection
                  <div className="p-6 space-y-4">
                    {/* Selected Date Display */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-1">Selected Date</p>
                      <p className="text-base font-semibold text-gray-900">
                        {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    <h4 className={`${playfair.className} text-base font-semibold text-gray-900 mb-4`}>Select a Time</h4>

                    {/* Loading State */}
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-sm text-gray-600">Checking available times...</p>
                        </div>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-2">No available time slots for this date.</p>
                        <p className="text-sm text-gray-500">Please select a different date.</p>
                        <button
                          onClick={() => {
                            setBookingStep('date')
                            setSelectedDate(null)
                          }}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Choose Different Date
                        </button>
                      </div>
                    ) : (
                      /* Available Time Slots */
                      <div className="grid grid-cols-2 gap-2">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => {
                              setSelectedTime(time)
                              setBookingStep('details')
                            }}
                            className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              selectedTime === time
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Details Form
                  <div className="p-6 space-y-4">
                    {/* Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                          <Image
                            src="/logosvg.png"
                            alt="NestAid Logo"
                            width={24}
                            height={24}
                            className="object-contain p-0.5"
                            priority
                          />
                        </div>
                        <h3 className="font-semibold text-gray-900">NestAid</h3>
                      </div>
                      <h4 className={`${playfair.className} font-semibold text-gray-900 mt-1`}>15 Minute Meeting</h4>
                      <p className="text-sm text-gray-600">15 min</p>
                      <p className="text-sm text-gray-600">Phone call</p>
                      <p className="text-sm text-gray-900 font-medium mt-2">
                        {selectedTime} - {(() => {
                          if (selectedTime) {
                            const [time, period] = selectedTime.split(/(am|pm)/)
                            const [hours, minutes] = time.split(':').map(Number)
                            const totalMinutes = (hours % 12) * 60 + (period === 'pm' && hours !== 12 ? 12 * 60 : 0) + minutes + 15
                            const endHours = Math.floor(totalMinutes / 60) % 12 || 12
                            const endMinutes = totalMinutes % 60
                            const endPeriod = totalMinutes >= 720 ? 'pm' : 'am'
                            return `${endHours}:${endMinutes.toString().padStart(2, '0')}${endPeriod}`
                          }
                          return ''
                        })()}, {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-500">Eastern Time - US & Canada</p>
                    </div>

                    <h3 className={`${playfair.className} text-sm font-semibold text-gray-900`}>Enter Details</h3>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:border-blue-400 transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:border-blue-400 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:border-blue-400 transition-all"
                        placeholder="(555) 555-5555"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please share anything that will help prepare for our meeting.
                      </label>
                      <textarea
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:border-blue-400 transition-all resize-none"
                        placeholder="Additional notes..."
                      />
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-gray-500">
                      By proceeding, you confirm that you have read and agree to Calendly's Terms of Use and Privacy Notice.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Button - Only show on details step */}
              {bookingStep === 'details' && (
                <div className="p-5 border-t border-gray-200 bg-white flex-shrink-0">
                  <button
                    onClick={async () => {
                      try {
                        // Show loading state (you could add a loading spinner here)
                        if (!selectedDate) {
                          alert('Please select a date')
                          return
                        }

                        const response = await fetch('/api/schedule-consultation', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            name: bookingName,
                            email: bookingEmail,
                            phone: bookingPhone,
                            notes: bookingNotes,
                            date: selectedDate.toISOString(),
                            time: selectedTime,
                          }),
                        })

                        const data = await response.json()

                        if (response.ok) {
                          alert(`✅ Consultation scheduled successfully!\n\nYour consultation has been booked. Our team will contact you at ${bookingEmail} to confirm details.`)
                          setShowBooking(false)
                          setIsOpen(false)
                          // Reset booking form
                          setSelectedDate(null)
                          setSelectedTime('')
                          setAvailableSlots([])
                          setBookingName('')
                          setBookingEmail('')
                          setBookingPhone('')
                          setBookingNotes('')
                          setBookingStep('date')
                        } else {
                          console.error('API Error:', data)
                          const errorMsg = data.details 
                            ? `${data.error}\n\nDetails: ${data.details}` 
                            : data.error || 'Failed to schedule consultation'
                          alert(`❌ Error: ${errorMsg}`)
                        }
                      } catch (error: any) {
                        console.error('Error:', error)
                        alert(`❌ Failed to schedule consultation. Please try again or contact us directly.\n\nError: ${error.message || 'Network error'}`)
                      }
                    }}
                    disabled={!bookingName || !bookingEmail || !bookingPhone}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all"
                  >
                    Schedule Event
                  </button>
                </div>
              )}
            </div>
          ) : showConversation ? (
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
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                    <Image
                      src="/logosvg.png"
                      alt="NestAid Logo"
                      width={40}
                      height={40}
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[15px]">Nessa Agent</h3>
                    <p className="text-[13px] text-gray-500 font-normal">Our team is here to support you.</p>
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
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50 custom-scrollbar">
                <div className="space-y-4">
                  {/* Message from team */}
                  <div className="text-center text-[14px] text-gray-500 mb-6 leading-relaxed">
                    Our team is here to support you—just let us know how we can help.
                  </div>
                  
                  {/* Bot welcome messages */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                      <Image
                        src="/logosvg.png"
                        alt="Nessa"
                        width={32}
                        height={32}
                        className="object-contain p-0.5"
                        priority
                      />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-[14px] text-gray-800">Hi, I'm Nessa 👋</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                      <Image
                        src="/logosvg.png"
                        alt="Nessa"
                        width={32}
                        height={32}
                        className="object-contain p-0.5"
                        priority
                      />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-[14px] text-gray-800">How can I help you today?</p>
                    </div>
                  </div>

                  {/* User messages */}
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                      {msg.type === 'bot' && (
                        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                          <Image
                            src="/logosvg.png"
                            alt="Nessa"
                            width={32}
                            height={32}
                            className="object-contain p-0.5"
                          />
                        </div>
                      )}
                      <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                        msg.type === 'user' 
                          ? 'bg-purple-600 text-white rounded-tr-sm' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                      }`}>
                        <p className="text-[14px] whitespace-pre-wrap">{msg.text || '...'}</p>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                        <Image
                          src="/logosvg.png"
                          alt="Nessa"
                          width={32}
                          height={32}
                          className="object-contain p-0.5"
                        />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-5 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={isLoading ? "Nessa is typing..." : "Type a message..."}
                    value={conversationMessage}
                    onChange={(e) => setConversationMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isLoading) {
                        handleSendConversationMessage()
                      }
                    }}
                    disabled={isLoading}
                    className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleSendConversationMessage}
                    disabled={isLoading || !conversationMessage.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
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
                {/* Header with Logo and Close Button */}
                <div className="flex items-center justify-between mb-8">
                  {/* Logo */}
                  <div className="flex items-center px-4 py-1.5 rounded-full shadow-md" style={{ backgroundColor: '#FDE664' }}>
                    <Image
                      src="/logo.png"
                      alt="NestAid Logo"
                      width={80}
                      height={30}
                      className="h-6 w-auto"
                      priority
                    />
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
          </div>

                {/* Greeting Text */}
                <h2 className={`${playfair.className} text-[32px] font-bold text-white mb-0 leading-[1.1] tracking-tight`}>
                  Hi i am Nessa<span className="inline-block animate-wave">👋</span>
                </h2>
                <p className={`${playfair.className} text-[32px] font-bold text-white leading-[1.1] tracking-tight`}>
                  How can i help?
                </p>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              {/* Send Message Button */}
              <div className="px-6 pt-5 pb-3">
                <button
                  onClick={handleOpenConversation}
                  className="w-full bg-white rounded-[20px] border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all hover:border-gray-300 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-[15px]">
                        Send us a message
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

              {/* Schedule Consultation Button */}
              <div className="px-6 pb-5">
                <button
                  onClick={() => {
                    setShowBooking(true)
                    setShowMessageForm(false)
                    setShowConversation(false)
                    setBookingStep('date')
                    setSelectedDate(null)
                    setSelectedTime('')
                    setAvailableSlots([])
                  }}
                  className="w-full bg-white rounded-[20px] border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all hover:border-gray-300 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-[15px] mb-1">
                        Schedule a free consultation
                      </p>
                      <p className="text-[13px] text-gray-500 font-normal">
                        Book a 15-minute call with us
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                  </div>
                </button>
              </div>

              {/* Quick Questions Section */}
              <div className="px-6 pb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Questions</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What services do you offer?",
                    "Are caregivers background-checked?",
                    "Do you offer hourly care?",
                    "Do you provide transportation?"
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-full border-2 border-purple-300 hover:border-purple-400 transition-all"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              </div>

              {/* Bottom Navigation - Fixed at bottom */}
              <div className="border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-center justify-around py-4 px-4">
                  <button 
                    onClick={() => {
                      setShowMessageForm(false)
                      setShowConversation(false)
                      setShowBooking(false)
                    }}
                    className="flex flex-col items-center gap-1 group transition-all min-w-[60px]"
                  >
                    <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <span className="text-[11px] font-semibold text-purple-600">
                      Home
                    </span>
                  </button>
                  <button 
                    onClick={handleOpenConversation}
                    className="flex flex-col items-center gap-1 group transition-all min-w-[60px]"
                  >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-[11px] font-semibold text-gray-400 group-hover:text-purple-600 transition-colors">
                      Messages
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
                
                <div className="flex-1 flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FDE664' }}>
                    <Image
                      src="/logosvg.png"
                      alt="NestAid Logo"
                      width={32}
                      height={32}
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-semibold text-gray-900">Nessa Agent</p>
                    <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      online
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
              <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
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
                  <div className="relative">
                    <textarea
                      placeholder="Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-purple-400 resize-none pb-14"
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
        
        /* Custom Scrollbar Styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
    </>
  )
}

