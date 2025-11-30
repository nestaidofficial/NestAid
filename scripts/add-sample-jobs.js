const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function addSampleJobs() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('🔗 Connected to database');

    const sampleJobs = [
      {
        title: 'Senior Caregiver - Full Time',
        description: 'We are seeking a compassionate and experienced caregiver to provide in-home care for our elderly client. Responsibilities include personal care, meal preparation, medication reminders, and companionship. Must have 2+ years of experience and be available for 40 hours per week.',
        zipcode: '02144',
        city: 'Somerville',
        state: 'MA',
        lat: 42.3995,
        lng: -71.1225
      },
      {
        title: 'Companion Care Specialist',
        description: 'Looking for a friendly and patient individual to provide companionship and light assistance to our senior client. Duties include conversation, light housekeeping, meal prep, and escorting to appointments. Part-time position, 20 hours per week.',
        zipcode: '02144',
        city: 'Somerville',
        state: 'MA',
        lat: 42.3995,
        lng: -71.1225
      },
      {
        title: 'Memory Care Assistant',
        description: 'Seeking a specialized caregiver with experience in dementia and Alzheimer\'s care. Must be patient, understanding, and trained in memory care techniques. Responsibilities include cognitive stimulation, safety supervision, and family support.',
        zipcode: '02145',
        city: 'Somerville',
        state: 'MA',
        lat: 42.3875,
        lng: -71.0995
      },
      {
        title: 'Live-in Caregiver',
        description: 'Full-time live-in caregiver needed for elderly couple. Must be available 24/7 with scheduled breaks. Responsibilities include personal care, household management, medication management, and emergency response. Private room provided.',
        zipcode: '02143',
        city: 'Somerville',
        state: 'MA',
        lat: 42.3785,
        lng: -71.1055
      },
      {
        title: 'Weekend Caregiver',
        description: 'Weekend caregiver needed for elderly client. Saturday and Sunday shifts, 8 hours each day. Duties include personal care, meal preparation, medication reminders, and light housekeeping. Perfect for students or part-time workers.',
        zipcode: '02144',
        city: 'Somerville',
        state: 'MA',
        lat: 42.3995,
        lng: -71.1225
      },
      {
        title: 'Transportation Assistant',
        description: 'Caregiver needed to provide safe transportation for senior client to medical appointments, grocery shopping, and social activities. Must have clean driving record and comfortable vehicle. Flexible schedule, 15-20 hours per week.',
        zipcode: '02145',
        city: 'Somerville',
        state: 'MA',
        lat: 42.3875,
        lng: -71.0995
      }
    ];

    console.log('📝 Adding sample job postings...');

    for (const job of sampleJobs) {
      const result = await client.query(`
        INSERT INTO job_postings (title, description, zipcode, city, state, lat, lng)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, title
      `, [job.title, job.description, job.zipcode, job.city, job.state, job.lat, job.lng]);

      console.log(`✅ Added: ${result.rows[0].title} (ID: ${result.rows[0].id})`);
    }

    console.log(`🎉 Successfully added ${sampleJobs.length} sample job postings!`);

  } catch (error) {
    console.error('❌ Error adding sample jobs:', error);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

addSampleJobs();


