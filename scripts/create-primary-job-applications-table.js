const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function createPrimaryJobApplicationsTable() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create primary_job_applications table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS primary_job_applications (
        id SERIAL PRIMARY KEY,
        job_id VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        search_location TEXT NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'hired', 'rejected')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createTableQuery);
    console.log('✅ primary_job_applications table created successfully');

    // Create index on job_id for better performance
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_primary_job_applications_job_id 
      ON primary_job_applications(job_id);
    `;

    await client.query(createIndexQuery);
    console.log('✅ Index created on job_id');

    // Create index on email for duplicate checking
    const createEmailIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_primary_job_applications_email 
      ON primary_job_applications(email);
    `;

    await client.query(createEmailIndexQuery);
    console.log('✅ Index created on email');

    // Create index on status for filtering
    const createStatusIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_primary_job_applications_status 
      ON primary_job_applications(status);
    `;

    await client.query(createStatusIndexQuery);
    console.log('✅ Index created on status');

    console.log('🎉 All database operations completed successfully!');

  } catch (error) {
    console.error('❌ Error creating table:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the migration
createPrimaryJobApplicationsTable();
