"use server"

import { createPrimaryJobApplication } from '@/lib/db-operations';

export async function submitJobApplication(formData: FormData) {
  try {
    const applicationData = {
      jobId: formData.get("jobId") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      mobileNumber: formData.get("mobileNumber") as string,
      email: formData.get("email") as string,
      searchLocation: formData.get("searchLocation") as string,
      jobTitle: formData.get("jobTitle") as string,
    };

    // Validate required fields
    if (!applicationData.jobId || !applicationData.firstName || !applicationData.lastName || 
        !applicationData.mobileNumber || !applicationData.email ||
        !applicationData.searchLocation || !applicationData.jobTitle) {
      return {
        success: false,
        message: "Please fill in all required fields"
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address"
      };
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(applicationData.mobileNumber.replace(/\s/g, ''))) {
      return {
        success: false,
        message: "Please enter a valid phone number"
      };
    }

    // Save to database
    const result = await createPrimaryJobApplication(applicationData);

    return {
      success: true,
      message: "Application submitted successfully! We'll contact you soon.",
      data: result
    };

  } catch (error) {
    console.error("Error submitting job application:", error);
    return {
      success: false,
      message: "An error occurred while submitting your application. Please try again."
    };
  }
}
