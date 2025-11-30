const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function testDatabase() {
  try {
    console.log('🔗 Testing Neon database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Test basic connection
    console.log('📡 Testing connection...');
    const result = await sql`SELECT version()`;
    console.log('✅ Connection successful!');
    console.log('PostgreSQL version:', result[0].version);
    
    // List all tables
    console.log('\n📋 Checking for tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log(`Found ${tables.length} tables:`);
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    if (tables.length === 0) {
      console.log('\n❌ No tables found. Let\'s check if the migration actually ran...');
      
      // Check if we can create a simple test table
      console.log('🧪 Testing table creation...');
      await sql.unsafe(`
        CREATE TABLE IF NOT EXISTS test_table (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100)
        )
      `);
      
      const testTables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `;
      
      console.log(`After test creation: ${testTables.length} tables:`);
      testTables.forEach(table => {
        console.log(`  - ${table.table_name}`);
      });
      
      // Clean up test table
      await sql.unsafe(`DROP TABLE IF EXISTS test_table`);
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Full error:', error);
  }
}

testDatabase();


