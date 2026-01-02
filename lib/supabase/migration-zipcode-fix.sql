-- Migration: Increase zipcode column size in job_postings table
-- Run this in Supabase SQL Editor if you already have the table created

ALTER TABLE job_postings 
ALTER COLUMN zipcode TYPE VARCHAR(20);

-- Verify the change
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'job_postings' 
AND column_name = 'zipcode';


