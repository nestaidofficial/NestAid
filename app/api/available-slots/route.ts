import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { date } = await req.json()

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      )
    }

    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      return NextResponse.json(
        { error: 'Google Calendar not configured' },
        { status: 500 }
      )
    }

    // Initialize Google Auth
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })

    const authClient = await auth.getClient()
    const calendar = google.calendar({ version: 'v3', auth: authClient })

    // Parse the date and set time range for the day (9am to 6pm)
    const selectedDate = new Date(date)
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const day = selectedDate.getDate()

    // Start of day (9:00 AM)
    const startOfDay = new Date(year, month, day, 9, 0, 0)
    // End of day (6:00 PM)
    const endOfDay = new Date(year, month, day, 18, 0, 0)

    console.log('Checking available slots for:', startOfDay.toISOString(), 'to', endOfDay.toISOString())

    // Fetch existing events for this date
    const events = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    // Generate all possible time slots (9am to 5:30pm, 30-minute intervals)
    const allSlots: string[] = []
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour >= 12 ? 'pm' : 'am'
        let displayHour = hour
        if (hour > 12) {
          displayHour = hour - 12
        } else if (hour === 12) {
          displayHour = 12
        }
        allSlots.push(`${displayHour}:${minute.toString().padStart(2, '0')}${period}`)
      }
    }

    // Convert booked events to time slots (15-minute meetings)
    const bookedSlots = new Set<string>()
    
    if (events.data.items) {
      for (const event of events.data.items) {
        if (!event.start?.dateTime) continue

        const eventStart = new Date(event.start.dateTime)
        const eventEnd = event.end?.dateTime ? new Date(event.end.dateTime) : new Date(eventStart.getTime() + 15 * 60 * 1000)

        // Mark each 30-minute slot that overlaps with this event as booked
        const eventStartMinutes = eventStart.getHours() * 60 + eventStart.getMinutes()
        const eventEndMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes()

        // Check all 30-minute slots and mark overlapping ones as booked
        for (let slotMinutes = 9 * 60; slotMinutes < 18 * 60; slotMinutes += 30) {
          const slotEndMinutes = slotMinutes + 30
          
          // If slot overlaps with event, mark it as booked
          if (slotMinutes < eventEndMinutes && slotEndMinutes > eventStartMinutes) {
            const slotHour = Math.floor(slotMinutes / 60)
            const slotMin = slotMinutes % 60
            const period = slotHour >= 12 ? 'pm' : 'am'
            let displayHour = slotHour
            if (slotHour > 12) {
              displayHour = slotHour - 12
            } else if (slotHour === 12) {
              displayHour = 12
            }
            const slotString = `${displayHour}:${slotMin.toString().padStart(2, '0')}${period}`
            bookedSlots.add(slotString)
          }
        }
      }
    }

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.has(slot))

    return NextResponse.json({
      availableSlots,
      bookedSlots: Array.from(bookedSlots),
      totalSlots: allSlots.length,
      availableCount: availableSlots.length,
    })

  } catch (error: any) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch available slots',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

