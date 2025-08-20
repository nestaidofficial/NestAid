"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function submitUserJobApplication(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: "You must be logged in to apply for jobs" }
  }

  // Check if user is a caregiver
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_role")
    .eq("id", user.id)
    .single()

  if (profile?.user_role !== 'caregiver') {
    return { success: false, message: "Only caregivers can apply for jobs" }
  }

  try {
    // Extract form data
    const applicationData = {
      user_id: user.id,
      job_type: formData.get("jobType") as string || 'senior-care',
      job_title: formData.get("jobTitle") as string || 'Senior Care Position',
      job_description: formData.get("jobDescription") as string || '',
      specific_job_id: formData.get("specificJobId") as string || '',
      availability: formData.get("availability") as string || '',
      hourly_rate_expected: formData.get("hourlyRateExpected") ? 
        parseFloat(formData.get("hourlyRateExpected") as string) : null,
      cover_letter: formData.get("coverLetter") as string || '',
      status: "pending" as const
    }

    // Handle resume upload if provided
    let resumeUrl = null
    let resumeFilename = null
    
    const resume = formData.get("resume") as File | null
    if (resume && resume.size > 0) {
      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExt = resume.name.split('.').pop()
      const fileName = `user-resumes/${user.id}/${timestamp}-${randomString}.${fileExt}`

      // Convert File to ArrayBuffer
      const arrayBuffer = await resume.arrayBuffer()
      const fileBuffer = new Uint8Array(arrayBuffer)

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('senior-care-resumes')
        .upload(fileName, fileBuffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: resume.type
        })

      if (uploadError) {
        console.error('Resume upload error:', uploadError)
        return { success: false, message: 'Failed to upload resume. Please try again.' }
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('senior-care-resumes')
        .getPublicUrl(fileName)

      resumeUrl = urlData.publicUrl
      resumeFilename = resume.name
    }

    // Insert application
    const { data, error } = await supabase
      .from("user_job_applications")
      .insert({
        ...applicationData,
        resume_url: resumeUrl,
        resume_filename: resumeFilename
      })
      .select()
      .single()

    if (error) {
      console.error("Error submitting job application:", error)
      return { success: false, message: "Failed to submit application. Please try again." }
    }

    return {
      success: true,
      message: "Application submitted successfully! You can track its status in your dashboard.",
      data
    }

  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function getUserJobApplications() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: "You must be logged in to view applications" }
  }

  try {
    const { data: applications, error } = await supabase
      .from("user_job_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching applications:", error)
      return { success: false, message: "Failed to load applications" }
    }

    return {
      success: true,
      data: applications || []
    }

  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

export async function withdrawJobApplication(applicationId: string) {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: "You must be logged in to withdraw applications" }
  }

  try {
    const { data, error } = await supabase
      .from("user_job_applications")
      .update({ status: "withdrawn" })
      .eq("id", applicationId)
      .eq("user_id", user.id) // Ensure user can only withdraw their own applications
      .select()
      .single()

    if (error) {
      console.error("Error withdrawing application:", error)
      return { success: false, message: "Failed to withdraw application" }
    }

    if (!data) {
      return { success: false, message: "Application not found or already withdrawn" }
    }

    return {
      success: true,
      message: "Application withdrawn successfully",
      data
    }

  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
} 