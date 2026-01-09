import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, phone, notes, date, time } = await req.json()

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check for required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Google service account not configured' },
        { status: 500 }
      )
    }

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    const authClient = await auth.getClient()
    
    // Parse date and time
    const [hours, minutes] = time.replace(/(am|pm)/i, '').split(':').map(Number)
    const isPM = time.toLowerCase().includes('pm')
    const adjustedHours = isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours
    
    const startDateTime = new Date(date)
    startDateTime.setHours(adjustedHours, minutes, 0, 0)
    
    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + 15)

    // Create Calendar Event
    const calendar = google.calendar({ version: 'v3', auth: authClient })
    
    const calendarEvent = {
      summary: `Consultation with ${name}`,
      description: `Phone: ${phone}\nEmail: ${email}\nNotes: ${notes || 'None'}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York',
      },
      attendees: [
        { email: email }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    }

    const calendarResponse = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: calendarEvent,
      sendUpdates: 'all', // Send email notifications to attendees
    })

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
    return NextResponse.json(
      { error: 'Failed to schedule consultation', details: error.message },
      { status: 500 }
    )
  }
}

