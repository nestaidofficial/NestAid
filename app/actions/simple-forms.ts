"use server"

import { createUser, getUserByEmail, createFamilyCaregiverApplication } from '@/lib/db-operations';

// Simple form handlers without database - just log and return success
export async function submitClientApplication(formData: FormData) {
  try {
    const careType = formData.get("careType")
    
    // Handle family caregiver eligibility applications
    if (careType === "family_caregiver_eligibility") {
      const firstName = formData.get("firstName") as string
      const lastName = formData.get("lastName") as string
      const phone = formData.get("phone") as string
      const email = formData.get("email") as string
      const postalCode = formData.get("postalCode") as string
      const state = formData.get("state") as string
      const lookingFor = formData.get("lookingFor") as string
      const relationship = formData.get("relationship") as string
      const liveWith = formData.get("liveWith") as string
      const dailyHelp = formData.get("dailyHelp") as string
      const guardian = formData.get("guardian") as string
      const medicaid = formData.get("medicaid") as string
      const language = formData.get("language") as string
      const smsConsent = formData.get("smsConsent") === "true"

      // Check if user already exists
      let user = await getUserByEmail(email)
      
      if (!user) {
        // Create new user
        user = await createUser({
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          postalCode: postalCode,
        })
      }

      // Create family caregiver application
      await createFamilyCaregiverApplication(user.id, {
        state: state,
        lookingFor: lookingFor,
        relationship: relationship,
        liveWith: liveWith === 'Yes',
        dailyHelp: dailyHelp === 'Yes',
        guardian: guardian === 'Yes',
        medicaid: medicaid === 'Yes',
        language: language,
      })

      return {
        success: true,
        message: "Thank you! Your family caregiver application has been submitted successfully. We'll contact you within 24 hours to discuss your eligibility."
      }
    }

    // Handle other care applications (existing logic)
    const data = {
      careType: formData.get("careType"),
      fullName: formData.get("fullName"),
      age: formData.get("age"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      serviceLocation: formData.get("serviceLocation"),
      startDate: formData.get("startDate"),
      schedule: formData.get("schedule"),
      languagePreferences: formData.get("languagePreferences"),
      additionalNotes: formData.get("additionalNotes"),
      emergencyContact: formData.get("emergencyContact"),
      careTypes: formData.getAll("careTypes"),
      companionNeeds: formData.getAll("companionNeeds"),
    }

    // Log the form submission (you could send email or integrate with other services here)
    console.log("🔄 Care Application Submitted:", data)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Thank you! Your application has been submitted successfully. We'll contact you within 24 hours to discuss your care needs."
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: "There was an error submitting your application. Please try again or call us directly."
    }
  }
}

export async function submitJobApplication(formData: FormData) {
  try {
    // Extract form data
    const data = {
      jobType: formData.get("jobType"),
      jobTitle: formData.get("jobTitle"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      experience: formData.get("experience"),
      availability: formData.get("availability"),
      hourlyRate: formData.get("hourlyRate"),
      coverLetter: formData.get("coverLetter"),
      // Note: File uploads would need different handling without database
    }

    // Log the job application
    console.log("💼 Job Application Submitted:", data)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Thank you for your interest! Your job application has been submitted. We'll review it and get back to you soon."
    }
  } catch (error) {
    console.error("Job application submission error:", error)
    return {
      success: false,
      message: "There was an error submitting your application. Please try again or contact us directly."
    }
  }
} 