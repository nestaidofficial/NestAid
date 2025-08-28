-- NestAid Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family Caregiver Applications table
CREATE TABLE IF NOT EXISTS family_caregiver_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  state VARCHAR(50) NOT NULL,
  looking_for VARCHAR(100) NOT NULL,
  relationship VARCHAR(50) NOT NULL,
  live_with BOOLEAN NOT NULL,
  daily_help BOOLEAN NOT NULL,
  guardian BOOLEAN NOT NULL,
  medicaid BOOLEAN NOT NULL,
  language VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Care Applications table
CREATE TABLE IF NOT EXISTS care_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('in_home_care', 'companion_care', 'part_time_care', 'other')),
  who_needs_care VARCHAR(50) NOT NULL CHECK (who_needs_care IN ('parent_loved_one', 'me')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  gender VARCHAR(20) NOT NULL,
  experience BOOLEAN NOT NULL,
  care_types TEXT[] NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'hired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_family_caregiver_user_id ON family_caregiver_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_care_applications_user_id ON care_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON family_caregiver_applications(status);
CREATE INDEX IF NOT EXISTS idx_care_applications_status ON care_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- Job Postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  zipcode VARCHAR(10) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for job_postings
CREATE INDEX IF NOT EXISTS idx_job_postings_zipcode ON job_postings(zipcode);
CREATE INDEX IF NOT EXISTS idx_job_postings_location ON job_postings(lat, lng);
CREATE INDEX IF NOT EXISTS idx_job_postings_created_at ON job_postings(created_at DESC);
