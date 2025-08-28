import { NextRequest, NextResponse } from 'next/server';
import { getJobPostings, getAllJobPostings } from '@/lib/db-operations';

// Function to geocode ZIP code to coordinates
async function geocodeZipcode(zipcode: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding ZIP code:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zipcode = searchParams.get('zipcode');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius');

    let jobs;

    if (zipcode) {
      // First try to geocode the ZIP code to get coordinates
      const coordinates = await geocodeZipcode(zipcode);
      
      if (coordinates && radius) {
        // Use radius search with geocoded coordinates
        jobs = await getJobPostings(undefined, parseFloat(radius), coordinates.lat, coordinates.lng);
      } else {
        // Fallback to exact ZIP code search if geocoding fails
        jobs = await getJobPostings(zipcode);
      }
    } else if (lat && lng && radius) {
      // Search by radius (50 miles = ~80.47 km)
      jobs = await getJobPostings(undefined, parseFloat(radius), parseFloat(lat), parseFloat(lng));
    } else {
      // Return all jobs if no filters provided
      jobs = await getAllJobPostings();
    }

    return NextResponse.json({ 
      success: true, 
      jobs,
      count: jobs.length 
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, zipcode, city, state, lat, lng } = body;

    // Validate required fields
    if (!title || !description || !zipcode || !city || !state) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Import the createJobPosting function
    const { createJobPosting } = await import('@/lib/db-operations');
    
    const job = await createJobPosting({
      title,
      description,
      zipcode,
      city,
      state,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
    });

    return NextResponse.json({ 
      success: true, 
      job 
    });
  } catch (error) {
    console.error('Error creating job posting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
}
