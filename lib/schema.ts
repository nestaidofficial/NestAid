// Database schema types for NestAid

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyCaregiverApplication {
  id: string;
  userId: string;
  state: string;
  lookingFor: string;
  relationship: string;
  liveWith: boolean;
  dailyHelp: boolean;
  guardian: boolean;
  medicaid: boolean;
  language: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface CareApplication {
  id: string;
  userId: string;
  serviceType: 'in_home_care' | 'companion_care' | 'part_time_care' | 'other';
  whoNeedsCare: 'parent_loved_one' | 'me';
  status: 'pending' | 'contacted' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  userId: string;
  gender: string;
  experience: boolean;
  careTypes: string[];
  status: 'pending' | 'reviewed' | 'contacted' | 'hired';
  createdAt: Date;
  updatedAt: Date;
}
