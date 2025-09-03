const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function testTransaction() {
  try {
    console.log('🔗 Testing transaction behavior...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Check if we're in a transaction
    const inTransaction = await sql`SELECT txid_current()`;
    console.log('🔄 Transaction ID:', inTransaction[0].txid_current);
    
    // Try creating a table with explicit transaction handling
    console.log('🔧 Creating table with explicit transaction...');
    
    // Start a transaction
    await sql.unsafe('BEGIN');
    
    // Create table
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS transaction_test (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      )
    `);
    
    // Check if table exists within transaction
    const tablesInTx = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'transaction_test'
    `;
    console.log('📋 Tables in transaction:', tablesInTx.length);
    
    // Commit the transaction
    await sql.unsafe('COMMIT');
    console.log('✅ Transaction committed');
    
    // Check if table exists after commit
    const tablesAfterCommit = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'transaction_test'
    `;
    console.log('📋 Tables after commit:', tablesAfterCommit.length);
    
    if (tablesAfterCommit.length > 0) {
      console.log('✅ Table exists after commit!');
      
      // Clean up
      await sql.unsafe('DROP TABLE transaction_test');
      console.log('🧹 Table cleaned up');
    } else {
      console.log('❌ Table still not found after commit');
    }
    
  } catch (error) {
    console.error('❌ Transaction test failed:', error.message);
    console.error('Full error:', error);
  }
}

testTransaction();

