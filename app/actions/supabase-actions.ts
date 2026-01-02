"use server"

import { createAdminClient } from '@/lib/supabase/admin'
import type { 
  CreateJobPostingInput, 
  CreateJobApplicationInput, 
  CreateCareApplicationInput,
  JobPosting,
  JobApplication,
  CareApplication
} from '@/lib/supabase/types'

// =====================================================
// JOB POSTINGS (Admin operations)
// =====================================================

export async function createJobPosting(data: CreateJobPostingInput): Promise<{ success: boolean; data?: JobPosting; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const { data: job, error } = await supabase
      .from('job_postings')
      .insert({
        title: data.title,
        description: data.description,
        zipcode: data.zipcode,
        city: data.city,
        state: data.state,
        lat: data.lat,
        lng: data.lng,
        radius_miles: data.radius_miles || 25,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating job posting:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: job }
  } catch (error) {
    console.error('Error creating job posting:', error)
    return { success: false, error: 'Failed to create job posting' }
  }
}

export async function getJobPostings(filters?: {
  zipcode?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}): Promise<{ success: boolean; data?: JobPosting[]; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    let query = supabase
      .from('job_postings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    // If coordinates and radius provided, we'll filter by distance
    // Note: For proper geo queries, you'd want to use PostGIS extension
    // For now, we'll fetch all and filter client-side or use a simple bounding box
    if (filters?.lat && filters?.lng && filters?.radius) {
      // Simple bounding box filter (approximate)
      const latDelta = filters.radius / 69 // ~69 miles per degree latitude
      const lngDelta = filters.radius / (69 * Math.cos(filters.lat * Math.PI / 180))
      
      query = query
        .gte('lat', filters.lat - latDelta)
        .lte('lat', filters.lat + latDelta)
        .gte('lng', filters.lng - lngDelta)
        .lte('lng', filters.lng + lngDelta)
    } else if (filters?.zipcode) {
      query = query.eq('zipcode', filters.zipcode)
    }

    const { data: jobs, error } = await query

    if (error) {
      console.error('Error fetching job postings:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: jobs || [] }
  } catch (error) {
    console.error('Error fetching job postings:', error)
    return { success: false, error: 'Failed to fetch job postings' }
  }
}

export async function getAllJobPostings(): Promise<{ success: boolean; data?: JobPosting[]; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const { data: jobs, error } = await supabase
      .from('job_postings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all job postings:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: jobs || [] }
  } catch (error) {
    console.error('Error fetching all job postings:', error)
    return { success: false, error: 'Failed to fetch job postings' }
  }
}

export async function updateJobPosting(id: string, data: Partial<CreateJobPostingInput>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('job_postings')
      .update(data)
      .eq('id', id)

    if (error) {
      console.error('Error updating job posting:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating job posting:', error)
    return { success: false, error: 'Failed to update job posting' }
  }
}

export async function deleteJobPosting(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    // Soft delete by setting is_active to false
    const { error } = await supabase
      .from('job_postings')
      .update({ is_active: false })
      .eq('id', id)

    if (error) {
      console.error('Error deleting job posting:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting job posting:', error)
    return { success: false, error: 'Failed to delete job posting' }
  }
}

// =====================================================
// JOB APPLICATIONS (User submissions from GetStartedModal -> "A job")
// =====================================================

export async function submitJobApplication(data: CreateJobApplicationInput): Promise<{ success: boolean; message: string; data?: JobApplication }> {
  try {
    const supabase = createAdminClient()
    
    const { data: application, error } = await supabase
      .from('job_applications')
      .insert({
        job_posting_id: data.job_posting_id || null,
        looking_for: 'job',
        job_category: data.job_category || null,
        service_type: data.service_type || null,
        gender: data.gender || null,
        has_experience: data.has_experience ?? null,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        postal_code: data.postal_code || null,
        job_title: data.job_title || null,
        search_location: data.search_location || null,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error submitting job application:', error)
      return { success: false, message: 'Failed to submit application. Please try again.' }
    }

    return { 
      success: true, 
      message: 'Thank you for your interest! Your job application has been submitted. We\'ll review it and get back to you soon.',
      data: application
    }
  } catch (error) {
    console.error('Error submitting job application:', error)
    return { success: false, message: 'An error occurred. Please try again.' }
  }
}

export async function getJobApplications(): Promise<{ success: boolean; data?: JobApplication[]; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const { data: applications, error } = await supabase
      .from('job_applications')
      .select('*, job_postings(*)')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching job applications:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: applications || [] }
  } catch (error) {
    console.error('Error fetching job applications:', error)
    return { success: false, error: 'Failed to fetch job applications' }
  }
}

export async function updateJobApplicationStatus(id: string, status: string, notes?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const updateData: Record<string, unknown> = { status }
    if (notes !== undefined) {
      updateData.admin_notes = notes
    }

    const { error } = await supabase
      .from('job_applications')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Error updating job application:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating job application:', error)
    return { success: false, error: 'Failed to update job application' }
  }
}

// =====================================================
// CARE APPLICATIONS (User submissions from GetStartedModal -> "Care for an adult")
// =====================================================

export async function submitCareApplication(data: CreateCareApplicationInput): Promise<{ success: boolean; message: string; data?: CareApplication }> {
  try {
    const supabase = createAdminClient()
    
    const { data: application, error } = await supabase
      .from('care_applications')
      .insert({
        looking_for: 'care',
        care_category: data.care_category || null,
        service_type: data.service_type || null,
        who_needs_care: data.who_needs_care || null,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        postal_code: data.postal_code,
        sms_consent: data.sms_consent || false,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error submitting care application:', error)
      return { success: false, message: 'Failed to submit application. Please try again.' }
    }

    return { 
      success: true, 
      message: 'Thank you! Your care application has been submitted successfully. We\'ll contact you within 24 hours to discuss your care needs.',
      data: application
    }
  } catch (error) {
    console.error('Error submitting care application:', error)
    return { success: false, message: 'An error occurred. Please try again.' }
  }
}

export async function getCareApplications(): Promise<{ success: boolean; data?: CareApplication[]; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const { data: applications, error } = await supabase
      .from('care_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching care applications:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: applications || [] }
  } catch (error) {
    console.error('Error fetching care applications:', error)
    return { success: false, error: 'Failed to fetch care applications' }
  }
}

export async function updateCareApplicationStatus(id: string, status: string, notes?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const updateData: Record<string, unknown> = { status }
    if (notes !== undefined) {
      updateData.admin_notes = notes
    }

    const { error } = await supabase
      .from('care_applications')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Error updating care application:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating care application:', error)
    return { success: false, error: 'Failed to update care application' }
  }
}


