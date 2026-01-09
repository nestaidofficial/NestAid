import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, phone, notes, date, time } = await req.json()

    console.log('Received booking request:', { name, email, phone, date, time })

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields', received: { name: !!name, email: !!email, phone: !!phone, date: !!date, time: !!time } },
        { status: 400 }
      )
    }

    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL')
      return NextResponse.json(
        { error: 'Google service account email not configured' },
        { status: 500 }
      )
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing GOOGLE_PRIVATE_KEY')
      return NextResponse.json(
        { error: 'Google private key not configured' },
        { status: 500 }
      )
    }

    if (!process.env.GOOGLE_CALENDAR_ID) {
      console.error('Missing GOOGLE_CALENDAR_ID')
      return NextResponse.json(
        { error: 'Google Calendar ID not configured' },
        { status: 500 }
      )
    }

    // Log service account email (first part only for security)
    const emailPreview = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.split('@')[0] + '@...'
    console.log('Using service account:', emailPreview)
    console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_ID)

    // Initialize Google Auth
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    
    // Verify private key format
    if (!privateKey.includes('BEGIN PRIVATE KEY')) {
      console.error('Invalid private key format - missing BEGIN PRIVATE KEY')
      return NextResponse.json(
        { error: 'Invalid private key format' },
        { status: 500 }
      )
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    // Test authentication first
    let authClient
    try {
      authClient = await auth.getClient()
      // Try to get access token to verify credentials
      const accessToken = await authClient.getAccessToken()
      if (!accessToken) {
        throw new Error('Failed to obtain access token')
      }
      console.log('Authentication successful')
    } catch (authError: any) {
      console.error('Authentication failed:', authError.message)
      return NextResponse.json(
        { 
          error: 'Failed to authenticate with Google',
          details: authError.message,
          hint: 'Please verify GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY match your JSON key file'
        },
        { status: 500 }
      )
    }
    
    // Parse date and time
    let startDateTime: Date
    if (typeof date === 'string') {
      startDateTime = new Date(date)
    } else if (date instanceof Date) {
      startDateTime = new Date(date)
    } else {
      throw new Error('Invalid date format')
    }

    if (isNaN(startDateTime.getTime())) {
      throw new Error('Invalid date: ' + date)
    }

    const [hours, minutes] = time.replace(/(am|pm)/i, '').split(':').map(Number)
    const isPM = time.toLowerCase().includes('pm')
    const adjustedHours = isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours
    
    startDateTime.setHours(adjustedHours, minutes, 0, 0)
    
    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + 15)

    console.log('Parsed dates:', { startDateTime: startDateTime.toISOString(), endDateTime: endDateTime.toISOString() })

    // Create Calendar Event
    const calendar = google.calendar({ version: 'v3', auth: authClient })
    
    const calendarEvent = {
      summary: `Consultation with ${name}`,
      description: `Client Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nNotes: ${notes || 'None'}\n\n---\nThis consultation was scheduled through the NestAid website.`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York',
      },
      // Removed attendees - service accounts can't invite external users without Domain-Wide Delegation
      // The event will be created in your calendar, and you can manually add the client email if needed
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    }

    console.log('Creating calendar event...')
    let calendarResponse
    try {
      calendarResponse = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: calendarEvent,
        // Removed sendUpdates - service accounts can't send email invites without Domain-Wide Delegation
      })
      console.log('Calendar event created:', calendarResponse.data.id)
      console.log('Event link:', calendarResponse.data.htmlLink)
    } catch (calendarError: any) {
      console.error('Calendar API error:', calendarError)
      throw new Error(`Failed to create calendar event: ${calendarError.message || 'Unknown error'}`)
    }

    // Add to Google Sheets if configured
    let sheetResponse = null
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        const sheets = google.sheets({ version: 'v4', auth: authClient })
        
        const sheetData = [
          [
            new Date().toISOString(), // Timestamp
            name,
            email,
            phone,
            startDateTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            time,
            notes || 'N/A',
            calendarResponse.data.htmlLink || 'N/A',
            'Scheduled'
          ]
        ]

        sheetResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet1!A:I', // Adjust based on your sheet structure
          valueInputOption: 'RAW',
          requestBody: {
            values: sheetData,
          },
        })
      } catch (sheetError) {
        console.error('Error writing to sheet:', sheetError)
        // Don't fail the whole request if sheet fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation scheduled successfully',
      calendarEventId: calendarResponse.data.id,
      calendarLink: calendarResponse.data.htmlLink,
    })

  } catch (error: any) {
    console.error('Error scheduling consultation:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { 
        error: 'Failed to schedule consultation', 
        details: error.message,
        // Include more details in development
        ...(process.env.NODE_ENV === 'development' && {
          stack: error.stack,
          fullError: error.toString()
        })
      },
      { status: 500 }
    )
  }
}

