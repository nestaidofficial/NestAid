-- =====================================================
-- NestAid Supabase Database Schema
-- =====================================================
-- Run this in your Supabase SQL Editor to create tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- JOB POSTINGS TABLE (Admin creates these)
-- =====================================================
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  zipcode VARCHAR(20) NOT NULL, -- Increased to 20 to support ZIP+4 and longer postal codes
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  radius_miles INTEGER DEFAULT 25, -- Radius for nearby cities
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- JOB APPLICATIONS TABLE
-- Captures: User selects "A job" in GetStartedModal
-- Flow: initial -> jobs -> category -> services -> gender -> experience -> form
-- =====================================================
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Reference to job posting (optional - user may apply without specific job)
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE SET NULL,
  
  -- GetStartedModal flow answers
  looking_for VARCHAR(50) NOT NULL DEFAULT 'job', -- "job" (from initial step)
  job_category VARCHAR(50), -- "senior_care" or "adult_care" (from jobs step)
  service_type VARCHAR(100), -- "In-Home Care", "Companionship", etc. (from services step)
  gender VARCHAR(20), -- "Male" or "Female" (from job_gender step)
  has_experience BOOLEAN, -- true/false (from job_experience step)
  
  -- Contact information (from form)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  postal_code VARCHAR(10),
  
  -- Additional job application fields
  job_title VARCHAR(255), -- Job they're applying for
  search_location VARCHAR(255), -- Where they searched from
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'hired', 'rejected')),
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CARE APPLICATIONS TABLE  
-- Captures: User selects "Care for an adult" in GetStartedModal
-- Flow: initial -> care -> category -> services -> who_needs_care -> form
-- =====================================================
CREATE TABLE IF NOT EXISTS care_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- GetStartedModal flow answers
  looking_for VARCHAR(50) NOT NULL DEFAULT 'care', -- "care" (from initial step)
  care_category VARCHAR(50), -- "senior_care" or "adult_care" (from care step)
  service_type VARCHAR(100), -- "in_home_care", "companion_care", etc. (from services step)
  who_needs_care VARCHAR(50), -- "me", "parent", "spouse", "someone_else" (from who_needs_care step)
  
  -- Contact information (from form)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  
  -- Consent
  sms_consent BOOLEAN DEFAULT false,
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES for better query performance
-- =====================================================

-- Job postings indexes
CREATE INDEX IF NOT EXISTS idx_job_postings_location ON job_postings(lat, lng);
CREATE INDEX IF NOT EXISTS idx_job_postings_zipcode ON job_postings(zipcode);
CREATE INDEX IF NOT EXISTS idx_job_postings_active ON job_postings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_postings_created_at ON job_postings(created_at DESC);

-- Job applications indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_posting ON job_applications(job_posting_id);

-- Care applications indexes
CREATE INDEX IF NOT EXISTS idx_care_applications_status ON care_applications(status);
CREATE INDEX IF NOT EXISTS idx_care_applications_email ON care_applications(email);
CREATE INDEX IF NOT EXISTS idx_care_applications_created_at ON care_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_care_applications_service_type ON care_applications(service_type);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_applications ENABLE ROW LEVEL SECURITY;

-- Job postings: Anyone can read active postings, only service role can write
CREATE POLICY "Anyone can view active job postings" ON job_postings
  FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can manage all job postings" ON job_postings
  FOR ALL USING (auth.role() = 'service_role');

-- Job applications: Anyone can insert, only service role can read/update
CREATE POLICY "Anyone can submit job applications" ON job_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage job applications" ON job_applications
  FOR ALL USING (auth.role() = 'service_role');

-- Care applications: Anyone can insert, only service role can read/update
CREATE POLICY "Anyone can submit care applications" ON care_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage care applications" ON care_applications
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- FUNCTIONS for updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating updated_at
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON job_postings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_care_applications_updated_at
  BEFORE UPDATE ON care_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

