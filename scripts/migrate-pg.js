const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function runMigrationWithPg() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔗 Connecting to Neon database with pg client...');
    await client.connect();
    
    console.log('✅ Connected successfully');
    
    // Test connection
    const version = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', version.rows[0].version);
    
    // Check current user and database
    const currentUser = await client.query('SELECT current_user, current_database()');
    console.log('👤 Current user:', currentUser.rows[0].current_user);
    console.log('🗄️ Current database:', currentUser.rows[0].current_database);
    
    // Read migration SQL
    const fs = require('fs');
    const path = require('path');
    const migrationSQL = fs.readFileSync(path.join(__dirname, '../lib/migrations.sql'), 'utf8');
    
    console.log('📄 Migration SQL loaded, length:', migrationSQL.length);
    
    // Execute migration
    console.log('🔧 Executing migration...');
    await client.query(migrationSQL);
    console.log('✅ Migration executed successfully');
    
    // Verify tables were created
    console.log('\n🔍 Verifying tables were created...');
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`✅ Migration completed! Found ${tables.rows.length} tables:`);
    tables.rows.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
    
    // Check indexes
    console.log('\n🔍 Checking indexes...');
    const indexes = await client.query(`
      SELECT indexname, tablename 
      FROM pg_indexes 
      WHERE schemaname = 'public'
      ORDER BY tablename, indexname
    `);
    
    console.log(`Found ${indexes.rows.length} indexes:`);
    indexes.rows.forEach(index => {
      console.log(`   - ${index.indexname} on ${index.tablename}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await client.end();
    console.log('🔌 Connection closed');
  }
}

runMigrationWithPg();

