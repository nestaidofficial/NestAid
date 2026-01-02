// Database types for NestAid Supabase tables

export type JobPostingStatus = 'active' | 'inactive';
export type JobApplicationStatus = 'pending' | 'reviewed' | 'contacted' | 'hired' | 'rejected';
export type CareApplicationStatus = 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export type JobCategory = 'senior_care' | 'adult_care';
export type CareCategory = 'senior_care' | 'adult_care';
export type ServiceType = 'in_home_care' | 'companion_care' | 'part_time_care' | 'other';
export type WhoNeedsCare = 'me' | 'parent' | 'spouse' | 'someone_else';
export type Gender = 'Male' | 'Female';

// Job Postings (Admin creates these)
export interface JobPosting {
  id: string;
  title: string;
  description: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number | null;
  lng: number | null;
  radius_miles: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateJobPostingInput {
  title: string;
  description: string;
  zipcode: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  radius_miles?: number;
}

// Job Applications (User submits when selecting "A job")
export interface JobApplication {
  id: string;
  job_posting_id: string | null;
  
  // Modal flow answers
  looking_for: 'job';
  job_category: JobCategory | null;
  service_type: string | null;
  gender: Gender | null;
  has_experience: boolean | null;
  
  // Contact info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code: string | null;
  
  // Job details
  job_title: string | null;
  search_location: string | null;
  
  // Status
  status: JobApplicationStatus;
  admin_notes: string | null;
  
  created_at: string;
  updated_at: string;
}

export interface CreateJobApplicationInput {
  job_posting_id?: string;
  
  // Modal flow answers
  looking_for?: 'job';
  job_category?: JobCategory;
  service_type?: string;
  gender?: Gender;
  has_experience?: boolean;
  
  // Contact info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code?: string;
  
  // Job details
  job_title?: string;
  search_location?: string;
}

// Care Applications (User submits when selecting "Care for an adult")
export interface CareApplication {
  id: string;
  
  // Modal flow answers
  looking_for: 'care';
  care_category: CareCategory | null;
  service_type: ServiceType | null;
  who_needs_care: WhoNeedsCare | null;
  
  // Contact info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code: string;
  
  // Consent
  sms_consent: boolean;
  
  // Status
  status: CareApplicationStatus;
  admin_notes: string | null;
  
  created_at: string;
  updated_at: string;
}

export interface CreateCareApplicationInput {
  // Modal flow answers
  looking_for?: 'care';
  care_category?: CareCategory;
  service_type?: ServiceType;
  who_needs_care?: WhoNeedsCare;
  
  // Contact info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code: string;
  
  // Consent
  sms_consent?: boolean;
}

// Database response types
export interface Database {
  public: {
    Tables: {
      job_postings: {
        Row: JobPosting;
        Insert: CreateJobPostingInput;
        Update: Partial<CreateJobPostingInput>;
      };
      job_applications: {
        Row: JobApplication;
        Insert: CreateJobApplicationInput;
        Update: Partial<CreateJobApplicationInput>;
      };
      care_applications: {
        Row: CareApplication;
        Insert: CreateCareApplicationInput;
        Update: Partial<CreateCareApplicationInput>;
      };
    };
  };
}


