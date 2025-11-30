const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function runMigrationDebug() {
  try {
    console.log('🔗 Connecting to Neon database...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Test connection first
    const version = await sql`SELECT version()`;
    console.log('✅ Connected to:', version[0].version);
    
    console.log('📋 Running migration with debug...');
    
    // Read the migration SQL
    const fs = require('fs');
    const path = require('path');
    const migrationSQL = fs.readFileSync(path.join(__dirname, '../lib/migrations.sql'), 'utf8');
    
    console.log('📄 Migration SQL loaded, length:', migrationSQL.length);
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement individually with error handling
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`\n🔧 Executing statement ${i + 1}/${statements.length}:`);
        console.log(`SQL: ${statement.substring(0, 100)}...`);
        
        try {
          await sql.unsafe(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error) {
          console.error(`❌ Statement ${i + 1} failed:`, error.message);
          console.error(`Full statement: ${statement}`);
          throw error;
        }
      }
    }
    
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
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

runMigrationDebug();


