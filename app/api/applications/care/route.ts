import { NextResponse } from 'next/server';
import { getCareApplications } from '@/app/actions/supabase-actions';

export async function GET() {
  try {
    const result = await getCareApplications();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      applications: result.data,
      count: result.data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching care applications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch care applications' },
      { status: 500 }
    );
  }
}

