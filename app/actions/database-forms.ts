"use server"

import { submitCareApplication as supabaseSubmitCareApplication, submitJobApplication as supabaseSubmitJobApplication } from './supabase-actions';
import type { CreateCareApplicationInput, CreateJobApplicationInput } from '@/lib/supabase/types';

// Care Application
export async function submitCareApplication(formData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  serviceType: string;
  whoNeedsCare: string;
  careCategory?: string;
  smsConsent?: boolean;
}) {
  const input: CreateCareApplicationInput = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    postal_code: formData.postalCode,
    service_type: formData.serviceType as any,
    who_needs_care: formData.whoNeedsCare as any,
    care_category: formData.careCategory as any,
    sms_consent: formData.smsConsent || false,
  };

  return await supabaseSubmitCareApplication(input);
}

// Job Application (from GetStartedModal flow)
export async function submitJobApplication(formData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  gender: string;
  experience: string;
  careTypes: string[];
  jobCategory?: string;
  serviceType?: string;
}) {
  const input: CreateJobApplicationInput = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    postal_code: formData.postalCode,
    gender: formData.gender as any,
    has_experience: formData.experience === 'Yes',
    job_category: formData.jobCategory as any,
    service_type: formData.serviceType || (formData.careTypes.length > 0 ? formData.careTypes[0] : undefined),
  };

  return await supabaseSubmitJobApplication(input);
}
