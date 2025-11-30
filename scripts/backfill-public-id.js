const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log('🔗 Connected. Backfilling public_id where NULL...');

    const statements = [
      `UPDATE users SET public_id = DEFAULT WHERE public_id IS NULL;`,
      `UPDATE family_caregiver_applications SET public_id = DEFAULT WHERE public_id IS NULL;`,
      `UPDATE care_applications SET public_id = DEFAULT WHERE public_id IS NULL;`,
      `UPDATE job_applications SET public_id = DEFAULT WHERE public_id IS NULL;`
    ];

    for (const sql of statements) {
      const res = await client.query(sql);
      console.log(`✅ ${res.rowCount} rows updated for: ${sql.split(' ')[1]}`);
    }

    console.log('🎉 Backfill complete.');
  } catch (e) {
    console.error('❌ Backfill failed:', e.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();


