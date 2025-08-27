const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log('🔗 Connected. Dropping public_id columns...');

    const sql = `
      ALTER TABLE IF EXISTS users DROP COLUMN IF EXISTS public_id;
      ALTER TABLE IF EXISTS family_caregiver_applications DROP COLUMN IF EXISTS public_id;
      ALTER TABLE IF EXISTS care_applications DROP COLUMN IF EXISTS public_id;
      ALTER TABLE IF EXISTS job_applications DROP COLUMN IF EXISTS public_id;
    `;

    await client.query(sql);
    console.log('✅ public_id columns dropped successfully.');
  } catch (e) {
    console.error('❌ Failed to drop public_id columns:', e.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
