const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function runMigrationFixed() {
  try {
    console.log('🔗 Connecting to Neon database...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Test connection first
    const version = await sql`SELECT version()`;
    console.log('✅ Connected to:', version[0].version);
    
    console.log('📋 Running migration with fixed SQL parsing...');
    
    // Read the migration SQL
    const fs = require('fs');
    const path = require('path');
    const migrationSQL = fs.readFileSync(path.join(__dirname, '../lib/migrations.sql'), 'utf8');
    
    console.log('📄 Migration SQL loaded, length:', migrationSQL.length);
    
    // Execute the entire migration as one statement
    console.log('🔧 Executing migration...');
    await sql.unsafe(migrationSQL);
    console.log('✅ Migration executed successfully');
    
    // Verify tables were created
    console.log('\n🔍 Verifying tables were created...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log(`✅ Migration completed! Found ${tables.length} tables:`);
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
    
    // Also check indexes
    console.log('\n🔍 Checking indexes...');
    const indexes = await sql`
      SELECT indexname, tablename 
      FROM pg_indexes 
      WHERE schemaname = 'public'
      ORDER BY tablename, indexname
    `;
    
    console.log(`Found ${indexes.length} indexes:`);
    indexes.forEach(index => {
      console.log(`   - ${index.indexname} on ${index.tablename}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

runMigrationFixed();


