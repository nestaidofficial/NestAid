"use server"

import { createUser, getUserByEmail, createCareApplication, createJobApplication } from '@/lib/db-operations';

// Family Caregiver Application - REMOVED

// Care Application
export async function submitCareApplication(formData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  serviceType: string;
  whoNeedsCare: string;
}) {
  try {
    // Check if user already exists
    let user = await getUserByEmail(formData.email);
    
    if (!user) {
      // Create new user
      user = await createUser({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        postalCode: formData.postalCode,
      });
    }

    // Create care application
    await createCareApplication(user.id, {
      serviceType: formData.serviceType as any,
      whoNeedsCare: formData.whoNeedsCare as any,
    });

    return {
      success: true,
      message: "Thank you! Your care application has been submitted successfully. We'll contact you within 24 hours to discuss your care needs."
    };
  } catch (error) {
    console.error("Care application error:", error);
    return {
      success: false,
      message: "There was an error submitting your application. Please try again or call us directly."
    };
  }
}

// Job Application
export async function submitJobApplication(formData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  gender: string;
  experience: string;
  careTypes: string[];
}) {
  try {
    // Check if user already exists
    let user = await getUserByEmail(formData.email);
    
    if (!user) {
      // Create new user
      user = await createUser({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        postalCode: formData.postalCode,
      });
    }

    // Create job application
    await createJobApplication(user.id, {
      gender: formData.gender,
      experience: formData.experience === 'Yes',
      careTypes: formData.careTypes,
    });

    return {
      success: true,
      message: "Thank you for your interest! Your job application has been submitted. We'll review it and get back to you soon."
    };
  } catch (error) {
    console.error("Job application error:", error);
    return {
      success: false,
      message: "There was an error submitting your application. Please try again or contact us directly."
    };
  }
}


