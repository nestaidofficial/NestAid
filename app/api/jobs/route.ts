import { NextRequest, NextResponse } from 'next/server';
import { createJobPosting, getJobPostings, getAllJobPostings } from '@/app/actions/supabase-actions';

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

    let result;

    if (zipcode) {
      // First try to geocode the ZIP code to get coordinates
      const coordinates = await geocodeZipcode(zipcode);
      
      if (coordinates && radius) {
        // Use radius search with geocoded coordinates
        result = await getJobPostings({
          lat: coordinates.lat,
          lng: coordinates.lng,
          radius: parseFloat(radius)
        });
      } else {
        // Fallback to exact ZIP code search if geocoding fails
        result = await getJobPostings({ zipcode });
      }
    } else if (lat && lng && radius) {
      // Search by radius
      result = await getJobPostings({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        radius: parseFloat(radius)
      });
    } else {
      // Return all active jobs if no filters provided
      result = await getAllJobPostings();
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      jobs: result.data,
      count: result.data?.length || 0
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
    const { title, description, zipcode, city, state, lat, lng, radius_miles } = body;

    // Validate required fields
    if (!title || !description || !city || !state) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, city, and state are required' },
        { status: 400 }
      );
    }

    // Zipcode is optional, but if not provided, we'll use state as identifier
    // Format: "STATE" or zipcode if provided (max 20 chars)
    let finalZipcode = zipcode || state || '00000';
    // Ensure it doesn't exceed 20 characters (database limit)
    if (finalZipcode.length > 20) {
      finalZipcode = finalZipcode.substring(0, 20);
    }

    const result = await createJobPosting({
      title,
      description,
      zipcode: finalZipcode,
      city,
      state,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      radius_miles: radius_miles ? parseInt(radius_miles) : 25
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      job: result.data
    });
  } catch (error) {
    console.error('Error creating job posting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
}
