const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log('🔗 Connected. Adding public_id columns...');

    const sql = `
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS public_id BIGINT GENERATED ALWAYS AS IDENTITY;

      ALTER TABLE family_caregiver_applications
        ADD COLUMN IF NOT EXISTS public_id BIGINT GENERATED ALWAYS AS IDENTITY;

      ALTER TABLE care_applications
        ADD COLUMN IF NOT EXISTS public_id BIGINT GENERATED ALWAYS AS IDENTITY;

      ALTER TABLE job_applications
        ADD COLUMN IF NOT EXISTS public_id BIGINT GENERATED ALWAYS AS IDENTITY;
    `;

    await client.query(sql);
    console.log('✅ public_id columns added successfully.');
  } catch (e) {
    console.error('❌ Failed to add public_id columns:', e.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
