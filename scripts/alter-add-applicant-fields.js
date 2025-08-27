const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log('🔗 Connected. Altering tables to add applicant fields...');

    // Postgres requires IF NOT EXISTS per column, not after ALTER TABLE
    const alterStatements = `
      ALTER TABLE family_caregiver_applications
        ADD COLUMN IF NOT EXISTS applicant_first_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS applicant_last_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS applicant_email VARCHAR(255),
        ADD COLUMN IF NOT EXISTS applicant_postal_code VARCHAR(10);

      ALTER TABLE care_applications
        ADD COLUMN IF NOT EXISTS applicant_first_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS applicant_last_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS applicant_email VARCHAR(255),
        ADD COLUMN IF NOT EXISTS applicant_postal_code VARCHAR(10);

      ALTER TABLE job_applications
        ADD COLUMN IF NOT EXISTS applicant_first_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS applicant_last_name VARCHAR(100),
        ADD COLUMN IF NOT EXISTS applicant_email VARCHAR(255),
        ADD COLUMN IF NOT EXISTS applicant_postal_code VARCHAR(10);
    `;

    await client.query(alterStatements);
    console.log('✅ Applicant fields added to application tables.');
  } catch (e) {
    console.error('❌ Alter failed:', e.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
