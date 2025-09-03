const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testDatabaseOperations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔗 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully');

    // Test creating a user
    console.log('\n👤 Testing user creation...');
    const userResult = await client.query(`
      INSERT INTO users (email, first_name, last_name, phone, postal_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name
    `, ['test@example.com', 'Test', 'User', '123-456-7890', '12345']);
    
    const userId = userResult.rows[0].id;
    console.log('✅ User created:', userResult.rows[0]);

    // Test creating a family caregiver application
    console.log('\n📝 Testing family caregiver application...');
    const familyAppResult = await client.query(`
      INSERT INTO family_caregiver_applications (
        user_id, state, looking_for, relationship, live_with, daily_help, guardian, medicaid, language, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, user_id, state, looking_for, status
    `, [userId, 'Massachusetts', 'Care for a Family/Friend', 'Parent', true, true, false, true, 'English', 'pending']);
    
    console.log('✅ Family caregiver application created:', familyAppResult.rows[0]);

    // Test creating a care application
    console.log('\n🏥 Testing care application...');
    const careAppResult = await client.query(`
      INSERT INTO care_applications (user_id, service_type, who_needs_care, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, service_type, who_needs_care, status
    `, [userId, 'in_home_care', 'parent_loved_one', 'pending']);
    
    console.log('✅ Care application created:', careAppResult.rows[0]);

    // Test creating a job application
    console.log('\n💼 Testing job application...');
    const jobAppResult = await client.query(`
      INSERT INTO job_applications (user_id, gender, experience, care_types, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, user_id, gender, experience, care_types, status
    `, [userId, 'Male', true, ['In-Home Care', 'Companionship'], 'pending']);
    
    console.log('✅ Job application created:', jobAppResult.rows[0]);

    // Query all applications for this user
    console.log('\n📊 Querying all applications for the test user...');
    const allApps = await client.query(`
      SELECT 
        u.email,
        u.first_name,
        u.last_name,
        COUNT(fca.id) as family_caregiver_apps,
        COUNT(ca.id) as care_apps,
        COUNT(ja.id) as job_apps
      FROM users u
      LEFT JOIN family_caregiver_applications fca ON u.id = fca.user_id
      LEFT JOIN care_applications ca ON u.id = ca.user_id
      LEFT JOIN job_applications ja ON u.id = ja.user_id
      WHERE u.id = $1
      GROUP BY u.id, u.email, u.first_name, u.last_name
    `, [userId]);
    
    console.log('📈 User applications summary:', allApps.rows[0]);

    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    await client.query('DELETE FROM job_applications WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM care_applications WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM family_caregiver_applications WHERE user_id = $1', [userId]);
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All database operations test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await client.end();
    console.log('🔌 Connection closed');
  }
}

testDatabaseOperations();

