const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  try {
    console.log('🔗 Connecting to Neon database...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('📋 Running migration...');
    
    // Read and execute the migration SQL
    const fs = require('fs');
    const path = require('path');
    const migrationSQL = fs.readFileSync(path.join(__dirname, '../lib/migrations.sql'), 'utf8');
    
    // Split the SQL into individual statements and execute them
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        await sql.unsafe(statement);
      }
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('📊 Database tables created:');
    console.log('   - users');
    console.log('   - family_caregiver_applications');
    console.log('   - care_applications');
    console.log('   - job_applications');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
