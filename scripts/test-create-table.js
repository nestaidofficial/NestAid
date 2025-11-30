const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function testCreateTable() {
  try {
    console.log('🔗 Testing table creation...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Test connection
    const version = await sql`SELECT version()`;
    console.log('✅ Connected to:', version[0].version);
    
    // Check current user and database
    const currentUser = await sql`SELECT current_user, current_database()`;
    console.log('👤 Current user:', currentUser[0].current_user);
    console.log('🗄️ Current database:', currentUser[0].current_database);
    
    // Try to create a simple test table
    console.log('🔧 Creating test table...');
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      )
    `);
    console.log('✅ Test table created successfully');
    
    // Check if table exists
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'test_table'
    `;
    
    if (tables.length > 0) {
      console.log('✅ Test table found in database');
      
      // Insert a test row
      await sql`INSERT INTO test_table (name) VALUES ('test')`;
      console.log('✅ Test data inserted');
      
      // Query the test data
      const result = await sql`SELECT * FROM test_table`;
      console.log('📊 Test data:', result);
      
      // Clean up
      await sql.unsafe(`DROP TABLE test_table`);
      console.log('🧹 Test table cleaned up');
    } else {
      console.log('❌ Test table not found after creation');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testCreateTable();


